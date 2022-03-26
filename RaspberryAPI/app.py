from flask import Flask
import json
import random
import os
from LightController import LightController
from HumidTempController import HumidTempController
from FlameController import FlameController

app = Flask(__name__, static_folder=os.path.abspath('/home/pi/Desktop/iot/build/'), static_url_path='/')

devices = {
    "light1": {"pin": 17, "status": "off"},
    "light2": {"pin": 27, "status": "off"},
    "light3": {"pin": 22, "status": "off"},
    }

sensors = {
    "humidTemp1": {"pin": 18},
    "flame1": {"pin": 23},
    }

lc = LightController((devices["light1"]["pin"],
                      devices["light2"]["pin"],
                      devices["light3"]["pin"]))

htc = HumidTempController()
fc = FlameController((sensors["flame1"]["pin"]))

@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/sensorData")
def sensorData():
    humidity, temperature = htc.readSensorData(sensors["humidTemp1"]["pin"])
    response = {
      "humid1": round(humidity,1),
      "temp1": round(temperature,1),
      "flame1": fc.readSensorData(sensors["flame1"]["pin"]),
    }
    return response    

@app.route("/deviceData")
def deviceData():
    response = {
        "light1": devices["light1"]["status"],
        "light2": devices["light2"]["status"],
        "light3": devices["light3"]["status"],
        }
    return response

@app.route("/<key>/<value>", methods=['PUT'])
def setDevice(key, value):
    devices[key]["status"] = value
    print(devices[key])
    print(devices[key]["pin"])
    print(value)
    
    lc.setPinState(devices[key]["pin"], value)
    
    response = {
        "success": "true"
    }
    return response

if __name__ == '__main__':
	app.run(debug=True, port = 8080, host= '0.0.0.0')
