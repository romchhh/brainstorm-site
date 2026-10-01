import type { AdminNavIcon } from '@/lib/admin/nav'

type IconProps = {
  name: AdminNavIcon
  className?: string
}

export default function AdminIcon({ name, className }: IconProps) {
  const common = {
    className,
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (name) {
    case 'dashboard':
      return (
        <svg {...common}>
          <path d="M4 13h6V4H4v9zm10 7h6V11h-6v9zM4 20h6v-5H4v5zm10-11h6V4h-6v5z" />
        </svg>
      )
    case 'leads':
      return (
        <svg {...common}>
          <path d="M4 6h16M4 12h10M4 18h14" />
          <circle cx="19" cy="12" r="2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'properties':
      return (
        <svg {...common}>
          <path d="M4 20V9l8-5 8 5v11" />
          <path d="M9 20v-6h6v6" />
        </svg>
      )
    case 'districts':
      return (
        <svg {...common}>
          <path d="M12 21s-7-5.4-7-11a7 7 0 1 1 14 0c0 5.6-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.4" />
        </svg>
      )
    case 'roles':
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M14 20c0-2.2 1.8-4 4-4" />
        </svg>
      )
    case 'analytics':
      return (
        <svg {...common}>
          <path d="M4 19V5M4 19h16" />
          <path d="M8 15l3-4 3 2 4-6" />
        </svg>
      )
    case 'blog':
      return (
        <svg {...common}>
          <path d="M6 4h11a2 2 0 0 1 2 2v12H8a2 2 0 0 1-2-2V4z" />
          <path d="M6 12h13M8 8h9M8 16h7" />
        </svg>
      )
    case 'landings':
      return (
        <svg {...common}>
          <path d="M4 7h16v12H4z" />
          <path d="M8 7V5a4 4 0 0 1 8 0v2" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      )
    case 'reviews':
      return (
        <svg {...common}>
          <path d="M7 8h10M7 12h7" />
          <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-4 2V6a2 2 0 0 1 2-2z" />
        </svg>
      )
    case 'team':
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M14 20c0-2.2 1.8-4 4-4" />
        </svg>
      )
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )
    default:
      return null
  }
}
