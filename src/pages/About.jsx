import { useEffect, useRef, useState } from 'react'
import styles from './About.module.css'

const PERSONALITIES = [
  {
    id: 1,
    img: '/images/personality-1.png',
    label: 'Miss Worldwide',
    desc: 'Travel is my passion. Seeing the world and exposing myself to different cultures and opportunities has always broadened my perspective and appreciation for the world.',
  },
  {
    id: 2,
    img: '/images/personality-2.png',
    label: '4 the culture',
    desc: "Since I was little, I've had an interest in Japanese culture, from watching anime as a kid to now studying abroad in Tokyo and spending a year learning the language. I love learning more about Japan and its rich culture.",
  },
  {
    id: 3,
    img: '/images/personality-3.png',
    label: 'The chef',
    desc: 'From perfecting oyster mushrooms as fried chicken to Tonkotsu ramen. I create meals of many cuisines to try new things and fuel my body with healthy food!',
  },
]

const SLIDE_COLORS = ['#FFF6B0', '#FFB3D9', 'var(--red)']

const TYPED_TEXT = 'Chosen One.'

function useTypingEffect(text, { speed = 80, startDelay = 400 } = {}) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [started, text, speed, startDelay])

  return { displayed, ref }
}

function useTypewriter(text, { speed = 70, startDelay = 100 } = {}) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return displayed
}

function PersonalityPanel({ personality }) {
  const title = personality?.label ?? ''
  const displayed = useTypewriter(title)
  const done = displayed.length === title.length

  return (
    <div className={styles.personalityPanel}>
      <h3 className={styles.personalityTitle}>
        {displayed}
        <span className={`${styles.titleCursor} ${done ? styles.titleCursorDone : ''}`}>|</span>
      </h3>
      <p className={styles.personalityDesc}>
        {personality?.desc}
      </p>
    </div>
  )
}

export default function About() {
  const { displayed, ref } = useTypingEffect(TYPED_TEXT)
  // order = [leftSlot, centerSlot, rightSlot] — each value is a personality index
  const [order, setOrder] = useState([0, 1, 2])

  const handleCardClick = (personalityIdx) => {
    const slot = order.indexOf(personalityIdx)
    if (slot === 1) return // already center
    setOrder(prev =>
      slot === 0
        ? [prev[2], prev[0], prev[1]] // left clicked → rotate right
        : [prev[1], prev[2], prev[0]]  // right clicked → rotate left
    )
  }

  return (
    <main className={styles.main}>
      <section className={styles.intro}>
        <div className={styles.carouselWrap}>
          <div key={order[1]} className={styles.colorSlide} style={{ background: SLIDE_COLORS[order[1]] }} />

          {/* Solar system personality carousel */}
          <div className={styles.personalityRow}>
          {PERSONALITIES.map((p, personalityIdx) => {
            const slot = order.indexOf(personalityIdx) // 0=left, 1=center, 2=right
            const isFeatured = slot === 1
            // Each slot gets a left% position: 0%, 33.33%, 66.66%
            const leftPct = slot * 33.333

            return (
              <div
                key={personalityIdx}
                className={styles.personalityCard}
                onClick={() => handleCardClick(personalityIdx)}
                style={{
                  left: `${leftPct}%`,
                  transform: isFeatured ? 'translateY(0px)' : 'translateY(36px)',
                  transition: 'left 0.55s cubic-bezier(0.34, 1.1, 0.64, 1), transform 0.55s ease',
                  cursor: isFeatured ? 'default' : 'pointer',
                  zIndex: isFeatured ? 2 : 1,
                }}
              >
                <div className={styles.personalityImgWrap}>
                  {p.img
                    ? <img
                        src={p.img}
                        alt={p.label}
                        className={styles.personalityImg}
                        style={{
                          transform: isFeatured ? 'scale(1.9)' : 'scale(1.2)',
                          transformOrigin: 'center top',
                          filter: isFeatured ? 'none' : 'brightness(0.55)',
                          transition: 'transform 0.55s cubic-bezier(0.34, 1.1, 0.64, 1), filter 0.55s ease',
                        }}
                      />
                    : <span className={styles.personalityPlaceholder}>+ drop image</span>
                  }
                </div>
              </div>
            )
          })}
          </div>

          {/* Featured personality description */}
          <PersonalityPanel key={`panel-${order[1]}`} personality={PERSONALITIES[order[1]]} />
        </div>

        <div className={styles.bioBlock}>
          <div className={styles.right}>
            <p className={styles.handNote}>Did you know..</p>

            <h2 className={styles.bigQuote} ref={ref}>
              Ayira means<br />
              <em className={styles.typed}>
                &lsquo;<span>{displayed}</span><span className={`${styles.cursor} ${displayed.length === TYPED_TEXT.length ? styles.cursorDone : ''}`}>|</span>&rsquo;
              </em>
            </h2>

            <p className={styles.bio}>
              Hi, I'm Ayira, and I live up to my name! I believe being chosen means giving my all to my pursuits. Creativity doesn't have to pick a lane, and this portfolio is proof of that.
            </p>

          </div>
        </div>
      </section>

      <section className={styles.skills}>
        <div className={styles.skillsHeader}>
          <h2 className={styles.skillsTitle}>Skills <span className={styles.handwritten}>&amp; works</span></h2>
        </div>

        <div className={styles.skillsGrid}>
          <div className={styles.skillCard} style={{ background: 'var(--pink)' }}>
            <span className={styles.skillEmoji}>🎽</span>
            <h3>Modeling</h3>
            <p>Expressing myself through my poses, clothing, and personality feels so authentically me.</p>
          </div>
          <div className={styles.skillCard} style={{ background: 'var(--yellow)' }}>
            <span className={styles.skillEmoji}>💻</span>
            <h3>Frontend Dev</h3>
            <p>Python, Java, C++, UX design — building is half of the fun; making it look great is the best.</p>
          </div>
          <div className={styles.skillCard} style={{ background: 'var(--green)' }}>
            <span className={styles.skillEmoji}>🎨</span>
            <h3>Creative Direction</h3>
            <p>Concepts, aesthetics, visual storytelling across every medium.</p>
          </div>
          <div className={styles.skillCard} style={{ background: 'var(--white)', border: '2px solid var(--black)' }}>
            <span className={styles.skillEmoji}>✨</span>
            <h3>Branding</h3>
            <p>Building identities that stick — personal and professional.</p>
          </div>
        </div>
      </section>

    </main>
  )
}
