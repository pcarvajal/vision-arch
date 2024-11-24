import { Spinner } from '@nextui-org/react';

type loaderSize = 'sm' | 'md' | 'lg';

interface FullScreenSpinnerProps {
  show: boolean;
  label?: string;
  size?: loaderSize;
}

export default function Loader({ show, label = '', size = 'lg' }: FullScreenSpinnerProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Spinner */}
      <Spinner label={label} size={size} />
    </div>
  );
}
