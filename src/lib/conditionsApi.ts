const API = "http://localhost:8080/api";

export async function createCondition(condition: any) {
  const res = await fetch(`${API}/conditions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(condition),
  });

  if (!res.ok) throw await res.json();
  return res.json();
}
