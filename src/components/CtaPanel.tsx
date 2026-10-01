import type { ReactNode } from 'react';

type Props = {
  title: ReactNode;
  text?: ReactNode;
  href: string;
  ctaLabel: string;
  id?: string;
  className?: string;
};

export default function CtaPanel({ title, text, href, ctaLabel, id, className }: Props) {
  return (
    <section className={`ui-cta-section ${className ?? ''}`.trim()} id={id} data-reveal="up">
      <div className="ui-container">
        <div className="ui-cta-panel">
          <div className="ui-cta-panel__grid">
            <div>
              <h2 className="ui-cta-panel__title">{title}</h2>
              {text ? <p className="ui-cta-panel__text">{text}</p> : null}
            </div>
            <a href={href} className="ui-btn ui-btn--primary">
              {ctaLabel}
              <span className="ui-btn__arrow" aria-hidden>
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CtaArrow() {
  return (
    <span className="ui-btn__arrow" aria-hidden>
      →
    </span>
  );
}
