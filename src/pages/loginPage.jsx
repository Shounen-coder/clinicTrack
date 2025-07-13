import LoginForm from '../components/loginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
    navigate('/calendar');
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-sm p-6 rounded-lg border border-purple-700 bg-[#111] shadow-xl">
        <h1 className="text-3xl text-center font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          Staff Login
        </h1>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
