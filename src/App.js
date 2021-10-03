import React, { useState, useEffect } from "react";
import Users from "./Users";
import { BrowserRouter } from "react-router-dom";
import { gql } from "graphql-tag";
import AuthorizedUser from "./AuthorizedUser";
import { USER_INFO } from "./fragments/userFragment";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { NetworkStatus, useSubscription } from "@apollo/client";

export const ROOT_QUERY = gql`
  ${USER_INFO}
  query allUsers {
    totalUsers
    totalPhotos
    allUsers {
      ...userInfo
    }
    me {
      ...userInfo
    }
    allPhotos {
      id
      name
      url
    }
  }
`;

const LISTEN_FOR_USERS = gql`
  subscription {
    newUser {
      githubLogin
      name
      avatar
    }
  }
`;

const TEST_QUERY = gql`
  query {
    test
  }
`;

const TEST_SUBSCRIPTION = gql`
  subscription {
    test
  }
`;

let count = 0;

const TestSubscription = () => {
  const { loading, error, data } = useSubscription(TEST_SUBSCRIPTION);

  const resetValue = (e) => {
    e.target.value = count = 0;
  };

  count++;
  console.log(count);

  if (loading) return <input id="test" />;
  if (error) return alert(error.message);

  if (data.test) {
    return <input id="test" value={count} onClick={(e) => resetValue(e)} />;
  }
};

const App = (props) => {
  const [fetchTest, setFetchTest] = useState(false);

  useEffect(() => {
    // let { client } = this.props;
    // this.listenForUsers = client
    //     .subscribe({ query: LISTEN_FOR_USERS })
    //     .subscribe(({ data:{ newUser } }) => {
    //         const data = client.readQuery({ query: ROOT_QUERY })
    //         data.totalUsers += 1
    //         data.allUsers = [
    //             ...data.allUsers,
    //             newUser
    //         ]
    //         client.writeQuery({ query: ROOT_QUERY, data })
    //     });
  }, [fetchTest]);

  return (
    <BrowserRouter>
      <TestSubscription />
      <div>
        <AuthorizedUser />
        <Users />
      </div>
    </BrowserRouter>
  );
};

// export default withApollo(App);
export default App;
