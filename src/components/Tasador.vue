<style scoped>
.predictor-container {
  max-width: 500px; /* Reducido al haber menos campos */
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.25rem;
  font-weight: bold;
  font-size: 0.9rem;
}

input,
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.btn-predict {
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.3s;
}

.btn-predict:hover {
  background-color: #3aa876;
}

.btn-predict:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.result-box {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #e8f5e9;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #c8e6c9;
}

.price {
  font-size: 2.5rem;
  color: #2e7d32;
  font-weight: bold;
  margin: 0.5rem 0;
}

.error-box {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
  border: 1px solid #ffcdd2;
}
</style>

<template>
  <div class="predictor-container">
    <h2>Estimador de Precio Vivienda</h2>

    <form @submit.prevent="getPrediction" class="form-grid">
      <!-- Provincia -->
      <div class="form-group full-width">
        <label>Provincia</label>
        <select v-model="form.provincia" required>
          <option v-for="prov in provincias" :key="prov" :value="prov">
            {{
              prov.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
            }}
          </option>
        </select>
      </div>

      <!-- Superficie -->
      <div class="form-group full-width">
        <label>Superficie (m²)</label>
        <input type="number" v-model.number="form.surface" min="1" required />
      </div>

      <button type="submit" :disabled="loading" class="btn-predict">
        {{ loading ? "Calculando..." : "Predecir Precio" }}
      </button>
    </form>

    <!-- Resultados -->
    <div v-if="result" class="result-box">
      <h3>Precio Estimado</h3>
      <p class="price">
        {{
          result.prediction.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
          })
        }}
      </p>
      <small>Modelo usado para: {{ result.provincia }}</small>
    </div>

    <div v-if="error" class="error-box">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  surface: 100,
  provincia: "madrid", // Valor por defecto (debe coincidir con el nombre del archivo .pkl)
});

const result = ref(null);
const error = ref(null);
const loading = ref(false);

// Lista de provincias (asegúrate de que coincidan con los nombres de tus archivos .pkl sin extensión)
const provincias = [
  "albacete",
  "murcia",
  "cadiz",
  "soria",
  "valladolid",
  "la_rioja",
  "castello",
  "huelva",
  "burgos",
  "cordoba",
  "acoruna",
  "asturias",
  "almeria",
  "toledo",
  "cuenca",
  "huesca",
  "badajoz",
  "avila",
  "caceres",
  "leon",
  "ourense",
  "palencia",
  "lugo",
  "teruel",
  "jaen",
  "zamora",
  "ciudad_real",
  "araba",
  "malaga",
  "navarra",
  "santa_cruz_tenerife",
  "las_palmas",
  "sevilla",
  "alacant",
  "cantabria",
  "tarragona",
  "segovia",
  "granada",
  "guadalajara",
  "zaragoza",
  "salamanca",
  "pontevedra",
  "lleida",
  "illes_balears",
  "barcelona",
  "madrid",
  "gipuzkoa",
  "bizkaia",
  "valencia",
  "girona",
];

async function getPrediction() {
  loading.value = true;
  error.value = null;
  result.value = null;

  try {
    // Solo enviamos surface y provincia
    const params = new URLSearchParams({
      surface: form.surface,
      provincia: form.provincia,
    });

    // const response = await fetch(`http://localhost:5000/prediction?${params}`);
    const response = await fetch(
      `https://varushet.pythonanywhere.com/prediction?${params}`,
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
</script>
