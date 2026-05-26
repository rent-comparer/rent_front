# Alokatzaile — Frontend

Interfaz web del proyecto Valora, construida con Vue 3 + Vite.

Conecta con la API desplegada en PythonAnywhere para ofrecer dos funcionalidades: un tasador de precio de alquiler por provincia y un comparador interprovincial.

---

## Vistas

**Inicio** — presentación del proyecto con carrusel de imágenes y tarjetas explicativas de las funcionalidades.

**Tasador** (`/tasador`) — el usuario introduce la provincia y la superficie en m² y obtiene una estimación del precio de alquiler mensual.

**Comparador** (`/comparador`) — el usuario introduce las características completas de su vivienda (provincia, superficie, habitaciones, baños, terraza, ascensor, piscina, calefacción) y opcionalmente su precio actual. La app devuelve cuánto costaría ese mismo piso en cada provincia de España y, si se introduce el precio actual, diagnostica si está por encima o por debajo del mercado.

---

## Stack

|            |                                      |
| ---------- | ------------------------------------ |
| Framework  | Vue 3 (Composition API)              |
| Build tool | Vite                                 |
| Estilos    | CSS nativo                           |
| API        | Flask — varushet.pythonanywhere.com |

---

## Estructura

```
rent_front/
├── src/
│   ├── views/
│   │   ├── HomeView.vue        # Página de inicio
│   │   ├── TasadorView.vue     # Estimador de precio
│   │   └── ComparadorView.vue  # Comparador interprovincial
│   ├── components/
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── public/
├── index.html
├── package.json
└── vite.config.js
```

---

## Instalación y uso local

Requisitos: Node.js 16 o superior.

```bash
# Clonar el repositorio
git clone https://github.com/rent-comparer/rent_front.git
cd rent_front

# Instalar dependencias
npm install

# Arrancar el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`.

---

## Conexión con la API

El tasador llama al endpoint `/prediction`:

```
GET https://varushet.pythonanywhere.com/prediction?surface=80&provincia=Madrid
```

El comparador llama al endpoint `/compare`:

```
GET https://varushet.pythonanywhere.com/compare?surface=80&provincia=Bizkaia&bedrooms=3&restrooms=1&terraza=1&ascensor=1&precio_publicado=1200
```

---

## Despliegue

```bash
npm run build
```

Genera la carpeta `dist/` lista para subir a cualquier hosting estático.

---

## Repositorio de la API

El código del backend (modelos, endpoints Flask, notebooks de análisis) está en el repositorio de la API del proyecto.

---

## Equipo

Danillo Souza · Alejandro Serrato · Oscar Fernández · Urko Menendez · Andoni Olaso — Bootcamp Data Science The Bridge, promoción 2025/2026.
