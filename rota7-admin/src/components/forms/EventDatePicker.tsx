import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { useState } from "react"
import { FiCalendar } from "react-icons/fi"

import "./EventDatePicker.css"

export default function EventDatePicker() {

  const [date, setDate] = useState<Date | null>(null)

  return (

 <div
  className="datePickerWrapper"
  onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
>

      <FiCalendar className="dateIcon" />

     <DatePicker
  selected={date}
  onChange={(date: Date | null) => setDate(date)}
  placeholderText="Data do evento"
  dateFormat="dd/MM/yyyy"
  className="dateInput"
  showPopperArrow={false}
/>

    </div>

  )
}