import { Fetcher } from './Fetcher';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export namespace Api {
  export function GetAllStates() {
    return new Fetcher<any>(
      new URL(`${BASE_URL}/v1/Cities/AllStates
		`),
      {
        method: 'GET',
      }
    );
  }

  export function GetAllProperties() {
    return new Fetcher<any>(new URL(`${BASE_URL}/1/50`), {
      method: 'GET',
    });
  }

  export function GetPropertyKinds() {
    return new Fetcher<any>(
      new URL(`${BASE_URL}/v1/Enum/PropertyKind
		`),
      {
        method: 'GET',
      }
    );
  }

  export function GetPropertyDocumentKind() {
    return new Fetcher<any>(
      new URL(`${BASE_URL}/v1/Enum/PropertyDocumentKind
		`),
      {
        method: 'GET',
      }
    );
  }

  export function AddArea(newUser: { name: string; stateId: string }) {
    return new Fetcher<any>(new URL(`${BASE_URL}/v1/Admin/Cities/AddArea`), {
      method: 'POST',
      // headers: {
      //   'content-Type': 'application/json',
      // },
      body: JSON.stringify(newUser),
    });
  }

  export function AddState(newUser: { name: string }) {
    return new Fetcher<any>(
      new URL(`${BASE_URL}/v1/Admin/Cities/AddState
`),
      {
        method: 'POST',
        // headers: {
        //   'content-Type': 'application/json',
        // },
        body: JSON.stringify(newUser),
      }
    );
  }

  export function GetCitiesWithStateId(token: any) {
    return new Fetcher<any>(
      new URL(`${BASE_URL}/v1/Cities/GetCitiesWithStateId/${token}
		`),
      {
        method: 'GET',
      }
    );
  }

  export function signin(newUser: { PhoneNumber: string; Password: string }) {
    return new Fetcher<any>(new URL(`${BASE_URL}/v1/User/Login`), {
      method: 'POST',
      // headers: {
      //   'content-Type': 'application/json',
      // },
      body: JSON.stringify(newUser),
      // credentials: "include",
      // mode: "no-cors",
    });
  }

  export function deleteAdministrators(idAdmin: any) {
    return new Fetcher(new URL(`${BASE_URL}/v1/Admin/Properties/Delete`), {
      method: 'DELETE',
      body: JSON.stringify(idAdmin),
    });
  }
}
