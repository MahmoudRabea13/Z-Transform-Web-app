import numpy as np
import matplotlib.pyplot as plt
from scipy import signal
from classes.filter import Filter
class Signal_1():
    def __init__(self, filter:Filter):
        self.filter = filter
    def apply_filter(self,values:np.ndarray) -> np.ndarray:
        numrator , denominator = signal.zpk2tf([0.6+0.5j], [], 1)
        new_signal = signal.lfilter(numrator, denominator, values)
        return new_signal.real
    def all_pass(self, a:complex)-> None:
        filter_all = Filter()
        filter_all.all_pass(a)
        freq , mag, phase = filter_all.get_response()
        filter_all.plot_response(freq, mag, phase)