import React from "react";
import { gql } from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ROOT_QUERY } from "components/App";
import { NetworkStatus } from "@apollo/client";
import styles from "./Users.module.scss";
import Loader from "components/Loader/Loader";

const ADD_FAKE_USERS_MUTATION = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avatar
    }
  }
`;

const DELETE_FAKE_USER_MUTATION = gql`
  mutation deleteFakeUser($input: DeleteFakeUserInput!) {
    deleteFakeUser(input: $input)
  }
`;

const Users = () => {
  const { loading, error, data, refetch, networkStatus } = useQuery(ROOT_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  if (loading || networkStatus === NetworkStatus.refetch) return <Loader loading={loading || networkStatus === NetworkStatus.refetch} />;
  if (error) return `Error! ${error.message}`;

  return <UserList count={data.totalUsers} users={data.allUsers} refetchUsers={refetch} />;
};

const UserList = ({ count, users, refetchUsers }) => {
  const [mutateFunction, { data, loading, error }] = useMutation(ADD_FAKE_USERS_MUTATION, {
    variables: {
      count: 1,
    },
  });

  if (loading) return <Loader loading={loading} />;
  if (error) return alert(`Submission error! ${error.message}`);

  return (
    <div className={styles.wrap}>
      <p>{count} Users</p>
      <button onClick={() => refetchUsers()}>다시 가져오기</button>
      <button onClick={() => mutateFunction()}>임시 사용자 추가</button>
      <ul>
        {users.map((user) => (
          <UserListItem key={user.githubLogin} githubLogin={user.githubLogin} name={user.name} avatar={user.avatar} />
        ))}
      </ul>
    </div>
  );
};

const UserListItem = ({ githubLogin, name, avatar }) => (
  <li>
    <img src={avatar} width={48} height={48} alt="" />
    {name}
    <DeleteFakeUser githubLogin={githubLogin} name={name} />
  </li>
);

const DeleteFakeUser = (input) => {
  const [mutationFunction, { data, loading, error }] = useMutation(DELETE_FAKE_USER_MUTATION, {
    variables: {
      input,
    },
    refetchQueries: [ROOT_QUERY, "allUsers"],
  });

  const deleteFakeUser = async () => {
    if (window.confirm("Do you really want to delete this user?")) {
      await mutationFunction();
    }
  };

  if (loading) return <Loader loading={loading} />;
  if (error) alert(`Delete error! ${error.message}`);

  return <button onClick={deleteFakeUser}>유저 삭제</button>;
};

export default Users;
