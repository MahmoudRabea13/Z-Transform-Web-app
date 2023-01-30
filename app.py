from flask import Flask , request, render_template 
import os
import json

app = Flask( __name__ )

@app.route("/" ,methods=['POST','GET'])
def image():
    if request.method == 'POST':
        value = request.json['signal']
        print(value)
        return render_template('index.html')


    else:
        return render_template('index.html')



@app.route("/catalog" ,methods=['POST','GET'])
def catalog():
    if request.method == 'POST':
        
        return render_template('catalog.html')


    else:
        return render_template('catalog.html')

if __name__ == '__main__':
    app.run(debug=True)
