import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mqtt from 'mqtt';
import { PillowAnalysed } from 'src/models/pillowanalise.model';


@Injectable()
export class MqttService implements OnModuleInit{
    private client: mqtt.MqttClient;
    private readonly logger = new Logger(MqttService.name);

    
    constructor(@InjectModel('PillowAnalysed') private readonly pillowModel: Model<PillowAnalysed>) {}

    onModuleInit() {
        //this.client = mqtt.connect('mqtt://localhost:1883');

        this.client = mqtt.connect('mqtt://mosquitto:1883');

        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
        });
        this.client.on('error', (error) => {
            this.logger.error(`MQTT connection error: ${error.message}`, error.stack);
        });
        this.client.subscribe("analysed/alert", (err) => {
            if (!err) {
                console.log('Subscribed to analysed/alert');
            }
        }
        );
    
        this.client.on('message', async (topic, message) => {
            try {
              const jsonData = JSON.parse(message.toString());
              const data = new this.pillowModel( jsonData );
              await data.save();
              console.log(`Message received on ${topic}: ${JSON.stringify(jsonData)}`);
            } catch (error) {
              console.error('Error parsing MQTT message:', error);
            }
          });
    }

}
