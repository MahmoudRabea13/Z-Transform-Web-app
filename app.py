from flask import Flask, jsonify , request, render_template 
import os
import json
import numpy as np

app = Flask( __name__ )
@app.route("/" ,methods=['POST','GET'])
def image():
    if request.method == 'POST':
        value = request.json['signal']
        print(value)
        return json.dumps(value)
    else:
        return render_template('index.html')



@app.route("/catalog" ,methods=['POST','GET'])
def catalog():
    if request.method == 'POST':
        
        return render_template('catalog.html')

@app.route("/filter" ,methods=['GET'])
def filter():
        var = np.random.randint(0,100,100)
        return jsonify(var)


if __name__ == '__main__':
    app.run(debug=True)
