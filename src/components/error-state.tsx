import React from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  showRetryButton?: boolean
  compact?: boolean
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Algo deu errado",
  message = "Não conseguimos carregar os dados. Por favor, tente novamente.",
  onRetry,
  showRetryButton = true,
  compact = false,
}) => {
  if (compact) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <div className="flex items-center gap-2 text-red-600 mb-3">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium text-sm">{title}</span>
        </div>
        {showRetryButton && onRetry && (
          <button
            onClick={onRetry}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[400px] px-4">
      <div className="max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>

          {/* Message */}
          <p className="text-muted-foreground mb-8">{message}</p>

          {/* Retry Button */}
          {showRetryButton && onRetry && (
            <Button
              onClick={onRetry}
              variant="default"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Tentar novamente
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
