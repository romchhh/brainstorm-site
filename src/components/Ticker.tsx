import styles from './Ticker.module.css';

const items = ['СПІЛЬНОТА', 'ДЕБАТИ', 'ЕКОЛОГІЯ', 'НАУКА', 'ПУБЛІЧНІ ВИСТУПИ', 'РОБОТОТЕХНІКА', 'ГРОМАДА'];

export default function Ticker() {
  const repeated = [...items, ...items, ...items];
  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        {repeated.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <WaveSmall />
          </span>
        ))}
      </div>
    </div>
  );
}

function WaveSmall() {
  return (
    <svg width="40" height="18" viewBox="0 0 32 14" fill="none" style={{ margin: '0 20px', flexShrink: 0 }}>
      <path d="M1 9 C5 2, 10 2, 16 9 C22 16, 27 16, 31 9" stroke="#E8538A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
