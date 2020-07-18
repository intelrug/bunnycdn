import { HttpBase } from './http-base.client';
import { ClientType } from '../enums';
import { StorageZoneFile } from '../models';
import { BunnyCDNStorageZoneOptions } from '../models';

export class StorageClient extends HttpBase {
  constructor(private options: BunnyCDNStorageZoneOptions[]) {
    super(ClientType.Storage);
  }

  private getAccessHeaders(storageZoneName: string) {
    const storageZoneOptions = this.options.find((s) => s.name === storageZoneName);
    return { AccessKey: storageZoneOptions?.accessKey };
  }

  get(storageZoneName: string): Promise<StorageZoneFile[]> {
    return super.fetch<StorageZoneFile[]>(`${storageZoneName}/`, {
      headers: this.getAccessHeaders(storageZoneName),
    });
  }

  getFile(storageZoneName: string, filePath: string): Promise<string> {
    return super.fetchRaw(`${storageZoneName}/${filePath}`, {
      headers: this.getAccessHeaders(storageZoneName),
    });
  }

  async update(storageZoneName: string, filePath: string, fileContents: Buffer): Promise<void> {
    await super.put<string>(`${storageZoneName}/${filePath}`, fileContents, {
      headers: this.getAccessHeaders(storageZoneName),
    });
  }

  async delete(storageZoneName: string, filePath: string): Promise<void> {
    await super.del<string>(`${storageZoneName}/${filePath}`, {
      headers: this.getAccessHeaders(storageZoneName),
    });
  }
}
