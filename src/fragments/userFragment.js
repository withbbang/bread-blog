import {gql} from 'graphql-tag';

export const USER_INFO = gql`
    fragment userInfo on User{
        githubLogin
        name
        avatar
    }
`