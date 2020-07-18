import { HttpBase } from './http-base.client';
import { ClientType, EdgeRulesEndpoint, Endpoint, PullZoneEndpoint } from '../enums';
import { CreatePullZone, PullZone } from '../models';

export class PullZoneClient extends HttpBase {
  constructor(accessKey: string) {
    super(ClientType.API, accessKey);
  }

  async get(): Promise<PullZone[]>;
  async get(pullZoneId: number): Promise<PullZone>;
  async get(pullZoneId?: number): Promise<PullZone | PullZone[]> {
    if (!pullZoneId) {
      return super.fetch<PullZone[]>(Endpoint.PullZone);
    } else {
      return super.fetch<PullZone>(`${Endpoint.PullZone}/${pullZoneId}`);
    }
  }

  async create(pullZone: CreatePullZone): Promise<PullZone> {
    return super.post(Endpoint.PullZone, pullZone);
  }

  async update(id: number, pullZone: Partial<PullZone>): Promise<void> {
    await super.post(`${Endpoint.PullZone}/${id}`, pullZone);
  }

  async delete(id: number): Promise<void> {
    await super.del(`${Endpoint.PullZone}/${id}`);
  }

  async purgeCache(id: number): Promise<void> {
    await super.post(`${Endpoint.PullZone}/${id}/${PullZoneEndpoint.PurgeCache}`);
  }

  async addOrUpdateEdgeRule(id: number): Promise<void> {
    await super.post(
      `${Endpoint.PullZone}/${id}/${PullZoneEndpoint.EdgeRules}/${EdgeRulesEndpoint.AddOrUpdate}`,
    );
  }

  async deleteEdgeRule(pullZoneId: number, edgeRuleId: number): Promise<void> {
    await super.post(`${Endpoint.PullZone}/${pullZoneId}/${PullZoneEndpoint.EdgeRules}/${edgeRuleId}`);
  }

  async addHostname(pullZoneId: number, hostName: string): Promise<void> {
    const body = {
      PullZoneId: pullZoneId,
      Hostname: hostName,
    };
    await super.post(`${Endpoint.PullZone}/${PullZoneEndpoint.AddHostName}`, body);
  }

  async deleteHostname(id: number, hostName: string): Promise<void> {
    await super.del(`${Endpoint.PullZone}/${PullZoneEndpoint.DeleteHostName}?id=${id}&hostname=${hostName}`);
  }

  async setForceSSL(pullZoneId: number, hostName: string, forceSSL: boolean = true): Promise<void> {
    const body = {
      PullZoneId: pullZoneId,
      Hostname: hostName,
      ForceSSL: forceSSL,
    };
    await super.post(`${Endpoint.PullZone}/${PullZoneEndpoint.SetForceSSL}`, body);
  }

  async loadFreeCertificate(hostName: string): Promise<void> {
    await super.fetch(`${Endpoint.PullZone}/${PullZoneEndpoint.LoadFreeCertificate}?hostname=${hostName}`);
  }

  async addCertificate(
    pullZoneId: number,
    hostName: string,
    certificate: string,
    certificateKey: string,
  ): Promise<void> {
    const body = {
      PullZoneId: pullZoneId,
      HostName: hostName,
      Certificate: certificate,
      CertificateKey: certificateKey,
    };
    await super.post(`${Endpoint.PullZone}/${PullZoneEndpoint.AddCertificate}`, body);
  }

  async addBlockedIP(pullZoneId: number, blockedIp: string): Promise<void> {
    const body = {
      PullZoneId: pullZoneId,
      BlockedIp: blockedIp,
    };
    await super.post(`${Endpoint.PullZone}/${PullZoneEndpoint.AddBlockedIP}`, body);
  }

  async removeBlockedIP(pullZoneId: number, blockedIp: string): Promise<void> {
    const body = {
      PullZoneId: pullZoneId,
      BlockedIp: blockedIp,
    };
    await super.post(`${Endpoint.PullZone}/${PullZoneEndpoint.RemoveBlockedIP}`, body);
  }
}
