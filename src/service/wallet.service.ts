import {
    Injectable,
    NotFoundException,
    ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Wallet, WalletDocument } from "../model/wallet.model";
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { Request, Response } from 'express';

@Injectable()
export class WalletService {
    constructor(@InjectModel(Wallet.name) private walletModel: Model<WalletDocument>) { }
    async createWallet(wallet: Object): Promise<Wallet> {
        const newWallet = new this.walletModel(wallet);
        return newWallet.save();
    }
    async readWallet(id): Promise<any> {
        if (id.id) {
            return this.walletModel.findOne({ _id: id.id }).populate("createdBy").exec();
        }
        return this.walletModel.find().populate("createdBy").exec();
    }
    async streamWallet(id: string, response: Response, request: Request) {
        try {
            const data = await this.walletModel.findOne({ _id: id })
            if (!data) {
                throw new NotFoundException(null, 'WalletNotFound')
            }
            

        } catch (e) {
            console.error(e)
            throw new ServiceUnavailableException()
        }
    }
    async update(id, video: Wallet): Promise<Wallet> {
        return await this.walletModel.findByIdAndUpdate(id, video, { new: true })
    }
    async delete(id): Promise<any> {
        return await this.walletModel.findByIdAndRemove(id);
    }
}