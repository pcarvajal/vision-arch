import { Brain } from 'lucide-react';

type loaderSize = 'sm' | 'md' | 'lg';

interface FullScreenSpinnerProps {
  show: boolean;
  label?: string;
  size?: loaderSize;
}

export default function ThinkingLoader({
  show,
  label = '',
  size = 'lg',
}: FullScreenSpinnerProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Spinner */}
      <Brain size={80} className="animate-bounce text-white" />
    </div>
  );
}
