import React from "react";
import styles from "./styles.module.scss";
import bread from "resource/images/bread.png";
import SideBar from "components/SideBar";
import { More } from "resource/images/SVG";

const MHeaderPresenter = (props) => (
  <>
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div
          className={styles.more}
          onClick={() => props.setSideToggle(!props.sideToggle)}
        >
          <More width="30px" height="30px" fill="#fff" />
        </div>
        <div className={styles.title}>
          <img src={bread} />
          's Blog
        </div>
      </div>
    </div>
    <SideBar
      sideToggle={props.sideToggle}
      setSideToggle={props.setSideToggle}
    />
  </>
);

export default MHeaderPresenter;
