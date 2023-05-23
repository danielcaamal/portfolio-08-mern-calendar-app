import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '../.env',
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => (
                {
                    user: config.get('MONGO_INITDB_ROOT_USERNAME'),
                    pass: config.get('MONGO_INITDB_ROOT_PASSWORD'),
                    dbName: config.get('MONGO_INITDB_DATABASE'),
                    uri: `mongodb://${config.get('MONGO_INITDB_HOST')}:${config.get('MONGO_INITDB_PORT')}`,
                }
            ),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {
}
