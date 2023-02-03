import scipy 
from scipy import signal
import numpy as np
import matplotlib.pyplot as plt
import os
class Filter():
    def __init__(self) -> None:
        self.zeros = []
        self.poles = []
        self.all_pass = []
        self.gain = 1
    def set_zeros(self, zeros:list) -> None:
        self.zeros = zeros
    def set_poles(self, poles:list) -> None:
        self.poles = poles
    def set_gain(self, gain:float) -> None:
        self.gain = gain
    def get_response(self) -> tuple:
        frequency, response = signal.freqz_zpk(self.zeros, self.poles, self.gain)
        magnitude = 20*np.log(np.abs(response))
        phase = np.unwrap(np.angle(response))
        return (frequency, magnitude, phase)
    def remove_all_pass(self):
        self.zeros = self.zeros[0:len(self.zeros)-len(self.all_pass)]
        self.poles = self.poles[0:len(self.poles)-len(self.all_pass)]
        self.all_pass = []
    def one_all_pass(self, a):
        self.all_pass.append(a)
        self.poles.append(a)
        self.zeros.append(1/a)