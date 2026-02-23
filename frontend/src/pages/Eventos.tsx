import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './Eventos.css'

export default function Eventos() {

  const [currentDate, setCurrentDate] = useState(new Date())

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

  // Semana começa na segunda
  let firstDay = new Date(year, month, 1).getDay()
  firstDay = firstDay === 0 ? 6 : firstDay - 1

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const today = new Date()

  // Eventos mock dinâmicos
  const events = [
    {
      id: 1,
      title: 'Encontro Rota 7 Lagoas',
      date: new Date(today.getFullYear(), today.getMonth(), 12)
    },
    {
      id: 2,
      title: 'Passeio Serra do Espinhaço',
      date: new Date(today.getFullYear(), today.getMonth(), 19)
    },
    {
      id: 3,
      title: 'Trilha Off-Road Regional',
      date: new Date(today.getFullYear(), today.getMonth() + 1, 2)
    },
    {
      id: 4,
      title: 'Encontro Moto Clube SL',
      date: new Date(today.getFullYear(), today.getMonth() + 1, 15)
    }
  ]

  const calendarDays: (number | null)[] = []

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <main className="eventos">

      {/* EVENTO DESTAQUE */}
      <section className="eventos__featured">
        <div className="eventos__featuredInner">

          <div className="featured__info">
            <span className="featured__label">Evento em destaque</span>
            <h2>Encontro Rota 7 Lagoas</h2>
            <p>
              Um dos maiores encontros motociclísticos da região,
              com bandas ao vivo, praça de alimentação e exposição de motos.
            </p>

            <div className="featured__meta">
              <span>12 OUT</span>
              <span>•</span>
              <span>Praça Central</span>
            </div>

            <Link to="#" className="btn btn--primary">
              Ver detalhes
            </Link>
          </div>

          <div className="featured__image" />
        </div>
      </section>

      {/* LISTA DE EVENTOS */}
      <section className="eventos__list">
        <div className="eventos__listInner">
          <h3>Próximos eventos</h3>

          <div className="eventos__grid">
            <article className="eventItem">
              <h4>Passeio Serra do Espinhaço</h4>
              <p>19 OUT • Saída 07:00</p>
            </article>

            <article className="eventItem">
              <h4>Trilha Off-Road Regional</h4>
              <p>02 NOV • Terra</p>
            </article>

            <article className="eventItem">
              <h4>Encontro Moto Clube SL</h4>
              <p>15 NOV • Centro</p>
            </article>
          </div>
        </div>
      </section>

      {/* CALENDÁRIO */}
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

              const dayEvents = events.filter(event =>
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
                      {event.title}
                    </span>
                  ))}
                </div>
              )
            })}

          </div>

        </div>
      </section>


      {/* CTA DIVULGAÇÃO */}
<section className="eventos__cta">
  <div className="eventos__ctaInner">

    <div className="cta__content">
      <span className="cta__label">Moto Clubes & Organizadores</span>

      <h2>Quer divulgar seu evento na Rota 7?</h2>

      <p>
        Envie as informações do seu encontro, passeio ou trilha.
        Alcance toda a comunidade motociclística de Sete Lagoas e região.
      </p>

      <div className="cta__actions">
        <a
          href="https://wa.me/5500000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          Falar no WhatsApp
        </a>

        <Link to="#" className="btn btn--outline">
          Enviar evento
        </Link>
      </div>
    </div>

  </div>
</section>

    </main>
  )
}