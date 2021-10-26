import React from "react";
import styles from "./styles.module.scss";
import Loader from "components/Loader/Loader";

const SideBarPresenter = (props) => (
  <div className={styles.wrap}>
    <Loader loading={props.loading} />
    <div className={styles.user_info}></div>
  </div>
);

export default SideBarPresenter;
