from marshmallow import fields,Schema

class OrderSchema(Schema):
    id=fields.Integer()
    order=fields.Str()
    location=fields.Str()
    comment=fields.Str()
    price=fields.Integer()
    date=fields.DateTime()
    delivery_time=fields.DateTime()
    delivery_complete=fields.Boolean()



class UserSchema(Schema):
    id=fields.Integer()
    username=fields.Str()
    email=fields.Str()
    tel_phone=fields.Str()

    