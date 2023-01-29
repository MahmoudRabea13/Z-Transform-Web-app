import numpy as np
import matplotlib.pyplot as plt
from scipy import signal
from filter import Filter

class Process:
    def __init__(self):
        self.filter = Filter()
    def apply_filter(self, filter:Filter, signal:np.ndarray) -> np.ndarray:
        numrator , denominator = signal.zpk2tf(self.filter.zeros, self.filter.poles, self.filter.gain)
        new_signal = signal.lfilter(numrator, denominator, signal)
        return new_signal
    def all_pass(self, a:complex)-> None:
        filter_all = Filter()
        filter_all.all_pass(a)
        freq , mag, phase = filter_all.get_response()
        filter_all.plot_response(freq, mag, phase)