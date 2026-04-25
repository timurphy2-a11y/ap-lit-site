#!/usr/bin/env python3
"""Crop and resize a portrait image to 150x150px, face-centered.

Usage:
    python3 crop_portrait.py input.jpg output.jpg [x_pct y_pct]

x_pct, y_pct: center of face crop as fraction of image width/height (default 0.5, 0.35)
"""
import sys
from PIL import Image

def crop_portrait(src, dst, cx=0.5, cy=0.35, zoom=1.0):
    img = Image.open(src).convert("RGB")
    w, h = img.size

    # Square side = min dimension * zoom (zoom < 1.0 crops tighter)
    side = int(min(w, h) * zoom)

    # Face center in pixels
    fx = int(w * cx)
    fy = int(h * cy)

    # Crop box
    left  = max(0, fx - side // 2)
    top   = max(0, fy - side // 2)
    right = left + side
    bottom = top + side

    # Clamp to image bounds
    if right > w:
        right = w
        left  = right - side
    if bottom > h:
        bottom = h
        top    = bottom - side
    left  = max(0, left)
    top   = max(0, top)

    cropped = img.crop((left, top, right, bottom))
    resized = cropped.resize((150, 150), Image.LANCZOS)
    resized.save(dst, "JPEG", quality=90)
    print(f"Saved {dst} ({w}x{h} -> 150x150, crop center {cx:.2f},{cy:.2f})")

if __name__ == "__main__":
    src = sys.argv[1]
    dst = sys.argv[2]
    cx   = float(sys.argv[3]) if len(sys.argv) > 3 else 0.5
    cy   = float(sys.argv[4]) if len(sys.argv) > 4 else 0.35
    zoom = float(sys.argv[5]) if len(sys.argv) > 5 else 1.0
    crop_portrait(src, dst, cx, cy, zoom)
