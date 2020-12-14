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