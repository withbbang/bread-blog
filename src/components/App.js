import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { NetworkStatus, useSubscription } from "@apollo/client";
import { gql } from "graphql-tag";
import { useCookies } from "react-cookie";
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

const App = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [fetchTest, setFetchTest] = useState(false);

  // 방문자 수 계산용
  useEffect(() => {
    let lastVisit = cookies.lastVisit;
    let now = new Date();

    if (!lastVisit) {
      setCookie("visitCount", "Y");
      setCookie("lastVisit", now);
      // 서버에 visitCount 올리는 mutation
      return;
    }

    lastVisit = new Date(lastVisit);
    const diff = now.getDate() - lastVisit.getDate();

    if (diff > 0) {
      setCookie("visitCount", "Y");
      setCookie("lastVisit", now);
      // 서버에 visitCount 올리는 mutation
      return;
    }

    setCookie("lastVisit", now);
  }, []);

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
      <BrowserRouter basename={process.env.PUBLIC_URL}>
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
      </BrowserRouter>
    </>
  );
};

// export default withApollo(App);
export default App;
