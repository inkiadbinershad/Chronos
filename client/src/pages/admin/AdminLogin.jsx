import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      <div className="w-full max-w-md border border-chr-gold/20 rounded-sm bg-card-gradient p-8 relative overflow-hidden">
        {/* Decorative top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient opacity-60" />

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-6 h-6 rounded-full border border-chr-gold/40 flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-gold-gradient" />
          </div>
          <span className="font-playfair text-sm font-bold tracking-[0.2em] text-chr-gold-pale">CHRONOS</span>
        </div>

        <h1 className="font-playfair text-2xl text-chr-cream text-center mb-1">Admin Access</h1>
        <p className="font-raleway text-chr-muted text-xs text-center tracking-wide mb-8">Secure portal for administrators</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-raleway text-chr-muted text-xs tracking-wide mb-2">Email</label>
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
            <label className="block font-raleway text-chr-muted text-xs tracking-wide mb-2">Password</label>
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
            className="btn-gold w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 rounded-full border-2 border-chr-cream/20 border-t-chr-cream animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-400 font-raleway text-xs">{error}</p>
        )}

        <p className="mt-6 text-center font-raleway text-chr-muted/60 text-[10px] tracking-wide">
          Dev hint: admin@chronos.com / admin123
        </p>

        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold-gradient opacity-30" />
      </div>
    </div>
  );
}

