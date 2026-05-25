<template>
  <section class="intro-section">
    <div class="intro-header">
      <h2>Tasador Inteligente & Comparador de Mercado</h2>
      <p class="subtitle">
        Analizamos el valor real de tu vivienda utilizando modelos de
        <span class="highlight">Machine Learning</span> y datos geoespaciales.
      </p>
    </div>

    <div class="features-grid">
      <!-- Tarjeta 1: El Modelo -->
      <div class="card">
        <div class="icon-box">🤖</div>
        <h3>Predicción IA</h3>
        <p>
          Nuestro algoritmo procesa variables estructurales y de ubicación para
          estimar el precio justo de mercado, eliminando el sesgo humano.
        </p>
      </div>

      <!-- Tarjeta 2: Comparativa Territorial -->
      <div class="card">
        <div class="icon-box">🗺️</div>
        <h3>Análisis Territorial</h3>
        <p>
          Comparamos tu propiedad con el entorno inmediato. Detectamos si tu
          zona está siendo <strong>sobretasada</strong> o
          <strong>subtasada</strong> respecto a la media.
        </p>
      </div>

      <!-- Tarjeta 3: Métricas Clave -->
      <div class="card">
        <div class="icon-box">📊</div>
        <h3>Métricas de Diferencia</h3>
        <p>
          Visualiza las desviaciones de precio por metro cuadrado, antigüedad y
          calidad constructiva frente a viviendas similares en tu código postal.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// No requiere lógica compleja por ahora
</script>

<style scoped>
.intro-section {
  max-width: 800px; /* Mismo ancho que el carrusel para alineación */
  margin: 4rem auto;
  padding: 0 1rem;
  text-align: center;
}

.intro-header h2 {
  font-size: 2rem;
  color: var(--text-h);
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--text);
  max-width: 600px;
  margin: 0 auto 3rem auto;
  line-height: 1.6;
}

.highlight {
  color: var(--accent);
  font-weight: 600;
}

/* Grid Layout */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  text-align: left;
}

.card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: var(--accent-border);
}

.icon-box {
  font-size: 2rem;
  margin-bottom: 1rem;
  background: var(--code-bg);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.card h3 {
  font-size: 1.25rem;
  color: var(--text-h);
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.card p {
  font-size: 0.95rem;
  color: var(--text);
  line-height: 1.5;
  margin: 0;
}

/* Ajuste móvil */
@media (max-width: 768px) {
  .intro-section {
    margin: 2rem auto;
  }

  .features-grid {
    grid-template-columns: 1fr; /* Una columna en móvil */
    gap: 1.5rem;
  }
}
</style>
