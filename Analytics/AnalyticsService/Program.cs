using MQTTnet.Client;
using MQTTnet;
using Serilog;

internal class Program
{
    private static Task Main(string[] args)
    {
        Console.WriteLine("Hello, World!");
        Log.Logger = new LoggerConfiguration()
           .WriteTo.Console()
           .CreateLogger();

        var mqttFactory = new MqttFactory();
        var mqttClient = mqttFactory.CreateMqttClient();

        var mqttOptions = new MqttClientOptionsBuilder()
            .WithClientId("AnalyticsClient")
            .WithTcpServer("broker.emqx.io") // Ili "broker.mosquitto.org" zavisno koji broker koristite
            .Build();

        mqttClient.UseConnectedHandler(async e =>
        {
            Log.Information("Connected to MQTT broker.");

            try
            {
                await mqttClient.SubscribeAsync(new MqttTopicFilterBuilder().WithTopic("input/topic").Build());
                Log.Information("Subscribed to topic.");
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Failed to subscribe to topic.");
            }
        });

        mqttClient.UseDisconnectedHandler(e =>
        {
            Log.Warning("Disconnected from MQTT broker.");
        });

        mqttClient.UseApplicationMessageReceivedHandler(async e =>
        {
            try
            {
                var message = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);
                Log.Information("Message received: {Message}", message);

                var jsonData = JsonSerializer.Deserialize<JsonElement>(message);

                if (jsonData.TryGetProperty("value", out var valueProperty))
                {
                    var value = valueProperty.GetDouble();

                    if (value > 100) // Primer uslova za detekciju anomalije
                    {
                        var anomalyDetected = new
                        {
                            Type = "Anomaly",
                            Value = value,
                            Location = "Location1",
                            Time = DateTime.UtcNow
                        };

                        var payload = JsonSerializer.Serialize(anomalyDetected);
                        var messageToSend = new MqttApplicationMessageBuilder()
                            .WithTopic("output/topic")
                            .WithPayload(payload)
                            .WithExactlyOnceQoS()
                            .WithRetainFlag()
                            .Build();

                        await mqttClient.PublishAsync(messageToSend, CancellationToken.None);
                        Log.Information("Anomaly detected and message published: {Payload}", payload);
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error processing message.");
            }
        });

        try
        {
            await mqttClient.ConnectAsync(mqttOptions, CancellationToken.None);
        }
        catch (Exception ex)
        {
            Log.Fatal(ex, "Failed to connect to MQTT broker.");
        }

        Log.Information("Press any key to exit.");
        Console.ReadLine();

        try
        {
            await mqttClient.DisconnectAsync();
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Error disconnecting from MQTT broker.");
        }
    }
}