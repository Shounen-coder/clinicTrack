import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const doctors = ['Dr. X', 'Dr. Y', 'Dr. Z'];

const AppointmentModal = ({ selectedDate, onClose, onSave }) => {
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    setPatient('');
    setDoctor('');
    setTime('');
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patient || !doctor || !time) {
      toast.error('Please fill in all fields');
      return;
    };

    const newAppointment = {
      id: Date.now(),
      patient,
      doctor,
      time,
      date: selectedDate.toDateString()
    };

    onSave(newAppointment);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#111] p-6 rounded-lg border border-purple-700 shadow-xl text-white w-full max-w-md"
      >
        <h2 className="text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          Add Appointment
        </h2>

        <label className="block mb-2">Patient</label>
       <input
  type="text"
  value={patient}
  onChange={(e) => setPatient(e.target.value)}
  placeholder="Enter patient name"
  className="w-full mb-4 p-2 rounded bg-black border border-gray-600"
/>


        <label className="block mb-2">Doctor</label>
        <select
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-black border border-gray-600"
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <label className="block mb-2">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-black border border-gray-600"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentModal;
