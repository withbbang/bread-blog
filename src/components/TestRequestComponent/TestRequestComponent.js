import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import Loader from "components/Loader/Loader";

const TEST_REQUEST = gql`
  mutation testRequest($token: String!) {
    testRequest(token: $token)
  }
`;

const TestRequestBtn = () => {
  const [mutateFunction, { data, loading, errer }] = useMutation(TEST_REQUEST, {
    variables: {
      token: "test",
    },
    onError: (error) => alert(error),
  });

  return (
    <>
      <Loader loading={loading} />
      {data && console.log("data: ", data)}
      <div style={{ margin: "10px" }}>
        <button onClick={mutateFunction}>test</button>
      </div>
    </>
  );
};

export default TestRequestBtn;
