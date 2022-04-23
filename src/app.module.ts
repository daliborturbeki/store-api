import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { databaseSecrets } from 'secrets';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductsModule, CartsModule,  AuthModule, UsersModule, MongooseModule.forRoot(databaseSecrets.connectionString,{dbName:'store'}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
