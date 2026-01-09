from flask import Blueprint, request, jsonify
from services.bvc import get_bvc_price

bvc_bp = Blueprint("bvc", __name__, url_prefix="/api/prices")

@bvc_bp.get("/bvc")
def bvc_price():
    symbol = request.args.get("symbol", "").strip()
    if not symbol:
        return jsonify({"error": "symbol is required"}), 400
    try:
        price = get_bvc_price(symbol)
        return jsonify({"symbol": symbol, "price": price})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
