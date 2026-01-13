import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    background: '#000000',
                    color: '#e0e0e0',
                    fontFamily: "'Space Mono', monospace",
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        <i className="fas fa-exclamation-triangle" style={{ color: '#ff6b6b' }}></i>
                    </h1>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                        Something went wrong
                    </h2>
                    <p style={{ color: '#888', marginBottom: '2rem', maxWidth: '500px' }}>
                        We encountered an unexpected error. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '1rem 2rem',
                            border: '1px solid #e0e0e0',
                            background: 'transparent',
                            color: '#e0e0e0',
                            fontFamily: "'Space Mono', monospace",
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
