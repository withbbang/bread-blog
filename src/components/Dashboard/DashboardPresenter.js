import React from "react";
import styles from "./styles.module.scss";
import Loader from "components/Loader/Loader";
import Header from "components/Header";

const DashboardPresenter = (props) => (
  <div className={styles.wrap}>
    <Loader loading={props.loading} />
    <Header />
    Dashboard Page
  </div>
);

export default DashboardPresenter;
