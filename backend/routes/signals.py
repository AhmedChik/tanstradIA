from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from services.signals import sma_crossover_signal

signals_bp = Blueprint("signals", __name__, url_prefix="/api")

@signals_bp.get("/signals")
@jwt_required(optional=True)
def signals():
    ticker = request.args.get("symbol", "").strip()
    if not ticker:
        return jsonify({"error": "symbol is required"}), 400

    fast = int(request.args.get("fast", "5"))
    slow = int(request.args.get("slow", "20"))

    try:
        out = sma_crossover_signal(ticker, fast=fast, slow=slow)
        return jsonify(out)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
