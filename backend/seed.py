from app import create_app
from models import db, Plan

app = create_app()
with app.app_context():
    if Plan.query.count() == 0:
        db.session.add_all([
            Plan(name="Starter", price_dh=199, starting_balance=500.0),
            Plan(name="Pro", price_dh=399, starting_balance=1000.0),
            Plan(name="Elite", price_dh=799, starting_balance=2000.0),
        ])
        db.session.commit()
        print("Seed OK")
    else:
        print("Plans already exist")
