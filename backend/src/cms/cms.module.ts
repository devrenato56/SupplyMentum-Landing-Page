import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SupabaseModule } from '../supabase/supabase.module';
import { AdminCmsController, CmsController } from './cms.controller';
import { CmsService } from './cms.service';

@Module({
  imports: [SupabaseModule, AuthModule],
  controllers: [CmsController, AdminCmsController],
  providers: [CmsService],
  exports: [CmsService],
})
export class CmsModule {}