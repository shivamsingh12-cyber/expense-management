import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Replace with your actual backend endpoint
      console.log('Login data:', formData);
      
      // Simulate API call
      setTimeout(() => {
        alert('Login successful!');
        setLoading(false);
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Forgot password feature would be implemented here');
  };

  // Inline styles for minimal design
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '20px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0 0 8px 0'
    },
    subtitle: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0
    },
    formContainer: {
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '6px'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      marginBottom: '15px'
    },
    buttonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    error: {
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#dc2626',
      padding: '12px',
      borderRadius: '6px',
      fontSize: '14px',
      marginBottom: '20px'
    },
    linksContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '15px'
    },
    link: {
      color: '#2563eb',
      textDecoration: 'none',
      fontSize: '14px',
      cursor: 'pointer'
    },
    signupLink: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
      color: '#6b7280'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to your expense management account</p>
      </div>

      <div style={styles.formContainer}>
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Forgot Password Link */}
          <div style={styles.linksContainer}>
            <a 
              href="#forgot-password" 
              style={styles.link}
              onClick={handleForgotPassword}
            >
              Forgot password?
            </a>
          </div>
        </form>

        {/* Sign Up Link */}
        <div style={styles.signupLink}>
          <p>
            Don't have an account?{' '}
           <a 
  href="/signup" 
  style={styles.link}
  onClick={(e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'signup' } }));
  }}
>
  Sign up
</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;