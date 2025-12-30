// import { RuleCondition } from './supabase';

// export const OPERATORS = {
//   EQUALS: 'equals',
//   NOT_EQUALS: 'not_equals',
//   GREATER_THAN: 'greater_than',
//   LESS_THAN: 'less_than',
//   GREATER_THAN_OR_EQUAL: 'greater_than_or_equal',
//   LESS_THAN_OR_EQUAL: 'less_than_or_equal',
//   CONTAINS: 'contains',
//   NOT_CONTAINS: 'not_contains',
//   STARTS_WITH: 'starts_with',
//   ENDS_WITH: 'ends_with',
//   IN: 'in',
//   NOT_IN: 'not_in',
//   IS_EMPTY: 'is_empty',
//   IS_NOT_EMPTY: 'is_not_empty',
// };

// export const ACTION_TYPES = {
//   APPROVE: 'approve',
//   REJECT: 'reject',
//   MODIFY: 'modify',
//   NOTIFY: 'notify',
//   LOG: 'log',
//   ESCALATE: 'escalate',
//   ASSIGN: 'assign',
//   CALCULATE: 'calculate',
// };

// export function evaluateCondition(
//   condition: RuleCondition,
//   inputData: any
// ): boolean {
//   const fieldValue = getNestedValue(inputData, condition.field_name);
//   const conditionValue = condition.value;

//   switch (condition.operator) {
//     case OPERATORS.EQUALS:
//       return fieldValue === conditionValue;
//     case OPERATORS.NOT_EQUALS:
//       return fieldValue !== conditionValue;
//     case OPERATORS.GREATER_THAN:
//       return Number(fieldValue) > Number(conditionValue);
//     case OPERATORS.LESS_THAN:
//       return Number(fieldValue) < Number(conditionValue);
//     case OPERATORS.GREATER_THAN_OR_EQUAL:
//       return Number(fieldValue) >= Number(conditionValue);
//     case OPERATORS.LESS_THAN_OR_EQUAL:
//       return Number(fieldValue) <= Number(conditionValue);
//     case OPERATORS.CONTAINS:
//       return String(fieldValue).includes(String(conditionValue));
//     case OPERATORS.NOT_CONTAINS:
//       return !String(fieldValue).includes(String(conditionValue));
//     case OPERATORS.STARTS_WITH:
//       return String(fieldValue).startsWith(String(conditionValue));
//     case OPERATORS.ENDS_WITH:
//       return String(fieldValue).endsWith(String(conditionValue));
//     case OPERATORS.IN:
//       return Array.isArray(conditionValue) && conditionValue.includes(fieldValue);
//     case OPERATORS.NOT_IN:
//       return Array.isArray(conditionValue) && !conditionValue.includes(fieldValue);
//     case OPERATORS.IS_EMPTY:
//       return fieldValue === null || fieldValue === undefined || fieldValue === '';
//     case OPERATORS.IS_NOT_EMPTY:
//       return fieldValue !== null && fieldValue !== undefined && fieldValue !== '';
//     default:
//       return false;
//   }
// }

// export function evaluateConditions(
//   conditions: RuleCondition[],
//   inputData: any
// ): boolean {
//   if (conditions.length === 0) return true;

//   const sortedConditions = [...conditions].sort(
//     (a, b) => a.condition_order - b.condition_order
//   );

//   let result = evaluateCondition(sortedConditions[0], inputData);

//   for (let i = 1; i < sortedConditions.length; i++) {
//     const condition = sortedConditions[i];
//     const conditionResult = evaluateCondition(condition, inputData);

//     if (condition.logical_operator === 'OR') {
//       result = result || conditionResult;
//     } else {
//       result = result && conditionResult;
//     }
//   }

//   return result;
// }

// function getNestedValue(obj: any, path: string): any {
//   return path.split('.').reduce((current, key) => current?.[key], obj);
// }

// export function formatOperatorLabel(operator: string): string {
//   return operator
//     .split('_')
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// }

// export function formatActionTypeLabel(actionType: string): string {
//   return actionType
//     .split('_')
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// }

// // import { post } from "./apiClient";

// // /**
// //  * ACTION TYPES (used by RuleBuilder UI)
// //  */
// // export const ACTION_TYPES = [
// //   {
// //     value: "APPROVE",
// //     label: "Approve",
// //     description: "Approve the request"
// //   },
// //   {
// //     value: "REJECT",
// //     label: "Reject",
// //     description: "Reject the request"
// //   },
// //   {
// //     value: "REVIEW",
// //     label: "Manual Review",
// //     description: "Send for manual review"
// //   }
// // ];

// // /**
// //  * Backend rule evaluation
// //  */
// // export async function evaluateRule(input: any) {
// //   return post<{ decision: string }>("/evaluate", input);
// // }

import { post } from "./apiClient";

/**
 * OPERATORS (used by RuleBuilder UI)
 */
export const OPERATORS = {
  GREATER_THAN: 'greater_than',
  LESS_THAN: 'less_than',
  GREATER_THAN_EQUAL: 'greater_than_equal',
  LESS_THAN_EQUAL: 'less_than_equal',
  EQUALS: 'equals',
};


/**
 * ACTION TYPES (used by RuleBuilder UI)
 */
export const ACTION_TYPES = {
  APPROVE: "approve",
  REJECT: "reject",
  MODIFY: "modify",
  NOTIFY: "notify",
  LOG: "log",
  ESCALATE: "escalate",
  ASSIGN: "assign",
  CALCULATE: "calculate",
};

/**
 * BACKEND RULE EVALUATION
 * (This replaces frontend evaluation)
 */
export async function evaluateRule(input: any) {
  return post("/api/engine/evaluate", input);
}



/**
 * OPTIONAL: UI formatting helpers (KEEP)
 */
export function formatOperatorLabel(operator: string): string {
  return operator
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatActionTypeLabel(actionType: string): string {
  return actionType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


