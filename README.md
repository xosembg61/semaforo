# Semáforo

Proyecto de React con Bootstrap y CSS para simular un semáforo. La aplicación usa Vite y gestiona el estado del semáforo con `useReducer`.

## Cómo ejecutarlo

Necesitas Node.js 22.12 o posterior y npm. Ejecuta estos comandos desde la carpeta del proyecto.

```bash
npm install
npm run dev
```

Abre la dirección que muestra la terminal.

## Funcionamiento

El semáforo empieza en rojo y avanza automáticamente. Se queda 4 segundos en rojo, 3 en verde y 1 en ámbar. Al volver de ámbar a rojo, el contador suma un ciclo.

- **Avanzar** cambia a la siguiente luz.
- **Avería** detiene el ciclo automático y deja la luz ámbar parpadeando. El botón Avanzar no cambia la luz mientras dure la avería.
- **Reparar** vuelve al rojo y reanuda el ciclo. Conserva los ciclos completados.
- **Reset** vuelve al rojo, reanuda el ciclo y pone el contador a cero.

## Pruebas y compilación

```bash
npm test
npm run build
```

`npm test` comprueba los cambios de estado. `npm run build` genera la versión de producción en la carpeta `dist`.
