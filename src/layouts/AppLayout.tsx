import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/tasks">
            Study Planner
          </Link>

          <nav aria-label="Primary navigation" className="navbar-nav flex-row gap-3 align-items-center">
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active fw-semibold text-white' : ''}`
              }
            >
              Tasks
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active fw-semibold text-white' : ''}`
              }
            >
              Profile
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `btn btn-sm ms-2 ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
              }
            >
              Login
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container my-4 flex-grow-1">
        {children}
      </main>
    </div>
  );
}