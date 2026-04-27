import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-chr-black flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-chr-gold/20 rounded-sm bg-card-gradient p-8">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-3xl text-chr-gold tracking-wider">CHRONOS</h1>
          <p className="font-raleway text-chr-muted text-xs tracking-widest uppercase mt-1">Admin Portal</p>
        </div>

        <h2 className="font-playfair text-2xl text-chr-cream text-center mb-6">Sign In</h2>

        {error && (
          <div className="mb-4 p-3 border border-red-500/30 bg-red-500/10 text-red-400 text-sm rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-raleway text-chr-muted text-xs uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-dark w-full"
              placeholder="admin@chronos.com"
              required
            />
          </div>

          <div>
            <label className="block font-raleway text-chr-muted text-xs uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-dark w-full"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-3.5 text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 rounded-full border-2 border-chr-black/20 border-t-chr-black animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-6 text-center font-raleway text-chr-muted/60 text-xs">
          Dev hint: admin@chronos.com / admin123
        </p>
      </div>
    </div>
  );
}
