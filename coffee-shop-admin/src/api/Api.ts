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
    return new Fetcher<any>(new URL(`${BASE_URL}/api/products`), {
      method: 'GET',
    });
  }

  export function getOneProduct(id: string) {
    return new Fetcher<any>(
      new URL(`${BASE_URL}/api/products/${id ? id : ''}`),
      {
        method: 'GET',
      }
    );
  }

  export function signin(newUser: { username: string; password: string }) {
    return new Fetcher<any>(new URL(`${BASE_URL}/api/auth/login`), {
      method: 'POST',
      // headers: {
      //   'content-Type': 'application/json',
      // },
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
      // credentials: "include",
      // mode: "no-cors",
    });
  }

  export function postProduct(product: any) {
    return new Fetcher<{
      name: string;
      description: string;
      price: string;
      category: string;
      image?: string;
    }>(new URL(`${BASE_URL}/api/products`), {
      method: 'POST',
      body: product,
    });
  }

  export function updataProduct(product: any) {
    const id = product.get('id');
    product.delete('id');
    // const { data, id } = product;
    // const formData2 = new FormData();
    // formData2.append('name', data.name);
    // formData2.append('description', data.description);
    // formData2.append('price', `${data.price}`);
    // data?.image?.forEach((img: File) => {
    //   formData2.append('image', img);
    // });

    return new Fetcher<any>(new URL(`${BASE_URL}/api/products/${id}`), {
      method: 'PATCH',
      body: product,
    });
  }

  export function deleteAdministrators(idProduct: string) {
    return new Fetcher(new URL(`${BASE_URL}/api/products/${idProduct}`), {
      method: 'DELETE',
      // body: JSON.stringify(idProduct),
    });
  }

  export function signout() {
    return new Fetcher(new URL(`${BASE_URL}/api/auth/logout`));
  }
}
