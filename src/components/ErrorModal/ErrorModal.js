import React from "react";
import styles from "./styles.module.scss";
import { Close } from "resource/images/SVG";

const ErrorModal = (props) => (
  <div className={styles.wrap}>
    <div className={styles.inner_wrap}>
      <div className={styles.header}>
        <h2>Error</h2>
        <div className={styles.svg} onClick={() => props.setErr("")}>
          <Close fill="#000" width="40px" height="40px" />
        </div>
      </div>
      <div className={styles.message}>{props.err}</div>
      <div className={styles.submit}>
        <button onClick={() => props.setErr("")}>Confirm</button>
      </div>
    </div>
  </div>
);

export default ErrorModal;
