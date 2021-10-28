import React from "react";
import styles from "./styles.module.scss";
import Loader from "components/Loader/Loader";
import SecretWordModal from "../SecretWordModal/SecretWordModal";
import ErrorModal from "components/ErrorModal/ErrorModal";
import {
  Javascript,
  Python,
  Java,
  Book,
  Arrow,
  DoubleArrow,
  LogOut,
} from "resource/images/SVG";
import { isLoggedIn } from "module/utils";

const MSideBarPresenter = (props) => (
  <>
    <div
      className={
        props.sideToggle
          ? styles.background
          : [styles.background, styles.off].join(" ")
      }
      onClick={() => props.setSideToggle(!props.sideToggle)}
    />
    <div
      className={
        props.sideToggle ? styles.wrap : [styles.wrap, styles.off].join(" ")
      }
    >
      <div className={styles.inner_wrap}>
        <div
          className={styles.close}
          onClick={() => props.setSideToggle(!props.sideToggle)}
        >
          <DoubleArrow width="25px" height="25px" fill="#fff" />
        </div>
        {isLoggedIn() && props.data.me ? (
          <div className={[styles.user, styles.log_in].join(" ")}>
            <div className={styles.avatar}>
              <img src={props.data.me.avatar} />
            </div>
            <div className={styles.infos}>
              <span>{props.data.me.name}</span>
            </div>
          </div>
        ) : (
          <div className={styles.user}>
            <input
              onChange={(e) => props.setEmail(e.target.value)}
              onKeyPress={(e) => props.onEmailPress(e)}
              type="email"
              placeholder="Email..."
              ref={props.emailRef}
            />
            <button onClick={props.doRequestLogin}>Login</button>
          </div>
        )}
        <div className={styles.menu}>
          <div className={styles.banner} />
          <div className={styles.svg}>
            <Javascript width="30px" height="30px" fill="#fff" />
          </div>
          Javascript
          <div className={styles.svg_}>
            <Arrow width="25px" height="25px" fill="#fff" />
          </div>
        </div>
        <div className={styles.menu}>
          <div className={styles.banner} />
          <div className={styles.svg}>
            <Python width="30px" height="30px" fill="#fff" />
          </div>
          Python
          <div className={styles.svg_}>
            <Arrow width="25px" height="25px" fill="#fff" />
          </div>
        </div>
        <div className={styles.menu}>
          <div className={styles.banner} />
          <div className={styles.svg}>
            <Java width="30px" height="30px" fill="#fff" />
          </div>
          Java
          <div className={styles.svg_}>
            <Arrow width="25px" height="25px" fill="#fff" />
          </div>
        </div>
        <div className={styles.menu}>
          <div className={styles.banner} />
          <div className={styles.svg}>
            <Book width="30px" height="30px" fill="#fff" />
          </div>
          Learning
          <div className={styles.svg_}>
            <Arrow width="25px" height="25px" fill="#fff" />
          </div>
        </div>
        {isLoggedIn() && (
          <div className={styles.log_out} onClick={props.logOut}>
            Log Out
            <div className={styles.svg}>
              <LogOut width="20px" height="20px" fill="#fff" />
            </div>
          </div>
        )}
      </div>
    </div>
    <Loader loading={props.loading} />
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
    {props.emailErr && (
      <ErrorModal setErr={props.setEmailErr} err={props.emailErr} />
    )}
  </>
);

export default MSideBarPresenter;
