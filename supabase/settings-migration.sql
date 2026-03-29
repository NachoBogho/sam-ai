-- Migration: add optional profile fields to clients
-- Run this in the Supabase SQL Editor

ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS phone    text,
  ADD COLUMN IF NOT EXISTS website  text,
  ADD COLUMN IF NOT EXISTS industry text;
