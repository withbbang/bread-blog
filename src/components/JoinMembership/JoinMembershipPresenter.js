import React from "react";
import styles from "./styles.module.scss";
import Loader from "components/Loader/Loader";
import Header from "components/Header";

const JoinMembershipPresenter = (props) => (
  <>
    <div className={styles.wrap}>
      <Header />
      <div>
        <input
          onChange={(e) => props.setEmail(e.target.value)}
          type="email"
          placeholder={"Email"}
        />
        <input
          onChange={(e) => props.setName(e.target.value)}
          type="text"
          placeholder={"Name"}
        />
        <button onClick={props.doJoinMembership}>
          Request Join Membership!
        </button>
      </div>
    </div>
    <Loader loading={props.loading} />
  </>
);

export default JoinMembershipPresenter;
