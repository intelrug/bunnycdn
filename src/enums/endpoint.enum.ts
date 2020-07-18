export enum Endpoint {
  PullZone = 'pullzone',
  StorageZone = 'storagezone',
  Purge = 'purge',
  Statistic = 'statistics',
  Billing = 'billing',
}

export enum PullZoneEndpoint {
  PurgeCache = 'purgeCache',
  EdgeRules = 'edgerules',
  AddHostName = 'addHostname',
  DeleteHostName = 'deleteHostname',
  SetForceSSL = 'setForceSSL',
  LoadFreeCertificate = 'loadFreeCertificate',
  AddCertificate = 'addCertificate',
  AddBlockedIP = 'addBlockedIp',
  RemoveBlockedIP = 'removeBlockedIp',
}

export enum EdgeRulesEndpoint {
  AddOrUpdate = 'addOrUpdate',
}

export enum BillingEndpoint {
  ApplyCode = 'applyCode',
}
