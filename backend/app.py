from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db
import os

from routes.auth import auth_bp
from routes.plans import plans_bp
from routes.trades import trades_bp
from routes.leaderboard import leader_bp
from routes.prices import prices_bp
from routes.signals import signals_bp
from routes.bvc import bvc_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"].split(",")}}, supports_credentials=False)
    db.init_app(app)
    JWTManager(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(plans_bp)
    app.register_blueprint(trades_bp)
    app.register_blueprint(leader_bp)
    app.register_blueprint(prices_bp)
    app.register_blueprint(signals_bp)
    app.register_blueprint(bvc_bp)
    


    @app.get("/health")
    def health():
        return {"status": "ok"}

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    # Allow host and port to be configured via environment variables for flexibility
    host = os.environ.get("HOST", "127.0.0.1")
    port = int(os.environ.get("PORT", 5000))
    app = create_app()
    print(f">>> Flask starting on http://{host}:{port}", flush=True)
    app.run(host=host, port=port, debug=False, use_reloader=False)
