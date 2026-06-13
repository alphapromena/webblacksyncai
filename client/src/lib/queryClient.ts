import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Optional: when set, lead form submissions POST directly to this URL
// (e.g. a GoHighLevel Inbound Webhook, Zapier Catch Hook, or Make.com webhook)
// instead of the Express /api backend. This lets the forms work on a static
// host (GitHub Pages / Vercel static) with no server. Set it in Vercel project
// env vars (and .env locally) as VITE_LEADS_WEBHOOK_URL.
const LEADS_WEBHOOK_URL = import.meta.env.VITE_LEADS_WEBHOOK_URL as
  | string
  | undefined;

const LEAD_ENDPOINTS = ["/api/leads", "/api/enterprise-leads"];

// Normalize a lead payload so CRMs that expect first/last name + email + phone
// (like GoHighLevel "Create Contact") map cleanly regardless of which form sent it.
function normalizeLead(url: string, data: any) {
  const d = { ...(data ?? {}) };
  if (d.name && !d.firstName) {
    const parts = String(d.name).trim().split(/\s+/);
    d.firstName = parts[0];
    d.lastName = parts.slice(1).join(" ") || undefined;
  }
  d.fullName = d.name ?? [d.firstName, d.lastName].filter(Boolean).join(" ");
  d.source = "blacksync.ai";
  d.formType = url.includes("enterprise") ? "enterprise" : "lead";
  d.submittedAt = new Date().toISOString();
  return d;
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Route lead submissions to the CRM webhook when configured (static-host friendly).
  if (
    LEADS_WEBHOOK_URL &&
    method.toUpperCase() === "POST" &&
    LEAD_ENDPOINTS.includes(url)
  ) {
    await fetch(LEADS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalizeLead(url, data)),
      // no-cors: webhook providers don't return CORS headers; the POST still
      // delivers. We can't read the response, so we treat delivery as success.
      mode: "no-cors",
    });
    return new Response(null, { status: 200 });
  }

  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
