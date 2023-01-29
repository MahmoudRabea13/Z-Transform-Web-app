import os
import json
import pandas as pd
from flask import Flask, render_template, jsonify, request


app = Flask(__name__)
@app.route('/', methods=['GET', 'POST'])
def index():
    pass