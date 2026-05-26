<style scoped>
.comparator-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", sans-serif;
  background: #fff;
}

.subtitle {
  color: #666;
  margin-top: -1rem;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
}
.full-width {
  grid-column: span 2;
}

.form-group {
  display: flex;
  flex-direction: column;
}
label {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  color: #333;
}
input,
select {
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.checkbox-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}
.chk {
  font-weight: normal;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.btn-compare {
  grid-column: span 2;
  padding: 1rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.2s;
}
.btn-compare:hover {
  background: #34495e;
}
.btn-compare:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

/* Diagnóstico */
.diag-box {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
}
.diag-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.label {
  display: block;
  font-size: 0.8rem;
  color: #777;
}
.val {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
  color: white;
}
.sobrevalorado {
  background-color: #e74c3c;
} /* Rojo */
.infravalorado {
  background-color: #27ae60;
} /* Verde */
.en-precio-de-mercado {
  background-color: #f39c12;
} /* Naranja */

/* Ranking */
.ranking-box {
  margin-top: 2rem;
}
.ranking-list {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}
.ranking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
}
.ranking-item.highlight {
  background-color: #e8f4fd;
  border-left: 4px solid #3498db;
  font-weight: bold;
}
.rank {
  color: #999;
  width: 30px;
}
.prov-name {
  flex-grow: 1;
}
.prov-price {
  font-family: monospace;
  font-size: 1.1rem;
  color: #2c3e50;
}

.my-position {
  text-align: center;
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
}
.error-box {
  color: #c0392b;
  background: #fadbd8;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
}
</style>

<template>
  <div class="comparator-container">
    <h2>Comparador Interprovincial</h2>
    <p class="subtitle">Descubre cuánto costaría este piso en toda España</p>

    <form @submit.prevent="getComparison" class="form-grid">
      <!-- Ubicación y Superficie -->
      <div class="form-group full-width">
        <label>Provincia de Referencia</label>
        <select v-model="form.provincia" required>
          <option v-for="prov in provincias" :key="prov" :value="prov">
            {{ prov }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Superficie (m²)</label>
        <input type="number" v-model.number="form.surface" min="1" required />
      </div>

      <div class="form-group">
        <label>Precio Publicado (€) <small>(Opcional)</small></label>
        <input
          type="number"
          v-model.number="form.precio_publicado"
          min="0"
          placeholder="Ej: 150000"
        />
      </div>

      <!-- Características -->
      <div class="form-group">
        <label>Habitaciones</label>
        <input type="number" v-model.number="form.bedrooms" min="0" />
      </div>

      <div class="form-group">
        <label>Baños</label>
        <input type="number" v-model.number="form.restrooms" min="0" />
      </div>

      <!-- Checkboxes -->
      <div class="checkbox-container full-width">
        <label class="chk"
          ><input
            type="checkbox"
            v-model="form.terraza"
            :true-value="1"
            :false-value="0"
          />
          Terraza</label
        >
        <label class="chk"
          ><input
            type="checkbox"
            v-model="form.ascensor"
            :true-value="1"
            :false-value="0"
          />
          Ascensor</label
        >
        <label class="chk"
          ><input
            type="checkbox"
            v-model="form.piscina"
            :true-value="1"
            :false-value="0"
          />
          Piscina</label
        >
        <label class="chk"
          ><input
            type="checkbox"
            v-model="form.calefaccion"
            :true-value="1"
            :false-value="0"
          />
          Calefacción</label
        >
      </div>

      <button type="submit" :disabled="loading" class="btn-compare">
        {{ loading ? "Analizando mercado..." : "Comparar Precios" }}
      </button>
    </form>

    <!-- Diagnóstico de Sobrevaloración -->
    <div
      v-if="result?.diagnostico"
      class="diag-box"
      :class="result.diagnostico.estado.toLowerCase().replace(/\s/g, '-')"
    >
      <h3>Diagnóstico de Precio</h3>
      <div class="diag-grid">
        <div>
          <span class="label">Tu precio:</span>
          <span class="val">{{
            formatEUR(result.diagnostico.precio_publicado)
          }}</span>
        </div>
        <div>
          <span class="label">Precio Mercado:</span>
          <span class="val">{{
            formatEUR(result.diagnostico.precio_predicho)
          }}</span>
        </div>
        <div class="status-badge">
          {{ result.diagnostico.estado }}
          <small
            >({{ result.diagnostico.diferencia_pct > 0 ? "+" : ""
            }}{{ result.diagnostico.diferencia_pct }}%)</small
          >
        </div>
      </div>
    </div>

    <!-- Ranking de Provincias -->
    <div v-if="result?.ranking" class="ranking-box">
      <h3>Ranking de Precios (Top 10 más caras)</h3>
      <ul class="ranking-list">
        <li
          v-for="(item, index) in result.ranking.slice(0, 10)"
          :key="item.provincia"
          class="ranking-item"
          :class="{ highlight: item.provincia === result.input.provincia }"
        >
          <span class="rank">#{{ index + 1 }}</span>
          <span class="prov-name">{{ item.provincia }}</span>
          <span class="prov-price">{{ formatEUR(item.precio_predicho) }}</span>
        </li>
      </ul>

      <div v-if="result.ranking_posicion > 10" class="my-position">
        Tu provincia (<strong>{{ result.input.provincia }}</strong
        >) está en la posición
        <strong>#{{ result.ranking_posicion }}</strong> de
        {{ result.ranking_total }}
      </div>
    </div>

    <div v-if="error" class="error-box">{{ error }}</div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  surface: 80,
  provincia: "Madrid", // Debe coincidir con los nombres del CSV/INE (ej. Madrid, Barcelona, Bizkaia)
  bedrooms: 2,
  restrooms: 1,
  terraza: 0,
  ascensor: 0,
  piscina: 0,
  calefaccion: 0,
  precio_publicado: "", // Opcional
});

const result = ref(null);
const error = ref(null);
const loading = ref(false);

// Lista de provincias basada en tu backend (INE)
// Nota: Asegúrate de que estos nombres coincidan EXACTAMENTE con la columna 'provincia' de tu CSV
const provincias = [
  "Albacete",
  "Alicante",
  "Almería",
  "Araba",
  "Asturias",
  "Ávila",
  "Badajoz",
  "Barcelona",
  "Bizkaia",
  "Burgos",
  "Cáceres",
  "Cádiz",
  "Cantabria",
  "Castellón",
  "Ciudad Real",
  "Córdoba",
  "Cuenca",
  "Gipuzkoa",
  "Girona",
  "Granada",
  "Guadalajara",
  "Huelva",
  "Huesca",
  "Illes Balears",
  "Jaén",
  "La Rioja",
  "Las Palmas",
  "León",
  "Lleida",
  "Lugo",
  "Madrid",
  "Málaga",
  "Murcia",
  "Navarra",
  "Ourense",
  "Palencia",
  "Pontevedra",
  "Salamanca",
  "Santa Cruz de Tenerife",
  "Segovia",
  "Sevilla",
  "Soria",
  "Tarragona",
  "Teruel",
  "Toledo",
  "Valencia",
  "Valladolid",
  "Zamora",
  "Zaragoza",
];

async function getComparison() {
  loading.value = true;
  error.value = null;
  result.value = null;

  try {
    const params = new URLSearchParams({
      surface: form.surface,
      provincia: form.provincia,
      bedrooms: form.bedrooms,
      restrooms: form.restrooms,
      terraza: form.terraza,
      ascensor: form.ascensor,
      piscina: form.piscina,
      calefaccion: form.calefaccion,
    });

    // Añadir precio solo si el usuario lo ha rellenado
    if (form.precio_publicado && form.precio_publicado !== "") {
      params.append("precio_publicado", form.precio_publicado);
    }

    // Ajusta la URL a tu dominio de PythonAnywhere
    const response = await fetch(
      `https://varushet.pythonanywhere.com/compare?${params}`,
    );

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || "Error en la petición");
    }

    const data = await response.json();
    result.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

// Formateador de moneda
const formatEUR = (value) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
};
</script>
