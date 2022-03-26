import RPi.GPIO as GPIO

class FlameController():
	def __init__(self, pins):
		GPIO.setmode(GPIO.BCM)
		GPIO.setwarnings(False)		
		
		if type(pins) == int:
			GPIO.setup(pins, GPIO.IN)
		else:
			for pin in pins:
				GPIO.setup(pin, GPIO.IN)
		
	def readSensorData(self, pin):
		if GPIO.input(pin):
			return "Safe"
		else:
			return "Unsafe"
