import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { useHistory } from "react-router";
import { ROOT_QUERY } from "components/App";

const POST_PHOTO_MUTATION = gql`
  mutation postPhoto($input: PostPhotoInput!) {
    postPhoto(input: $input) {
      id
      name
      url
    }
  }
`;

const Uploadfile = (input) => {
  let history = useHistory();

  const [mutateFunction, { data, loading, error }] = useMutation(POST_PHOTO_MUTATION, {
    variables: {
      input,
    },
  });

  const upload = async () => {
    console.log(input);
    await mutateFunction();
    history.replace("/");
  };

  if (loading) return <p>사진 업로드 중...</p>;
  if (error) alert(`Submission error! ${error.message}`);

  return (
    <div style={{ margin: "10px" }}>
      <button onClick={upload}>사진 업로드 하기</button>
    </div>
  );
};

const PostPhoto = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("PORTRAIT");
  const [file, setFile] = useState("");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex_start",
      }}
    >
      <h1>Post a Photo</h1>

      <input type="text" style={{ margin: "10px" }} placeholder="photo name..." value={name} onChange={({ target }) => setName(target.value)} />

      <textarea type="text" style={{ margin: "10px" }} placeholder="photo description..." value={description} onChange={({ target }) => setDescription(target.value)} />

      <select value={category} style={{ margin: "10px" }} onChange={({ target }) => setCategory(target.value)}>
        <option value="PORTRAIT">PORTRAIT</option>
        <option value="LANDSCAPE">LANDSCAPE</option>
        <option value="ACTION">ACTION</option>
        <option value="GRAPHIC">GRAPHIC</option>
      </select>

      <input type="file" style={{ margin: "10px" }} accept="image/jpeg" onChange={({ target }) => setFile(target.files[0])} />

      <Uploadfile name={name} description={description} category={category} file={file} />
    </form>
  );
};

export default PostPhoto;
