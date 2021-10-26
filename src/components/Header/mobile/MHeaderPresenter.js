import React from "react";
import styles from "./styles.module.scss";
import bread from "resource/images/bread.png";
import { More } from "resource/images/SVG";

const MHeaderPresenter = (props) => (
  <div className={styles.wrap}>
    <div className={styles.header}>
      <div className={styles.title}>
        <img src={bread} />
        's Blog
      </div>
      <div className={styles.more}>
        <More width="30px" height="30px" fill="#fff" />
      </div>
    </div>
  </div>
);

export default MHeaderPresenter;
