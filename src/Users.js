import React from "react";
import { gql } from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ROOT_QUERY } from "./App";
import { NetworkStatus } from "@apollo/client";

const ADD_FAKE_USERS_MUTATION = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avatar
    }
  }
`;

const Users = () => {
  const { loading, error, data, refetch, networkStatus } = useQuery(ROOT_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  if (loading || networkStatus === NetworkStatus.refetch) return <p>사용자 불러오는 중...</p>;
  if (error) return `Error! ${error.message}`;

  return <UserList count={data.totalUsers} users={data.allUsers} refetchUsers={refetch} />;
};

const UserList = ({ count, users, refetchUsers }) => {
  const [mutateFunction, { data, loading, error }] = useMutation(ADD_FAKE_USERS_MUTATION, {
    variables: {
      count: 1,
    },
  });

  if (loading) return <p>사용자 추가 중...</p>;
  if (error) return alert(`Submission error! ${error.message}`);

  return (
    <div>
      <p>{count} Users</p>
      <button onClick={() => refetchUsers()}>다시 가져오기</button>
      <button onClick={() => mutateFunction()}>임시 사용자 추가</button>
      <ul>
        {users.map((user) => (
          <UserListItem key={user.githubLogin} name={user.name} avatar={user.avatar} />
        ))}
      </ul>
    </div>
  );
};

const UserListItem = ({ name, avatar }) => (
  <li>
    <img src={avatar} width={48} height={48} alt="" />
    {name}
  </li>
);

export default Users;
