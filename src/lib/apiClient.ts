// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
// const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export interface EvaluateRulesRequest {
//   inputData: Record<string, any>;
//   ruleGroupId?: string;
//   metadata?: Record<string, any>;
// }

// export interface EvaluateRulesResponse {
//   matched: boolean;
//   rule?: {
//     id: string;
//     name: string;
//     priority: number;
//   };
//   decision: string;
//   actions: Array<{
//     type: string;
//     config: any;
//   }>;
//   executionTime: number;
// }

// export class RuleEngineClient {
//   private baseUrl: string;
//   private apiKey: string;

//   constructor(baseUrl: string = SUPABASE_URL, apiKey: string = SUPABASE_ANON_KEY) {
//     this.baseUrl = baseUrl;
//     this.apiKey = apiKey;
//   }

//   async evaluateRules(request: EvaluateRulesRequest): Promise<EvaluateRulesResponse> {
//     const response = await fetch(
//       `${this.baseUrl}/functions/v1/evaluate-rules`,
//       {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.apiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(request),
//       }
//     );

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.error || 'Failed to evaluate rules');
//     }

//     return response.json();
//   }
// }

// const API_BASE = 'http://localhost:8080/api';

// async function handleResponse(res: Response) {
//   if (!res.ok) {
//     let error;
//     try {
//       error = await res.json();
//     } catch {
//       error = { message: res.statusText };
//     }
//     throw error;
//   }
//   return res.json();
// }

// /* =========================
//    GET
// ========================= */
// export async function get(path: string) {
//   const res = await fetch(`${API_BASE}${path}`, {
//     method: 'GET',
//   });
//   return handleResponse(res);
// }

// /* =========================
//    POST
// ========================= */
// export async function post(path: string, body: any) {
//   const res = await fetch(`${API_BASE}${path}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   });
//   return handleResponse(res);
// }

// /* =========================
//    PUT
// ========================= */
// export async function put(path: string, body: any) {
//   const res = await fetch(`${API_BASE}${path}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   });
//   return handleResponse(res);
// }

// /* =========================
//    DELETE
// ========================= */
// export async function del(path: string) {
//   const res = await fetch(`${API_BASE}${path}`, {
//     method: 'DELETE',
//   });
//   return handleResponse(res);
// }



// src/lib/apiClient.ts

const API_BASE = "http://localhost:8080/api";

async function handleResponse(res: Response) {
  if (!res.ok) {
    let error;
    try {
      error = await res.json();
    } catch {
      error = { message: res.statusText };
    }
    throw error;
  }
  return res.json();
}

/* =========================
   GET
========================= */
export async function get(path: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
  });
  return handleResponse(res);
}

/* =========================
   POST
========================= */
export async function post(path: string, body: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

/* =========================
   PUT
========================= */
export async function put(path: string, body: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

/* =========================
   DELETE
========================= */
export async function del(path: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}


