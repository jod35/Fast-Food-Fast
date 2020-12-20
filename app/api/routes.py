from flask import Blueprint,jsonify,url_for,make_response,request
from flask_login import current_user
from ..models.users import User,Order
from ..models.schemas import OrderSchema
from ..utils.database import db
from datetime import datetime


api_bp=Blueprint('api',__name__)

#get all orders
@api_bp.route('/orders',methods=['GET'])
def get_orders():

    orders=Order.query.order_by(Order.id.desc()).all()

    order_schema=OrderSchema()

    result=order_schema.dump(orders,many=True)

    return make_response(jsonify({"orders":result}),200)



#create new order
@api_bp.route('/orders',methods=['POST'])
def create_order():
    data=request.get_json()
    
    new_order=Order(
        order=data.get('order'),
        location=data.get('location'),
        comment=data.get('comment'),
        price=data.get('price'),
        sender=current_user,
         )

    new_order.save()

    order_schema=OrderSchema()

    order=order_schema.dump(new_order)

    return make_response(jsonify({
        "message":"Order Created",
         "order":order
         
         }),201)


#get order by id
@api_bp.route('/order/<int:id>',methods=['GET'])
def get_order(id):
    order=Order.query.get_or_404(id)

    result=OrderSchema().dump(order)

    return make_response(jsonify({"success":True,
                                  "order":result
                            }))


#update order 
@api_bp.route('/order/<int:id>',methods=['PATCH'])
def update_order(id):
    order=Order.query.get_or_404(id)

    data=request.get_json()

    order.location=data.get('location')
    order.price=data.get('price')
    order.comment=data.get('comment')
    order.order=data.get('order')

    db.session.commit()

    new_order=OrderSchema().dump(order)
    return make_response(jsonify({"message":"Order Updated Successfully",
                                  "order": new_order
        }))

#replace order
@api_bp.route('/order/<int:id>',methods=['PUT'])
def replace_order(id):
    order=Order.query.get_or_404(id)

    data=request.get_json()

    order.location=data.get('location')
    order.price=data.get('price')
    order.comment=data.get('comment')
    order.order=data.get('order')

    db.session.commit()

    new_order=OrderSchema().dump(order)
    return make_response(jsonify({"message":"Order Replaced Successfully",
                                  "order": new_order
        }))
    

@api_bp.route('/order/<int:id>',methods=['DELETE'])
def delete_order(id):
    order=Order.query.get_or_404(id)

    order.delete()

    deleted=OrderSchema().dump(order)

    return make_response(jsonify({"message":"Order Deleted",
                                  "order":deleted
        }))


@api_bp.route('/orders/complete',methods=['GET'])
def get_completed_orders():
    orders=Order.query.filter_by(delivery_complete=True).all()

    result=OrderSchema().dump(orders,many=True)

    return make_response(jsonify({"success":True,
                                  "orders":result
                        }))


@api_bp.route('/order/complete/<int:id>',methods=['PATCH'])
def complete_order(id):
    order=Order.query.get_or_404(id)

    order.delivery_complete=True
    order.delivery_time=datetime.utcnow()

    db.session.commit()

    result=OrderSchema().dump(order)

    return make_response(jsonify({"success":True,
                                  "message":"Order has been Completed",
                                  "order":result
                    }))


