import Adafruit_DHT

class HumidTempController():
    def __init__(self):
        self.sensor = Adafruit_DHT.DHT22

    def readSensorData(self, pin):
        humidity, temperature = Adafruit_DHT.read_retry(self.sensor, pin)
        if humidity is not None and temperature is not None:
            return (humidity, temperature)
        else:
            return ("None", "None")
