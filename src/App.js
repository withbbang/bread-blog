import React, {Component} from 'react';
import Users from './Users';
import {BrowserRouter} from 'react-router-dom';
import {gql} from 'graphql-tag';
import AuthorizedUser from './AuthorizedUser';
import {USER_INFO} from './fragments/userFragment';

export const ROOT_QUERY = gql`
  ${USER_INFO}
  query allUsers {
    totalUsers  
    totalPhotos      
    allUsers {...userInfo}
    me {...userInfo}
    allPhotos {
      id
      name
      url
    }
  }
`

const LISTEN_FOR_USERS = gql`
  subscription {
    newUser {
      githubLogin
      name
      avatar
    }
  }
`;

class App extends Component {

  // componentDidMount() {
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
  // }

  // componentWillUnmount() {
  //     this.listenForUsers.unsubscribe();
  // }
  
  render() {
      return (
        <BrowserRouter>
          <div>
            <AuthorizedUser/>
            <Users/>
          </div>
        </BrowserRouter>
      )
  }
}


// export default withApollo(App);
export default App;