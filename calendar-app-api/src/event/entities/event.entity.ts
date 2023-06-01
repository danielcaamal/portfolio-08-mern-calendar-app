import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Event {
  @Prop({ required: true, maxlength: 50 })
  title: string;

  @Prop({ required: true })
  start: Date;

  @Prop({ required: true })
  end: Date;

  @Prop({ required: true, maxlength: 250 })
  notes: string;

  @Prop({ ref: 'User', required: true })
  user: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
EventSchema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
};
