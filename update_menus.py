import os
import re

files = ['index.html', 'catalogo.html', 'nosotras.html', 'carrito.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_nav = f'''      <nav aria-label="Navegación principal">
        <ul>
          <li><a href="index.html"{' class="activo"' if f == 'index.html' else ''}>Inicio</a></li>
          <li><a href="registro.html"{' class="activo"' if f == 'registro.html' else ''}>Registro</a></li>
          <li><a href="nosotras.html"{' class="activo"' if f == 'nosotras.html' else ''}>Quiénes somos</a></li>
          <li><a href="catalogo.html"{' class="activo"' if f == 'catalogo.html' else ''}>Catálogo</a></li>
          <li><a href="busqueda.html"{' class="activo"' if f == 'busqueda.html' else ''}>Búsqueda</a></li>
          <li><a href="carrito.html"{' class="activo"' if f == 'carrito.html' else ''}>Carrito <span id="cart-counter">(0)</span></a></li>
        </ul>
      </nav>'''
    
    content = re.sub(r'<nav aria-label="Navegación principal">.*?</nav>', new_nav, content, flags=re.DOTALL)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print('Menus updated')
