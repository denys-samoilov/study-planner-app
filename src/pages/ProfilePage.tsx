import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const identityLabel = user?.username || user?.email || 'Unknown user';

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h1 className="h5 mb-0">Profile</h1>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="card-body">
        <div className="mb-3">
          <span className="text-muted small text-uppercase fw-bold d-block">
            Auth Status
          </span>
          <span
            className={`badge mt-1 ${
              isAuthenticated ? 'bg-success' : 'bg-secondary'
            }`}
          >
            {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
          </span>
        </div>

        <div className="mb-3">
          <span className="text-muted small text-uppercase fw-bold d-block">
            Username / Email
          </span>
          <span className="fw-semibold">{identityLabel}</span>
          {user?.username && user?.email && (
            <div className="text-muted small">{user.email}</div>
          )}
        </div>

        {user && (user.firstName || user.lastName) && (
          <div>
            <span className="text-muted small text-uppercase fw-bold d-block">
              Name
            </span>
            <span>
              {user.firstName} {user.lastName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}