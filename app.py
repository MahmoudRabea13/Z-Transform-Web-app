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


def convert_to_complex(input):
    out = []
    for i in range(len(input)):
        out.append(input[i].get('x')+input[i].get('y')*1j)
    return out
@app.route("/" ,methods=['POST','GET'])
def image():
    if request.method == 'POST':
        value = request.json['signal']
        value = np.array(value)
        value = process.apply_filter(value) 
        return json.dumps(value.tolist())
    else:
        return render_template('index.html')


        
@app.route("/filter" ,methods=['GET','POST'])
def filter():
    if request.method == 'POST': 
        zeros = request.json['zeros']
        poles = request.json['poles']
        # print(zeros[0].get('y'))
        zeros_out = convert_to_complex(zeros)
        poles_out = convert_to_complex(poles)
        process.set_filter(zeros_out, poles_out, 1)
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
        frequency, magnitude,phase = process.all_pass(complex(value))
        response = {'frequency':frequency.tolist(),'phase':phase.tolist()}
        return json.dumps(response)
    else:
        return render_template('index.html')
@app.route("/applyallpass" ,methods=['GET','POST'])
def applyallpass():
    if request.method == 'POST': 
        value = request.json
        print(value)
        process.add_all_pass(complex(value))
        frequency, magnitude,phase = process.get_response()
        response = {'frequency':frequency.tolist(),'phase':phase.tolist(),'magnitude':magnitude.tolist()}
        return json.dumps(response)
    else:
        return render_template('index.html')

@app.route("/importsignal" ,methods=['GET','POST'])
def importsignal():
    if request.method == 'POST': 
        value = request.files.get('imported-signal')
        # print(value.filename)
        importedsig = pd.read_csv('./static/imported-signals/'+value.filename)
        # print(importedsig['x'])
        new_signal = process.apply_filter(importedsig['y'])
        response = {'x':importedsig['x'].tolist(),'y':importedsig['y'].tolist(),'y_new':new_signal.tolist()}
        return json.dumps(response)
    else:
        return render_template('index.html')
@app.route("/importfilter" ,methods=['GET','POST'])
def importfilter():
    if request.method == 'POST': 
        value = request.files.get('imported-filter')
        print(value.filename)
        #importedsig = pd.read_csv('./static/imported-signals/'+value.filename)
        # print(importedsig['x'])
        #new_signal = process.apply_filter(importedsig['y'])
        #response = {'x':importedsig['x'].tolist(),'y':importedsig['y'].tolist(),'y_new':new_signal.tolist()}
        return 'yessss'
    else:
        return render_template('index.html')
@app.route("/download", methods=['GET','POST'])
def export_filter():
    if request.method == 'POST':
        down = request.json
        print(down)
        zeros,poles = process.get_zeros_poles()
        to_json = [zeros,poles]
        if down != None :
            with open("filter.json", "w") as outfile:
                    outfile.write(str(to_json))
    return 'success'





if __name__ == '__main__':
    app.run(debug=True)
