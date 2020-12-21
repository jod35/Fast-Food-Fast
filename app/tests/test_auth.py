from .. import create_app
from ..utils.database import db
from ..models.users import User,Order
from ..config import TestConfig




def test_create_account():
    
    """
        GIVEN a User model
        WHEN a user is created
        THEN Check if password, username and email are saved
    """

    new_user=User(username='testuser',
                  email='testuser@test.com',
                  tel_phone='0708800963'
                  )


    assert new_user.username=='testuser'
    assert new_user.email=='testuser@test.com'
    assert new_user.tel_phone=='0708800963'





def test_order_model():

    """
        GIVEN an Order model
        wHEN an order is created
        THEN check if the order id valid
    """

    new_order=Order(order='Fries',
                price=1230000,
                comment='My Money',
                location='Kira'    
    )

    assert new_order.location == 'Kira'
    assert new_order.price ==1230000
    assert new_order.comment == 'My Money'
    assert new_order.order == 'Fries'



