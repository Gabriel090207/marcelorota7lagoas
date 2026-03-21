import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { getEventos } from '../services/api'

import './Eventos.css'

export default function Eventos() {

  const [currentDate, setCurrentDate] = useState(new Date())
  const [eventos, setEventos] = useState<any[]>([])

  useEffect(() => {
    getEventos().then(setEventos)
  }, [])

  // 🔥 PARSE CORRETO (SEM BUG)
 const parseEventoDate = (dataStr: string) => {
  if (!dataStr) return null

  // ✅ NOVO FORMATO (ISO)
  if (dataStr.includes("T")) {
    const d = new Date(dataStr)
    return isNaN(d.getTime()) ? null : d
  }

  // ✅ FORMATO ANTIGO
  try {
    const [datePart, timePart] = dataStr.split(" ")

    if (!datePart) return null

    const [day, month, year] = datePart.split("/")
    const [hour = "00", minute = "00"] = (timePart || "").split(":")

    const d = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    )

    return isNaN(d.getTime()) ? null : d

  } catch {
    return null
  }
}

  const monthNames = [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
  ]

  function nextMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    )
  }

  function prevMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    )
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  let firstDay = new Date(year, month, 1).getDay()
  firstDay = firstDay === 0 ? 6 : firstDay - 1

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const today = new Date()

  // 🔥 FORMATA EVENTOS COM DATA CORRETA
  const eventosFormatados = eventos
    .map(e => ({
      ...e,
      date: parseEventoDate(e.data)
    }))
    .filter(e => e.date) // remove inválidos

  // 🔥 ORDENA
  const eventosOrdenados = [...eventosFormatados].sort(
  (a, b) => a.date.getTime() - b.date.getTime()
)

  // 🔥 PRÓXIMO EVENTO
  const proximoEvento = eventosOrdenados.find(e => e.date >= today)

  // 🔥 LISTA (3 próximos, sem repetir o destaque)
  const proximosEventos = eventosOrdenados
    .filter(e => e.date >= today)
    .slice(1, 4)

  const calendarDays: (number | null)[] = []

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <main className="eventos">

      {/* 🔥 EVENTO DESTAQUE */}
      {proximoEvento && (
        <section className="eventos__featured">
          <div className="eventos__featuredInner">

            <div className="featured__info">
              <span className="featured__label">Próximo evento</span>

              <h2>{proximoEvento.titulo}</h2>

              <p>{proximoEvento.descricao}</p>

              <div className="featured__meta">
                <span>
                  {proximoEvento.date.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })}
                </span>
                <span>•</span>
                <span>{proximoEvento.local}</span>
              </div>

              <Link
                to={`/eventos/${proximoEvento.id}`}
                className="btn btn--primary"
              >
                Ver detalhes
              </Link>
            </div>

            <div
              className="featured__image"
              style={{ backgroundImage: `url(${proximoEvento.imagem})` }}
            />
          </div>
        </section>
      )}

      {/* 🔥 LISTA */}
      <section className="eventos__list">
        <div className="eventos__listInner">
          <h3>Próximos eventos</h3>

          <div className="eventos__grid">
            {proximosEventos.map(evento => (

              <Link
                key={evento.id}
                to={`/eventos/${evento.id}`}
                className="eventItem"
              >
                <h4>{evento.titulo}</h4>

                <p>
                  {evento.date.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })} • {evento.local}
                </p>

              </Link>

            ))}
          </div>
        </div>
      </section>

      {/* 🔥 CALENDÁRIO */}
      <section className="eventos__calendar">
        <div className="eventos__calendarInner">

          <div className="calendar__header">
            <button onClick={prevMonth}>
              <FiChevronLeft size={20} />
            </button>

            <h3>
              {monthNames[month]} {year}
            </h3>

            <button onClick={nextMonth}>
              <FiChevronRight size={20} />
            </button>
          </div>

          <div className="calendar__grid">

            {['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'].map(d => (
              <div key={d} className="calendar__dayName">{d}</div>
            ))}

            {calendarDays.map((day, index) => {

              if (!day) {
                return <div key={index} className="calendar__day empty" />
              }

              const dayEvents = eventosFormatados.filter(event =>
                event.date.getFullYear() === year &&
                event.date.getMonth() === month &&
                event.date.getDate() === day
              )

              return (
                <div
                  key={index}
                  className={`calendar__day ${dayEvents.length ? 'has-event' : ''}`}
                >
                  <span className="calendar__dayNumber">{day}</span>

                  {dayEvents.map(event => (
                    <span key={event.id} className="calendar__event">
                      {event.titulo}
                    </span>
                  ))}
                </div>
              )
            })}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="eventos__cta">
        <div className="eventos__ctaInner">

          <div className="cta__content">
            <span className="cta__label">Moto Clubes & Organizadores</span>

            <h2>Quer divulgar seu evento na Rota 7?</h2>

            <p>
              Envie as informações do seu encontro, passeio ou trilha.
            </p>

            <div className="cta__actions">
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                className="btn btn--primary"
              >
                WhatsApp
              </a>

              <Link to="/eventos/enviar" className="btn btn--outline">
  Enviar evento
</Link>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}