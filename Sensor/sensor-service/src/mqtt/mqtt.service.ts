import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy{
    private client: mqtt.MqttClient;

    constructor() {
    }
    
    onModuleInit() {
        this.client = mqtt.connect('mqtt://localhost:1883');
        this.client.on('connect', () => {
        console.log('Connected to MQTT broker');
        });
    }
    
    onModuleDestroy() {
        this.client.end();
    }
    
    subscribe(topic: string, callback: (message: string) => void) {
        this.client.subscribe(topic);
        this.client.on('message', (topic, message) => {
        callback(message.toString());
        });
    }
    
    publish(topic: string, message: string) {
        //this.client.publish(topic, message);
        this.client.publish(topic, message, {}, (err) => {
            if (err) {
              console.error('Publish error: ', err);
            } else {
              console.log(`Message "${message}" published to topic "${topic}"`);
            }
          });
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleChron() {
        // const data = await this.sensorDataModel.find().sort({ timestamp: -1 }).limit(1).exec();
        // if (data && data.length > 0) {
        //   this.mqttClient.publish('sensor/data', JSON.stringify(data[0]));
        // }
        console.log('Cron job is running');
        this.publish('my/test/topic', 'Hello from NestJS!');
    }

}
