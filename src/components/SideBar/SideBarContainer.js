import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router";
import * as queries from "./Queries";
import SideBarPresenter from "./SideBarPresenter";
import MSideBarPresenter from "./mobile/MSideBarPresenter";

const SideBarContainer = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [secretWord, setSecretWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [secretErr, setSecretErr] = useState("");
  const [viewSecretWordModal, setViewSecretWordModal] = useState(false);

  const emailRef = useRef();
  const secretWordRef = useRef();

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
      history.replace("/");
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

  const onEmailPress = (e) => {
    e.key === "Enter" && doRequestLogin();
  };

  const onSecretWordsPress = (e) => {
    e.key === "Enter" && doConfirmLogin();
  };

  return isMobile ? <MSideBarPresenter {...props} /> : <SideBarPresenter {...props} />;
};

export default SideBarContainer;
