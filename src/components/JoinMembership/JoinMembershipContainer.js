import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router";
import * as queries from "./Queries";
import JoinMembershipPresenter from "./JoinMembershipPresenter";

const JoinMembershipContainer = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [requsetJoinMutation] = useMutation(queries.CREATE_USER, {
    variables: {
      input: {
        email,
        name,
      },
    },
    onError: (error) => {
      alert(error);
      setLoading(false);
    },
    onCompleted: () => setLoading(false),
  });

  const doJoinMembership = () => {
    if (email !== "" && name !== "") {
      setLoading(true);
      requsetJoinMutation();
    } else alert("Do not empty both email & name fields");
  };

  return (
    <JoinMembershipPresenter
      loading={loading}
      setEmail={setEmail}
      setName={setName}
      doJoinMembership={doJoinMembership}
    />
  );
};

export default JoinMembershipContainer;
