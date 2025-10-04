import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: ''
  });
  
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,currencies');
        const countryData = response.data.map(country => ({
          name: country.name.common,
          currency: Object.keys(country.currencies)[0] || 'USD'
        })).sort((a, b) => a.name.localeCompare(b.name));
        
        setCountries(countryData);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Failed to load country data');
      }
    };

    fetchCountries();
  }, []);

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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Auto-detect currency from selected country
      const selectedCountry = countries.find(c => c.name === formData.country);
      const currency = selectedCountry?.currency || 'USD';

      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        currency: currency
      };

      console.log('Signup data:', signupData);
      
      // Simulate API call
      setTimeout(() => {
        alert('Company account created successfully!');
        setLoading(false);
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      setLoading(false);
    }
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
    select: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: 'white',
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
      cursor: 'pointer'
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
    footer: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
      color: '#6b7280'
    },
    link: {
      color: '#2563eb',
      textDecoration: 'none',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Create Company Account</h1>
        <p style={styles.subtitle}>Setup your expense management system</p>
      </div>

      <div style={styles.formContainer}>
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your full name"
            />
          </div>

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
              placeholder="Enter your work email"
            />
          </div>

          {/* Country */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="country">
              Country
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
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
              placeholder="Minimum 6 characters"
              minLength="6"
            />
          </div>

          {/* Confirm Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              placeholder="Re-enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
          >
            {loading ? 'Creating Account...' : 'Create Company Account'}
          </button>
        </form>

        <div style={styles.footer}>
          <p>
            Already have an account?{' '}
            <a href="/login" style={styles.link}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;