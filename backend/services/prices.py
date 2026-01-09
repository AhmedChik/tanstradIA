import yfinance as yf
import requests
from bs4 import BeautifulSoup

def get_yahoo_price(ticker: str) -> float:
    t = yf.Ticker(ticker)
    # fast_info est souvent plus rapide
    fi = getattr(t, "fast_info", None)
    if fi and fi.get("lastPrice"):
        return float(fi["lastPrice"])
    hist = t.history(period="1d", interval="1m")
    if hist.empty:
        raise ValueError("No price data")
    return float(hist["Close"].iloc[-1])

def get_bvc_price(symbol: str) -> float:
    # MVP: à remplacer par ton vrai scraper BVC / BVCscrap
    # Ici: on simule (ou tu fais un vrai scraping si tu as l’URL stable)
    raise NotImplementedError("BVC scraping not implemented yet")




def get_yahoo_history(ticker: str, period="1d", interval="1m", limit=300):
    t = yf.Ticker(ticker)
    hist = t.history(period=period, interval=interval)

    if hist is None or hist.empty:
        raise ValueError("No history data")

    # format pour Lightweight Charts: {time, value}
    hist = hist.tail(limit)
    points = []
    for idx, row in hist.iterrows():
        # idx est un Timestamp -> convert en unix seconds
        ts = int(idx.to_pydatetime().timestamp())
        points.append({"time": ts, "value": float(row["Close"])})
    return points
