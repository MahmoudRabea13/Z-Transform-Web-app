import numpy as np
import matplotlib.pyplot as plt
from scipy import signal
from classes.filter import Filter
class Process():
    def __init__(self):
        self.filter = Filter()
    def set_filter(self, zeros:list, poles:list, gain:float) -> None:
        self.filter.set_zeros(zeros)
        self.filter.set_poles(poles)
        self.filter.set_gain(gain)
    def get_response(self) -> tuple:
        return self.filter.get_response()
    def apply_filter(self,values:np.ndarray) -> np.ndarray:
        numrator , denominator = signal.zpk2tf(self.filter.zeros,self.filter.poles, 1)
        new_signal = signal.lfilter(numrator, denominator, values)
        return new_signal.real
    def add_all_pass(self, a:complex)-> None:
        self.filter.all_pass(a)
    def all_pass(self, a:complex)-> None:
        filter_all = Filter()
        filter_all.all_pass(a)
        freq , mag, phase = filter_all.get_response()
        return (freq, mag, phase)