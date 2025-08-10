import os
from pathlib import Path

# Path konfigurasi
ICON_DIR = Path("node_modules/bootstrap-icons/icons")
LIST_FILE = Path("icon_list.txt")
OUTPUT_FILE = Path("static/assets/icons.svg")
OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

# Baca daftar ikon dari list_icon.txt
with open(LIST_FILE, "r", encoding="utf-8") as f:
    icon_names = [line.strip() for line in f if line.strip()]

sprite = ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none" fill="currentColor">']

for name in icon_names:
    icon_path = ICON_DIR / f"{name}.svg"
    if not icon_path.exists():
        print(f"⚠️  Icon not found: {name}")
        continue

    with open(icon_path, "r", encoding="utf-8") as svg_file:
        svg_content = svg_file.read()

    # Ambil viewBox dan <path> isi
    viewbox = "0 0 16 16"
    if 'viewBox="' in svg_content:
        start = svg_content.find('viewBox="') + 9
        end = svg_content.find('"', start)
        viewbox = svg_content[start:end]

    body_start = svg_content.find(">", svg_content.find("<svg")) + 1
    body_end = svg_content.rfind("</svg>")
    inner_svg = svg_content[body_start:body_end].strip()

    # Tambahkan ke sprite
    sprite.append(f'  <symbol id="icon-{name}" viewBox="{viewbox}">')
    sprite.append(inner_svg)
    sprite.append('  </symbol>')

sprite.append('</svg>')

# Simpan hasil
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write("\n".join(sprite))

print(f"✅ Sprite berhasil dibuat: {OUTPUT_FILE}")
