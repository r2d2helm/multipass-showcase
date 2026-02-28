'use client'

import { Component, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: string | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-deep-ocean">
          <div className="flex flex-col items-center gap-4 max-w-md text-center px-6">
            <AlertTriangle className="h-10 w-10 text-amber-500" />
            <h2 className="text-lg font-heading font-semibold text-cloud-white">
              Something went wrong
            </h2>
            <p className="text-sm text-steel-gray">
              The architecture visualization encountered an error.
            </p>
            {this.state.error && (
              <code className="text-xs text-steel-gray/60 bg-[rgba(255,255,255,0.03)] rounded-lg px-3 py-2 max-w-full overflow-x-auto">
                {this.state.error}
              </code>
            )}
            <button
              onClick={this.handleRetry}
              className="flex items-center gap-2 rounded-lg bg-electric-cyan/10 px-4 py-2 text-sm text-electric-cyan hover:bg-electric-cyan/20 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
