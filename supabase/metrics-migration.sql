-- =============================================================================
-- SAM-AI Metrics Migration
-- =============================================================================
-- Purpose : Extend existing tables with new metric columns and create the
--           daily_stats table for time-series trend data.
-- Usage   : Paste this file verbatim into the Supabase SQL Editor and run.
--           All ALTER TABLE statements use ADD COLUMN IF NOT EXISTS, making
--           this migration safe to re-run on an already-migrated schema.
-- Depends : portal-schema.sql must have been applied first (tables clients,
--           chatbots, automations, monthly_metrics must exist).co
-- =============================================================================


-- =============================================================================
-- CHATBOTS — new metric columns
-- =============================================================================

-- conversations_this_month : unique conversation threads initiated in the
--   current calendar month.  Distinct from messages_this_month (one
--   conversation = many messages).
-- resolution_rate          : percentage of conversations resolved autonomously
--   without escalating to a human agent.  Range: 0.00 – 100.00.
ALTER TABLE chatbots
  ADD COLUMN IF NOT EXISTS conversations_this_month integer     DEFAULT 0,
  ADD COLUMN IF NOT EXISTS resolution_rate          numeric(5,2) DEFAULT 0;


-- =============================================================================
-- AUTOMATIONS — new metric columns
-- =============================================================================

-- avg_execution_time_seconds : rolling average wall-clock time (in seconds)
--   that a single execution of this automation takes to complete.
ALTER TABLE automations
  ADD COLUMN IF NOT EXISTS avg_execution_time_seconds numeric(8,2) DEFAULT 0;


-- =============================================================================
-- MONTHLY_METRICS — new aggregate columns
-- =============================================================================

-- conversations_total  : total unique conversation threads across all chatbots
--   for this client during the month.
-- resolution_rate_avg  : weighted average resolution rate across all chatbots
--   for the month.  Range: 0.00 – 100.00.
-- avg_response_time    : average chatbot first-response time in seconds across
--   all conversations for the month.
-- errors_total         : combined automation + chatbot error count for the month.
ALTER TABLE monthly_metrics
  ADD COLUMN IF NOT EXISTS conversations_total    integer      DEFAULT 0,
  ADD COLUMN IF NOT EXISTS resolution_rate_avg    numeric(5,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS avg_response_time      numeric(6,1) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS errors_total           integer      DEFAULT 0;


-- =============================================================================
-- DAILY_STATS — new table
-- =============================================================================
-- One row per (client, calendar day).  Used to power trend charts in the
-- portal dashboard.  The UNIQUE constraint on (client_id, date) allows callers
-- to use INSERT ... ON CONFLICT (client_id, date) DO UPDATE for upserts from
-- background jobs without risk of duplicates.
-- =============================================================================

CREATE TABLE IF NOT EXISTS daily_stats (
  id            uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id     uuid    REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  date          date    NOT NULL,
  -- message-level counters
  messages      integer DEFAULT 0,
  conversations integer DEFAULT 0,
  leads         integer DEFAULT 0,
  -- automation-level counters
  executions    integer DEFAULT 0,
  errors        integer DEFAULT 0,
  -- enforce one summary row per client per day
  UNIQUE (client_id, date)
);


-- =============================================================================
-- DAILY_STATS — Row Level Security
-- =============================================================================
-- Follows the same pattern used in the base schema: correlated subquery on
-- clients resolves the owning user_id.  The existing idx_clients_user_id index
-- ensures O(1) lookups per policy evaluation.
-- =============================================================================

ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

-- Clients may only SELECT rows that belong to their own client record.
CREATE POLICY "daily_stats_select_own"
  ON daily_stats
  FOR SELECT
  USING (
    auth.uid() = (
      SELECT user_id
      FROM   clients
      WHERE  id = daily_stats.client_id
    )
  );


-- =============================================================================
-- DAILY_STATS — Indexes
-- =============================================================================

-- Composite index on (client_id, date DESC) covers the most common access
-- pattern: "fetch the last N days of stats for a specific client".
-- DESC ordering means the newest rows are clustered at the top of the index,
-- avoiding a sort step for queries ordered by date descending.
CREATE INDEX IF NOT EXISTS idx_daily_stats_client_date
  ON daily_stats(client_id, date DESC);


-- =============================================================================
-- END OF MIGRATION
-- =============================================================================
