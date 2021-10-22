import React from "react";
import { NetworkStatus, useMutation } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { ROOT_QUERY } from "components/App";
import { gql } from "graphql-tag";
import Loader from "components/Loader/Loader";

const DELETE_PHOTO_MUTATION = gql`
  mutation deletePhoto($id: String!) {
    deletePhoto(id: $id)
  }
`;

const DeletePhoto = ({ id }) => {
  const [mutationFunction, { data, loading, error }] = useMutation(DELETE_PHOTO_MUTATION, {
    variables: {
      id,
    },
    refetchQueries: [ROOT_QUERY, "allPhotos"],
  });

  const deletePhoto = async () => {
    if (window.confirm("Do you really want to delete it?")) {
      await mutationFunction();
    }
  };

  if (error) alert(`Delete error! ${error.message}`);

  return (
    <>
      <Loader loading={loading} />
      <button onClick={deletePhoto}>사진 삭제하기</button>
    </>
  );
};

const Photos = () => {
  const { loading, error, data, refetch, networkStatus } = useQuery(ROOT_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  if (loading || networkStatus === NetworkStatus.refetch) return <p>로딩 중...</p>;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data.allPhotos.map((photo, idx) => (
        <div key={idx}>
          <img src={photo.url} alt={photo.name} width={350} />
          <DeletePhoto id={photo.id} />
        </div>
      ))}
    </>
  );
};

export default Photos;
