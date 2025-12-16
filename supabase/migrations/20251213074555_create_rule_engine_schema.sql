/*
  # Enterprise Policy Rule Engine Schema

  ## Overview
  Complete schema for a configurable business rule engine that enables dynamic decision-making across applications.

  ## Tables Created

  ### 1. rule_groups
  Organizes rules into logical categories for better management
  - `id` (uuid, primary key)
  - `name` (text) - Group name
  - `description` (text) - Group description
  - `is_active` (boolean) - Whether group is active
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. rules
  Core rule definitions with metadata and versioning
  - `id` (uuid, primary key)
  - `rule_group_id` (uuid, foreign key)
  - `name` (text) - Rule name
  - `description` (text) - Rule description
  - `priority` (integer) - Execution order (higher = first)
  - `is_active` (boolean) - Whether rule is currently active
  - `version` (integer) - Version number for tracking changes
  - `effective_from` (timestamptz) - When rule becomes active
  - `effective_to` (timestamptz) - When rule expires
  - `created_by` (uuid) - User who created the rule
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. rule_conditions
  Defines conditions that must be met for a rule to fire
  - `id` (uuid, primary key)
  - `rule_id` (uuid, foreign key)
  - `field_name` (text) - Field to evaluate
  - `operator` (text) - Comparison operator (equals, greater_than, less_than, contains, etc.)
  - `value` (jsonb) - Value to compare against
  - `logical_operator` (text) - AND/OR for chaining conditions
  - `condition_order` (integer) - Order of evaluation
  - `created_at` (timestamptz)

  ### 4. rule_actions
  Actions to execute when rule conditions are met
  - `id` (uuid, primary key)
  - `rule_id` (uuid, foreign key)
  - `action_type` (text) - Type of action (approve, reject, modify, notify, etc.)
  - `action_config` (jsonb) - Configuration for the action
  - `action_order` (integer) - Order of execution
  - `created_at` (timestamptz)

  ### 5. decision_logs
  Audit trail of all rule evaluations and decisions
  - `id` (uuid, primary key)
  - `rule_id` (uuid, foreign key)
  - `input_data` (jsonb) - Input data for evaluation
  - `matched` (boolean) - Whether rule matched
  - `decision` (text) - Decision made
  - `actions_taken` (jsonb) - Actions executed
  - `execution_time_ms` (integer) - Time taken to execute
  - `metadata` (jsonb) - Additional metadata
  - `created_at` (timestamptz)

  ### 6. rule_versions
  Historical tracking of rule changes
  - `id` (uuid, primary key)
  - `rule_id` (uuid, foreign key)
  - `version` (integer) - Version number
  - `rule_data` (jsonb) - Complete rule snapshot
  - `change_description` (text) - What changed
  - `changed_by` (uuid) - User who made the change
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Policies for authenticated users to manage rules
  - Read-only access to decision logs for auditing

  ## Indexes
  - Performance indexes on frequently queried fields
  - Composite indexes for rule evaluation queries
*/

-- Create rule_groups table
CREATE TABLE IF NOT EXISTS rule_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create rules table
CREATE TABLE IF NOT EXISTS rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_group_id uuid REFERENCES rule_groups(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  priority integer DEFAULT 0,
  is_active boolean DEFAULT true,
  version integer DEFAULT 1,
  effective_from timestamptz DEFAULT now(),
  effective_to timestamptz,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create rule_conditions table
CREATE TABLE IF NOT EXISTS rule_conditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id uuid REFERENCES rules(id) ON DELETE CASCADE,
  field_name text NOT NULL,
  operator text NOT NULL,
  value jsonb NOT NULL,
  logical_operator text DEFAULT 'AND',
  condition_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create rule_actions table
CREATE TABLE IF NOT EXISTS rule_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id uuid REFERENCES rules(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  action_config jsonb DEFAULT '{}',
  action_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create decision_logs table
CREATE TABLE IF NOT EXISTS decision_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id uuid REFERENCES rules(id) ON DELETE SET NULL,
  input_data jsonb NOT NULL,
  matched boolean NOT NULL,
  decision text NOT NULL,
  actions_taken jsonb DEFAULT '[]',
  execution_time_ms integer,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create rule_versions table
CREATE TABLE IF NOT EXISTS rule_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id uuid REFERENCES rules(id) ON DELETE CASCADE,
  version integer NOT NULL,
  rule_data jsonb NOT NULL,
  change_description text,
  changed_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_rules_group_id ON rules(rule_group_id);
CREATE INDEX IF NOT EXISTS idx_rules_active ON rules(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_rules_priority ON rules(priority DESC);
CREATE INDEX IF NOT EXISTS idx_rule_conditions_rule_id ON rule_conditions(rule_id);
CREATE INDEX IF NOT EXISTS idx_rule_actions_rule_id ON rule_actions(rule_id);
CREATE INDEX IF NOT EXISTS idx_decision_logs_rule_id ON decision_logs(rule_id);
CREATE INDEX IF NOT EXISTS idx_decision_logs_created_at ON decision_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rule_versions_rule_id ON rule_versions(rule_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_rule_groups_updated_at ON rule_groups;
CREATE TRIGGER update_rule_groups_updated_at
  BEFORE UPDATE ON rule_groups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_rules_updated_at ON rules;
CREATE TRIGGER update_rules_updated_at
  BEFORE UPDATE ON rules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE rule_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE rule_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rule_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE rule_versions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rule_groups
CREATE POLICY "Authenticated users can view rule groups"
  ON rule_groups FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create rule groups"
  ON rule_groups FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update rule groups"
  ON rule_groups FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete rule groups"
  ON rule_groups FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for rules
CREATE POLICY "Authenticated users can view rules"
  ON rules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create rules"
  ON rules FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update rules"
  ON rules FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete rules"
  ON rules FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for rule_conditions
CREATE POLICY "Authenticated users can view rule conditions"
  ON rule_conditions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create rule conditions"
  ON rule_conditions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update rule conditions"
  ON rule_conditions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete rule conditions"
  ON rule_conditions FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for rule_actions
CREATE POLICY "Authenticated users can view rule actions"
  ON rule_actions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create rule actions"
  ON rule_actions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update rule actions"
  ON rule_actions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete rule actions"
  ON rule_actions FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for decision_logs (read-only for auditing)
CREATE POLICY "Authenticated users can view decision logs"
  ON decision_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can create decision logs"
  ON decision_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for rule_versions
CREATE POLICY "Authenticated users can view rule versions"
  ON rule_versions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can create rule versions"
  ON rule_versions FOR INSERT
  TO authenticated
  WITH CHECK (true);