
// const BACKEND = "http://localhost:8080/api";

// export async function createCondition(ruleId: number, condition: any) {
//   const res = await fetch(`${BACKEND}/rules/${ruleId}/conditions`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(condition),
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     console.error("createCondition error:", res.status, text);
//     throw new Error(text || `HTTP ${res.status}`);
//   }
//   return res.json();
// }

// export async function getConditionsByRule(ruleId: number) {
//   const res = await fetch(`${BACKEND}/rules/${ruleId}/conditions`, {
//     method: "GET",
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(text || `HTTP ${res.status}`);
//   }
//   return res.json();
// }

// export async function deleteCondition(id: number, ruleId: number) {
//   const res = await fetch(`${BACKEND}/rules/${ruleId}/conditions/${id}`, {
//     method: "DELETE",
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(text || `HTTP ${res.status}`);
//   }
// }


import { get, post, del } from "./apiClient";

/**
 * CREATE a condition for a rule
 */
export async function createCondition(ruleId: number, condition: {
  fieldName: string;
  operator: string;
  fieldValue: string;
}) {
  return post(`/api/rules/${ruleId}/conditions`, condition);
}

/**
 * GET all conditions for a rule
 */
export async function getConditionsByRule(ruleId: number) {
  return get(`/api/rules/${ruleId}/conditions`);
}

/**
 * DELETE a condition
 */
export async function deleteCondition(ruleId: number, conditionId: number) {
  return del(`/api/rules/${ruleId}/conditions/${conditionId}`);
}


