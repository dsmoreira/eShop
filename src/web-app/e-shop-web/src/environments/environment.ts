declare global {
  interface Window {
    __env: {
      apiUrl: string | null;
      basketApiUrl: string | null;
      orderingApiUrl: string | null;
      identityApiUrl: string | null;
    };
  }
}

// Determine API URLs from environment variables or window.__env
// This allows configuration from both server-side (environment variables) and client-side (window.__env)
const getApiUrl = () => {
  if (typeof window !== 'undefined' && window.__env && window.__env.apiUrl) {
    return window.__env.apiUrl;
  }
  return typeof process !== 'undefined' ? process.env['API_URL'] : null;
};

const getBasketApiUrl = () => {
  if (typeof window !== 'undefined' && window.__env && window.__env.basketApiUrl) {
    return window.__env.basketApiUrl;
  }
  return typeof process !== 'undefined' ? process.env['BASKET_API_URL'] : null;
};

const getOrderingApiUrl = () => {
  if (typeof window !== 'undefined' && window.__env && window.__env.orderingApiUrl) {
    return window.__env.orderingApiUrl;
  }
  return typeof process !== 'undefined' ? process.env['ORDERING_API_URL'] : null;
};

const getIdentityApiUrl = () => {
  if (typeof window !== 'undefined' && window.__env && window.__env.identityApiUrl) {
    return window.__env.identityApiUrl;
  }
  return typeof process !== 'undefined' ? process.env['IDENTITY_API_URL'] : null;
};

export const environment = {
  production: false,
  apiUrl: getApiUrl(),
  basketApiUrl: getBasketApiUrl(),
  orderingApiUrl: getOrderingApiUrl(),
  identityApiUrl: getIdentityApiUrl()
}; 