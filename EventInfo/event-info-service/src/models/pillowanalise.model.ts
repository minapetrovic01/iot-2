// pillow-analysed.model.ts

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type PillowAnalysedDocument = HydratedDocument<PillowAnalysed>;

@Schema()
export class PillowAnalysed {
    @Prop()
    snoringRange: number;

    @Prop()
    respirationRate: number;

    @Prop()
    bodyTemperature: number;

    @Prop()
    limbMovement: number;

    @Prop()
    bloodOxygen: number;

    @Prop()
    rem: number;

    @Prop()
    hoursSleeping: number;

    @Prop()
    heartRate: number;

    @Prop()
    stressState: number; 

}

export const PillowAnalysedSchema = SchemaFactory.createForClass(PillowAnalysed);
