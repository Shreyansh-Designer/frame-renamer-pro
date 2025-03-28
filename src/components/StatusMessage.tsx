
import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface StatusMessageProps {
  status: 'success' | 'error' | 'info' | null;
  message: string;
  details?: string;
}

const StatusMessage = ({ status, message, details }: StatusMessageProps) => {
  if (!status) return null;

  const icons = {
    success: <CheckCircle className="h-4 w-4" />,
    error: <XCircle className="h-4 w-4" />,
    info: <AlertCircle className="h-4 w-4" />
  };

  const variants = {
    success: "border-green-500 text-green-500",
    error: "border-red-500 text-red-500",
    info: "border-blue-500 text-blue-500"
  };

  return (
    <Alert className={`mb-4 ${variants[status]}`}>
      <div className="flex items-start">
        {icons[status]}
        <div className="ml-2">
          <AlertTitle className="text-sm font-medium">{message}</AlertTitle>
          {details && <AlertDescription className="text-xs">{details}</AlertDescription>}
        </div>
      </div>
    </Alert>
  );
};

export default StatusMessage;
