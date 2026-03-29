-- =============================================================================
-- SAM-AI Client Portal Schema
-- =============================================================================
-- Purpose : Multi-tenant client portal with Row Level Security (RLS).
--           Each row is owned by the auth.users record linked through the
--           clients.user_id foreign key.  All SELECT operations are gated by
--           RLS policies that compare auth.uid() with the owning user_id.
-- Usage   : Paste this file verbatim into the Supabase SQL Editor and run.
--           All statements are idempotent-safe when run on a fresh schema.
-- =============================================================================


-- =============================================================================
-- TABLES
-- =============================================================================

-- -----------------------------------------------------------------------------
-- clients
-- One row per paying customer.  user_id ties the record to a Supabase Auth
-- account.  The UNIQUE constraint on user_id enforces a 1-to-1 mapping.
-- -----------------------------------------------------------------------------
CREATE TABLE clients (
    id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       uuid        REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    company_name  text        NOT NULL,
    contact_email text        NOT NULL,
    plan          text        DEFAULT 'starter'
                              CHECK (plan IN ('starter', 'growth', 'enterprise')),
    active        boolean     DEFAULT true,
    created_at    timestamptz DEFAULT now()
);


-- -----------------------------------------------------------------------------
-- automations
-- Workflow automations (n8n, Make, Zapier, custom) owned by a client.
-- -----------------------------------------------------------------------------
CREATE TABLE automations (
    id                     uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id              uuid        REFERENCES clients(id) ON DELETE CASCADE,
    name                   text        NOT NULL,
    description            text,
    status                 text        DEFAULT 'active'
                                       CHECK (status IN ('active', 'paused', 'error')),
    platform               text        CHECK (platform IN ('n8n', 'make', 'zapier', 'custom')),
    last_execution         timestamptz,
    executions_this_month  integer     DEFAULT 0,
    errors_this_month      integer     DEFAULT 0,
    created_at             timestamptz DEFAULT now()
);


-- -----------------------------------------------------------------------------
-- chatbots
-- Deployed chatbot instances across messaging/web platforms.
-- -----------------------------------------------------------------------------
CREATE TABLE chatbots (
    id                         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id                  uuid        REFERENCES clients(id) ON DELETE CASCADE,
    name                       text        NOT NULL,
    platform                   text        CHECK (platform IN ('whatsapp', 'web', 'instagram', 'email')),
    status                     text        DEFAULT 'active'
                                           CHECK (status IN ('active', 'paused', 'training')),
    messages_this_month        integer     DEFAULT 0,
    leads_captured_this_month  integer     DEFAULT 0,
    avg_response_time_seconds  integer,
    created_at                 timestamptz DEFAULT now()
);


-- -----------------------------------------------------------------------------
-- monthly_metrics
-- Aggregated KPIs per client per calendar month.
-- The UNIQUE constraint on (client_id, month) ensures one summary row per period.
-- -----------------------------------------------------------------------------
CREATE TABLE monthly_metrics (
    id                       uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id                uuid        REFERENCES clients(id) ON DELETE CASCADE,
    month                    date        NOT NULL,
    messages_total           integer     DEFAULT 0,
    leads_total              integer     DEFAULT 0,
    automations_executions   integer     DEFAULT 0,
    hours_saved_estimate     numeric(6,1) DEFAULT 0,
    created_at               timestamptz DEFAULT now(),
    UNIQUE (client_id, month)
);


-- -----------------------------------------------------------------------------
-- support_requests
-- Inbound support tickets created by the client from the portal.
-- Clients may SELECT their own tickets and INSERT new ones; no UPDATE/DELETE.
-- -----------------------------------------------------------------------------
CREATE TABLE support_requests (
    id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id  uuid        REFERENCES clients(id) ON DELETE CASCADE,
    subject    text        NOT NULL,
    message    text        NOT NULL,
    status     text        DEFAULT 'open'
                           CHECK (status IN ('open', 'in_progress', 'resolved')),
    created_at timestamptz DEFAULT now()
);


-- =============================================================================
-- INDEXES
-- Performance indexes supporting the RLS subqueries and common access patterns.
-- =============================================================================

-- clients: fast lookup of the client row from an auth UID
CREATE INDEX idx_clients_user_id
    ON clients(user_id);

-- automations: fetch all automations belonging to a client
CREATE INDEX idx_automations_client_id
    ON automations(client_id);

-- chatbots: fetch all chatbots belonging to a client
CREATE INDEX idx_chatbots_client_id
    ON chatbots(client_id);

-- monthly_metrics: range scans over time for a specific client
CREATE INDEX idx_monthly_metrics_client_month
    ON monthly_metrics(client_id, month);

-- support_requests: fetch tickets for a client ordered by creation time
CREATE INDEX idx_support_requests_client_id
    ON support_requests(client_id);


-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================
-- Strategy: every child table resolves the owning user_id through a correlated
-- subquery on clients.  The idx_clients_user_id index ensures this subquery
-- executes in O(1) for every policy evaluation.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- clients
-- A user may only see their own client record.
-- -----------------------------------------------------------------------------
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "clients_select_own"
    ON clients
    FOR SELECT
    USING (auth.uid() = user_id);


-- -----------------------------------------------------------------------------
-- automations
-- A user may only see automations that belong to their client record.
-- -----------------------------------------------------------------------------
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "automations_select_own"
    ON automations
    FOR SELECT
    USING (
        auth.uid() = (
            SELECT user_id
            FROM   clients
            WHERE  id = automations.client_id
        )
    );


-- -----------------------------------------------------------------------------
-- chatbots
-- A user may only see chatbots that belong to their client record.
-- -----------------------------------------------------------------------------
ALTER TABLE chatbots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chatbots_select_own"
    ON chatbots
    FOR SELECT
    USING (
        auth.uid() = (
            SELECT user_id
            FROM   clients
            WHERE  id = chatbots.client_id
        )
    );


-- -----------------------------------------------------------------------------
-- monthly_metrics
-- A user may only see metrics that belong to their client record.
-- -----------------------------------------------------------------------------
ALTER TABLE monthly_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "monthly_metrics_select_own"
    ON monthly_metrics
    FOR SELECT
    USING (
        auth.uid() = (
            SELECT user_id
            FROM   clients
            WHERE  id = monthly_metrics.client_id
        )
    );


-- -----------------------------------------------------------------------------
-- support_requests
-- SELECT  : own tickets only.
-- INSERT  : a user may create tickets only under their own client_id.
--           No UPDATE or DELETE is exposed to the client role.
-- -----------------------------------------------------------------------------
ALTER TABLE support_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "support_requests_select_own"
    ON support_requests
    FOR SELECT
    USING (
        auth.uid() = (
            SELECT user_id
            FROM   clients
            WHERE  id = support_requests.client_id
        )
    );

CREATE POLICY "support_requests_insert_own"
    ON support_requests
    FOR INSERT
    WITH CHECK (
        auth.uid() = (
            SELECT user_id
            FROM   clients
            WHERE  id = support_requests.client_id
        )
    );


-- =============================================================================
-- END OF SCHEMA
-- =============================================================================
