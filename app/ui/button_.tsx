interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`flex h-10 items-center rounded-lg px-4 text-sm font-medium
        transition-colors hover:bg-primary aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
