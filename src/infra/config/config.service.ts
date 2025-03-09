import { Injectable } from '@nestjs/common';

import { IConfigService } from './config.service.interface';

@Injectable()
export class ConfigService implements IConfigService {
  public get(name: string) {
    return this.getEnv(name);
  }

  private getEnv(name: string, optional = false): string {
    const value = process.env[name];

    if (!optional && (value === undefined || value === null))
      throw new Error('Not found env var: ' + name);

    return value!;
  }
}
