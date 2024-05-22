import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy{
    private client: mqtt.MqttClient;
    
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
        this.client.publish(topic, message);
    }
}
