from flask import Flask
from .config import DevConfig,Config,TestConfig
from .ui.routes import ui_bp
from .utils.database import db
from .models.users import User,Order
from .utils.logins import login_manager
from .auth.routes import auth_bp
from .api.routes import api_bp
from flask_migrate import Migrate


def create_app():
    app=Flask(__name__,static_folder='static')

    app.config.from_object(DevConfig)

    app.register_blueprint(ui_bp,url_prefix='/')

    app.register_blueprint(auth_bp,url_prefix='/auth')

    app.register_blueprint(api_bp,url_prefix='/api')

    db.init_app(app)

    migrate=Migrate(app,db)
    

    login_manager.init_app(app)

    @app.shell_context_processor
    def make_shell_context():
        return {
            'app':app,
            'db':db,
            'User':User,
            'Order':Order
        }
    return app