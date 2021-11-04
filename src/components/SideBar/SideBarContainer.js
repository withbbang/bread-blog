import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router";
import { withApollo } from "@apollo/client/react/hoc";
import * as queries from "./Queries";
import { useCookies } from "react-cookie";
import SideBarPresenter from "./SideBarPresenter";
import MSideBarPresenter from "./mobile/MSideBarPresenter";

const SideBarContainer = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [secretWord, setSecretWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [secretErr, setSecretErr] = useState("");
  const [viewSecretWordModal, setViewSecretWordModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const emailRef = useRef();
  const secretWordRef = useRef();

  // 방문자 수 계산용
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      let lastVisit = cookies.lastVisit;
      let now = new Date();

      if (!lastVisit) {
        setCookie("visitCount", "Y");
        setCookie("lastVisit", now);
        setVisitorMutation();
        return;
      }

      lastVisit = new Date(lastVisit);
      const diff = now.getDate() - lastVisit.getDate();

      if (diff > 0) {
        setCookie("visitCount", "Y");
        setCookie("lastVisit", now);
        setVisitorMutation();
        return;
      }

      setCookie("visitCount", "N");
      setCookie("lastVisit", now);
    }
  }, []);

  const {
    data: { me },
    refetch: meRefetch,
  } = useQuery(queries.ME, {
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      setLoading(false);
      console.log(error);
    },
    onCompleted: () => setLoading(false),
  });

  const {
    data: { getVisitor },
    refetch: visitorRefetch,
  } = useQuery(queries.GET_VISITOR, {
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      setLoading(false);
      setErr(error);
    },
    onCompleted: (data) => {
      setErr("");
      setLoading(false);
    },
  });

  const [setVisitorMutation] = useMutation(queries.SET_VISITOR, {
    update(cache, { data }) {
      //TODO: 캐시로 방문자 수 조작해보기
    },
    onError: (error) => {
      setErr(error);
      setLoading(false);
    },
    onCompleted: (data) => {
      setErr("");
      //TODO: 캐시로 방문자 수 조작하기 성공하면 refetch 제거
      visitorRefetch();
      setLoading(false);
    },
  });

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    props.client.clearStore();
  };

  const [requestLoginMutation] = useMutation(queries.REQUEST_LOGIN, {
    variables: {
      email,
    },
    onError: (error) => {
      setErr(error.message);
      setLoading(false);
    },
    onCompleted: () => {
      setErr("");
      setViewSecretWordModal(true);
      secretWordRef.current.focus();
      setLoading(false);
    },
  });

  const [confirmLoginMutation] = useMutation(queries.CONFIRM_LOGIN, {
    variables: {
      input: {
        email,
        secretWord,
      },
    },
    update(cache, { data }) {
      localStorage.setItem("token", data.confirmLogin.token);
      localStorage.setItem("refreshToken", data.confirmLogin.refreshToken);
    },
    onError: (error) => {
      setSecretErr(error.message);
      setLoading(false);
    },
    onCompleted: () => {
      setSecretErr("");
      setEmail("");
      meRefetch();
      setViewSecretWordModal(false);
    },
  });

  const doRequestLogin = (id) => {
    if (email !== "") {
      setLoading(true);
      requestLoginMutation();
    } else setErr("Do not empty email field");
  };

  const doConfirmLogin = (id) => {
    if (secretWord !== "") {
      setLoading(true);
      confirmLoginMutation();
    } else {
      secretWordRef.current.focus();
      setSecretErr("Do not empty secret words field");
    }
  };

  const onEmailPress = (e) => {
    e.key === "Enter" && doRequestLogin();
  };

  const onSecretWordsPress = (e) => {
    e.key === "Enter" && doConfirmLogin();
  };

  return isMobile ? (
    <MSideBarPresenter
      {...props}
      email={email}
      setEmail={setEmail}
      secretWord={secretWord}
      setSecretWord={setSecretWord}
      loading={loading}
      err={err}
      setErr={setErr}
      secretErr={secretErr}
      viewSecretWordModal={viewSecretWordModal}
      setViewSecretWordModal={setViewSecretWordModal}
      emailRef={emailRef}
      secretWordRef={secretWordRef}
      doRequestLogin={doRequestLogin}
      doConfirmLogin={doConfirmLogin}
      onEmailPress={onEmailPress}
      onSecretWordsPress={onSecretWordsPress}
      me={me}
      getVisitor={getVisitor}
      logOut={logOut}
    />
  ) : (
    <SideBarPresenter
      {...props}
      email={email}
      setEmail={setEmail}
      secretWord={secretWord}
      setSecretWord={setSecretWord}
      loading={loading}
      err={err}
      setErr={setErr}
      secretErr={secretErr}
      viewSecretWordModal={viewSecretWordModal}
      setViewSecretWordModal={setViewSecretWordModal}
      emailRef={emailRef}
      secretWordRef={secretWordRef}
      doRequestLogin={doRequestLogin}
      doConfirmLogin={doConfirmLogin}
      onEmailPress={onEmailPress}
      onSecretWordsPress={onSecretWordsPress}
      me={me}
      getVisitor={getVisitor}
      logOut={logOut}
    />
  );
};

// withApollo는 최상위 index.js에서 ApolloProvider로 전달하는 client를 직접 받아오게 할 수 있다.
export default withApollo(SideBarContainer);
