"""
Download and process portrait and sculpture images from Wikimedia Commons.
Portraits: 150×150px square crop.
Sculptures: resize to max 2000px on longest edge, preserve aspect ratio.

Run from the repo root:
    python3 scripts/download_images.py
"""

import urllib.request
import urllib.parse
import json
import os
import io
import sys
import time

try:
    from PIL import Image
except ImportError:
    sys.exit("Install Pillow first: pip3 install Pillow")

PORTRAITS_DIR = "public/images/portraits"
SCULPTURES_DIR = "public/images/sculptures"
UA = "APLitSite/1.0 (educational; ap-lit-site)"

# ── helpers ──────────────────────────────────────────────────────────────────

def wm_url(filename, thumb_width=None):
    """
    Resolve a Wikimedia Commons File: name to a download URL.
    If thumb_width is given, returns a thumbnail URL at that width
    (recommended by Wikimedia to avoid rate limits on full-res downloads).
    """
    params = {
        "action": "query",
        "titles": f"File:{filename}",
        "prop": "imageinfo",
        "iiprop": "url",
        "format": "json"
    }
    if thumb_width:
        params["iiprop"] = "url|thumburl"
        params["iiurlwidth"] = thumb_width
    api = f"https://commons.wikimedia.org/w/api.php?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(api, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=15) as r:
        data = json.loads(r.read())
    pages = data["query"]["pages"]
    page = next(iter(pages.values()))
    if "imageinfo" not in page:
        return None
    info = page["imageinfo"][0]
    if thumb_width and "thumburl" in info:
        return info["thumburl"]
    return info["url"]

def download(url, label):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    print(f"  ✓ downloaded {label} ({len(data)//1024}KB)")
    return data

def save_portrait(img_bytes, out_path, crop_box=None):
    """
    Crop to square and resize to 150×150.
    crop_box: (left, upper, right, lower) as fractions of image dimensions (0.0–1.0).
    If None, crops from the upper-center (head tends to be top half of portrait paintings).
    """
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    w, h = img.size

    if crop_box:
        l = int(crop_box[0] * w)
        u = int(crop_box[1] * h)
        r = int(crop_box[2] * w)
        b = int(crop_box[3] * h)
        img = img.crop((l, u, r, b))
    else:
        side = min(w, h)
        left = (w - side) // 2
        top = max(0, int(h * 0.05))
        top = min(top, h - side)
        img = img.crop((left, top, left + side, top + side))

    img = img.resize((150, 150), Image.LANCZOS)
    img.save(out_path, "JPEG", quality=90)
    print(f"  ✓ saved → {out_path}")

def save_sculpture(img_bytes, out_path, max_px=2000):
    """Resize so the longest edge ≤ max_px, preserving aspect ratio."""
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    w, h = img.size
    if max(w, h) > max_px:
        scale = max_px / max(w, h)
        img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    img.save(out_path, "JPEG", quality=88)
    print(f"  ✓ saved → {out_path} ({img.size[0]}×{img.size[1]})")

def process(wm_file, out_path, kind, crop_box=None, label=None):
    """Download and process one image. Returns True on success."""
    lbl = label or wm_file
    if os.path.exists(out_path):
        print(f"  – skipping (exists): {os.path.basename(out_path)}")
        return True
    # Use thumbnail API to avoid Wikimedia rate limits on full-res downloads.
    # For portraits we only need 600px wide (we crop to 150×150).
    # For sculptures we request 2000px, which is our target max.
    thumb_width = 600 if kind == "portrait" else 2000
    url = wm_url(wm_file, thumb_width=thumb_width)
    if not url:
        print(f"  ✗ NOT FOUND on Wikimedia: {wm_file}")
        return False
    try:
        data = download(url, lbl)
    except Exception as e:
        print(f"  ✗ download error: {e}")
        return False
    if kind == "portrait":
        save_portrait(data, out_path, crop_box)
    else:
        save_sculpture(data, out_path)
    time.sleep(30.0)  # polite delay — giving upload.wikimedia.org time to reset rate limit
    return True

# ── directory setup ───────────────────────────────────────────────────────────
for period in ["00-medieval", "01-renaissance", "02-baroque",
               "03-enlightenment", "04-romanticism", "05-modernism"]:
    os.makedirs(f"{SCULPTURES_DIR}/{period}", exist_ok=True)
os.makedirs(PORTRAITS_DIR, exist_ok=True)

# ─────────────────────────────────────────────────────────────────────────────
# PORTRAITS
# crop_box = (left, upper, right, lower) as 0.0–1.0 fractions
# ─────────────────────────────────────────────────────────────────────────────
print("\n=== PORTRAITS ===\n")

PORTRAITS = [
    # ── Existing entries, portrait field added ────────────────────────────────
    {
        "label": "Leonardo da Vinci",
        "wm_file": "Leonardo da Vinci - presumed self-portrait - WGA12798.jpg",
        "out": f"{PORTRAITS_DIR}/portrait-davinci-leonardo.jpg",
        # Red chalk; face occupies upper portion, roughly centered horizontally
        "crop": (0.18, 0.04, 0.82, 0.68),
    },
    # Michelangelo and Raphael and Palestrina: already downloaded in prior run
    # (skip if files already exist — the process() helper handles this)
    {
        "label": "Michelangelo",
        "wm_file": "Michelangelo_Daniele_da_Volterra_(dettaglio).jpg",
        "out": f"{PORTRAITS_DIR}/portrait-michelangelo.jpg",
        "crop": None,
    },
    {
        "label": "Raphael",
        "wm_file": "Raffaello_Sanzio.jpg",
        "out": f"{PORTRAITS_DIR}/portrait-raphael.jpg",
        "crop": (0.15, 0.0, 0.85, 0.7),
    },
    {
        "label": "Palestrina",
        "wm_file": "Giovanni_Pierluigi_da_Palestrina.jpg",
        "out": f"{PORTRAITS_DIR}/portrait-palestrina.jpg",
        "crop": None,
    },

    # ── New sculptor portraits ─────────────────────────────────────────────────
    {
        # Pre-cropped version showing Donatello from the "Five Famous Men" panel
        "label": "Donatello",
        "wm_file": "Five Famous Men of the Florentine Renaissance, Donatello (cropped).jpg",
        "out": f"{PORTRAITS_DIR}/portrait-donatello.jpg",
        "crop": None,
    },
    {
        "label": "Bernini",
        "wm_file": "Gian Lorenzo Bernini, self-portrait, c1623.jpg",
        "out": f"{PORTRAITS_DIR}/portrait-bernini-gian-lorenzo.jpg",
        "crop": (0.1, 0.0, 0.9, 0.75),
    },
    {
        # Louis-Léopold Boilly, Portrait of Houdon, Louvre/Lille
        "label": "Houdon",
        "wm_file": "Houdon-boilly.jpg",
        "out": f"{PORTRAITS_DIR}/portrait-houdon-jean-antoine.jpg",
        "crop": None,
    },
    {
        "label": "Canova",
        "wm_file": "Self portrait by Antonio Canova.jpg",
        "out": f"{PORTRAITS_DIR}/portrait-canova-antonio.jpg",
        "crop": None,
    },
    {
        # Anton Raphael Mengs, Portrait of Winckelmann, Metropolitan Museum
        "label": "Winckelmann",
        "wm_file": "Anton Raphael Mengs - Portrait of Johann Joachim Winckelman - WGA15043.jpg",
        "out": f"{PORTRAITS_DIR}/portrait-winckelmann-johann.jpg",
        "crop": (0.1, 0.0, 0.9, 0.78),
    },
    {
        # Photograph by Nadar, 1891 — public domain (photographer died 1910)
        "label": "Rodin",
        "wm_file": "Auguste Rodin fotografato da Nadar nel 1891.jpg",
        "out": f"{PORTRAITS_DIR}/portrait-rodin-auguste.jpg",
        "crop": None,
    },
    {
        "label": "François Rude",
        "wm_file": "François_Rude.jpg",
        "out": f"{PORTRAITS_DIR}/portrait-rude-francois.jpg",
        "crop": None,
    },
    {
        # Puget self-portrait (WGA catalogue number)
        "label": "Pierre Puget",
        "wm_file": "Pierre Puget - Self-portrait - WGA18487.jpg",
        "out": f"{PORTRAITS_DIR}/portrait-puget-pierre.jpg",
        "crop": (0.1, 0.02, 0.9, 0.78),
    },
    {
        # 1921 photograph by Man Ray — pre-1928, public domain in US
        "label": "Marcel Duchamp",
        "wm_file": "Rrose Sélavy (Marcel Duchamp), 1921 photograph by Man Ray.jpg",
        "out": f"{PORTRAITS_DIR}/portrait-duchamp-marcel.jpg",
        "crop": None,
    },
    # Brancusi, Giacometti, David Smith — no clearly public-domain portrait photos
    # found on Wikimedia Commons; flagged for manual sourcing below.
]

failed_portraits = []
for p in PORTRAITS:
    print(f"→ {p['label']}")
    ok = process(p["wm_file"], p["out"], "portrait", p.get("crop"), p["label"])
    if not ok:
        failed_portraits.append(p)

# ─────────────────────────────────────────────────────────────────────────────
# SCULPTURES
# ─────────────────────────────────────────────────────────────────────────────
print("\n=== SCULPTURE IMAGES ===\n")

SCULPTURES = [
    # ── 00 Medieval ──────────────────────────────────────────────────────────
    {
        "label": "Gislebertus Last Judgment Tympanum",
        "wm_file": "Autun St Lazare Tympanon.jpg",
        "out": f"{SCULPTURES_DIR}/00-medieval/gislebertus-last-judgment-tympanum.jpg",
    },
    {
        "label": "Chartres Royal Portal (tympan central)",
        "wm_file": "Chartres - portail royal, tympan central.jpg",
        "out": f"{SCULPTURES_DIR}/00-medieval/chartres-royal-portal.jpg",
    },

    # ── 01 Renaissance ────────────────────────────────────────────────────────
    {
        "label": "Michelangelo David",
        "wm_file": "Michelangelos_David.jpg",
        "out": f"{SCULPTURES_DIR}/01-renaissance/michelangelo-david.jpg",
    },
    {
        "label": "Donatello David (Bargello)",
        "wm_file": "Donatello - David - Florença.jpg",
        "out": f"{SCULPTURES_DIR}/01-renaissance/donatello-david.jpg",
    },
    {
        "label": "Michelangelo Pietà",
        "wm_file": "Michelangelo's_Pieta_5450_cut_out_black.jpg",
        "out": f"{SCULPTURES_DIR}/01-renaissance/michelangelo-pieta.jpg",
    },

    # ── 02 Baroque ────────────────────────────────────────────────────────────
    {
        "label": "Bernini Apollo and Daphne",
        "wm_file": "Apollo and Daphne (Bernini).jpg",
        "out": f"{SCULPTURES_DIR}/02-baroque/bernini-apollo-daphne.jpg",
    },
    {
        # Wide shot showing full Cornaro Chapel installation
        "label": "Bernini Ecstasy of Saint Teresa (Cornaro Chapel wide)",
        "wm_file": "Cornaro chapel in Santa Maria della Vittoria in Rome HDR.jpg",
        "out": f"{SCULPTURES_DIR}/02-baroque/bernini-ecstasy-saint-teresa.jpg",
    },
    {
        "label": "Bernini David",
        "wm_file": "David by Bernini, 1623-1624, Villa Borghese, Rome.jpg",
        "out": f"{SCULPTURES_DIR}/02-baroque/bernini-david.jpg",
    },
    {
        "label": "Puget Milo of Croton (Louvre)",
        "wm_file": "Milo of Croton by Pierre Puget (Louvre MR 2075) 20141107 140121.jpg",
        "out": f"{SCULPTURES_DIR}/02-baroque/puget-milo-croton.jpg",
    },

    # ── 03 Enlightenment ──────────────────────────────────────────────────────
    {
        "label": "Houdon Voltaire Seated (1781)",
        "wm_file": "Jean-Antoine Houdon, voltaire, 1781.JPG",
        "out": f"{SCULPTURES_DIR}/03-enlightenment/houdon-voltaire-seated.jpg",
    },
    {
        # Full view from angle — better than the detail crops
        "label": "Canova Psyche Revived by Cupid's Kiss",
        "wm_file": "Canova-Psyche Revived By Cupids Kiss angle- reverse view.jpg",
        "out": f"{SCULPTURES_DIR}/03-enlightenment/canova-psyche-revived.jpg",
    },

    # ── 04 Romanticism ────────────────────────────────────────────────────────
    {
        # In front of Calais city hall — closer to Rodin's ground-level intention
        "label": "Rodin Burghers of Calais (Calais installation)",
        "wm_file": "Les Bourgeois de Calais devant l'hôtel de ville.jpg",
        "out": f"{SCULPTURES_DIR}/04-romanticism/rodin-burghers-calais.jpg",
    },
    {
        "label": "Rodin Gates of Hell (with Adam and Eve)",
        "wm_file": "Gates of Hell sculpture by Rodin surrounded by Adam and Eve.JPG",
        "out": f"{SCULPTURES_DIR}/04-romanticism/rodin-gates-of-hell.jpg",
    },
    {
        # Shows relief in architectural context on Arc de Triomphe
        "label": "Rude La Marseillaise (Arc de Triomphe)",
        "wm_file": "Le Départ des Volontaires (La Marseillaise) par Rude, Arc de Triomphe Etoile Paris.jpg",
        "out": f"{SCULPTURES_DIR}/04-romanticism/rude-la-marseillaise.jpg",
    },

    # ── 05 Modernism ─────────────────────────────────────────────────────────
    # Brancusi Bird in Space — searching for this specifically
    # The 1928 MoMA cast is PD in US; need to find correct Wikimedia filename
    # (not found in automated search — flagged for manual sourcing)
]

failed_sculptures = []
for s in SCULPTURES:
    print(f"→ {s['label']}")
    ok = process(s["wm_file"], s["out"], "sculpture", label=s["label"])
    if not ok:
        failed_sculptures.append(s)

# ─────────────────────────────────────────────────────────────────────────────
# SUMMARY
# ─────────────────────────────────────────────────────────────────────────────
print("\n" + "="*60)
print("SUMMARY")
print("="*60 + "\n")

if failed_portraits:
    print("Portraits NOT resolved (need manual sourcing):")
    for p in failed_portraits:
        print(f"  • {p['label']}")
        print(f"    tried: {p['wm_file']}")
        print(f"    save to: {p['out']}")
else:
    print("All targeted portraits resolved.")

print()
if failed_sculptures:
    print("Sculpture images NOT resolved (need manual sourcing):")
    for s in failed_sculptures:
        print(f"  • {s['label']}")
        print(f"    tried: {s['wm_file']}")
        print(f"    save to: {s['out']}")
else:
    print("All targeted sculpture images resolved.")

print("\nFlagged for Tim's copyright review (not downloaded):")
flagged = [
    ("Giacometti, City Square (1948)", f"{SCULPTURES_DIR}/05-modernism/giacometti-city-square.jpg"),
    ("David Smith, Hudson River Landscape (1951)", f"{SCULPTURES_DIR}/05-modernism/smith-hudson-river-landscape.jpg"),
    ("Duchamp, The Large Glass (1915–23)", f"{SCULPTURES_DIR}/05-modernism/duchamp-large-glass.jpg"),
]
for name, path in flagged:
    print(f"  • {name}")
    print(f"    save to: {path}")

print("\nPortraits needing manual sourcing:")
manual_portraits = [
    ("Brancusi", f"{PORTRAITS_DIR}/portrait-brancusi-constantin.jpg",
     "Search Wikimedia for a Brancusi self-portrait photo or Edward Steichen/Man Ray photograph"),
    ("Giacometti", f"{PORTRAITS_DIR}/portrait-giacometti-alberto.jpg",
     "Search for a pre-1978 photograph of Alberto Giacometti on Wikimedia Commons"),
    ("David Smith", f"{PORTRAITS_DIR}/portrait-smith-david.jpg",
     "Search for a public-domain photograph of David Smith at work"),
]
for name, path, note in manual_portraits:
    print(f"  • {name}: {note}")
    print(f"    save to: {path}")
