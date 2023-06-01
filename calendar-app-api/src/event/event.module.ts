import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './entities/event.entity';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema}
    ])
  ],
})
export class EventModule {}
