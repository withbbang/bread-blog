import React from "react";
import styles from "./styles.module.scss";
import Loader from "components/Loader/Loader";

const JoinMembershipPresenter = (props) => (
  <div className={styles.wrap}>
    <Loader loading={props.loading} />
    <div style={{ margin: "10px" }}>
      <input onChange={(e) => props.setEmail(e.target.value)} type="email" placeholder={"Email"} />
      <input onChange={(e) => props.setName(e.target.value)} type="text" placeholder={"Name"} />
      <button onClick={props.doJoinMembership}>Request Join Membership!</button>
    </div>
  </div>
);

export default JoinMembershipPresenter;
