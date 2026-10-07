import re
import glob

# 1. Update index.html categories to be links
with open('index.html', 'r', encoding='utf-8') as f:
    index = f.read()

index_replacements = {
    '<h3>Procesadores</h3>': '<a href="catalogo.html?categoria=procesadores" class="cat-link"><h3>Procesadores</h3>',
    '<p>CPUs Intel y AMD para equipos de escritorio y servidores.</p>': '<p>CPUs Intel y AMD para equipos de escritorio y servidores.</p></a>',
    '<h3>Almacenamiento</h3>': '<a href="catalogo.html?categoria=almacenamiento" class="cat-link"><h3>Almacenamiento</h3>',
    '<p>SSD NVMe, discos duros y memorias USB de alta velocidad.</p>': '<p>SSD NVMe, discos duros y memorias USB de alta velocidad.</p></a>',
    '<h3>Redes</h3>': '<a href="catalogo.html?categoria=redes" class="cat-link"><h3>Redes</h3>',
    '<p>Routers, switches, cables UTP y tarjetas Wi-Fi.</p>': '<p>Routers, switches, cables UTP y tarjetas Wi-Fi.</p></a>',
    '<h3>Periféricos</h3>': '<a href="catalogo.html?categoria=perifericos" class="cat-link"><h3>Periféricos</h3>',
    '<p>Teclados, ratones, monitores y webcams.</p>': '<p>Teclados, ratones, monitores y webcams.</p></a>',
    '<h3>Microcontroladores</h3>': '<a href="catalogo.html?categoria=microcontroladores" class="cat-link"><h3>Microcontroladores</h3>',
    '<p>Arduino, ESP32, Raspberry Pi y sensores.</p>': '<p>Arduino, ESP32, Raspberry Pi y sensores.</p></a>'
}

for old, new in index_replacements.items():
    index = index.replace(old, new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index)


# 2. Update catalogo.html with data-categoria
with open('catalogo.html', 'r', encoding='utf-8') as f:
    catalogo = f.read()

cat_map = {
    'Tarjeta gráfica NovaCore 8 GB': 'perifericos',
    'Memoria RAM DDR5 16 GB': 'almacenamiento',
    'SSD M.2 NVMe 1 TB': 'almacenamiento',
    'Router Wi-Fi 6 AX3000': 'redes',
    'Placa ESP32 DevKit': 'microcontroladores',
    'Procesador 8 núcleos 4.5 GHz': 'procesadores',
    'Raspberry Pi 4 Model B': 'microcontroladores',
    'Disco Duro Mecánico 2TB': 'almacenamiento',
    'Switch Gigabit 8 Puertos': 'redes',
    'Teclado Mecánico RGB': 'perifericos'
}

for prod_name, cat_slug in cat_map.items():
    # Find the article that contains this h3
    # We can use regex to inject data-categoria="cat_slug" into the <article class="producto">
    # because it's a bit hard to replace directly without a DOM parser, we do a trick:
    # find <article class="producto"> ... <h3>{prod_name}</h3>
    pattern = r'(<article class="producto")>(\s*<img[^>]+>\s*<div class="producto-info">\s*<h3>' + re.escape(prod_name) + r'</h3>)'
    catalogo = re.sub(pattern, r'\1 data-categoria="' + cat_slug + r'">\2', catalogo)

# Add the filter JS
filter_js = '''
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("categoria");
      if(cat) {
        document.querySelectorAll(".producto").forEach(p => {
          if(p.dataset.categoria !== cat) p.style.display = "none";
        });
        const titulos = {
          "procesadores": "Procesadores",
          "almacenamiento": "Almacenamiento",
          "redes": "Redes",
          "perifericos": "Periféricos",
          "microcontroladores": "Microcontroladores"
        };
        const h2 = document.querySelector("main h2");
        if(h2 && titulos[cat]) {
          h2.textContent = "Catálogo: " + titulos[cat];
        }
      }
    });
  </script>
</body>'''
catalogo = catalogo.replace('</body>', filter_js)

with open('catalogo.html', 'w', encoding='utf-8') as f:
    f.write(catalogo)


# 3. Append CSS for cat-link
with open('css/styles.css', 'a', encoding='utf-8') as f:
    f.write('\n.cat-link { text-decoration: none; color: inherit; display: block; height: 100%; }\n.cat-link:hover h3 { color: var(--primary-color); }\n')


# 4. Remove comments from all files
html_files = glob.glob('*.html')
js_files = glob.glob('js/*.js')
css_files = glob.glob('css/*.css')

for file_path in html_files + js_files + css_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if file_path.endswith('.html'):
        # HTML comments
        content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    elif file_path.endswith('.js'):
        # JS comments
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        content = re.sub(r'^\s*//.*?\n', '\n', content, flags=re.MULTILINE)
        content = re.sub(r'([^\'"]+)//.*?\n', r'\1\n', content) # remove trailing comments not inside strings (naive)
    elif file_path.endswith('.css'):
        # CSS comments
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    # clean up multiple blank lines
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print('Feature added and comments removed.')
