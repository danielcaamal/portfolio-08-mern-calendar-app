import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, select: false })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.toJSON = function() {
    const obj = this.toObject();
    obj.id = obj._id;
    delete obj.password;
    delete obj.__v;
    delete obj._id;
    return obj;
};