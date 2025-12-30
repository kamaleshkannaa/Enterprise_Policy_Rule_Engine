
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


const API_BASE = import.meta.env.VITE_API_BASE_URL;

/**
 * CREATE condition
 */
export async function createCondition(ruleId: number, condition: any) {
  const res = await fetch(
    `${API_BASE}/api/rules/${ruleId}/conditions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(condition),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  return res.json();
}

/**
 * GET conditions by rule
 */
export async function getConditionsByRule(ruleId: number) {
  const res = await fetch(
    `${API_BASE}/api/rules/${ruleId}/conditions`
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  return res.json();
}

/**
 * ✅ DELETE condition (THIS WAS WRONG EARLIER)
 */
export async function deleteCondition(
  ruleId: number,
  conditionId: number
) {
  const res = await fetch(
    `${API_BASE}/api/rules/${ruleId}/conditions/${conditionId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  return res.text(); // backend returns plain text
}



