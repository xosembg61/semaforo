import { useEffect, useReducer } from 'react'
import { estadoInicial, semaforoReducer } from './semaforo.js'

const duracion = {
  rojo: 4000,
  verde: 3000,
  ambar: 1000,
}

const nombreLuz = {
  rojo: 'Roja',
  ambar: 'Ámbar',
  verde: 'Verde',
}

export default function Semaforo() {
  const [estado, dispatch] = useReducer(semaforoReducer, estadoInicial)
  const { luz, averiado, ciclos } = estado

  useEffect(() => {
    if (estado.averiado) {
      return
    }

    // Cada cambio de estado inicia un tramo nuevo, incluso al reiniciar en rojo.
    const temporizador = setTimeout(() => {
      dispatch({ type: 'AVANZAR' })
    }, duracion[estado.luz])

    return () => clearTimeout(temporizador)
  }, [estado])

  return (
    <main className="container py-4 py-sm-5">
      <section className="card tarjeta mx-auto p-3 p-sm-4" aria-labelledby="titulo">
        <header className="mb-4">
          <h1 id="titulo" className="h2 mb-1">Semáforo</h1>
          <p className="text-body-secondary mb-0">
            Rojo 4 s · Verde 3 s · Ámbar 1 s
          </p>
        </header>

        <div className="row g-3 g-sm-4 align-items-center">
          <div className="col-sm-5">
            <div className="soporte rounded-3 p-3">
              <div className={`semaforo mx-auto${averiado ? ' averiado' : ''}`} aria-hidden="true">
                {Object.keys(nombreLuz).map((color) => (
                  <div key={color} className={`luz ${color}${luz === color ? ' encendida' : ''}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="col-sm-7">
            <div className="lectura rounded-3 p-3 mb-3">
              <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                <span className="text-body-secondary">Luz activa</span>
                <span className="fw-semibold">{nombreLuz[luz]}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center gap-2">
                <span className="text-body-secondary">Ciclos completados</span>
                <output className="fs-5 fw-bold" aria-label="Ciclos completados">{ciclos}</output>
              </div>
            </div>

            <p className="small mb-3" role="status">
              {averiado ? 'Modo avería · Ámbar intermitente' : 'Modo automático'}
            </p>

            <div className="row g-2" role="group" aria-label="Controles del semáforo">
              <div className="col-6">
                <button className="btn btn-primary w-100" type="button" onClick={() => dispatch({ type: 'AVANZAR' })}>
                  Avanzar
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-warning w-100" type="button" onClick={() => dispatch({ type: 'AVERIA' })}>
                  Avería
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-primary w-100" type="button" onClick={() => dispatch({ type: 'REPARAR' })}>
                  Reparar
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-secondary w-100" type="button" onClick={() => dispatch({ type: 'RESET' })}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
