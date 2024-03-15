import styles from "./Logo.module.css";

function Logo() {
  return <div style={{display: "flex"}}>
  <img src="/icon.png" alt="WorldWise logo" className={styles.logo} /><span style={{display: "flex", alignItems: "center", justifyContent: "center"}}><h1>TourBank</h1></span>
  </div>
}

export default Logo;