from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models import db, UserChallenge, Plan, Trade
from services.prices import get_yahoo_price
from services.challenge_engine import evaluate_challenge

trades_bp = Blueprint("trades", __name__, url_prefix="/api")

@trades_bp.post("/checkout/mock")
@jwt_required()
def checkout_mock():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}
    plan_id = data.get("plan_id")
    method = data.get("method", "CMI")
    plan = Plan.query.get(plan_id)
    if not plan:
        return jsonify({"error": "plan not found"}), 404

    ch = UserChallenge(
        user_id=user_id,
        plan_id=plan.id,
        starting_balance=plan.starting_balance,
        equity=plan.starting_balance,
        day_start_equity=plan.starting_balance
    )
    db.session.add(ch)
    db.session.commit()
    return jsonify({"message": "payment_success", "method": method, "challenge_id": ch.id}), 201

@trades_bp.post("/trades/open")
@jwt_required()
def open_trade():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}
    challenge_id = data.get("challenge_id")
    symbol = data.get("symbol")
    side = data.get("side")
    qty = float(data.get("qty", 0))
    market = data.get("market", "YAHOO")

    ch = UserChallenge.query.get(challenge_id)
    if not ch or ch.user_id != user_id:
        return jsonify({"error": "challenge not found"}), 404
    if ch.status != "active":
        return jsonify({"error": f"challenge is {ch.status}"}), 400
    if qty <= 0:
        return jsonify({"error": "qty must be > 0"}), 400

    if market == "YAHOO":
        price = get_yahoo_price(symbol)
    else:
        return jsonify({"error": "BVC not implemented in this skeleton"}), 400

    t = Trade(
        challenge_id=ch.id,
        symbol=symbol,
        market=market,
        side=side,
        qty=qty,
        entry_price=price,
        status="OPEN",
    )
    db.session.add(t)
    db.session.commit()
    return jsonify({"trade_id": t.id, "entry_price": price}), 201

@trades_bp.post("/trades/close")
@jwt_required()
def close_trade():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}
    trade_id = data.get("trade_id")

    t = Trade.query.get(trade_id)
    if not t:
        return jsonify({"error": "trade not found"}), 404

    ch = UserChallenge.query.get(t.challenge_id)
    if ch.user_id != user_id:
        return jsonify({"error": "forbidden"}), 403
    if t.status != "OPEN":
        return jsonify({"error": "trade already closed"}), 400

    if t.market == "YAHOO":
        exit_price = get_yahoo_price(t.symbol)
    else:
        return jsonify({"error": "BVC not implemented"}), 400

    if t.side == "BUY":
        pnl = (exit_price - t.entry_price) * t.qty
    else:  # SELL
        pnl = (t.entry_price - exit_price) * t.qty

    t.exit_price = exit_price
    t.pnl = pnl
    t.status = "CLOSED"
    t.closed_at = datetime.utcnow()

    ch.equity = float(ch.equity) + float(pnl)

    db.session.commit()

    # vérifie les règles après MAJ equity
    ch = evaluate_challenge(ch.id)

    return jsonify({
        "trade_id": t.id,
        "exit_price": exit_price,
        "pnl": pnl,
        "equity": ch.equity,
        "challenge_status": ch.status
    })
