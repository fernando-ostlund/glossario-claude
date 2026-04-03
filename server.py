#!/usr/bin/env python3
"""
Token Editor Server — Glossario Claudinho
Serve arquivos estaticos + aceita POST /save-tokens pra escrever no styles.css.
Uso: python3 server.py
"""

import json
import re
import shutil
from http.server import SimpleHTTPRequestHandler, HTTPServer

PORT = 8899


class TokenHandler(SimpleHTTPRequestHandler):

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path != '/save-tokens':
            self.send_error(404)
            return

        try:
            length = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(length).decode('utf-8'))

            with open('styles.css', 'r', encoding='utf-8') as f:
                css = f.read()

            # Backup
            shutil.copy2('styles.css', 'styles.css.bak')

            # Replace tokens in :root block
            if 'light' in body:
                css = self._replace_in_block(css, r':root\s*\{', '}', body['light'])

            # Replace tokens in [data-theme="dark"] block
            if 'dark' in body:
                css = self._replace_in_block(
                    css,
                    r'\[data-theme="dark"\]\s*\{',
                    '}',
                    body['dark']
                )

            with open('styles.css', 'w', encoding='utf-8') as f:
                f.write(css)

            self._json_response(200, {'ok': True})

        except Exception as e:
            self._json_response(500, {'error': str(e)})

    def _replace_in_block(self, css, block_start_re, block_end, tokens):
        """Replace CSS variable values inside a specific block."""
        match = re.search(block_start_re, css)
        if not match:
            return css

        start = match.start()
        # Find the closing brace for this block
        brace_pos = css.index(block_end, match.end())
        block = css[start:brace_pos + 1]

        for var_name, new_value in tokens.items():
            # Match: --var-name: <anything>;
            pattern = re.compile(
                r'(' + re.escape(var_name) + r'\s*:\s*)(.+?)(;)',
                re.MULTILINE
            )
            block = pattern.sub(r'\g<1>' + new_value + r'\3', block)

        return css[:start] + block + css[brace_pos + 1:]

    def _json_response(self, code, data):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def log_message(self, format, *args):
        # Cleaner log output
        if args and isinstance(args[0], str) and args[0].startswith('POST'):
            print(f'[save] {args[0]}')
        elif args and isinstance(args[0], str) and 'token-editor' in args[0]:
            pass  # Don't spam editor reloads
        else:
            super().log_message(format, *args)


if __name__ == '__main__':
    print(f'Token Editor Server rodando em http://localhost:{PORT}')
    print(f'Abra http://localhost:{PORT}/token-editor.html')
    print('Ctrl+C para parar\n')
    HTTPServer(('', PORT), TokenHandler).serve_forever()
