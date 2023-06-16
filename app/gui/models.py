#from app import db
from sqlalchemy.dialects.postgresql import JSON


from gui import db, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# table for available roles
class Role(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), unique=True)
    
    def __repr__(self):
        return f"Role({self.id}, {self.name})"          

   
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(), unique=False, nullable=False)
    logintime = db.Column(db.Float(), unique=False, nullable=False)
    last_ping = db.Column(db.Float(), unique=False, nullable=False)
    activetime = db.Column(db.Float(), unique=False, nullable=False)
    settime = db.Column(db.Float(), unique=False, nullable=False)
    annotations = db.relationship('Annotation', back_populates='user')
    tweets = db.relationship('Tweet', back_populates='user')
    roles = db.relationship('Role', secondary='user_roles',
                backref=db.backref('users', lazy='dynamic'))
    def __repr__(self):
        return f"User({self.id}, {self.username}, {self.logintime}, {self.last_ping}" +\
        f"{self.activetime}, {self.settime}"


class UserRoles(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer(), db.ForeignKey('role.id', ondelete='CASCADE'))
    
    def __repr__(self):
        return f"UserRoles({self.id}, {self.user_id}, {self.role_id})"
		

class Patent(db.Model):
    __tablename__ = 'patents'
    __table_args__ = {'extend_existing': True} 
    id = db.Column(db.String(), primary_key=True)
    filename = db.Column(db.String())
    path = db.Column(db.String())
    source = db.Column(db.String())
    external_id = db.Column(db.String())
    def __init__(self, filename, path, source, external_id):
        self.filename = filename
        self.path = path
        self.source = source
        self.external_id = external_id
    def __repr__(self):
        return '<id {}>'.format(self.id)


class Image(db.Model):
    __tablename__ = 'images'
    __table_args__ = {'extend_existing': True} 
    id = db.Column(db.String(), primary_key=True)
    caption = db.Column(db.String())
    patent_id = db.Column(db.String())
    orientation = db.Column(db.String())
    image_type_class = db.Column(db.String())
    image_orientation_class = db.Column(db.String())
    keywords_mapping = db.Column(db.String())
    ocr_mapping = db.Column(db.String())
    def __init__(self, caption,patent_id,orientation,image_type_class,image_orientation_class,keywords_mapping,ocr_mapping):
        self.caption = caption
        self.patent_id = patent_id
        self.orientation = orientation
        self.image_type_class = image_type_class
        self.image_orientation_class = image_orientation_class
        self.keywords_mapping = keywords_mapping
        self.ocr_mapping = ocr_mapping
    def __repr__(self):
        return '<id {}>'.format(self.id)


