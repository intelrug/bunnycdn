import { ClientType } from '../enums';
import { Domain } from '../enums';
import got, { CancelableRequest, Got, OptionsOfJSONResponseBody } from 'got';
import { Readable } from 'stream';

export abstract class HttpBase {
  private _httpClient: Got = got.extend({
    headers: { AccessKey: this.accessKey },
    responseType: 'json',
    prefixUrl: this.clientType === ClientType.Storage ? Domain.Storage : Domain.API,
  });

  protected constructor(private clientType: ClientType, private accessKey?: string) {}

  protected fetch<T>(url: string, options?: OptionsOfJSONResponseBody): CancelableRequest<T> {
    return this._httpClient(url, options).json<T>();
  }

  protected async fetchRaw(url: string, options?: OptionsOfJSONResponseBody): Promise<string> {
    const response = await this._httpClient(url, { ...options, responseType: 'text' });
    return response.body;
  }

  protected post<T>(
    url: string,
    body?: string | Readable | Buffer,
    options?: OptionsOfJSONResponseBody,
  ): CancelableRequest<T>;
  protected post<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: { [key: string]: any },
    options?: OptionsOfJSONResponseBody,
  ): CancelableRequest<T>;
  protected post<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: string | Readable | Buffer | { [key: string]: any },
    options?: OptionsOfJSONResponseBody,
  ): CancelableRequest<T> {
    if (typeof body === 'object' && !(body instanceof Buffer) && !(body instanceof Readable)) {
      return this._httpClient.post(url, { ...options, json: body }).json<T>();
    } else {
      return this._httpClient.post(url, { ...options, body }).json<T>();
    }
  }

  protected put<T>(
    url: string,
    body?: string | Readable | Buffer,
    options?: OptionsOfJSONResponseBody,
  ): CancelableRequest<T>;
  protected put<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: { [key: string]: any },
    options?: OptionsOfJSONResponseBody,
  ): CancelableRequest<T>;
  protected put<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: string | Readable | Buffer | { [key: string]: any },
    options?: OptionsOfJSONResponseBody,
  ): CancelableRequest<T> {
    if (typeof body === 'object' && !(body instanceof Buffer) && !(body instanceof Readable)) {
      return this._httpClient.put(url, { ...options, json: body }).json<T>();
    } else {
      return this._httpClient.put(url, { ...options, body }).json<T>();
    }
  }

  protected del<T>(url: string, options?: OptionsOfJSONResponseBody): CancelableRequest<T> {
    return this._httpClient.delete(url, options).json<T>();
  }
}
