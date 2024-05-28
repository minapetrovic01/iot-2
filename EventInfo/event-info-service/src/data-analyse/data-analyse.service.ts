import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PillowAnalysed } from 'src/models/pillowanalise.model';
import { PillowAnalysedID } from 'src/models/pillowanalisedid.model';

@Injectable()
export class DataAnalyseService {

    constructor(@InjectModel('PillowAnalysed') private readonly pillowModel: Model<PillowAnalysed>) {}


    async findAll(): Promise<PillowAnalysedID[]> {
        let result: PillowAnalysedID[] = [];
        try {
            let dbResult = await this.pillowModel.find().exec();
            dbResult.forEach((element) => {
                let data: PillowAnalysedID = {
                    _id: element._id.toString(),
                    snoringRange: element.snoringRange,
                    respirationRate: element.respirationRate,
                    bodyTemperature: element.bodyTemperature,
                    limbMovement: element.limbMovement,
                    bloodOxygen: element.bloodOxygen,
                    rem: element.rem,
                    hoursSleeping: element.hoursSleeping,
                    heartRate: element.heartRate,
                    stressState: element.stressState
                }
                result.push(data);
            });
            return Promise.resolve(result);
        }
        catch (error) {
            throw error;
        }
    }

    async findOne(id: string): Promise<PillowAnalysed> {
        try {
            let dbResult = await this.pillowModel.findById(id).exec();
            let result: PillowAnalysed = {
                snoringRange: dbResult.snoringRange,
                respirationRate: dbResult.respirationRate,
                bodyTemperature: dbResult.bodyTemperature,
                limbMovement: dbResult.limbMovement,
                bloodOxygen: dbResult.bloodOxygen,
                rem: dbResult.rem,
                hoursSleeping: dbResult.hoursSleeping,
                heartRate: dbResult.heartRate,
                stressState: dbResult.stressState
            }
            return Promise.resolve(result);
        }
        catch (error) {
            throw error;
        }
    }

    async deleteOne(id: string): Promise<void> {
        try {
            await this.pillowModel.findByIdAndDelete(id).exec();
        }
        catch (error) {
            throw error;
        }
    }

    async updateOne(id: string, data: PillowAnalysedID): Promise<void> {
        try {
            await this.pillowModel.findByIdAndUpdate(id, data).exec();
        }
        catch (error) {
            throw error;
        }
    }

    async findByStressRate(stressRate: string): Promise<PillowAnalysedID[]> {
        let result: PillowAnalysedID[] = [];
        let strval:number = parseInt(stressRate);
        try {
            let dbResult = await this.pillowModel.find({ stresState: strval }).exec();
            dbResult.forEach((element) => {
                let data: PillowAnalysedID = {
                    _id: element._id.toString(),
                    snoringRange: element.snoringRange,
                    respirationRate: element.respirationRate,
                    bodyTemperature: element.bodyTemperature,
                    limbMovement: element.limbMovement,
                    bloodOxygen: element.bloodOxygen,
                    rem: element.rem,
                    hoursSleeping: element.hoursSleeping,
                    heartRate: element.heartRate,
                    stressState: element.stressState
                }
                result.push(data);
            });
            return Promise.resolve(result);
        }
        catch (error) {
            throw error;
        }
    }
    
    async findByHeartRate(min:string, max:string): Promise<PillowAnalysedID[]> {
        let result: PillowAnalysedID[] = [];
        let minval:number = parseInt(min);
        let maxval:number = parseInt(max);
        try {
            let dbResult = await this.pillowModel.find({ heartRate: { $gte: minval, $lte: maxval } }).exec();
            dbResult.forEach((element) => {
                let data: PillowAnalysedID = {
                    _id: element._id.toString(),
                    snoringRange: element.snoringRange,
                    respirationRate: element.respirationRate,
                    bodyTemperature: element.bodyTemperature,
                    limbMovement: element.limbMovement,
                    bloodOxygen: element.bloodOxygen,
                    rem: element.rem,
                    hoursSleeping: element.hoursSleeping,
                    heartRate: element.heartRate,
                    stressState: element.stressState
                }
                result.push(data);
            });
            return Promise.resolve(result);
        }
        catch (error) {
            throw error;
        }
    }

    async create(data: PillowAnalysed): Promise<PillowAnalysedID> {
        try {
            let dbResult = await this.pillowModel.create(data);
            let result: PillowAnalysedID = {
                _id: dbResult._id.toString(),
                snoringRange: dbResult.snoringRange,
                respirationRate: dbResult.respirationRate,
                bodyTemperature: dbResult.bodyTemperature,
                limbMovement: dbResult.limbMovement,
                bloodOxygen: dbResult.bloodOxygen,
                rem: dbResult.rem,
                hoursSleeping: dbResult.hoursSleeping,
                heartRate: dbResult.heartRate,
                stressState: dbResult.stressState
            }
            return Promise.resolve(result);
        }
        catch (error) {
            throw error;
        }
    }


}
