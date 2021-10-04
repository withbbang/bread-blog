import React from "react";
import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { ROOT_QUERY } from "./App";

const Photos = () => {
  const { loading, error, data, refetch, networkStatus } = useQuery(ROOT_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  if (loading || networkStatus === NetworkStatus.refetch) return <p>로딩 중...</p>;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data.allPhotos.map((photo) => (
        <img key={photo.id} src={photo.url} alt={photo.name} width={350} />
      ))}
    </>
  );
};

export default Photos;
