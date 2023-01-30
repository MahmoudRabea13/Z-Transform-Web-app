from flask import Flask, jsonify , request, render_template 
import os
import json
import numpy as np
from classes.filter import Filter
from classes.process import Process
app = Flask( __name__ )
process = Process()
filter = Filter()
@app.route("/" ,methods=['POST','GET'])
def image():
    if request.method == 'POST':
        value = request.json['signal']
        process.set_filter([-0.99], [], 1)
        value = np.array(value)
        value = process.apply_filter(value) 
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
        frequency, magnitude,phase = process.get_response()
        return jsonify({'frequency':frequency.tolist(),'magnitude':magnitude.tolist(),'phase':phase.tolist()})
    else:
        return render_template('index.html')
if __name__ == '__main__':
    app.run(debug=True)
