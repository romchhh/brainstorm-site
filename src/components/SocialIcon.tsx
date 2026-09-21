type SocialName = 'instagram' | 'facebook' | 'telegram' | 'tiktok' | 'youtube';

type Props = {
  name: SocialName | string;
  size?: number;
};

export default function SocialIcon({ name, size = 16 }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  switch (name) {
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      );
    case 'telegram':
      return (
        <svg {...common}>
          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg {...common}>
          <path d="M9 9v8a3 3 0 1 0 3 3v-9" />
          <path d="M12 6c1.5 2 3.5 3 6 3" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...common}>
          <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

export const SOCIAL_LINKS = [
  {
    name: 'instagram' as const,
    label: 'Instagram',
    href: 'https://instagram.com/brainstorm.ngo?igsh=MXVmazV2NGJkMzUxcA==',
  },
  {
    name: 'facebook' as const,
    label: 'Facebook',
    href: 'https://www.facebook.com/BrainStormLutsk',
  },
  {
    name: 'telegram' as const,
    label: 'Telegram',
    href: 'https://t.me/Brainstorm_ShDK',
  },
  {
    name: 'tiktok' as const,
    label: 'TikTok',
    href: 'https://www.tiktok.com/@brainstorm.ngo?_t=zm-90gl6jeuehp&_r=1',
  },
  {
    name: 'youtube' as const,
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCyaXTpH7aE1tft_YDImmlkQ',
  },
] as const;
