from urllib import response
from flask import Flask, jsonify , request, render_template 
import os
import json
import numpy as np
from classes.filter import Filter
from classes.process import Process
import pandas as pd
app = Flask( __name__ )
process = Process()
filter = Filter()
# process.set_filter([-0.2,-0.5,0.98], [-0.99,0.5,0.2+0.6j], 1)
process.set_filter([1.3], [], 1)
@app.route("/" ,methods=['POST','GET'])
def image():
    if request.method == 'POST':
        value = request.json['signal']
        value = np.array(value)
        value = process.apply_filter(value) 
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
        value = request.json
        print(value)
        frequency, magnitude,phase = process.get_response()
        response = {'frequency':frequency.tolist(),'magnitude':magnitude.tolist(),'phase':phase.tolist()}
        return json.dumps(response)
    else:
        return render_template('index.html')
@app.route("/allpass" ,methods=['GET','POST'])
def allpass():
    if request.method == 'POST': 
        value = request.json
        print(value)
        frequency, magnitude,phase = process.all_pass(float(value))
        response = {'frequency':frequency.tolist(),'phase':phase.tolist()}
        return json.dumps(response)
    else:
        return render_template('catalog.html')
@app.route("/applyallpass" ,methods=['GET','POST'])
def applyallpass():
    if request.method == 'POST': 
        value = request.json
        print(value)
        process.add_all_pass(float(value))
        frequency, magnitude,phase = process.get_response()
        response = {'frequency':frequency.tolist(),'phase':phase.tolist()}
        return json.dumps(response)
    else:
        return render_template('catalog.html')

@app.route("/importsignal" ,methods=['GET','POST'])
def importsignal():
    if request.method == 'POST': 
        value = request.files.get('imported-signal')
        print(value.filename)
        importedsig = pd.read_csv('./static/imported-signals/'+value.filename)
        print(importedsig['x'])

        return json.dumps('hehehe')
    else:
        return render_template('catalog.html')

if __name__ == '__main__':
    app.run(debug=True)
