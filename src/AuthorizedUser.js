import React, {useState, useEffect} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {useHistory} from 'react-router';
import {ROOT_QUERY} from './App';
import {gql} from 'graphql-tag';

const GITHUB_AUTH_MUTATION = gql`
    mutation githubAuth($code: String!){
        githubAuth(code:$code) {
            token
        }
    }
`;

const CurrentUser = ({ name, avatar, logout }) =>
    <div>
        <img src={avatar} width={48} height={48} alt="" />
        <h1>{name}</h1>
        {/* 20210922 캐시 조작으로 로그아웃시 리렌더링 되도록 해보기 */}
        <button onClick={logout}>logout</button>
    </div>

const Me = ({logout, requestCode, signingIn}) => {
    const { loading, error, data, refetch } =
        useQuery(ROOT_QUERY, {fetchPolicy: "cache-only"});

        if(loading) return <p>사용자 불러오는 중...</p>;
        if(error) return `Error! ${error.message}`;
        if(data.me) return <CurrentUser {...data.me} logout={logout} />
        else return (
            <button 
                onClick={requestCode}
                disabled={signingIn}>
                Sign In with Github
            </button>
        )
}

const AuthorizedUser = (props) => {
    let history = useHistory();
    const [signingIn, setSigninigIn] =  useState(false);
    const [mutateFunction, { data, loading, error }] =
        useMutation(
            GITHUB_AUTH_MUTATION,
            {
                variables: {code: ""},
                update(cache, { data }){
                    localStorage.setItem('token', data.githubAuth.token);
                    history.replace('/');
                    setSigninigIn(false);
                }
            }
        );

    useEffect(() => {
        if (window.location.search.match(/code=/)) {
            setSigninigIn(true);
            const code = window.location.search.replace("?code=", "");
            mutateFunction({variables: {code}});
        }
    }, []);

    const requestCode = () => {
        const clientID = process.env.REACT_APP_CLIENT_ID
        window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
    }

    const logout = () => {
        localStorage.removeItem('token');
        
        // let data = this.props.client.readQuery({query: ROOT_QUERY});
        // data.me = null;
        // this.props.client.writeQuery({query: ROOT_QUERY, data});
    }

    return (
        <Me 
            signingIn={signingIn}
            requestCode={requestCode}
            logout={logout}
        />
    )

}

export default AuthorizedUser;