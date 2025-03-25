import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProspectEntity extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) lastname: string;
  @Prop({ required: true }) birthday: Date;
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) phone: string;
  @Prop({ required: true }) profilePhoto: string;
  @Prop({ required: true }) country: string;
  @Prop({ required: true }) city: string;
  @Prop({ required: true }) fullAddress: string;
  @Prop({ required: true }) locationCoordinates: string;
  @Prop({ required: true }) bankName: string;
  @Prop({ required: true }) bankAccountNumber: string;
  @Prop({ required: true }) taxID: string;
  @Prop({ required: true }) documentOrPassport: string;
  @Prop({ required: false }) otherRelevantDetails: string;
  @Prop({ required: false }) fileOtherInfo: string;
  @Prop({ required: true }) status: string;
}
export const ProspectSchema = SchemaFactory.createForClass(ProspectEntity);