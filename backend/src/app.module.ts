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
import { CmsModule } from './cms/cms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    SupabaseModule,
    JwtModule,
    CmsModule,
  ],
  controllers: [AppController, AdminController, ApplicationController],
  providers: [AppService, AuthService, ApplicationService],
})
export class AppModule {}
