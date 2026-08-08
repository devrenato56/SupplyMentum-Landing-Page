import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { AdminEventsController } from './admin-events.controller';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [SupabaseModule],
  controllers: [EventsController, AdminEventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
