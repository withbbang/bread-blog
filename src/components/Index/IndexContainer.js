import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router";
import * as queries from "./Queries";
import IndexPresenter from "./IndexPresenter";

const IndexContainer = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) history.replace("/dashboard");
  }, []);

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [secretWord, setSecretWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewSecretInput, setViewSecretInput] = useState(false);

  const [requestLoginMutation] = useMutation(queries.REQUEST_LOGIN, {
    variables: {
      email,
    },
    onError: (error) => {
      alert(error);
      setLoading(false);
    },
    onCompleted: () => {
      setViewSecretInput(true);
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
      alert(error);
      setLoading(false);
    },
    onCompleted: () => {
      setLoading(false);
      history.push("/dashboard");
    },
  });

  const doRequestLogin = (email) => {
    if (email !== "") {
      setLoading(true);
      requestLoginMutation();
    } else alert("Do not empty email field");
  };

  const doConfirmLogin = (secretWord) => {
    if (secretWord !== "") {
      setLoading(true);
      confirmLoginMutation();
    } else alert("Do not empty secret words field");
  };

  const goToJoinMembership = () => history.push("/join-membership");

  return (
    <IndexPresenter
      loading={loading}
      setEmail={setEmail}
      setSecretWord={setSecretWord}
      doRequestLogin={doRequestLogin}
      doConfirmLogin={doConfirmLogin}
      goToJoinMembership={goToJoinMembership}
      viewSecretInput={viewSecretInput}
    />
  );
};

export default IndexContainer;
