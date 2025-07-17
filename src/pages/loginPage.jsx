import LoginForm from '../components/loginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
    navigate('/calendar');
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-white via-pink-100 to-purple-200 flex flex-col items-center justify-center relative">
      <h1 className="absolute top-30 text-5xl p-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
        Clini TRACK
      </h1>
      <div className="w-full max-w-lg sm:max-w-lg p-10 rounded-lg border border-gray-300 bg-white shadow-2xl">
        <h1 className="text-3xl text-center font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400">
          Staff Login
        </h1>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
