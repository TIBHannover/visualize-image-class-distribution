from gui import app
#from gui import db
from flask import render_template

#import glob
#import cv2
#import pickle

import numpy as np
import json

from flask import request,jsonify

import uuid
#import psycopg2
import requests
#from gui import models

#establishing the connection
#conn = psycopg2.connect(
#   database="abc", user=app.config['dbuser'], password=app.config['dbpass'], host='localhost', port= '5432'
#)
#conn.autocommit = True
# Open a cursor to perform database operations
#cur = conn.cursor()

# list of working pages
# http://localhost:5009/get_search_ui?name=test_user1
# http://localhost:5009/get_search_result_ui?name=test_user1

from flask import send_from_directory

base_web_address = app.config['base_web_address']
static_base_address = app.config['static_base_address']
usersArr=["test_user1","test_user2"] # list(userDict.keys())


@app.route(base_web_address+'/patents/<patent_id>/images/<filename>',  methods=["GET"])
def get_patent_image(patent_id, filename):
    patents_folder = app.config["patents_folder"]
    return send_from_directory(f"{patents_folder}/{patent_id}/images", filename)

@app.route(base_web_address+'/patents/<patent_id>/<pdffilename>',  methods=["GET"])
def get_patent_pdf(patent_id, pdffilename):
    patents_folder = app.config["patents_folder"]
    return send_from_directory(f"{patents_folder}/{patent_id}", pdffilename)

@app.route(base_web_address+'/static/<path:path>')
def send_js(path):
    return send_from_directory('static', path)
    
@app.route(base_web_address+'/', methods=["GET", "POST"])
def index():
    userGet= "test_user1" #request.args.get("name")
    print("request get_search_ui: ",userGet)
    if(userGet in usersArr):
        return render_template('search.html',filebase=static_base_address)
    else:
        return render_template('access_forbidden.html')


@app.route(base_web_address+'/get_patent_stats', methods=["POST"])
def get_patent_stats():
    print("getPatentStats req: ",request.values)
    response = {"feedback":"not implemented yet"}
    return json.dumps(response)

    
@app.route(base_web_address+'/get_search_ui', methods=["GET"])
def get_search_ui():
    #userGet=request.args.get("name")
    userGet = "test_user1"
    print("request get_search_ui: ",userGet)
    if(userGet in usersArr):
        return render_template('search.html',filebase=static_base_address)
    else:
        return render_template('access_forbidden.html')


@app.route('/getAllData', methods = ['POST'])
def getAllPatents():
    print (request.is_json)
    content = request.get_json()
    print("content: ",content)
    result = []
    responce = {"result":result,"status":200}
    print(responce)
    return responce
