#!/usr/bin/env python3
import argparse
import logging
import os

from gui import app
from datetime import timedelta
#from process_json import open_jsonl, read_jsonl, set_required_fields


logging.basicConfig(format='%(asctime)s %(levelname)s: %(message)s',
                        datefmt='%d-%m-%Y %H:%M:%S',
                        level=logging.INFO)

# remove from running path '/instance' to create correct path for storing
path = app.instance_path[:-8]
app.config['PATH'] = path
#config = open_jsonl(path + 'gui/data/json/config.jsonl')
#config = config.read().splitlines()
#set_required_fields(config[0])
app.config['MEDIA_UPLOAD'] = path + 'data/media'
app.config['ALLOWED_JSON_EXTENSIONS'] = ['jsonl']
#app.config['ANNOTATION_TYPES'] = read_jsonl(config[1:])
app.config['ALLOWED_ANNOTATION_TYPES'] = ['radio', 'text', 'categories', 'selection']

def parse_args():
    parser = argparse.ArgumentParser(description='')
    parser.add_argument('--hostname', type=str, default='localhost', help='localhost name')
    parser.add_argument('--port', type=str, default='5011', help='port number')
    parser.add_argument('--debug', action='store_true', help='set to enable debug mode')
    return parser.parse_args()


if __name__ == '__main__':
    args = parse_args()
    portSetting = int(os.environ.get("PORT", args.port))
    app.run(host=args.hostname, debug=args.debug, port=portSetting)