import { Link } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.foregroundPhoto}>
          <img
            src="/images/hero-foreground.jpg"
            alt=""
            className={styles.foregroundImg}
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.tagline}>
            <span className={styles.handwritten}>Everything in One</span>
          </div>

          <div className={styles.nameBlock}>
            <h1 className={styles.nameTop}>AYIRA</h1>
            <h1 className={styles.nameBottom}>ALSTON</h1>
          </div>

          <div className={styles.roles}>
            <span className={styles.pill} style={{ background: 'var(--pink)' }}>Model</span>
            <span className={styles.separator}>/</span>
            <span className={styles.pill} style={{ background: 'var(--yellow)' }}>Developer</span>
            <span className={styles.separator}>/</span>
            <span className={styles.pill} style={{ background: '#90EE90' }}>Creative</span>
          </div>

          <div className={styles.cta}>
            <Link to="/portfolio" className={styles.ctaBtn}>
              See My Work
            </Link>
            <Link to="/about" className={styles.ctaLink}>
              <span className={styles.handwritten}>let me be ya tour guide →</span>
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.marqueeWrapper}>
        <div className={styles.marquee}>
          <span>MODEL &nbsp;·&nbsp; DEVELOPER &nbsp;·&nbsp; CREATIVE &nbsp;·&nbsp; MODEL &nbsp;·&nbsp; DEVELOPER &nbsp;·&nbsp; CREATIVE &nbsp;·&nbsp; MODEL &nbsp;·&nbsp; DEVELOPER &nbsp;·&nbsp; CREATIVE &nbsp;·&nbsp;</span>
          <span aria-hidden>MODEL &nbsp;·&nbsp; DEVELOPER &nbsp;·&nbsp; CREATIVE &nbsp;·&nbsp; MODEL &nbsp;·&nbsp; DEVELOPER &nbsp;·&nbsp; CREATIVE &nbsp;·&nbsp; MODEL &nbsp;·&nbsp; DEVELOPER &nbsp;·&nbsp; CREATIVE &nbsp;·&nbsp;</span>
        </div>
      </div>
    </main>
  )
}
