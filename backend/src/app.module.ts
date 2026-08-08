import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { CmsModule } from './cms/cms.module';
import { AreasModule } from './areas/areas.module';
import { EventsModule } from './events/events.module';
import { MembersModule } from './members/members.module';
import { RolesModule } from './roles/roles.module';

import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';

import { ApplicationController } from './application/application.controller';
import { ApplicationService } from './application/application.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    AuthModule,
    CmsModule,
    AreasModule,
    EventsModule,
    MembersModule,
    RolesModule,
  ],
  controllers: [AppController, AdminController, ApplicationController],
  providers: [AppService, AdminService, ApplicationService],
})
export class AppModule {}
