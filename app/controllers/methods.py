from ..utils.database import db
from ..models.users import User 

def check_username_exists(username):
    user=User.query.filter_by(username=username).first()

    if user:
        return True
    else:
        return False

def check_email_exists(email):
    user=User.query.filter_by(email=email).first()

    if user:
        return True
    else:
        return False
