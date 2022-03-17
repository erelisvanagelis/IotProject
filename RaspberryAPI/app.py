# save this as app.py
from flask import Flask
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app)

devices = {
    "light1": "off",
    "light2": "off",
    "light3": "off",
}

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/sensorData")
def sensorData():
    response = {
      "motion1": random.randint(0, 100),
      "motion2": random.randint(0, 100),
      "temperature": random.randint(20, 30),
      "moisture": random.randint(40, 60),
    }
    return json.dumps(response)

@app.route("/deviceData")
def deviceData():
    return json.dumps(devices)

@app.route("/<key>/<value>", methods=['PUT'])
def setDevice(key, value):
    devices[key] = value
    print(devices[key])
    print(devices)
    response = {
        "success": "true"
    }
    return json.dumps(response)