// Allow overriding the backend URL via Vite env variable `VITE_API_BASE`.
// Example in development: VITE_API_BASE=http://localhost:3000
const BACKEND_URL = (import.meta.env && import.meta.env.VITE_API_BASE) || "https://api.ccai2026.com";
const API_BASE = `${BACKEND_URL.replace(/\/$/, "")}/api`;

const CACHE_DURATION = 5 * 60 * 1000;
const apiCache = new Map<string, { data: unknown; timestamp: number }>();

type ApiOptions = RequestInit & { isFormData?: boolean };

async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { isFormData, headers, ...requestOptions } = options;
  const url = `${API_BASE}${path}`;
  if (import.meta.env && import.meta.env.DEV) {
    // Helpful debug logging in dev when debugging API issues
    // eslint-disable-next-line no-console
    console.debug("API request:", { url, options: requestOptions, isFormData, headers });
  }

  const response = await fetch(url, {
    ...requestOptions,
    headers: isFormData
      ? (headers as HeadersInit)
      : {
          "Content-Type": "application/json",
          ...(headers as Record<string, string>),
        },
  });

  const text = await response.text();
  let data: Record<string, unknown> | string | null = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      (typeof data === "object" && data && (data.message || data.error)) ||
      response.statusText ||
      "API request failed";
    throw Object.assign(new Error(String(message)), { response: { status: response.status, data } });
  }

  if (import.meta.env && import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("API response:", { url, status: response.status, data });
  }

  return (data as T) ?? ({} as T);
}

async function cached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cachedValue = apiCache.get(key);
  if (cachedValue && Date.now() - cachedValue.timestamp < CACHE_DURATION) {
    return cachedValue.data as T;
  }

  const data = await fetcher();
  apiCache.set(key, { data, timestamp: Date.now() });
  return data;
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
};

export const clearApiCache = () => apiCache.clear();

export const getConferenceLoginDetails = async () => {
  const hostname = window.location.hostname.replace(/^www\./, "");
  const conferenceUrl =
    hostname === "localhost" || hostname === "127.0.0.1" ? "wcmae.com" : hostname;
  return cached(`login_${conferenceUrl}`, () =>
    apiRequest<unknown>(`/fetch/login-details/conference-url/${conferenceUrl}`),
  );
};

export const getImportantDetailsByShortName = async (shortName: string) =>
  cached(`important_${shortName}`, () =>
    apiRequest<unknown>(`/fetch/important-details/shortname/${shortName}`),
  );

export const getCallForAbstractsByUser = async (userId: string) => {
  try {
    return await cached(`abstracts_${userId}`, () =>
      apiRequest<unknown[]>(`/fetch/call-for-abstracts/user/${userId}`),
    );
  } catch {
    return [];
  }
};

export const getMembersByUser = async (username: string) => {
  try {
    return await cached(`members_${username}`, () =>
      apiRequest<unknown[]>(`/fetch/members/user/${username}`),
    );
  } catch {
    return [];
  }
};

export const getFAQData = async (shortName: string) => {
  try {
    return await cached(`faq_${shortName}`, () =>
      apiRequest<unknown[]>(`/fetch/faq/shortname/${shortName}`),
    );
  } catch {
    return [];
  }
};

export const getVenueInfo = async (shortName: string) => {
  try {
    return await cached(`venue_${shortName}`, () =>
      apiRequest<unknown>(`/fetch/venue/shortname/${shortName}`),
    );
  } catch {
    return null;
  }
};

export interface RegistrationData {
  conf: string;
  category: string;
  amount: number;
  currency: string;
  description: string;
  paymentProvider: string;
  successUrl: string;
  cancelUrl: string;
  user: string;
  title?: string;
  name?: string;
  email?: string;
  phone?: string;
  org?: string;
  country?: string;
  [key: string]: unknown;
}

export const submitRegistration = async (registrationData: RegistrationData) =>
  apiRequest<unknown>("/register", {
    method: "POST",
    body: JSON.stringify(registrationData),
  });

export const createStripePaymentIntent = async (paymentData: RegistrationData) =>
  apiRequest<Record<string, unknown>>("/payment/stripe/register", {
    method: "POST",
    body: JSON.stringify(paymentData),
  });

export const createPaypalPayment = async (paymentData: RegistrationData) =>
  apiRequest<Record<string, unknown>>("/payment/paypal/register", {
    method: "POST",
    body: JSON.stringify(paymentData),
  });

export const submitAbstract = async (formData: FormData) =>
  apiRequest<Record<string, unknown>>("/abstract/submit", {
    method: "POST",
    body: formData,
    isFormData: true,
  });

export const checkAbstractStatus = async (submissionId: string) =>
  apiRequest<Record<string, unknown>>(`/abstract-status/${submissionId}`);

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  user: string;
  inquiry_type?: string;
  [key: string]: unknown;
};

export const submitContact = async (contactData: ContactPayload) =>
  apiRequest<Record<string, unknown>>("/contact-us", {
    method: "POST",
    body: JSON.stringify(contactData),
  });

export const submitContactForm = submitContact;

export const subscribe = async (subscribeData: {
  email: string;
  category: string;
  user: string;
}) => {
  try {
    return await apiRequest<Record<string, unknown>>("/subscribe", {
      method: "POST",
      body: JSON.stringify(subscribeData),
    });
  } catch {
    return submitContactForm({
      user: subscribeData.user,
      name: "Newsletter Subscriber",
      email: subscribeData.email,
      phone: "",
      subject: "Newsletter subscription",
      message: `Please subscribe ${subscribeData.email} to ${subscribeData.category} updates.`,
      inquiry_type: "newsletter",
    });
  }
};
