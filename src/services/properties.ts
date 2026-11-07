import type { Property } from "@/types/property";

// In development, Vite forwards /api to the backend (see vite.config.ts).
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

const getJson = async <T,>(path: string): Promise<T> => {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
};

export const fetchProperties = async (query?: string): Promise<Property[]> => {
  const params = query ? `?${new URLSearchParams({ neighborhood: query })}` : "";
  return getJson<Property[]>(`/listings${params}`);
};

export const fetchPropertyById = async (id: string): Promise<Property | null> => {
  const res = await fetch(`${API_BASE}/listings/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<Property>;
};
