# Cuando la escuela rural cambia: una historia sobre cultura y transformación

> **Recurso Educativo Digital e Interactivo (DUA)**  
> **Universidad Santo Tomás (USTA) — Colombia**  
> Maestría en Educación · Módulo 1: *Cultura y cambio organizacional y educativo*  
> **Autoras:** Ingrid Yuliana González Flores & Luz Marina Castillo

---

## 📖 Descripción del Proyecto

Este recurso interactivo analiza la articulación entre **cultura organizacional** y **gestión del cambio** en una institución educativa rural multigrado pública, reconociendo las fuerzas impulsoras, las resistencias humanas y las estrategias de liderazgo transformacional a partir de las teorías de **Edgar Schein (1985)**, **Kurt Lewin (1951)**, **Cameron & Quinn (1999)** y **Pérez Uribe (2018)**.

El recurso fue desarrollado bajo principios de **Diseño Universal para el Aprendizaje (DUA)** y el sistema de diseño suizo **Jitter** (minimalista, de alta legibilidad y libre de clichés visuales).

---

## 🚀 Características Principales

1. **Visor Interactivo del Cómic (5 Actos):**
   - Navegación táctil e intuitiva entre los 5 actos de la narrativa gráfica.
   - **Modo Presentación Cinemática 3D (inspirado en impress.js y reveal.js):** Proyección espacial con cámara GPU (`perspective: 1200px`) que viaja viñeta por viñeta enfocando a los personajes en 3D mientras hablan.
   - **Efecto RevealZoom:** Acercamiento elástico al hacer clic en cualquier detalle o personaje del cómic.
   - **Accesibilidad DUA:** Lectura por voz nativa (*Web Speech API*) con modulación acústica diferenciada por personaje (*Profesor Jorge*, *Docente Laura* y *Rectora Carmen*).
   - **Panel Teórico Deslizante:** Desglose conceptual académico de cada acto accesible mediante cajón lateral (*slide-over drawer*).

2. **Evaluación Formativa DUA (Cuestionario Interactivo):**
   - Formato por pasos (*Stepper P1 a P4*) o vista continua.
   - Retroalimentación formativa inmediata (verde/rojo) con fundamentación teórica y citación de autores.
   - Lectura por voz accesible de cada consigna y alternativas.
   - Contador de puntaje en tiempo real, rúbrica oficial USTA y animación accesible de confeti.

3. **Colofón Académico y Citación APA 7:**
   - Referencias bibliográficas completas y botón de copiado de citación en formato APA 7.

---

## 🛠️ Stack Tecnológico

- **Framework:** React 19 + Vite 6
- **Estilos:** Tailwind CSS v3 (Jitter Design System tokens)
- **Iconografía:** Lucide React
- **Accesibilidad:** Web Speech API nativa (DUA)
- **Efectos:** Canvas Confetti + CSS3 3D Hardware Accelerated Transforms
- **Despliegue:** Optimizado para Vercel (`vercel.json` incluido)

---

## 💻 Instalación y Uso Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Albonire/ubiquitous-potato.git
cd ubiquitous-potato

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilar para producción
npm run build

# 5. Previsualizar bundle de producción
npm run preview
```

---

## ⌨️ Atajos de Teclado

- `P`: Activar / salir del **Modo Presentación Cinemática 3D**
- `Espacio` o `→`: Avanzar a la siguiente viñeta / diapositiva
- `←`: Retroceder a la viñeta anterior
- `Z`: Alternar entre vista panorámica y viñeta activa
- `Clic en imagen`: Activar **RevealZoom** táctil hacia las coordenadas del cursor
- `Escape`: Restablecer zoom o cerrar modales / presentación
