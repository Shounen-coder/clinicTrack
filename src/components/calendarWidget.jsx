import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calender.css'

const CalendarWidget = ({ onDateSelect }) => {
  const [date, setDate] = useState(new Date());

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
    onDateSelect(selectedDate);
  };

  return (
    <div className="w-full max-w-6xl">
      <Calendar
        onChange={handleChange}
        value={date}
        className="react-calendar"
      />
    </div>
  );
};

export default CalendarWidget;
