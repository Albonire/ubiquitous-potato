# Cuando la escuela rural cambia

Recurso educativo digital para el Módulo 1 *Cultura y cambio organizacional y educativo*
de la Maestría en Tecnología e Innovación Educativa de la Universidad Santo Tomás.

**Autoras:** Ingrid Yuliana González Flores · Luz Marina Castillo

## Qué es

Una sola secuencia continua, sin secciones ni menús:

1. **Portada.** Objetivo pedagógico, autoras, referencias en APA 7 y la instrucción de uso.
2. **Historia.** Las cinco tiras cómicas recorridas viñeta por viñeta (28 en total). La
   cámara enfoca cada viñeta y el resto de la tira queda atenuado alrededor. Se avanza
   deslizando, haciendo clic en cualquier punto o con las flechas del teclado.
3. **Cuestionario.** Cuatro preguntas con retroalimentación conceptual inmediata y el
   nivel de la rúbrica al terminar.

La narrativa recorre la cultura clan de la escuela rural, el choque con la dotación
tecnológica, el descongelamiento mediante la co-enseñanza, la experimentación y el
recongelamiento del cambio, a partir de Schein (1985), Lewin (1951), Cameron y Quinn
(1999) y Pérez Uribe (2018).

## Cómo funciona la secuencia

`src/data/comicData.js` describe cada tira como una rejilla de viñetas (`cols` x `rows`)
y ubica cada viñeta por el centro de su celda en porcentaje sobre la imagen. Las viñetas
sin diálogo se marcan `silent`.

`src/components/ComicSequence.jsx` usa el scroll como única fuente de verdad: la sección
mide un viewport de alto por viñeta, el escenario queda fijo con `position: sticky` y el
tiempo activo se deriva de la posición. Clic, teclado y el botón de la portada no mueven
un índice propio, sino que desplazan el scroll, así que las tres formas de avanzar nunca
se desincronizan.

La escala de la cámara se calcula desde el viewport, no está fija: la celda enfocada
ocupa el 92 % del ancho o del alto disponible, de modo que la viñeta se lee igual en
escritorio y en un teléfono vertical. Con `prefers-reduced-motion` las transiciones se
desactivan.

## Accesibilidad

- Contraste verificado sobre el fondo oscuro (AA para texto normal).
- El diálogo de cada viñeta está disponible para lectores de pantalla en la región
  `aria-live`, además de estar dibujado en el globo.
- Navegación completa por teclado (flechas, espacio, tabulación) y `alt` descriptivo por
  tira.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # bundle de producción en dist/
npm run preview  # previsualizar el bundle
```

Stack: React 19, Vite 6, Tailwind CSS 3. Despliegue en Vercel (`vercel.json` incluido).

## Atajos

| Tecla | Acción |
|---|---|
| `→` / `Espacio` | Siguiente viñeta |
| `←` | Viñeta anterior |
| Clic | Siguiente viñeta |
