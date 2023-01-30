from flask import Flask, jsonify , request, render_template 
import os
import json
import numpy as np
from classes.filter import Filter
from classes.signal_1 import Signal_1
value = []
filter1 = Filter()
app = Flask( __name__ )
@app.route("/" ,methods=['POST','GET'])
def image():
    if request.method == 'POST':
        value = request.json['signal']
        filter1.set_zeros([1])
        filter1.set_poles([0])
        filter1.set_gain(1)
        new = Signal_1(filter)
        value = np.array(value)
        value = new.apply_filter(value) 
        # print(value.shape)
        return json.dumps(value.tolist())
    else:
        return render_template('index.html')



@app.route("/catalog" ,methods=['POST','GET'])
def catalog():
    if request.method == 'POST':
        pass
    return render_template('catalog.html')
@app.route("/filter" ,methods=['GET','POST'])
def filter():
    if request.method == 'POST':
        value = request.json['signal']
        filter1.set_zeros([1])
        filter1.set_poles([0])
        filter1.set_gain(1)
        frequency, magnitude, phase = filter1.get_response()   
        return json.dump(magnitude.tolist())
    else:
        return render_template('index.html')
if __name__ == '__main__':
    app.run(debug=True)
