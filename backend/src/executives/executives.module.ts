import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { AdminExecutivesController } from './admin-executives.controller';
import { ExecutivesController } from './executives.controller';
import { ExecutivesService } from './executives.service';

@Module({
  imports: [SupabaseModule],
  controllers: [ExecutivesController, AdminExecutivesController],
  providers: [ExecutivesService],
  exports: [ExecutivesService],
})
export class ExecutivesModule {}
