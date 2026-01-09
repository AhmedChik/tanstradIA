// Helper small API wrapper for frontend
// Use relative paths when Vite proxy is enabled (recommended).
// If you prefer absolute URLs, set VITE_API_PROXY in the environment and the helper will use it.

const API_BASE = import.meta.env.VITE_API_PROXY || "";

type ApiError = { status: number; data: unknown };

function isApiError(v: unknown): v is ApiError {
  return typeof v === "object" && v !== null && "status" in v && typeof (v as Record<string, unknown>).status === "number";
}

export function setToken(token: string, remember = true) {
  try {
    if (remember) {
      localStorage.setItem("access_token", token);
    } else {
      sessionStorage.setItem("access_token", token);
    }
  } catch (e) {
    // ignore storage errors
    // eslint-disable-next-line no-console
    console.warn("Failed to persist token", e);
  }
}

export function getToken(): string | null {
  return localStorage.getItem("access_token") || sessionStorage.getItem("access_token") || null;
}

export function clearToken() {
  localStorage.removeItem("access_token");
  sessionStorage.removeItem("access_token");
}

async function request<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  const url = API_BASE ? `${API_BASE}${path}` : path;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "omit",
  });

  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw { status: res.status, data } as ApiError;
    return data as T;
  } catch (err) {
    if (isApiError(err)) throw err;
    throw { status: res.status, data: text } as ApiError;
  }
}

export function apiGet<T = unknown>(path: string) {
  return request<T>(path, { method: "GET" });
}

export function apiPost<T = unknown>(path: string, body: unknown) {
  return request<T>(path, { method: "POST", body: JSON.stringify(body) });
}

// Example: auth helper
export async function login(email: string, password: string) {
  return apiPost<{ access_token: string; user: unknown }>("/api/auth/login", { email, password });
}

export async function register(email: string, password: string) {
  return apiPost<{ message?: string; error?: string }>("/api/auth/register", { email, password });
}
