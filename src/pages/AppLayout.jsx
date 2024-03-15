import React from 'react'
import styles from "./AppLayout.module.css";
import AppNav from '../components/AppNav';
import SideBar from '../components/SideBar';
import Map from '../components/Map';
import User from '../components/User';

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  )
}
