import { useState } from "react";
import CalendarWidget from "../components/calendarWidget";
import AppointmentModal from "../components/appointment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const CalendarPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });

  const [view, setView] = useState("calendar");

  const handleDelete = (id) => {
    const updated = appointments.filter((appt) => appt.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    toast.success("Appointment deleted");
  };

  return (
    <div className="flex h-screen w-screen bg-black text-white transition-colors duration-300">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden absolute top-4 left-4 z-50 bg-purple-700 text-white px-3 py-2 rounded"
      >
        ☰
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-70 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-50 transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-[260px] bg-gray-100 dark:bg-[#111] border-r border-gray-300 dark:border-purple-700 h-full p-6`}
      >
        <h2 className="text-xl font-semibold mb-6">MENU</h2>
        <ul className="space-y-3">
          <li>
            <button
              className="w-full text-left hover:text-purple-400"
              onClick={() =>
                setView(view === "calendar" ? "appointments" : "calendar")
              }
            >
              {view === "calendar" ? "All Appointments" : "Back to Calendar"}
            </button>
          </li>

          <li>
            <button className="w-full text-left hover:text-purple-400">
              Settings
            </button>
          </li>
          <li>
            <button className="w-full text-left hover:text-purple-400">
              Log Out
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Clini TRACK
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-10">
            Manage your clinic appointments
          </p>

          {/* Mobile Date Picker */}
          <div className="block md:hidden mb-6">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
              Pick a date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="w-full p-2 rounded bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-black dark:text-white"
            />
          </div>

          {view === "calendar" ? (
            <>
              {/* Desktop Calendar */}
              <div className="hidden md:flex justify-center">
                <CalendarWidget
                  onDateSelect={(date) => setSelectedDate(date)}
                />
              </div>

              {/* Add Appointment Button */}
              <div className="mt-10 text-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded text-lg shadow-lg"
                >
                  + Add Appointment
                </button>
                {showModal && (
                  <AppointmentModal
                    selectedDate={selectedDate}
                    onClose={() => setShowModal(false)}
                    onSave={(newAppt) => {
                      const updated = [...appointments, newAppt];
                      setAppointments(updated);
                      localStorage.setItem(
                        "appointments",
                        JSON.stringify(updated)
                      );
                      toast.success("Appointment added successfully!");
                    }}
                  />
                )}
              </div>

              {/* Appointments List by selected date */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Appointments on {selectedDate.toDateString()}
                </h2>

                {appointments.filter(
                  (appt) => appt.date === selectedDate.toDateString()
                ).length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">
                    No appointments for this day.
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {appointments
                      .filter(
                        (appt) => appt.date === selectedDate.toDateString()
                      )
                      .map((appt) => (
                        <li
                          key={appt.id}
                          className="bg-gray-100 dark:bg-[#1a1a1a] border border-gray-300 dark:border-purple-700 rounded p-4 flex justify-between items-center"
                        >
                          <div>
                            <p>
                              <span className="text-pink-500 font-medium">
                                Patient:
                              </span>{" "}
                              {appt.patient}
                            </p>
                            <p>
                              <span className="text-purple-400 font-medium">
                                Doctor:
                              </span>{" "}
                              {appt.doctor}
                            </p>
                            <p>
                              <span className="text-gray-500 dark:text-gray-400">
                                Time:
                              </span>{" "}
                              {appt.time}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDelete(appt.id)}
                            className="text-red-500 hover:text-red-700 font-bold text-sm"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                All Upcoming Appointments
              </h2>
              {appointments.length === 0 ? (
                <p className="text-gray-400">No appointments found.</p>
              ) : (
                <ul className="space-y-4">
                  {appointments
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((appt) => (
                      <li
                        key={appt.id}
                        className="bg-gray-100 dark:bg-[#1a1a1a] border border-gray-300 dark:border-purple-700 rounded p-4"
                      >
                        <p>
                          <span className="text-pink-500 font-medium">
                            Date:
                          </span>{" "}
                          {appt.date}
                        </p>
                        <p>
                          <span className="text-pink-500 font-medium">
                            Patient:
                          </span>{" "}
                          {appt.patient}
                        </p>
                        <p>
                          <span className="text-purple-400 font-medium">
                            Doctor:
                          </span>{" "}
                          {appt.doctor}
                        </p>
                        <p>
                          <span className="text-gray-500 dark:text-gray-400">
                            Time:
                          </span>{" "}
                          {appt.time}
                        </p>
                      </li>
                    ))}
                </ul>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
