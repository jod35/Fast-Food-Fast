from ..utils.database import db
from datetime import datetime
from werkzeug.security import generate_password_hash,check_password_hash
from flask_login import UserMixin
from ..utils.logins import login_manager
from marshmallow import fields ,Schema
from datetime import datetime

class User(db.Model,UserMixin):
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(255),nullable=False)
    email=db.Column(db.String(80),nullable=False)
    password=db.Column(db.String,nullable=False)
    isAdmin=db.Column(db.Boolean(),default=False)
    joined=db.Column(db.DateTime(),default=datetime.utcnow)
    orders=db.relationship('Order',backref='sender',lazy=True)
    tel_phone=db.Column(db.Text(),nullable=False)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    

    def __repr__(self):
        return f"User {self.username}"
        
    def create_password_hash(self,password):
        self.password=generate_password_hash(password)

    def check_password(self,password):
        return check_password_hash(self.password,password)


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


class Order(db.Model):
    id=db.Column(db.Integer(),primary_key=True)
    order=db.Column(db.String(),nullable=False)
    location=db.Column(db.String(),nullable=False)
    comment=db.Column(db.Text(),nullable=False)
    date=db.Column(db.DateTime(),default=datetime.utcnow)
    price=db.Column(db.Integer(),nullable=False)
    delivery_time=db.Column(db.DateTime())
    delivery_complete=db.Column(db.Boolean,default=False)
    user_id=db.Column(db.Integer(),db.ForeignKey('user.id'))

    def __repr__(self):
        return f"Order => {self.order}"
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def complete_delivery(self):
        self.delivery_complete=True
        self.delivery_time=datetime.utcnow

        db.session.commit()


