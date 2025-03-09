import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

import { CONFIG_SERVICE } from './config.const';
import { provideClass } from 'src/shared/helpers';

@Global()
@Module({
  providers: [provideClass(CONFIG_SERVICE, ConfigService)],
  exports: [CONFIG_SERVICE],
})
export class ConfigModule {}
