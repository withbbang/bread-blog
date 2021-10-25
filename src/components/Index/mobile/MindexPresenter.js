import React from "react";
import styles from "./styles.module.scss";
import Loader from "components/Loader/Loader";
import SecretWordModal from "../SecretWordModal/SecretWordModal";
import ErrorModal from "components/ErrorModal/ErrorModal";
import bread from "resource/images/bread.png";
import developerImage from "resource/images/developerImage4.jpg";
import instagramColor from "resource/images/instagramColor.svg";
import { More, Close, Search, Github, Instagram, GithubReverse } from "resource/images/SVG";

const MindexPresenter = (props) => (
  <div className={styles.wrap}>
    <div className={styles.header}>
      <div className={styles.more}>
        <More width="30px" height="30px" fill="#fff" />
      </div>
      <div className={styles.title}>
        <img src={bread} />
        's Blog
      </div>
    </div>
    <div className={styles.first_section} />
    <div className={styles.second_section}>
      <img src={developerImage} />
      <h2>Bread's Blog of Develop</h2>
      <h3>Seoul, Korea raised.</h3>
      <h3>Web Developer.</h3>
      <div className={styles.links}>
        <div className={styles.link} onClick={() => window.open("https://github.com/withbbang")}>
          <Github /> GitHub
        </div>
        <div
          className={styles.link}
          onClick={() => window.open("https://www.instagram.com/cheeseonionbbangnigasajunbbang/")}
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
