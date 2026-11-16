import Image from 'next/image';

type Tone = 'pink' | 'yellow' | 'blue';
type Variant = 'wave' | 'arc';

const SRC: Record<Variant, Record<Tone, string>> = {
  wave: {
    pink: '/icons/wave-pink.svg',
    yellow: '/icons/wave-yellow.svg',
    blue: '/icons/wave-blue.svg',
  },
  arc: {
    pink: '/icons/curve-arc.svg',
    yellow: '/icons/curve-arc.svg',
    blue: '/icons/curve-arc.svg',
  },
};

type Props = {
  className?: string;
  tone?: Tone;
  variant?: Variant;
  width?: number;
  height?: number;
};

/** Colorful line/curve decorations — preferred over text stickers. */
export default function DecorMark({
  className,
  tone = 'pink',
  variant = 'wave',
  width = 88,
  height = 20,
}: Props) {
  return (
    <Image
      src={SRC[variant][tone]}
      alt=""
      width={width}
      height={height}
      className={className}
      aria-hidden
    />
  );
}
