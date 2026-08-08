import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { AdminAreasController } from './admin-areas.controller';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';

@Module({
  imports: [SupabaseModule],
  controllers: [AreasController, AdminAreasController],
  providers: [AreasService],
  exports: [AreasService],
})
export class AreasModule {}
