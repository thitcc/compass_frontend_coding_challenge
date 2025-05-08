import React, { useState, useEffect } from "react";
import "./Calendar.css";
import { useCalendar } from "../../hooks/useCalendar";

// Mock user ID - in a real app, get this from authentication context
const USER_ID = 17;

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const { displayRows, loading, error, fetchCalendarData } = useCalendar()

  useEffect(() => {
    const year  = currentMonth.getFullYear().toString()
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0')
    fetchCalendarData(USER_ID, year, month)
  }, [currentMonth, fetchCalendarData])

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-button" onClick={() =>
          setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))
        }>‹</button>
        <div>
          {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
          {currentMonth.getFullYear()}
        </div>
        <button className="nav-button" onClick={() =>
          setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))
        }>›</button>
      </div>

      {loading && <p>Loading…</p>}
      {error   && <p>Error: {error.message}</p>}

      <div className="allocation-list">

        {displayRows.map((row, i) => (
          <div key={i} className="allocation-row">
          <div className="day-number">{row.day}</div>
          <div className="day-name">{row.weekday}</div>
          <div className="day-location">{row.location}</div>
          <div className="day-activity">{row.activity}</div>
        </div>
        ))}
      </div>
    </div>
  )
}
