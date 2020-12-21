import os
from decouple import config

BASEDIR=os.path.dirname(os.path.realpath(__file__))


class Config:
    SECRET_KEY='78536068914bad0067c69b75'
    SQLALCHEMY_TRACK_MODIFICATIONS=False


class DevConfig(Config):
    DEBUG=True
    SQLALCHEMY_DATABASE_URI='sqlite:///'+os.path.join(BASEDIR,'food.sqlite3')


class ProdConfig(Config):
    DEBUG=False
    SQLALCHEMY_ECHO=True
    SQLALCHEMY_DATABASE_URI=config('DATABASE_URI')

class TestConfig(Config):
    DEBUG=True
    SQLALCHEMY_DATABASE_URI='sqlite:///'+os.path.join(BASEDIR,'test.sqlite3')