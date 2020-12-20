from flask import Blueprint,redirect,url_for,jsonify,make_response,request
from ..models.users import User
from ..utils.database import db
from flask_login import login_user,logout_user
from ..controllers.methods import check_email_exists,check_username_exists


auth_bp=Blueprint('auth',__name__)


@auth_bp.route('/signup',methods=['POST'])
def create_account():

    data=request.get_json()
    username=data.get('username')
    email=data.get('email')
    tel_phone=data.get('tel_phone')
    password=data.get('password')
    confirm=data.get('password')

  
    if not check_email_exists(email) and not check_username_exists(password):

        new_user=User(username=username,email=email,tel_phone=tel_phone)

        new_user.create_password_hash(password)

        new_user.save()


        return make_response(jsonify({
                                "message":"Account Created Successully!",
                                "success":True
                                
                                }),201)

    else:
        return make_response(jsonify({"message":"Invalid Credentials",
                                      "success":False
                                        }))


@auth_bp.route('/login',methods=['POST'])
def sign_in_user():
    username=request.form.get('username')
    password=request.form.get('password')

    user=User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        login_user(user)

        return redirect(url_for('ui.users_orders'))

    else:
        return redirect(url_for('ui.login_failed'))


@auth_bp.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('ui.index'))