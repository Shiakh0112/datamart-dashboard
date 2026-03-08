import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.errorBox}>
            <div style={styles.icon}>⚠️</div>
            <h2 style={styles.title}>Oops! Something went wrong</h2>
            <p style={styles.message}>
              The application encountered an unexpected error.
              <br />
              Don't worry, your data is safe.
            </p>
            <button onClick={this.handleRefresh} style={styles.button}>
              🔄 Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px',
    backgroundColor: '#f5f5f5'
  },
  errorBox: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '48px',
    maxWidth: '500px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  icon: {
    fontSize: '64px',
    marginBottom: '16px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '12px'
  },
  message: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '24px'
  },
  button: {
    padding: '12px 32px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 123, 255, 0.3)'
  }
};

export default ErrorBoundary;
