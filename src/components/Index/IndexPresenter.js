import React from "react";
import styles from "./styles.module.scss";
import Loader from "components/Loader/Loader";
import Header from "components/Header";
import developerImage from "resource/images/developerImage.jpg";
import instagramColor from "resource/images/instagramColor.svg";
import { Github, Instagram, GithubReverse } from "resource/images/SVG";

const IndexPresenter = (props) => (
  <>
    <div className={styles.wrap}>
      <Header />
      <div className={styles.contents}>
        <div className={styles.left_section}>
          <img src={developerImage} />
        </div>
        <div className={styles.right_section}>
          <h1>Bread's Blog of Develop</h1>
          <h2>Seoul, Korea raised.</h2>
          <h2>Web Developer.</h2>
          <div className={styles.links}>
            <div
              className={styles.link}
              onClick={() => window.open("https://github.com/withbbang")}
            >
              <Github width="30px" height="30px" /> GitHub
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
          <div className={styles.info}>© 2021 by Bread</div>
        </div>
      </div>
    </div>
    <Loader loading={props.loading} />
  </>
);

export default IndexPresenter;
