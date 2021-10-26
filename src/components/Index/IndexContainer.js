import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router";
import * as queries from "./Queries";
import IndexPresenter from "./IndexPresenter";
import MIndexPresenter from "./mobile/MIndexPresenter";

const IndexContainer = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) history.replace("/dashboard");
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [secretWord, setSecretWord] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewSecretWordModal, setViewSecretWordModal] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [secretErr, setSecretErr] = useState("");

  const emailRef = useRef();
  const secretWordRef = useRef();
  const searchRef = useRef();

  const [requestLoginMutation] = useMutation(queries.REQUEST_LOGIN, {
    variables: {
      email,
    },
    onError: (error) => {
      setEmailErr(error.message);
      setLoading(false);
    },
    onCompleted: () => {
      setEmailErr("");
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
      setLoading(false);
      history.push("/dashboard");
    },
  });

  const doRequestLogin = (id) => {
    if (email !== "") {
      setLoading(true);
      requestLoginMutation();
    } else setEmailErr("Do not empty email field");
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

  const doSearch = () => {
    if (search !== "") {
      // setLoading(true);
      console.log("searching...");
    } else searchRef.current.focus();
  };

  const onSearchPress = (e) => {
    e.key === "Enter" && doSearch();
  };

  const onEmailPress = (e) => {
    e.key === "Enter" && doRequestLogin();
  };

  const onSecretWordsPress = (e) => {
    e.key === "Enter" && doConfirmLogin();
  };

  const goToJoinMembership = () => history.push("/join-membership");

  return isMobile ? (
    <MIndexPresenter />
  ) : (
    <IndexPresenter
      loading={loading}
      search={search}
      setEmail={setEmail}
      setSecretWord={setSecretWord}
      setSearch={setSearch}
      doRequestLogin={doRequestLogin}
      doConfirmLogin={doConfirmLogin}
      doSearch={doSearch}
      onSearchPress={onSearchPress}
      onEmailPress={onEmailPress}
      onSecretWordsPress={onSecretWordsPress}
      goToJoinMembership={goToJoinMembership}
      setViewSecretWordModal={setViewSecretWordModal}
      viewSecretWordModal={viewSecretWordModal}
      emailRef={emailRef}
      secretWordRef={secretWordRef}
      searchRef={searchRef}
      emailErr={emailErr}
      setEmailErr={setEmailErr}
      secretErr={secretErr}
      isMobile={isMobile}
    />
  );
};

export default IndexContainer;
