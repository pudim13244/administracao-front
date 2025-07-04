import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error | null; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error);
    console.error("Error info:", errorInfo);
    this.setState({ error, errorInfo });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '1rem',
          backgroundColor: '#f9fafb',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '28rem',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            padding: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3rem',
              height: '3rem',
              margin: '0 auto',
              backgroundColor: '#fef2f2',
              borderRadius: '50%'
            }}>
              <svg style={{ width: '1.5rem', height: '1.5rem', color: '#dc2626' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 style={{
              marginTop: '1rem',
              fontSize: '1.125rem',
              fontWeight: '500',
              color: '#111827',
              textAlign: 'center'
            }}>
              Algo deu errado
            </h3>
            <p style={{
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: '#6b7280',
              textAlign: 'center'
            }}>
              Ocorreu um erro inesperado. Tente recarregar a página.
            </p>
            <div style={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem'
            }}>
              <button
                onClick={this.resetError}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: '#2563eb',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}
              >
                Tentar novamente
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}
              >
                Recarregar página
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: '1rem' }}>
                <summary style={{ cursor: 'pointer', fontSize: '0.875rem', color: '#6b7280' }}>
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre style={{
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  color: '#dc2626',
                  backgroundColor: '#fef2f2',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  overflow: 'auto'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 