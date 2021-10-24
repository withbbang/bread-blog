import React from "react";
import styles from "./styles.module.scss";
import Loader from "components/Loader/Loader";
import bread from "resource/images/bread.png";

const HeaderPresenter = (props) => (
  <div className={styles.wrap}>
    <Loader loading={props.loading} />
    <div className={styles.inner_wrap}>
      <div className={styles.title}>
        <img src={bread} />
        log
      </div>
      <div></div>
    </div>
  </div>
);

export default HeaderPresenter;
