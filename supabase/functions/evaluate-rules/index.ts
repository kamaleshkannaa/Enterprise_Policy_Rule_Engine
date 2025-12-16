import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface RuleCondition {
  id: string;
  rule_id: string;
  field_name: string;
  operator: string;
  value: any;
  logical_operator: string;
  condition_order: number;
}

interface RuleAction {
  id: string;
  rule_id: string;
  action_type: string;
  action_config: any;
  action_order: number;
}

interface Rule {
  id: string;
  name: string;
  priority: number;
  is_active: boolean;
  effective_from: string;
  effective_to: string | null;
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function evaluateCondition(condition: RuleCondition, inputData: any): boolean {
  const fieldValue = getNestedValue(inputData, condition.field_name);
  const conditionValue = condition.value;

  switch (condition.operator) {
    case 'equals':
      return fieldValue === conditionValue;
    case 'not_equals':
      return fieldValue !== conditionValue;
    case 'greater_than':
      return Number(fieldValue) > Number(conditionValue);
    case 'less_than':
      return Number(fieldValue) < Number(conditionValue);
    case 'greater_than_or_equal':
      return Number(fieldValue) >= Number(conditionValue);
    case 'less_than_or_equal':
      return Number(fieldValue) <= Number(conditionValue);
    case 'contains':
      return String(fieldValue).includes(String(conditionValue));
    case 'not_contains':
      return !String(fieldValue).includes(String(conditionValue));
    case 'starts_with':
      return String(fieldValue).startsWith(String(conditionValue));
    case 'ends_with':
      return String(fieldValue).endsWith(String(conditionValue));
    case 'in':
      return Array.isArray(conditionValue) && conditionValue.includes(fieldValue);
    case 'not_in':
      return Array.isArray(conditionValue) && !conditionValue.includes(fieldValue);
    case 'is_empty':
      return fieldValue === null || fieldValue === undefined || fieldValue === '';
    case 'is_not_empty':
      return fieldValue !== null && fieldValue !== undefined && fieldValue !== '';
    default:
      return false;
  }
}

function evaluateConditions(conditions: RuleCondition[], inputData: any): boolean {
  if (conditions.length === 0) return true;

  const sortedConditions = [...conditions].sort(
    (a, b) => a.condition_order - b.condition_order
  );

  let result = evaluateCondition(sortedConditions[0], inputData);

  for (let i = 1; i < sortedConditions.length; i++) {
    const condition = sortedConditions[i];
    const conditionResult = evaluateCondition(condition, inputData);

    if (condition.logical_operator === 'OR') {
      result = result || conditionResult;
    } else {
      result = result && conditionResult;
    }
  }

  return result;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (req.method === 'POST') {
      const { inputData, ruleGroupId, metadata } = await req.json();

      if (!inputData) {
        return new Response(
          JSON.stringify({ error: 'inputData is required' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const startTime = performance.now();

      let rulesQuery = supabase
        .from('rules')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: false });

      if (ruleGroupId) {
        rulesQuery = rulesQuery.eq('rule_group_id', ruleGroupId);
      }

      const { data: rules, error: rulesError } = await rulesQuery;

      if (rulesError) throw rulesError;

      const now = new Date();
      const activeRules = (rules || []).filter((rule: Rule) => {
        const effectiveFrom = new Date(rule.effective_from);
        const effectiveTo = rule.effective_to ? new Date(rule.effective_to) : null;
        return effectiveFrom <= now && (!effectiveTo || effectiveTo >= now);
      });

      for (const rule of activeRules) {
        const [conditionsRes, actionsRes] = await Promise.all([
          supabase
            .from('rule_conditions')
            .select('*')
            .eq('rule_id', rule.id)
            .order('condition_order'),
          supabase
            .from('rule_actions')
            .select('*')
            .eq('rule_id', rule.id)
            .order('action_order'),
        ]);

        const conditions = conditionsRes.data || [];
        const actions = actionsRes.data || [];

        const matched = evaluateConditions(conditions, inputData);

        if (matched) {
          const endTime = performance.now();
          const executionTime = Math.round(endTime - startTime);

          const actionResults = actions.map((action: RuleAction) => ({
            type: action.action_type,
            config: action.action_config,
          }));

          await supabase.from('decision_logs').insert([
            {
              rule_id: rule.id,
              input_data: inputData,
              matched: true,
              decision: 'Rule Matched',
              actions_taken: actionResults,
              execution_time_ms: executionTime,
              metadata: metadata || {},
            },
          ]);

          return new Response(
            JSON.stringify({
              matched: true,
              rule: {
                id: rule.id,
                name: rule.name,
                priority: rule.priority,
              },
              decision: 'Rule Matched',
              actions: actionResults,
              executionTime,
            }),
            {
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
      }

      const endTime = performance.now();
      const executionTime = Math.round(endTime - startTime);

      await supabase.from('decision_logs').insert([
        {
          rule_id: null,
          input_data: inputData,
          matched: false,
          decision: 'No Rule Matched',
          actions_taken: [],
          execution_time_ms: executionTime,
          metadata: metadata || {},
        },
      ]);

      return new Response(
        JSON.stringify({
          matched: false,
          decision: 'No Rule Matched',
          actions: [],
          executionTime,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error evaluating rules:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});