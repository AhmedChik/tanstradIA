import requests
from bs4 import BeautifulSoup

def get_bvc_price(symbol: str) -> float:
    # TODO: remplacer par la vraie page BVC (cours / détail valeur)
    url = "METTRE_ICI_L_URL_BVC"
    r = requests.get(url, timeout=15)
    r.raise_for_status()

    soup = BeautifulSoup(r.text, "html.parser")

    # TODO: adapter les sélecteurs CSS à la page réelle
    # Exemple: price_text = soup.select_one("span.last-price").get_text(strip=True)
    # return float(price_text.replace(",", "."))
    raise NotImplementedError("BVC parsing: set URL + CSS selector")
