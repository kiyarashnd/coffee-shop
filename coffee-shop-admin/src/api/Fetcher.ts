import _ from 'lodash';
import { NextResponse } from 'next/server';

export type CommonResponse = {
  toast?: string;
};

export class Fetcher<R, ErrorR = CommonResponse> {
  private readonly input: RequestInfo | URL;
  // Make init mutable so we can update headers with the new access token.
  private init?: RequestInit;
  private _onNot200: ((errorResponse: ErrorR) => void) | undefined = undefined;

  constructor(input: RequestInfo | URL, init?: RequestInit) {
    // Retrieve the access token from sessionStorage (or use your preferred client storage)
    let accessToken = '';
    if (typeof window !== 'undefined') {
      accessToken = sessionStorage.getItem('accessToken') || '';
    }

    const defaultHeadersInit: HeadersInit = {
      // 'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    // Configure the request to include credentials so cookies (the HTTP-only refresh token) are sent.
    const defaultReqInit: RequestInit = {
      mode: 'cors',
      credentials: 'include',
      headers: defaultHeadersInit,
    };

    this.input = input;
    this.init = { ...defaultReqInit, ...init };
  }

  async enq(): Promise<R> {
    // First, execute the API call.
    let response = await fetch(this.input, this.init);

    // If the response is unauthorized (401) or forbidden (403), attempt a token refresh.
    if (response.status === 401 || response.status === 403) {
      // If we’re already on the login page, let the error propagate so the login component can display a toast.
      if (
        typeof window !== 'undefined' &&
        (window.location.pathname === '/login' ||
          window.location.pathname === '/signup')
      ) {
        const jsonBody = await response?.json();
        if (this._onNot200) {
          this._onNot200(jsonBody as ErrorR);
        }
        return Promise.reject(jsonBody);
      }

      // Attempt to refresh the access token.
      const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      try {
        const refreshResponse = await fetch(
          `${BASE_URL}/api/auth/refresh-token`,
          {
            method: 'GET',
            credentials: 'include', // Sends the HTTP-only refresh token automatically.
          }
        );

        if (refreshResponse.ok) {
          // If refresh succeeds, get the new access token from the response.
          const refreshData = await refreshResponse.json();
          const newToken = refreshData.accessToken; // Adjust based on your refresh endpoint response structure.
          if (newToken && typeof window !== 'undefined') {
            sessionStorage.setItem('accessToken', newToken);
            // Update the Authorization header for subsequent requests.
            if (this.init && this.init.headers) {
              // Assume headers is an object.
              const currentHeaders = this.init.headers as Record<
                string,
                string
              >;
              this.init.headers = {
                ...currentHeaders,
                Authorization: `Bearer ${newToken}`,
              };
            }
          }
          // Retry the original request with the updated access token.
          response = await fetch(this.input, this.init);
        } else {
          // If the refresh fails (e.g. refresh token expired)
          const refreshBody = await refreshResponse?.json();
          if (this._onNot200) {
            this._onNot200(refreshBody as ErrorR);
          }
          // Redirect user to login page if not already there.
          if (
            typeof window !== 'undefined' &&
            !['/login', '/signup'].includes(window.location.pathname)
          ) {
            window.location.href = '/login';
          }
          return Promise.reject(refreshBody);
        }
      } catch (refreshError) {
        console.error('Error during token refresh:', refreshError);
        // Redirect to login on network or other refresh errors.
        if (
          typeof window !== 'undefined' &&
          !['/login', '/signup'].includes(window.location.pathname)
        ) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // Process the JSON response.
    const jsonBody = await response?.json();

    // Optionally, handle any toast messages returned from the server.
    if (!_.isEmpty((jsonBody as CommonResponse)?.toast)) {
      console.log(
        'jsonBody as CommonResponse is : ',
        jsonBody as CommonResponse
      );
      if (response.ok) {
        // e.g., toast.success((jsonBody as CommonResponse).toast);
      } else {
        // e.g., toast.error((jsonBody as CommonResponse).toast);
      }
    }

    if (response.ok) {
      return jsonBody as R;
    }

    // If not OK and a callback is defined, invoke it.
    if (this._onNot200) {
      this._onNot200(jsonBody as ErrorR);
    }

    return Promise.reject(jsonBody);
  }

  onNot200(callback: (errorResponse: ErrorR) => void): Fetcher<R, ErrorR> {
    this._onNot200 = callback;
    return this;
  }
}
