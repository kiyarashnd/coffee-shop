import _ from 'lodash';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import moment from 'moment';
import router from 'next/router';

export class Fetcher<R, ErrorR = CommonResponse> {
  private readonly input: RequestInfo | URL;
  private readonly init?: RequestInit;

  private _onNot200: ((errorResponse: ErrorR) => void) | undefined = undefined;

  constructor(input: RequestInfo | URL, init?: RequestInit) {
    const accessToken = localStorage.getItem('accessToken') as string;

    const defaultHeadersInit: HeadersInit = {
      'Content-Type': 'application/json',
      ...(_.isEmpty(accessToken)
        ? {}
        : { Authorization: `Bearer ${accessToken}` }),
    };

    var defaultReqInit: RequestInit = {
      mode: 'cors',
      headers: defaultHeadersInit,
    };

    this.input = input;
    this.init = { ...defaultReqInit, ...init };
  }

  async enq(): Promise<R> {
    // console.log("Fetching with headers:", this.init);
    const response = await fetch(this.input, this.init);
    const jsonBody = await response.json();

    if (!_.isEmpty((jsonBody as CommonResponse)?.toast)) {
      if (response.ok) {
        toast.success((jsonBody as CommonResponse).toast);
      } else {
        toast.error((jsonBody as CommonResponse).toast);
      }
    }

    if (response.ok) return jsonBody as R;
    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      router.push('/login');
    }

    if (this._onNot200 != undefined) this._onNot200(jsonBody as ErrorR);

    return new Promise((_, reject) => reject());
  }

  onNot200(callback: (errorResponse: ErrorR) => void): Fetcher<R, ErrorR> {
    this._onNot200 = callback;
    return this;
  }
}

export type CommonResponse = {
  toast?: string;
};
