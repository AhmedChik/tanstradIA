from flask import Blueprint, jsonify
from models import UserChallenge, User

leader_bp = Blueprint("leaderboard", __name__, url_prefix="/api/leaderboard")

@leader_bp.get("")
def leaderboard():
    # MVP: top 10 sur tous les challenges
    rows = (UserChallenge.query
            .join(User, User.id == UserChallenge.user_id)
            .all())

    data = []
    for ch in rows:
        pct = (ch.equity - ch.starting_balance) / ch.starting_balance * 100.0
        data.append({"user_id": ch.user_id, "challenge_id": ch.id, "status": ch.status, "equity": ch.equity, "pct": pct})

    data.sort(key=lambda x: x["pct"], reverse=True)
    return jsonify(data[:10])
