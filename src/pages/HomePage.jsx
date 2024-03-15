import styles from "./Homepage.module.css";
import {Link} from "react-router-dom"
import PageNav from '../components/PageNav'
import Logo from "../components/Logo";


export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <Logo />
      <PageNav />
      </div>
      <section>
        <h1>
          You travel the world.
          <br />
          TourBank  keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to={"/login"} className="cta">Start Tracking Now</Link>

      </section>
    </main>
  );
}