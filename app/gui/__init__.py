from flask import Flask
#from flask_bcrypt import Bcrypt
#from flask_login import LoginManager
from flask_cors import CORS
from flask_cors import cross_origin

import sys
import os 

app = Flask(__name__, template_folder='templates')
CORS(app)


#bcrypt = Bcrypt(app)
#login_manager = LoginManager(app)

#print("os.cwd: ",os.getcwd())
#baseForThis = "gui"

#try:
#    with open(os.path.join(os.getcwd(),"app","gui",'secret_key.txt'), 'r') as key_file:
#        secret_key = key_file.readline()[:32]
#        app.config['SECRET_KEY'] = secret_key
#except:
#    print('Couldn\'t read secret_key.txt. Did you generate a secret key?')
#    sys.exit(1)

#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = "08d8614cb1ed80f24fafd5cfa5242909"
UPLOAD_FOLDER = os.path.join("static","uploads")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5432/abc"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['base_web_address'] = "" #/vispatbase # do not change this from '' empty
app.config['static_base_address'] = "" #/vispat for production , empty for local
app.config['dbuser'] = "postgres"
app.config['dbpass'] = "postgres"
app.config['patents_folder'] = ""



from gui import views