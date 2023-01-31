import scipy 
from scipy import signal
import numpy as np
import matplotlib.pyplot as plt
import os
class Filter():
    def __init__(self) -> None:
        self.zeros = []
        self.poles = []
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
    def all_pass(self, a):
        self.poles.append(a)
        zero=(1/a)
        self.zeros.append(zero)