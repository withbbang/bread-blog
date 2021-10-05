import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { withRouter, NavLink } from "react-router-dom";
import { NetworkStatus } from "@apollo/client";
import { useHistory } from "react-router";
import { ROOT_QUERY } from "components/App";
import { gql } from "graphql-tag";
import "./AuthorizedUser.scss";

const GITHUB_AUTH_MUTATION = gql`
  mutation githubAuth($code: String!) {
    githubAuth(code: $code) {
      token
    }
  }
`;

const CurrentUser = ({ name, avatar, logout }) => (
  <div className={"wrap"}>
    <img src={avatar} width={48} height={48} alt="" />
    <h1>{name}</h1>
    {/* 20210922 캐시 조작으로 로그아웃시 리렌더링 되도록 해보기 */}
    <button onClick={logout}>logout</button>
    <NavLink to="/newPhoto">Post Photo</NavLink>
  </div>
);

const Me = ({ logout, requestCode, signingIn, isLoggedIn }) => {
  const { loading, error, data, refetch, networkStatus } = useQuery(ROOT_QUERY, { fetchPolicy: "cache-and-network" });

  useEffect(() => {
    if (isLoggedIn) refetch();
  }, [isLoggedIn]);

  if (networkStatus === NetworkStatus.refetch) return <p>사용자 불러오는 중...</p>;
  if (error) return `Error! ${error.message}`;
  if (data.me) return <CurrentUser {...data.me} logout={logout} />;
  else
    return (
      <button onClick={requestCode} disabled={signingIn}>
        Sign In with Github
      </button>
    );
};

const AuthorizedUser = () => {
  let history = useHistory();
  const [signingIn, setSigninigIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mutateFunction, { data, loading, error }] = useMutation(GITHUB_AUTH_MUTATION, {
    variables: { code: "" },
    update(cache, { data }) {
      localStorage.setItem("token", data.githubAuth.token);
      history.replace("/");
      setSigninigIn(false);
      setIsLoggedIn(true);
    },
  });

  useEffect(() => {
    if (window.location.search.match(/code=/)) {
      setSigninigIn(true);
      const code = window.location.search.replace("?code=", "");
      mutateFunction({ variables: { code } });
    }
  }, []);

  const requestCode = () => {
    const clientID = process.env.REACT_APP_CLIENT_ID;
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);

    // let data = this.props.client.readQuery({query: ROOT_QUERY});
    // data.me = null;
    // this.props.client.writeQuery({query: ROOT_QUERY, data});
  };

  return <Me signingIn={signingIn} requestCode={requestCode} logout={logout} isLoggedIn={isLoggedIn} />;
};

export default AuthorizedUser;
