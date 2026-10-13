import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled runtime error in portfolio component tree:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07080d] text-[#e3e2e8] flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-md w-full glass-box-elevated p-6 sm:p-8 rounded-3xl border border-cyan-400/40 text-center space-y-6 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono-code text-xl font-bold">
              ES
            </div>

            <div className="space-y-2">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#f3f4f6]">
                Ekam Singh Portfolio
              </h2>
              <p className="font-mono-code text-xs text-cyan-300 uppercase tracking-widest">
                Interface Recovery Mode
              </p>
            </div>

            <p className="font-body text-sm text-[#9ca3af] leading-relaxed">
              An unexpected runtime error was caught safely without crashing the display.
            </p>

            {this.state.error?.message && (
              <div className="glass-sub-box p-3 rounded-xl text-left font-mono-code text-xs text-cyan-200/80 break-words max-h-24 overflow-y-auto">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-2.5 px-4 rounded-xl font-mono-code text-xs font-semibold bg-cyan-400 text-[#07080d] hover:bg-cyan-300 transition-all cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                Reload Portfolio
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 py-2.5 px-4 rounded-xl font-mono-code text-xs font-semibold glass-btn text-[#e3e2e8] hover:text-cyan-300 transition-all cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
