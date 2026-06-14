const API_BASE =
  process.env.NEXT_PUBLIC_MENTOR_API_URL || "http://127.0.0.1:8000";

const API_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY;

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = {
    ...options.headers,
    "X-API-Key": API_KEY || "",
  };

  return fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });
}
