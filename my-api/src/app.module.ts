import { Module } from '@nestjs/common';
import { CategorieModule } from './categorie/categorie.module';
import { ClientModule } from './client/client.module';
import { FactureModule } from './facture/facture.module';
import { PrestationModule } from './prestation/prestation.module';
import { EntiteModule } from './entite/entite.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { OperationModule } from './operation/operation.module';

@Module({
  imports: [
    CategorieModule,
    ClientModule,
    FactureModule,
    PrestationModule,
    UserModule,
    EntiteModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    OperationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
