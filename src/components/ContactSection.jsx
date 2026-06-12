import { useState } from 'react'
import styles from './ContactSection.module.css'

const EMAILS = {
  work: 'ayiraalston1@gmail.com',
  creative: 'ayira.modeling@gmail.com',
}

export default function ContactSection() {
  const [emailType, setEmailType] = useState('work')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    const to = EMAILS[emailType]
    const subject = encodeURIComponent(`Message from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  }

  return (
    <section className={styles.section}>

      <div className={styles.phoneCol}>
        <img
          src="/images/contact-phone.png"
          alt="Call me"
          className={styles.phone}
        />
      </div>

      <div className={styles.formCol}>
        <p className={styles.eyebrow}>Don't be a stranger</p>
        <h2 className={styles.heading}>Let's Talk.</h2>

        <div className={styles.toggle}>
          <button
            className={`${styles.toggleBtn} ${emailType === 'work' ? styles.toggleActive : ''}`}
            onClick={() => setEmailType('work')}
            type="button"
          >
            Work
          </button>
          <button
            className={`${styles.toggleBtn} ${emailType === 'creative' ? styles.toggleActive : ''}`}
            onClick={() => setEmailType('creative')}
            type="button"
          >
            Creative Collab
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            name="message"
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
          />
          <button className={styles.submit} type="submit">
            Send it →
          </button>
        </form>
      </div>

    </section>
  )
}
