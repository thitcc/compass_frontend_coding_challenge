import React, { useState } from "react";
import "./Calendar.css";

type TimeAllocation = {
  date: string;
  location: string;
  activity: string;
};

type Day = {
  date: Date;
  timeAllocation?: TimeAllocation;
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedAllocation, setSelectedAllocation] = useState<TimeAllocation | null>(null);

  const [timeAllocations] = useState<TimeAllocation[]>([
    { date: "2025-04-04", location: "Argentina", activity: "work" },
    { date: "2025-04-05", location: "Argentina", activity: "personal" },
    { date: "2025-04-06", location: "Argentina", activity: "personal" },
    { date: "2025-04-07", location: "Brazil", activity: "work" },
  ]);

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  const daysInMonth: Day[] = Array.from({ length: endOfMonth.getDate() }, (_, i) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
    const dateStr = date.toISOString().split("T")[0];
    const timeAllocation = timeAllocations.find(ci => ci.date === dateStr);
    return { date, timeAllocation };
  });

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedAllocation(null); // clear selection
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedAllocation(null); // clear selection
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>←</button>
        <h2>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>→</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d} className="calendar-day-name">{d}</div>
        ))}

        {Array.from({ length: startOfMonth.getDay() }).map((_, i) => (
          <div key={`pad-${i}`} className="calendar-day empty" />
        ))}

        {daysInMonth.map(({ date, timeAllocation }) => (
          <div
            key={date.toDateString()}
            className={`calendar-day ${timeAllocation ? "checked-in" : ""}`}
            onClick={() => {
              if (timeAllocation) {
                setSelectedAllocation(timeAllocation);
              } else {
                setSelectedAllocation(null);
              }
            }}
          >
            <div className="date-number">{date.getDate()}</div>
          </div>
        ))}
      </div>

      {selectedAllocation && (
        <div className="allocation-details">
          <h3>Details for {selectedAllocation.date}</h3>
          <p><strong>Location:</strong> {selectedAllocation.location}</p>
          <p><strong>Activity:</strong> {selectedAllocation.activity}</p>
        </div>
      )}
    </div>
  );
};

export default Calendar;