import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'jaasim@gmail.com' && password === '123456') {
      onLogin();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#111] p-8 rounded-lg shadow-lg border border-purple-700 w-full max-w-sm"
    >
      <h2 className="text-2xl mb-6 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
        Staff Login
      </h2>

      <label className="block mb-2">Email</label>
      <input
        type="email"
        className="w-full p-2 mb-4 bg-black border border-gray-600 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="block mb-2">Password</label>
      <input
        type="password"
        className="w-full p-2 mb-4 bg-black border border-gray-600 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
