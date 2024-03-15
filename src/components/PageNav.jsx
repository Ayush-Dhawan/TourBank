import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './PageNav.module.css'

export default function PageNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li> </li>
        <li><NavLink to="/pricing">Pricing</NavLink> </li>
        <li><NavLink to="/products">Product</NavLink> </li>
        <li><NavLink className={styles.ctaLink} to="/login">Login</NavLink> </li>
      </ul>
    </div>
  )
}
