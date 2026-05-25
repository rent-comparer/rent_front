<style scoped>
/* Variables para fácil personalización */
:root {
  --header-bg: rgba(255, 255, 255, 0.9);
  --text-color: #333;
  --accent-color: #000;
  --height: 70px;
}

.header {
  position: fixed; /* Fijo en la parte superior */
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: var(--header-bg);
  backdrop-filter: blur(10px); /* Efecto cristal elegante */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 1000;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo a {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  text-decoration: none;
  letter-spacing: -0.5px;
}

/* Navegación */
.nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav a {
  text-decoration: none;
  color: #666;
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
}

/* Efecto Hover Minimalista (Subrayado animado) */
.nav a::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--accent-color);
  transition: width 0.3s ease;
}

.nav a:hover {
  color: var(--accent-color);
}

.nav a:hover::after {
  width: 100%;
}

/* Responsividad básica */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .nav ul {
    gap: 1rem;
  }

  .nav a {
    font-size: 0.85rem;
  }
}
</style>

<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <a href="/">MiProyecto</a>
      </div>

      <nav class="nav">
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="tasador">Tasador</a></li>
          <li><a href="comparador">Comparador</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup></script>
