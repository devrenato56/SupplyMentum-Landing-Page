import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { AdminMembersController } from './admin-members.controller';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

@Module({
  imports: [SupabaseModule],
  controllers: [MembersController, AdminMembersController],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {}
