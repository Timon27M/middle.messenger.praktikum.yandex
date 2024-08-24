enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type Options = {
  method: METHODS;
  data?: any;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, "method">;

type HTTPMethod = <R = unknown>(
  path: string,
  options?: OptionsWithoutMethod
) => Promise<R>;

function queryStringify(data: any) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) =>
      `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`,
    "?"
  );
}

export default class HTTPTransport {
  private withCredentials = true;

  get: HTTPMethod = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  put(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: METHODS.PUT });
  }

  delete(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: METHODS.DELETE });
  }

  request = <Response>(
    url: string,
    options: Options = { method: METHODS.GET }
  ): Promise<Response> | Promise<any> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers.key);
      });

      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.withCredentials = this.withCredentials;
      xhr.responseType = "json";

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(data));
        }
    }).then((response: any) => {
      if (response.status === 200) {
        return response.response;
      }
      throw Error(`Ошибка: ${response.response.reason}`);
    });
  };
}
