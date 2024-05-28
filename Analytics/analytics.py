import json
import paho.mqtt.client as mqtt

class Pillow:
    def __init__(self,_id, snoringRange, respirationRate, bodyTemperature, limbMovement, bloodOxygen, rem, hoursSleeping, heartRate, stresState):
        self._id = _id
        self.snoringRange = snoringRange
        self.respirationRate = respirationRate
        self.bodyTemperature = bodyTemperature
        self.limbMovement = limbMovement
        self.bloodOxygen = bloodOxygen
        self.rem = rem
        self.hoursSleeping = hoursSleeping
        self.heartRate = heartRate
        self.stresState = stresState

def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT broker with result code " + str(rc))
    client.subscribe("sensor/test/data")
    print("Subscribed to topic 'sensor/data'")

def on_message(client, userdata, msg):
    print(f"Received message: {msg.payload.decode()}")
    try:
        data = json.loads(msg.payload.decode())
        pillow_data = Pillow(**data)
        
        if pillow_data.heartRate < 70:
            alert_message = {"Alert": "Heart rate is less than 70"}
            client.publish("sensor/test/alert", json.dumps(alert_message))
            print("Published alert message")
    except (json.JSONDecodeError, KeyError, TypeError) as e:
        print(f"Failed to deserialize message: {e}")

client = mqtt.Client(client_id="MqttClientApp", clean_session=True, userdata=None, protocol=mqtt.MQTTv311)
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)

client.loop_forever()
