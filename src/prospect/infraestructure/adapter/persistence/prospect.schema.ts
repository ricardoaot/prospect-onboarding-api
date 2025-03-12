import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProspectEntity extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) lastname: string;
  @Prop({ required: true }) birthday: Date;
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) phone: string;
  @Prop({ required: true }) status: string;
}
export const ProspectSchema = SchemaFactory.createForClass(ProspectEntity);