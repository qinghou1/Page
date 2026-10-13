#!/usr/bin/env python3
"""Bundle this website into a single offline-viewable HTML file.

Usage (Python 3.9+; no external packages):
    python tools/make_self_contained.py
    python tools/make_self_contained.py --output /path/to/Qing_Hou_Website.html

CSS, JavaScript, local images, and the public CV PDF are embedded.
External publication/profile/portfolio links remain internet destinations.
"""
from __future__ import annotations
import argparse
import base64
import mimetypes
from pathlib import Path
import re


def bundle(root: Path, output: Path) -> None:
    html = (root / 'index.html').read_text(encoding='utf-8')
    css = (root / 'assets/css/style.css').read_text(encoding='utf-8')
    js = (root / 'assets/js/app.js').read_text(encoding='utf-8')
    html = html.replace('<link rel="stylesheet" href="assets/css/style.css">', '<style>\n' + css + '\n</style>')
    html = html.replace('<script src="assets/js/app.js" defer></script>', '')
    # Inline scripts do not honor `defer`, so place the script after the content.
    html = html.replace('</body>', '<script>\n' + js.replace('</script', '<\\/script') + '\n</script>\n</body>')
    cache: dict[str, str] = {}
    def embed(match: re.Match[str]) -> str:
        attribute, relative_path = match.group(1), match.group(2)
        if relative_path not in cache:
            asset = (root / relative_path).resolve()
            if not asset.is_relative_to(root.resolve()):
                raise ValueError(f'Asset path is outside the site directory: {relative_path}')
            if not asset.is_file():
                raise FileNotFoundError(f'Missing required asset: {relative_path}')
            mime = mimetypes.guess_type(asset.name)[0] or 'application/octet-stream'
            payload = base64.b64encode(asset.read_bytes()).decode('ascii')
            cache[relative_path] = f'data:{mime};base64,{payload}'
        return f'{attribute}="{cache[relative_path]}"'
    html = re.sub(r'(src|href)="(assets/(?:images|files)/[^"\n]+)"', embed, html)
    if re.search(r'(?:src|href)="assets/', html):
        raise ValueError('Unembedded local dependency remains in HTML.')
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(html, encoding='utf-8')
    print(f'Created {output} ({output.stat().st_size / 1024 / 1024:.2f} MiB).')


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=root.parent / 'Qing_Hou_Personal_Website.html')
    args = parser.parse_args()
    bundle(root, args.output.expanduser().resolve())


if __name__ == '__main__':
    main()
