import React, {Component} from 'react';
import Users from './Users';
import {BrowserRouter} from 'react-router-dom';
import {gql} from 'apollo-boost';
import AuthorizedUser from './AuthorizedUser';
import {Subscription ,withApollo} from 'react-apollo';

export const ROOT_QUERY = gql`
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
  fragment userInfo on User {
    githubLogin
    name
    avatar
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

  componentDidMount() {
    let { client } = this.props;
    this.listenForUsers = client
        .subscribe({ query: LISTEN_FOR_USERS })
        .subscribe(({ data:{ newUser } }) => {
            const data = client.readQuery({ query: ROOT_QUERY })
            data.totalUsers += 1
            data.allUsers = [
                ...data.allUsers,
                newUser
            ]
            client.writeQuery({ query: ROOT_QUERY, data })
        });    
  }

  componentWillUnmount() {
      this.listenForUsers.unsubscribe();
  }
  
  render() {
      return (
        <BrowserRouter>
          <div>
            <AuthorizedUser/>
            <Users/>
            <Subscription subscription={LISTEN_FOR_USERS}>
              {({data, loading}) => loading ? 
                <p>loading a new user...</p> :
                <div>
                  <img src={data.newUser.avatar} alt="" />
                  <h2>{data.newUser.name}</h2>
                </div>
              }
            </Subscription>
          </div>
        </BrowserRouter>
      )
  }
}


export default withApollo(App);