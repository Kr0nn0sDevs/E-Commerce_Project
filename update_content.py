import re


with open('nosotras.html', 'r', encoding='utf-8') as f:
    nosotras = f.read()

new_table = '''        <tbody>
          <tr>
            <td>Christian Eduardo Rosales González</td>
            <td>Desarrollo Front-end</td>
            <td><a href="mailto:christian.rosales@techhub.edu.mx">christian.rosales@techhub.edu.mx</a></td>
          </tr>
          <tr>
            <td>Brandon Emilio Hernandez Aguilar</td>
            <td>Diseño UI/UX y Javascript</td>
            <td><a href="mailto:brandon.hernandez@techhub.edu.mx">brandon.hernandez@techhub.edu.mx</a></td>
          </tr>
          <tr>
            <td>Paola Kasumy Gomez Sanchez</td>
            <td>Especialista en Redes e Integración</td>
            <td><a href="mailto:paola.gomez@techhub.edu.mx">paola.gomez@techhub.edu.mx</a></td>
          </tr>
        </tbody>'''

nosotras = re.sub(r'<tbody>.*?</tbody>', new_table, nosotras, flags=re.DOTALL)

with open('nosotras.html', 'w', encoding='utf-8') as f:
    f.write(nosotras)

# Update catalogo.html to add more products
with open('catalogo.html', 'r', encoding='utf-8') as f:
    catalogo = f.read()

extra_products = '''
      <article class="producto">
        <img src="img/raspberry.svg" alt="Raspberry Pi 4">
        <div class="producto-info">
          <h3>Raspberry Pi 4 Model B</h3>
          <p>4GB RAM, Bluetooth 5.0, Wi-Fi. Ideal para domótica.</p>
          <span class="precio">$1,250.00</span>
          <button type="button" class="btn btn-agregar" data-id="rasp4" data-nombre="Raspberry Pi 4 Model B" data-precio="1250" data-img="img/raspberry.svg">Agregar al carrito</button>
        </div>
      </article>

      <article class="producto">
        <img src="img/hdd.svg" alt="Disco Duro 2TB">
        <div class="producto-info">
          <h3>Disco Duro Mecánico 2TB</h3>
          <p>7200 RPM, SATA III. Gran capacidad para backups.</p>
          <span class="precio">$950.00</span>
          <button type="button" class="btn btn-agregar" data-id="hdd2tb" data-nombre="Disco Duro Mecánico 2TB" data-precio="950" data-img="img/hdd.svg">Agregar al carrito</button>
        </div>
      </article>

      <article class="producto">
        <img src="img/switch.svg" alt="Switch Gigabit 8 Puertos">
        <div class="producto-info">
          <h3>Switch Gigabit 8 Puertos</h3>
          <p>Plug and play, carcasa metálica, ahorro de energía.</p>
          <span class="precio">$399.00</span>
          <button type="button" class="btn btn-agregar" data-id="switch8" data-nombre="Switch Gigabit 8 Puertos" data-precio="399" data-img="img/switch.svg">Agregar al carrito</button>
        </div>
      </article>

      <article class="producto">
        <img src="img/teclado.svg" alt="Teclado Mecánico">
        <div class="producto-info">
          <h3>Teclado Mecánico RGB</h3>
          <p>Switches azules, anti-ghosting, distribución ISO en español.</p>
          <span class="precio">$799.00</span>
          <button type="button" class="btn btn-agregar" data-id="teclado" data-nombre="Teclado Mecánico RGB" data-precio="799" data-img="img/teclado.svg">Agregar al carrito</button>
        </div>
      </article>
    </section>'''

catalogo = catalogo.replace('    </section>', extra_products)

with open('catalogo.html', 'w', encoding='utf-8') as f:
    f.write(catalogo)

print('Modifications applied')
