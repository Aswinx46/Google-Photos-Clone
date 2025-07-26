// components/ErrorBoundary.tsx
import React, { Component, type ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
        error: undefined,
    };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("🧨 Error Boundary caught an error:", error, errorInfo);
        // Optionally log error to an error reporting service like Sentry
    }

    render() {
        const { fallback } = this.props;

        if (this.state.hasError) {
            return fallback || (
                <div style={{ padding: "2rem", textAlign: "center" }}>
                    <h2>Something went wrong.</h2>
                    <p>{this.state.error?.message}</p>
                </div>
            );
        }

        return this.props.children;
    }
}
