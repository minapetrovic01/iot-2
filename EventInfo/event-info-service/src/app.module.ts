import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MqttService } from './mqtt/mqtt.service';
import { PillowAnalysed, PillowAnalysedSchema } from './models/pillowanalise.model';
import { DataAnalyseService } from './data-analyse/data-analyse.service';
import { DataAnalyseController } from './data-analyse/data-analyse.controller';

@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://localhost:27017/pillowdb'),
    MongooseModule.forRoot('mongodb://pillowdb3:27017/pillowdb'),
    MongooseModule.forFeature([{ name: PillowAnalysed.name, schema: PillowAnalysedSchema }])
  ],
  controllers: [AppController, DataAnalyseController],
  providers: [AppService, MqttService, DataAnalyseService],
})
export class AppModule {}
