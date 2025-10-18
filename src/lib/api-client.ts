/**
 * Enhanced API client with error handling, CSRF protection, and authentication
 * Based on approved Stage 6 plan
 */

type FetchOptions = RequestInit & {
  params?: Record<string, unknown>;
};

class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "APIError";
  }
}

export async function apiFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, headers: incomingHeaders, ...fetchOptions } = options;

  let urlWithParams = url;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      urlWithParams += `?${queryString}`;
    }
  }

  const csrfToken = typeof document !== "undefined" 
    ? document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")
    : null;

  const accessToken = typeof sessionStorage !== "undefined"
    ? sessionStorage.getItem("access_token")
    : null;

  const headers = new Headers(incomingHeaders as HeadersInit | undefined);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (csrfToken) {
    headers.set("X-CSRF-Token", csrfToken);
  }

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  try {
    const response = await fetch(urlWithParams, {
      ...fetchOptions,
      credentials: "include",
      headers,
    });

    if (response.status === 401) {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const encodedPath = encodeURIComponent(currentPath);
        window.location.href = `/login?redirect=${encodedPath}`;
      }
      throw new APIError("Unauthorized", 401);
    }

    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      throw new APIError(
        `Rate limit exceeded. ${retryAfter ? `Retry after ${retryAfter} seconds.` : ""}`,
        429,
        { retryAfter }
      );
    }

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      const errorBody: unknown = isJson ? await response.json() : undefined;
      const errorMessage =
        typeof errorBody === "object" &&
        errorBody !== null &&
        "message" in errorBody &&
        typeof (errorBody as { message: unknown }).message === "string"
          ? (errorBody as { message: string }).message
          : response.statusText;

      throw new APIError(errorMessage || `HTTP ${response.status}`, response.status, errorBody);
    }

    if (isJson) {
      return await response.json();
    }

    return (await response.text()) as unknown as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    throw new APIError(error instanceof Error ? error.message : "An unknown error occurred", 0);
  }
}

export { APIError };
