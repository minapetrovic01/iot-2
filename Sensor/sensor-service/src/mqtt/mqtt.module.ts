import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pillow, PillowSchema } from 'src/pillow/pillow.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: Pillow.name, schema: PillowSchema }])],
    controllers: [],
    providers: [MqttService],	
})
export class MqttModule {}
