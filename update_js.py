import re

# Update carrito.js
with open('js/carrito.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('const guardarCarrito = (c) => localStorage.setItem(CLAVE, JSON.stringify(c));', 'const guardarCarrito = (c) => { localStorage.setItem(CLAVE, JSON.stringify(c)); if (window.actualizarContador) window.actualizarContador(); };')

filter_code = '''
  lista.addEventListener("input", (e) => {
    if (e.target.classList.contains("cantidad")) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
  });

  lista.addEventListener("change", (e) => {'''

js = js.replace('  lista.addEventListener("change", (e) => {', filter_code)

with open('js/carrito.js', 'w', encoding='utf-8') as f:
    f.write(js)

# Update HTML files
htmls = ['index.html', 'catalogo.html', 'nosotras.html', 'carrito.html']
for html in htmls:
    with open(html, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'counter.js' not in content:
        content = content.replace('<script src="js/main.js"></script>', '<script src="js/counter.js"></script>\n  <script src="js/main.js"></script>')
        content = content.replace('<script src="js/carrito.js"></script>', '<script src="js/counter.js"></script>\n  <script src="js/carrito.js"></script>')
        if '<script' not in content:
            content = content.replace('</body>', '  <script src="js/counter.js"></script>\n</body>')
    with open(html, 'w', encoding='utf-8') as f:
        f.write(content)

# Update CSS
with open('css/styles.css', 'a', encoding='utf-8') as f:
    f.write('''

/* Formularios nuevos */
.form-container {
  max-width: 500px;
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-top: 1rem;
}
.campo { margin-bottom: 1rem; }
.campo label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
.campo input { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
.checkbox-campo { display: flex; align-items: center; gap: 0.5rem; }
.checkbox-campo input { width: auto; }
.flex-form { display: flex; gap: 0.5rem; align-items: center; }
.flex-form input { flex: 1; padding: 0.5rem; margin: 0; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
.resultados-area { margin-top: 2rem; }
''')
print('Updates complete')
