import React, { useEffect } from "react";
import styles from "./Loader.module.scss";

const Loader = ({ loading }) =>
  loading ? (
    <div className={styles.wrap}>
      <div className={styles.background} />
      <div className={styles.loaderWrap}>
        <div className={styles.block}>
          <div className={styles.item} />
          <div className={styles.item} />
          <div className={styles.item} />
          <div className={styles.item} />
          <div className={styles.item} />
          <div className={styles.item} />
          <div className={styles.item} />
          <div className={styles.item} />
        </div>
      </div>
    </div>
  ) : null;

export default Loader;
