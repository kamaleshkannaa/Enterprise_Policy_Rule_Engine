const API = "http://localhost:8080/api";

// export async function createCondition(condition: any) {
//   const res = await fetch(`${API}/conditions`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       ruleId: condition.ruleId,
//       fieldName: condition.fieldName,
//       operator: condition.operator,
//       fieldValue: condition.fieldValue,
//     }),
//   });

//   if (!res.ok) throw await res.json();
//   return res.json();
// }

import { post, del, get } from "./apiClient";

export async function createCondition(ruleId: number, condition: any) {
  const res = await fetch(`${API}/rules/${ruleId}/conditions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(condition),
  });

  if (!res.ok) throw await res.json();
  return res.json();
}
export const getConditionsByRule = (ruleId: number) => {
  return get(`/rules/${ruleId}/conditions`);
};

export const deleteCondition = (id: number, ruleId: number) => {
  return del(`/rules/${ruleId}/conditions/${id}`);
};

