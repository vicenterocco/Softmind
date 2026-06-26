
interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullScreen?: boolean;
}

export function Loader({
  size = 'md',
  message = 'Carregando...',
  fullScreen = false,
}: LoaderProps) {
  const sizeStyles = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const borderWidth = {
    sm: 'border-2',
    md: 'border-3',
    lg: 'border-4',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`
          ${sizeStyles[size]}
          ${borderWidth[size]}
          border-indigo-200 dark:border-gray-700
          border-t-indigo-600 dark:border-t-indigo-500
          rounded-full animate-spin
        `}
      />
      {message && (
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}