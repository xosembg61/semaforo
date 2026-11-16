export const estadoInicial = {
  luz: 'rojo',
  averiado: false,
  ciclos: 0,
}

const siguienteLuz = {
  rojo: 'verde',
  verde: 'ambar',
  ambar: 'rojo',
}

export function semaforoReducer(estado, accion) {
  switch (accion.type) {
    case 'AVANZAR':
      if (estado.averiado) {
        return estado
      }

      return {
        ...estado,
        luz: siguienteLuz[estado.luz],
        ciclos: estado.ciclos + (estado.luz === 'ambar' ? 1 : 0),
      }
    case 'AVERIA':
      return { ...estado, luz: 'ambar', averiado: true }
    case 'REPARAR':
      return { ...estadoInicial, ciclos: estado.ciclos }
    case 'RESET':
      return { ...estadoInicial }
    default:
      throw new Error('Acción desconocida')
  }
}
