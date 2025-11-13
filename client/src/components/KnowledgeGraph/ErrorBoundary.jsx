import React, { Component } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Knowledge Graph Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <AlertCircle size={48} className="error-icon" />
            <h2>Oops! Something went wrong</h2>
            <p className="error-message">
              {this.state.error?.message || 'An unexpected error occurred in the Knowledge Graph'}
            </p>
            <div className="error-actions">
              <button onClick={this.handleReset} className="reset-btn">
                <RefreshCw size={18} />
                Reload Graph
              </button>
              <button onClick={() => window.history.back()} className="back-btn">
                Go Back
              </button>
            </div>
            <details className="error-details">
              <summary>Error Details</summary>
              <pre>{this.state.error?.stack}</pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
