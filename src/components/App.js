import React, { Fragment, useState, useEffect } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { NetworkStatus, useSubscription } from "@apollo/client";
import { gql } from "graphql-tag";
import Background from "components/Background";
import Index from "components/Index";
import JoinMembership from "components/JoinMembership";
import Dashboard from "components/Dashboard";
import Users from "components/Users/Users";
import Photos from "components/Photos/Photos";
import PostPhoto from "components/PostPhoto/PostPhoto";
import AuthorizedUser from "components/AuthorizedUser/AuthorizedUser";
import { USER_INFO } from "fragments/userFragment";
import TestRequestBtn from "./TestRequestComponent/TestRequestComponent";

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
      url
      name
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

  if (loading) return <input id="test" />;
  if (error) return alert(error.message);

  if (data.test) {
    return <input id="test" value={count} onClick={(e) => resetValue(e)} />;
  }
};

const App = (props) => {
  const [fetchTest, setFetchTest] = useState(false);

  // useEffect(() => {
  //   let { client } = this.props;
  //   this.listenForUsers = client
  //       .subscribe({ query: LISTEN_FOR_USERS })
  //       .subscribe(({ data:{ newUser } }) => {
  //           const data = client.readQuery({ query: ROOT_QUERY })
  //           data.totalUsers += 1
  //           data.allUsers = [
  //               ...data.allUsers,
  //               newUser
  //           ]
  //           client.writeQuery({ query: ROOT_QUERY, data })
  //       });
  // }, [fetchTest]);

  return (
    <>
      <Background />
      <HashRouter
        basename={"https://withbbang.github.io/graphql-tutorial-client/"}
      >
        <Switch>
          <Route exact path="/" component={Index} />
          {/* <Route
          exact
          path="/"
          component={() => (
            <Fragment>
              <Index />
              <TestSubscription />
              <AuthorizedUser />
              <TestRequestBtn />
              <Users />
              <Photos />
            </Fragment>
          )}
        /> */}
          <Route exact path="/join-membership" component={JoinMembership} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/newPhoto" component={PostPhoto} />
          <Route
            path="*"
            component={({ location }) => (
              <div>"{location.pathname}" not found</div>
            )}
          />
        </Switch>
      </HashRouter>
    </>
  );
};

// export default withApollo(App);
export default App;
