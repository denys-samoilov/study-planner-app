import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../schemas/authSchema';
import { useAuthContext } from '../hooks/useAuthContext';

export function LoginPage() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);



  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormData) => {
    setSubmitError(null);
    try {
      await login(values.username, values.password);
      navigate('/tasks');
    } 
    catch (error) {
      setSubmitError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-5 col-lg-4">
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <h1 className="h5 mb-0">Sign In</h1>
          </div>

          <div className="card-body">
            {submitError && (
              <div className="alert alert-danger" role="alert">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <label htmlFor="login-username" className="form-label">
                  Username
                </label>
                <input
                  id="login-username"
                  type="text"
                  autoComplete="username"
                  placeholder="emilys"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  aria-invalid={Boolean(errors.username)}
                  {...register('username')}
                />
                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="At least 6 characters"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  aria-invalid={Boolean(errors.password)}
                  {...register('password')}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}