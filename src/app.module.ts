import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlansModule } from './Plans/plans.module';
import { SubscribeModule } from './Subscribe/subscribe.module';
import { UserModule } from './User/user.module';
import { Connection } from 'typeorm';

@Module({
  imports: [
    PlansModule, 
    SubscribeModule, 
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'node_test',
      autoLoadEntities: true,
      synchronize: false
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private connection: Connection) { }
}
