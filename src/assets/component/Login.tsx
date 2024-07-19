import React, { useState } from 'react';

interface LoginProps {
  onLogin: (isLoggedIn: boolean) => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '130307080906') {
      onLogin(true);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-md w-72">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
            <input
              placeholder='Username'
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 border-t-2 border-teal-700 text-white rounded"
              required
            />
            <input
              placeholder='Password'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 border-t-2 border-teal-700 text-white rounded"
              required
            />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end gap-2 items-center mt-6">
            <button type="submit" className="px-4 py-2 bg-teal-600 hover:bg-gray-600 rounded">
              Login
            </button>
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 hover:bg-gray-700 bg-gray-600 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;