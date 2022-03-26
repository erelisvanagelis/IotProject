import RPi.GPIO as GPIO

class LightController():
	def __init__(self, pins):
		GPIO.setwarnings(False)
		GPIO.setmode(GPIO.BCM)	
		for pin in pins:
			GPIO.setup(pin, GPIO.OUT)
			self.setPinState(pin, "off")
			print(str(pin))
		
	def setPinState(self, pin, value):
		if value == "off":
			GPIO.output(pin, 1)
		else:
			GPIO.output(pin, 0)
