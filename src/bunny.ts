import { HttpBase, PullZoneClient, StorageClient } from './clients';
import { Billing, Statistics } from './models';
import { BillingEndpoint, ClientType, Endpoint } from './enums';
import { StorageZone } from './models';
import { BunnyCDNOptions } from './models';
import { CancelableRequest } from 'got';

export class BunnyCDN extends HttpBase {
  private readonly _pullZoneClient: PullZoneClient;
  public get pullZone(): PullZoneClient {
    return this._pullZoneClient;
  }

  private readonly _storageClient: StorageClient;
  public get storage(): StorageClient {
    return this._storageClient;
  }

  constructor(options: BunnyCDNOptions) {
    super(ClientType.API, options.apiAccessKey);
    this._pullZoneClient = new PullZoneClient(options.apiAccessKey);
    this._storageClient = new StorageClient(options.storageZones || []);
  }

  getStorageZone(): Promise<StorageZone[]>;
  getStorageZone(id: number): Promise<StorageZone>;
  getStorageZone(id?: number): Promise<StorageZone | StorageZone[]> {
    if (id) {
      return super.fetch<StorageZone>(`${Endpoint.StorageZone}/${id}`);
    } else {
      return super.fetch<StorageZone[]>(`${Endpoint.StorageZone}`);
    }
  }

  addStorageZone(
    name: string,
    region?: string,
    replicationRegions?: string[],
  ): CancelableRequest<StorageZone> {
    const body = {
      Name: name,
      Region: region,
      ReplicationRegions: replicationRegions,
    };
    return super.post<StorageZone>(`${Endpoint.StorageZone}`, body);
  }

  async deleteStorageZone(id: number): Promise<StorageZone> {
    return super.del<StorageZone>(`${Endpoint.StorageZone}/${id}`);
  }

  async purge(url: string): Promise<void> {
    await super.post(`${Endpoint.Purge}?url=${url}`);
  }

  statistics(): Promise<Statistics[]> {
    return super.fetch<Statistics[]>(Endpoint.Statistic);
  }

  billing(): Promise<Billing[]> {
    return super.fetch<Billing[]>(Endpoint.Billing);
  }

  async billingApplyCode(couponCode: string): Promise<void> {
    await super.fetch(`${Endpoint.Billing}/${BillingEndpoint.ApplyCode}?couponCode=${couponCode}`);
  }

  async hardUpdate(
    host: string,
    storageZoneName: string,
    path: string,
    fileName: string,
    fileContents: Buffer,
  ): Promise<void> {
    await this.storage.update(storageZoneName, `${path}/${fileName}`, fileContents);
    await this.purge(`${host}/${path}/${fileName}`);
  }
}
