import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.logo}>
        AYIRA<span className={styles.dot}>.</span>
      </NavLink>
      <div className={styles.links}>
        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          About
        </NavLink>
        <NavLink
          to="/portfolio"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          Portfolio
        </NavLink>
      </div>
    </nav>
  )
}
