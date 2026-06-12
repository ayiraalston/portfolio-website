import { useState } from 'react'
import styles from './Portfolio.module.css'
import InstagramMockup from '../components/InstagramMockup'
import LinkedInMockup from '../components/LinkedInMockup'

const modelingProjects = [
  {
    id: 1,
    title: 'Digitals',
    color: 'var(--pink)',
    photos: [
      { src: '/images/digitals-1.jpg', position: '50% 31%', size: '130%' },
      { src: '/images/digitals-2.jpg', position: '50% 8%' },
      { src: '/images/digitals-3.jpg', position: '65% 22%' },
      { src: '/images/digitals-4.jpg', position: '78% 40%' },
    ],
  },
  {
    id: 2,
    title: 'Redroom Collab',
    color: 'var(--red)',
    photos: ['/images/RedR-1.jpg', '/images/RedR-2.jpg', '/images/RedR-3.jpg', { src: '/images/RedR-4.jpg', position: '10% 50%' }],
  },
  {
    id: 3,
    title: 'Editorial',
    color: 'var(--yellow)',
    hidden: true,
    photos: ['/images/Editorial-1.jpg', '/images/Editorial-2.jpg', '/images/Editorial-3.jpg', '/images/Editorial-4.jpg'],
  },
  {
    id: 4,
    title: 'Lookbook',
    color: 'var(--green)',
    photos: ['/images/Lookbook-1.jpg', '/images/Lookbook-2.jpg', '/images/Lookbook-3.jpg', { src: '/images/Lookbook-4.jpg', position: '50% 35%' }],
  },
]

const codingProjects = [
  { id: 1, title: 'SDE Intern Project', category: 'React · Vite', color: 'var(--yellow)', img: '/images/dev-1.jpg', desc: 'Creating a consolidated knowledge base queried by a local MCP server for the Amazon Labor Planning teams.' },
  { id: 2, title: 'NASA App Challenge: Team Leto', category: 'JavaScript', color: 'var(--green)', img: '/images/dev-2.jpg', desc: 'Partnering with Black Girls Code\'s sponsored team to create an Instagram filter of the Artemis II flight path.' },
  { id: 3, title: 'Access AEquity', category: 'Python', color: 'var(--pink)', img: '/images/dev-3.jpg', desc: 'Winning team pitch for InternXL AI Innovation challenge to simplify the process to sign up for financial assistance programs.' },
  { id: 4, title: 'Ciara Build A Beat Challenge', category: 'Python', color: 'var(--yellow)', img: '/images/dev-4.jpg', desc: 'Winning Python-developed song using the Earsketch platform.' },
]

const PILE_DEPTH = 3

export default function Portfolio() {
  const [isModeling, setIsModeling] = useState(false)
  const [photoIndices, setPhotoIndices] = useState({})

  const flipPhoto = (projectId, total) => {
    setPhotoIndices(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] ?? 0) + 1) % total,
    }))
  }

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>
            {isModeling ? (
              <>MY <span className={styles.accent}>MODELING</span><br />PORTFOLIO</>
            ) : (
              <>MY <span className={styles.accentGreen}>CODING</span><br />PORTFOLIO</>
            )}
          </h1>
          <p className={styles.handNote}>
            {isModeling
              ? 'the looks, the shoots, the moments —'
              : 'the builds, the logic, the craft —'}
          </p>
        </div>

        <div className={styles.toggleWrapper}>
          <span className={`${styles.toggleLabel} ${isModeling ? styles.toggleLabelActive : ''}`}>
            Model
          </span>
          <button
            className={styles.toggle}
            onClick={() => setIsModeling(v => !v)}
            aria-label="Switch between modeling and coding portfolio"
          >
            <div className={`${styles.toggleTrack} ${!isModeling ? styles.toggleTrackDev : ''}`}>
              {!isModeling && <span className={styles.toggleIconLeft}>💻</span>}
              <div className={`${styles.toggleThumb} ${!isModeling ? styles.toggleThumbRight : ''}`} />
              {isModeling && <span className={styles.toggleIconRight}>📸</span>}
            </div>
          </button>
          <span className={`${styles.toggleLabel} ${!isModeling ? styles.toggleLabelActive : ''}`}>
            Dev
          </span>
        </div>
      </section>

      <div className={styles.divider} style={{ background: isModeling ? 'var(--pink)' : 'var(--green)' }} />

      {isModeling ? (
        <div className={styles.carousel} key="modeling">
          {modelingProjects.filter(p => !p.hidden).map((p, i) => {
            const currentIdx = photoIndices[p.id] ?? 0
            const total = p.photos.length
            const pileCount = Math.min(PILE_DEPTH, total)

            return (
              <div
                key={p.id}
                className={styles.carouselCard}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className={styles.photoStack}
                  onClick={() => flipPhoto(p.id, total)}
                  title="Click to flip"
                >
                  {Array.from({ length: pileCount }).map((_, pilePos) => {
                    const depthFromTop = pileCount - 1 - pilePos
                    const isTop = depthFromTop === 0
                    const photoIdx = (currentIdx - depthFromTop + total) % total
                    const photoEntry = p.photos[photoIdx]
                    const src = photoEntry && typeof photoEntry === 'object' ? photoEntry.src : photoEntry
                    const pos = photoEntry && typeof photoEntry === 'object' ? photoEntry.position : 'center'
                    const size = photoEntry && typeof photoEntry === 'object' && photoEntry.size ? photoEntry.size : 'cover'
                    const rotation = depthFromTop * -6

                    return (
                      <div
                        key={photoIdx}
                        className={`${styles.stackItem} ${isTop ? styles.stackTop : ''}`}
                        style={{
                          zIndex: pilePos + 1,
                          transform: `rotate(${rotation}deg)`,
                          background: src
                            ? `${p.color} url(${src}) ${pos} / ${size} no-repeat`
                            : p.color,
                          filter: isTop ? 'none' : `brightness(${0.72 + pilePos * 0.12})`,
                        }}
                      >
                        {isTop && (
                          <span className={styles.photoCounter}>
                            {currentIdx + 1} / {total}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
                <h3 className={styles.carouselTitle}>{p.title}</h3>
              </div>
            )
          })}
        </div>
      ) : (
        <section className={styles.grid} key="coding">
          {codingProjects.map((p, i) => (
            <div
              key={p.id}
              className={`${styles.card} ${styles.cardDev}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className={styles.cardImg}
                style={{
                  background: p.color,
                  ...(p.img && {
                    backgroundImage: `url(${p.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }),
                }}
              />
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {isModeling && (
        <section className={styles.parallaxSection}>
          <div className={styles.parallaxBg} />
          <div className={styles.parallaxOverlay} />
          <div className={styles.parallaxContent}>
            <InstagramMockup />
            <a
              href="https://www.instagram.com/ayiraalston_"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.igBtn}
            >
              Follow on Instagram
            </a>
          </div>
        </section>
      )}

      {!isModeling && (
        <section className={`${styles.parallaxSection} ${styles.parallaxSectionDev}`}>
          <div className={`${styles.parallaxBg} ${styles.parallaxBgDev}`} />
          <div className={styles.parallaxOverlay} />
          <div className={styles.parallaxContent}>
            <LinkedInMockup />
            <a
              href="https://www.linkedin.com/in/ayiraalston/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.igBtn}
            >
              Connect on LinkedIn
            </a>
          </div>
        </section>
      )}
    </main>
  )
}
