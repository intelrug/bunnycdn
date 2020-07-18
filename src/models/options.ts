export interface BunnyCDNOptions {
  apiAccessKey: string;
  storageZones?: BunnyCDNStorageZoneOptions[];
}

export interface BunnyCDNStorageZoneOptions {
  name: string;
  accessKey: string;
}
