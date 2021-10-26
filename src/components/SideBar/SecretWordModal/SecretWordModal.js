import React from "react";
import styles from "./styles.module.scss";
import { Close } from "resource/images/SVG";

const SecretWordModal = (props) => (
  <div className={styles.wrap}>
    <div className={styles.inner_wrap}>
      <div className={styles.header}>
        <h2>Login</h2>
        <div
          className={styles.svg}
          onClick={() =>
            props.setViewSecretWordModal(!props.viewSecretWordModal)
          }
        >
          <Close fill="#000" width="40px" height="40px" />
        </div>
      </div>
      <div className={styles.guide}>
        Check Your MailBox
        <br />
        Copy Paste Secret Words
      </div>
      <div className={styles.submit}>
        <input
          onChange={(e) => props.setSecretWord(e.target.value)}
          onKeyPress={(e) => props.onSecretWordsPress(e)}
          type="text"
          placeholder={"Put Secret Words..."}
          ref={props.secretWordRef}
        />
        <button onClick={props.doConfirmLogin}>Login</button>
      </div>
      <div className={styles.err}>{props.secretErr && props.secretErr}</div>
    </div>
  </div>
);

export default SecretWordModal;
