import React, { Component } from 'react'
import styles from './SideBar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
import { Outlet } from 'react-router-dom'

export default class SideBar extends Component{
  render() {
    return (
      <div className={styles.sidebar}>
        <Logo />
        <AppNav />

        <Outlet />
        <footer className={styles.footer}>
            <p className={StyleSheet.copyright}>
                &copy; Copyright ayush {new Date().getFullYear()}
                
            </p>
        </footer>
      </div>
    )
  }
}
