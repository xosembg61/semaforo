import assert from 'node:assert/strict';
import test from 'node:test';
import { estadoInicial, semaforoReducer } from './semaforo.js';

test('el semáforo empieza en rojo y con cero ciclos', () => {
  assert.deepEqual(estadoInicial, { luz: 'rojo', averiado: false, ciclos: 0 });
});

test('avanza de rojo a verde, a ámbar y a rojo', () => {
  const verde = semaforoReducer(estadoInicial, { type: 'AVANZAR' });
  const ambar = semaforoReducer(verde, { type: 'AVANZAR' });
  const rojo = semaforoReducer(ambar, { type: 'AVANZAR' });

  assert.deepEqual(verde, { luz: 'verde', averiado: false, ciclos: 0 });
  assert.deepEqual(ambar, { luz: 'ambar', averiado: false, ciclos: 0 });
  assert.deepEqual(rojo, { luz: 'rojo', averiado: false, ciclos: 1 });
});

test('la avería activa el ámbar e impide avanzar', () => {
  const verde = { luz: 'verde', averiado: false, ciclos: 2 };
  const averiado = semaforoReducer(verde, { type: 'AVERIA' });

  assert.deepEqual(averiado, { luz: 'ambar', averiado: true, ciclos: 2 });
  assert.deepEqual(semaforoReducer(averiado, { type: 'AVANZAR' }), averiado);
});

test('reparar vuelve al rojo y conserva los ciclos', () => {
  const averiado = { luz: 'ambar', averiado: true, ciclos: 2 };
  const reparado = semaforoReducer(averiado, { type: 'REPARAR' });

  assert.deepEqual(reparado, { luz: 'rojo', averiado: false, ciclos: 2 });
});

test('reiniciar quita la avería y pone los ciclos a cero', () => {
  const averiado = { luz: 'ambar', averiado: true, ciclos: 2 };
  const reiniciado = semaforoReducer(averiado, { type: 'RESET' });

  assert.deepEqual(reiniciado, { luz: 'rojo', averiado: false, ciclos: 0 });
});

test('una acción desconocida provoca un error', () => {
  assert.throws(
    () => semaforoReducer(estadoInicial, { type: 'OTRA' }),
    { message: 'Acción desconocida' },
  );
});
