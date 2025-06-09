import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type VouchersSchema = Vouchers
@Schema({
    timestamps: true
})
export class Vouchers extends Document {
    @Prop({ required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    benefitId: Types.ObjectId;

    @Prop({ enum: ['active', 'used', 'expired'], default: 'active' })
    status: string;

    @Prop({ required: true })
    value: number;

    @Prop({ default: Date.now })
    issuedAt: Date;

    @Prop({ required: true })
    expiresAt: Date;

    @Prop({ required: false })
    usedAt: Date;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const VouchersSchema = SchemaFactory.createForClass(Vouchers)