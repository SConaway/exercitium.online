from string import *
import random

class GameCode:
 	@classmethod
 	def generate(cls,size=5):
 		characters = ascii_letters + punctuation +  digits + ascii_lowercase
 		choice = random.SystemRandom()
 		gamecode =  "".join(choice.choice(characters)
                    for i in range(size))
 		return str(gamecode)
