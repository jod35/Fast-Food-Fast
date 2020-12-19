from flask import Blueprint,render_template,url_for
from flask_login import login_required
from ..models.users import Order


ui_bp=Blueprint('ui',__name__,template_folder='templates')

@ui_bp.route('/')
def index():
    return render_template('index.html')


@ui_bp.route('/login_fail')
def login_failed():
    return render_template('login.html')

@ui_bp.route('/orders')
def users_orders():
    orders=Order.query.order_by(Order.id.desc()).all()


    return render_template('orders.html' ,orders=orders)

