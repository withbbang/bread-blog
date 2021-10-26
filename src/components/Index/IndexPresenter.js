import React from "react";
import styles from "./styles.module.scss";
import Loader from "components/Loader/Loader";
import SecretWordModal from "./SecretWordModal/SecretWordModal";
import ErrorModal from "components/ErrorModal/ErrorModal";
import bread from "resource/images/bread.png";
import developerImage from "resource/images/developerImage.jpg";
import instagramColor from "resource/images/instagramColor.svg";
import { More, Close, Search, Github, Instagram, GithubReverse } from "resource/images/SVG";

const IndexPresenter = (props) => (
  <div className={styles.wrap}>
    <Loader loading={props.loading} />
    <div className={styles.header}>
      <div className={styles.search_bar}>
        <input
          onChange={(e) => props.setSearch(e.target.value)}
          onKeyPress={(e) => props.onSearchPress(e)}
          value={props.search}
          type="text"
          placeholder="Search..."
          ref={props.searchRef}
        />
        <div className={props.search === "" ? styles.close_hide : undefined} onClick={() => props.setSearch("")}>
          <Close className={styles.svg} fill={"#fff"} width="30px" height="30px" />
        </div>
        <div onClick={props.doSearch}>
          <Search className={styles.svg} fill={"#fff"} width="30px" height="30px" />
        </div>
      </div>
      <div className={styles.title}>
        <img src={bread} />
        's Blog
      </div>
      {/* <div className={styles.membership_bar}>
        <input
          onChange={(e) => props.setEmail(e.target.value)}
          onKeyPress={(e) => props.onEmailPress(e)}
          type="email"
          placeholder="Email..."
          ref={props.emailRef}
        />
        <button onClick={props.doRequestLogin}>Login</button>
        <button onClick={props.goToJoinMembership}>Join</button>
      </div> */}
      <div className={styles.more}>
        <More width="40px" height="40px" fill="#fff" />
      </div>
    </div>
    <div className={styles.contents}>
      <div className={styles.left_section}>
        <img src={developerImage} />
      </div>
      <div className={styles.right_section}>
        <h1>Bread's Blog of Develop</h1>
        <h2>Seoul, Korea raised.</h2>
        <h2>Web Developer.</h2>
        <div className={styles.links}>
          <div className={styles.link} onClick={() => window.open("https://github.com/withbbang")}>
            <Github width="30px" height="30px" /> GitHub
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
        <div className={styles.info}>© 2021 by Bread</div>
      </div>
    </div>
    {props.viewSecretWordModal && (
      <SecretWordModal
        setViewSecretWordModal={props.setViewSecretWordModal}
        onSecretWordsPress={props.onSecretWordsPress}
        viewSecretWordModal={props.viewSecretWordModal}
        setSecretWord={props.setSecretWord}
        doConfirmLogin={props.doConfirmLogin}
        secretWordRef={props.secretWordRef}
        secretErr={props.secretErr}
      />
    )}
    {props.emailErr && <ErrorModal setErr={props.setEmailErr} err={props.emailErr} />}
  </div>
);

export default IndexPresenter;
