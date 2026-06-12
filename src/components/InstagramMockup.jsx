import { useEffect, useRef, useState } from 'react'
import styles from './InstagramMockup.module.css'

const PROFILE = {
  handle: 'ayiraalston_',
  name: 'Ayira Alston',
  bio: '',  // ← optional short bio line
}

// Add your post images here — drop files into public/images/ as ig-1.jpg, ig-2.jpg, etc.
const POSTS = [
  '/images/ig-1.jpg',
  '/images/ig-2.jpg',
  '/images/ig-3.jpg',
  '/images/ig-4.jpg',
  '/images/ig-5.jpg',
  '/images/ig-6.jpg',
  '/images/ig-7.jpg',
  '/images/ig-8.jpg',
  '/images/ig-9.jpg',
]

export default function InstagramMockup() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.25 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.mockup} ${visible ? styles.visible : ''}`}
    >
      <div className={styles.header}>
        <div className={styles.avatar}>
          <div className={styles.avatarRing} />
          <div className={styles.avatarImg} />
        </div>

        <div className={styles.statsBlock}>
          <div className={styles.stat}><span className={styles.statLabel}>posts</span></div>
          <div className={styles.stat}><span className={styles.statLabel}>followers</span></div>
          <div className={styles.stat}><span className={styles.statLabel}>following</span></div>
        </div>
      </div>

      <div className={styles.bio}>
        <p className={styles.handle}>{PROFILE.handle}</p>
        {PROFILE.name && <p className={styles.name}>{PROFILE.name}</p>}
        {PROFILE.bio && <p className={styles.bioText}>{PROFILE.bio}</p>}
      </div>

      <div className={styles.grid}>
        {POSTS.map((src, i) => (
          <div
            key={i}
            className={styles.gridCell}
            style={src ? { backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
            {!src && <span className={styles.gridHint}>+</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
