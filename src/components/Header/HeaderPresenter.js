import React from "react";
import styles from "./styles.module.scss";
import Loader from "components/Loader/Loader";
import SideBar from "components/SideBar";
import bread from "resource/images/bread.png";
import { More, Close, Search } from "resource/images/SVG";

const HeaderPresenter = (props) => (
  <>
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div
          className={styles.more}
          onClick={() => props.setSideToggle(!props.sideToggle)}
        >
          <More width="40px" height="40px" fill="#fff" />
        </div>
        <div className={styles.title}>
          <img src={bread} />
          's Blog
        </div>
        <div className={styles.search_bar}>
          <input
            onChange={(e) => props.setSearch(e.target.value)}
            onKeyPress={(e) => props.onSearchPress(e)}
            value={props.search}
            type="text"
            placeholder="Search..."
            ref={props.searchRef}
          />
          <div
            className={props.search === "" ? styles.close_hide : undefined}
            onClick={() => props.setSearch("")}
          >
            <Close
              className={styles.svg}
              fill={"#fff"}
              width="30px"
              height="30px"
            />
          </div>
          <div onClick={props.doSearch}>
            <Search
              className={styles.svg}
              fill={"#fff"}
              width="30px"
              height="30px"
            />
          </div>
        </div>
      </div>
    </div>
    <Loader loading={props.loading} />
    <SideBar
      sideToggle={props.sideToggle}
      setSideToggle={props.setSideToggle}
    />
  </>
);

export default HeaderPresenter;
