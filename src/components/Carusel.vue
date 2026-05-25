<style scoped>
.carousel {
  position: relative;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  background-color: #e0e0e0; /* Color de fondo mientras carga */
}

.slides {
  width: 100%;
  height: 100%;
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Botones corregidos para ser visibles */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4); /* Fondo oscuro semitransparente */
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.prev {
  left: 15px;
}
.next {
  right: 15px;
}

/* Indicadores */
.indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: white;
  transform: scale(1.3);
}

/* Estado vacío */
.empty-state {
  padding: 2rem;
  text-align: center;
  color: #666;
  border: 2px dashed #ccc;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
}

/* Transiciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div
    v-if="loadedImages.length > 0"
    class="carousel"
    @mouseenter="pause"
    @mouseleave="play"
  >
    <div class="slides">
      <transition name="fade" mode="out-in">
        <img
          :key="current"
          :src="loadedImages[current]"
          class="slide-img"
          alt="Slide"
        />
      </transition>
    </div>

    <!-- Botones (Ahora oscuros para que se vean siempre) -->
    <button class="nav-btn prev" @click="prev">&#10094;</button>
    <button class="nav-btn next" @click="next">&#10095;</button>

    <!-- Puntos indicadores -->
    <div class="indicators">
      <span
        v-for="(img, i) in loadedImages"
        :key="i"
        class="dot"
        :class="{ active: i === current }"
        @click="goTo(i)"
      ></span>
    </div>
  </div>

  <!-- Mensaje si no encuentra imágenes -->
  <div v-else class="empty-state">
    <p>No se encontraron imágenes en <code>src/assets/casas/</code></p>
    <small>Revisa que la carpeta exista y tenga archivos .jpg/.png</small>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 1. Importar módulos (Esto devuelve un objeto de funciones/promesas)
// La ruta '../assets/casas/' sube un nivel desde components a src, y entra a assets/casas
const imageModules = import.meta.glob("../assets/casas/*.{jpg,jpeg,png,gif}");

// 2. Estado para las imágenes ya resueltas (URLs reales)
const loadedImages = ref([]);
const current = ref(0);
let timer = null;

// 3. Resolver las promesas al montar el componente
onMounted(async () => {
  // Convertimos el objeto de funciones en un array de promesas y las resolvemos todas
  const promises = Object.values(imageModules).map((module) => module());
  const resolvedModules = await Promise.all(promises);
  // Extraer la propiedad 'default' de cada módulo (que contiene la URL)
  loadedImages.value = resolvedModules.map((module) => module.default);

  // Iniciar autoplay si hay imágenes
  if (loadedImages.value.length > 0) {
    play();
  }
});

// Lógica de navegación
const next = () => {
  current.value = (current.value + 1) % loadedImages.value.length;
};

const prev = () => {
  current.value =
    (current.value - 1 + loadedImages.value.length) % loadedImages.value.length;
};

const goTo = (index) => {
  current.value = index;
};

// Autoplay
const play = () => {
  if (loadedImages.value.length > 1) {
    timer = setInterval(next, 7000);
  }
};

const pause = () => {
  clearInterval(timer);
};

onUnmounted(() => {
  clearInterval(timer);
});
</script>
