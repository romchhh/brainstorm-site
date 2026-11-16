import type { ReactNode } from 'react';
import { CtaArrow } from '@/components/CtaArrow';

export { CtaArrow };

type Cta = {
  href: string;
  label: string;
  external?: boolean;
  outline?: boolean;
};

type Props = {
  title: ReactNode;
  text?: ReactNode;
  href: string;
  ctaLabel: string;
  id?: string;
  className?: string;
  external?: boolean;
  secondary?: Cta;
};

export default function CtaPanel({
  title,
  text,
  href,
  ctaLabel,
  id,
  className,
  external,
  secondary,
}: Props) {
  return (
    <section className={`ui-cta-section ${className ?? ''}`.trim()} id={id} data-reveal="up">
      <div className="ui-container">
        <div className="ui-cta-panel">
          <div className="ui-cta-panel__grid">
            <div>
              <h2 className="ui-cta-panel__title">{title}</h2>
              {text ? <p className="ui-cta-panel__text">{text}</p> : null}
            </div>
            <div className="ui-cta-panel__actions">
              <a
                href={href}
                className="ui-btn ui-btn--primary"
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {ctaLabel}
                <CtaArrow />
              </a>
              {secondary ? (
                <a
                  href={secondary.href}
                  className={`ui-btn ${secondary.outline === false ? 'ui-btn--primary' : 'ui-btn--outline'}`}
                  {...(secondary.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {secondary.label}
                  <CtaArrow />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
