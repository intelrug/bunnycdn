export interface StorageZone {
  Id: number;
  Name: string;
  Password: string;
  ReadOnlyPassword: string;
  UserId: string;
  FilesStored: number;
  StorageUsed: number;
  Deleted: boolean;
  DateModified: string;
}
