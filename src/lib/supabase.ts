import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase disabled – backend is handled by Spring Boot
export const supabase = null;


export type RuleGroup = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Rule = {
  id: string;
  rule_group_id: string | null;
  name: string;
  description: string | null;
  priority: number;
  is_active: boolean;
  version: number;
  effective_from: string;
  effective_to: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type RuleCondition = {
  id: string;
  rule_id: string;
  field_name: string;
  operator: string;
  value: any;
  logical_operator: string;
  condition_order: number;
  created_at: string;
};

export type RuleAction = {
  id: string;
  rule_id: string;
  action_type: string;
  action_config: any;
  action_order: number;
  created_at: string;
};

export type DecisionLog = {
  id: string;
  rule_id: string | null;
  input_data: any;
  matched: boolean;
  decision: string;
  actions_taken: any;
  execution_time_ms: number | null;
  metadata: any;
  created_at: string;
};

export type RuleVersion = {
  id: string;
  rule_id: string;
  version: number;
  rule_data: any;
  change_description: string | null;
  changed_by: string | null;
  created_at: string;
};
