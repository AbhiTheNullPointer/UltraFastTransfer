interface AppLogoProps {
  className?: string;
}

export function AppLogo({ className = 'w-9 h-9' }: AppLogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="11" fill="#4355B9" />
      <path
        d="M26.5 10L14 26h9.5l-2 12L34 22h-9.5l2-12z"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
