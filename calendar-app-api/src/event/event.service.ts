import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class EventService {

  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>
  ) {}

  create = async (createEventDto: CreateEventDto) : Promise<Event> => {
    const newEvent = new this.eventModel(createEventDto);
    return (await newEvent.save()).populate('user');
  }

  findAll = async () : Promise<Event[]> => {
    return this.eventModel.find().populate('user');
  }

  findOne = async (id: string) : Promise<Event> => {
    const event = await this.eventModel.findById(id).populate('user');
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  update = async (id: string, updateEventDto: UpdateEventDto, user: User): Promise<Event> => {
    const eventToUpdate = await this.eventModel.findById(id);
    if (!eventToUpdate) throw new NotFoundException('Event not found');
    if (eventToUpdate.user.toString() !== user.id) throw new NotFoundException('Event cannot be updated by this user');
    const updatedEvent = await this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true }).populate('user').exec();
    if (!updatedEvent) throw new NotFoundException('Event not found');
    return updatedEvent;
  }

  remove = async (id: string, user: User): Promise<void> => {
    const eventToDelete = await this.eventModel.findById(id).populate('user') as any;
    if (!eventToDelete) throw new NotFoundException('Event not found');
    if (eventToDelete?.user?.id.toString() !== user.id) throw new NotFoundException('Event cannot be deleted by this user');
    await this.eventModel.findByIdAndDelete(id).exec();
  }
}
