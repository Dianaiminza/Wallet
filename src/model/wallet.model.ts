import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "../model/user.model";

export type WalletDocument = Wallet & Document;
@Schema()
export class Wallet {
    @Prop()
    title: string;
    @Prop()
    expense: string;
    @Prop()
    income: string;
    @Prop({ default: Date.now() })
    uploadDate: Date
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    createdBy: User
}
export const WalletSchema = SchemaFactory.createForClass(Wallet)