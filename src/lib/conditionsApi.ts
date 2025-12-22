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
// src/lib/conditionsApi.ts
// src/lib/conditionsApi.ts
const BACKEND = "http://localhost:8080/api";

export async function createCondition(ruleId: number, condition: any) {
  const res = await fetch(`${BACKEND}/rules/${ruleId}/conditions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(condition),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("createCondition error:", res.status, text);
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function getConditionsByRule(ruleId: number) {
  const res = await fetch(`${BACKEND}/rules/${ruleId}/conditions`, {
    method: "GET",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function deleteCondition(id: number, ruleId: number) {
  const res = await fetch(`${BACKEND}/rules/${ruleId}/conditions/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
}



