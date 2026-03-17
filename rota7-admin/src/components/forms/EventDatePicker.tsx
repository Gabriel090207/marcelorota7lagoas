import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { forwardRef } from "react"
import { FiCalendar } from "react-icons/fi"

import "./EventDatePicker.css"

type Props = {
  value: string
  onChange: (value: string) => void
}

// 🔥 INPUT CUSTOM COM MÁSCARA
const CustomInput = forwardRef<HTMLInputElement, any>(
  ({ value, onClick, onChange }, ref) => {

    const handleChange = (e: any) => {
      let v = e.target.value.replace(/\D/g, "")

      if (v.length > 8) v = v.slice(0, 8)

      if (v.length >= 5) {
        v = v.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3")
      } else if (v.length >= 3) {
        v = v.replace(/(\d{2})(\d+)/, "$1/$2")
      }

      e.target.value = v
      onChange(e)
    }

    return (
      <div className="datePickerWrapper" onClick={onClick}>
        <FiCalendar className="dateIcon" />

        <input
          ref={ref}
          value={value || ""}
          onChange={handleChange}
          placeholder="dd/mm/aaaa"
          className="dateInput"
        />
      </div>
    )
  }
)

export default function EventDatePicker({ value, onChange }: Props) {

  // string → Date
  const parseDate = (str: string) => {
    if (!str) return null

    const [day, month, year] = str.split("/")
    if (!day || !month || !year) return null

    return new Date(`${year}-${month}-${day}`)
  }

  // Date → string
  const formatDate = (date: Date | null) => {
    if (!date) return ""

    const d = String(date.getDate()).padStart(2, "0")
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const y = date.getFullYear()

    return `${d}/${m}/${y}`
  }

  return (
  <DatePicker
    selected={parseDate(value)}
    onChange={(date: Date | null) => onChange(formatDate(date))}
    dateFormat="dd/MM/yyyy"
    customInput={<CustomInput />}
    showPopperArrow={false}
    popperPlacement="bottom-start"
    portalId="root-portal" // 🔥 ISSO RESOLVE TUDO
  />
)
}