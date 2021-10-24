import React from "react";
import styles from "./styles.module.scss";
import Particles from "react-particles-js";
import Particle from "./Particle";

const BackgroundPresenter = (props) => (
  <div className={styles.wrap}>
    <Particles params={Particle} />
  </div>
);

export default BackgroundPresenter;
