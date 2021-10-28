import React from "react";
import styles from "./styles.module.scss";
import Header from "components/Header";
import developerImage from "resource/images/developerImage4.jpg";
import instagramColor from "resource/images/instagramColor.svg";
import { Github, Instagram, GithubReverse } from "resource/images/SVG";

const MindexPresenter = (props) => (
  <div className={styles.wrap}>
    <Header />
    <div className={styles.first_section}>
      <img src={developerImage} />
    </div>
    <div className={styles.second_section}>
      <h2>Bread's Blog of Develop</h2>
      <h3>Seoul, Korea raised.</h3>
      <h3>Web Developer.</h3>
      <div className={styles.links}>
        <div
          className={styles.link}
          onClick={() => window.open("https://github.com/withbbang")}
        >
          <Github /> GitHub
        </div>
        <div
          className={styles.link}
          onClick={() =>
            window.open(
              "https://www.instagram.com/cheeseonionbbangnigasajunbbang/"
            )
          }
        >
          <img src={instagramColor} /> Instagram
        </div>
      </div>
      <div className={styles.logos}>
        <GithubReverse width="25px" height="25px" />
        <Instagram width="30px" height="30px" />
      </div>
    </div>
    <div className={styles.third_section}>© 2021 by Bread</div>
  </div>
);

export default MindexPresenter;
