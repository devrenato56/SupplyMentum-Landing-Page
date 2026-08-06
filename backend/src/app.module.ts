import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin/admin.controller';
import { ApplicationController } from './application/application.controller';
import { ApplicationService } from './application/application.service';
import { AdminService } from './admin/admin.service';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { FaqController } from './faq/faq.controller';
import { FaqService } from './faq/faq.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    SupabaseModule,
    JwtModule,
  ],
  controllers: [AppController, AdminController, ApplicationController, EventsController, FaqController],
  providers: [AppService, AuthService, ApplicationService, AdminService, EventsService, FaqService],
})
export class AppModule {}
