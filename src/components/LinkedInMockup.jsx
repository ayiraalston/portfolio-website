import { useEffect, useRef, useState } from 'react'
import styles from './LinkedInMockup.module.css'

const PROFILE = {
  name: 'Ayira Alston',
  title: '',      // ← your headline / role
  location: '',   // ← e.g. "New York, NY"
}

export default function LinkedInMockup() {
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
      <div className={styles.banner} />

      <div className={styles.profileRow}>
        <div className={styles.avatar} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{PROFILE.name}</h3>
        {PROFILE.title && <p className={styles.title}>{PROFILE.title}</p>}
        {PROFILE.location && <p className={styles.location}>{PROFILE.location}</p>}
      </div>

      <div className={styles.intro}>
        SDE Intern @ Amazon · Computer Science @ UF · Google Code Next '23 · Miami Heat Scholar '25 · Girls Who Code · UNCF STEM Scholar · Black Girls Code · NSBE Trailblazer
      </div>

      <div className={styles.divider} />

      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>connections</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>profile views</span>
        </div>
      </div>
    </div>
  )
}
