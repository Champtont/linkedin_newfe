import { useState, useSelector } from "react";
import { Button, ResponsiveEmbed } from "react-bootstrap";
import axios from "axios";
import { BsFillImageFill } from "react-icons/bs";

const ImageUpload = () => {
  const [selectedFile, setselectedFile] = useState();
  const [isFilePicked, setisFilePicked] = useState(false);

  const changeHandler = (event) => {
    setselectedFile(event.target.files[0]);
    console.log(selectedFile);
    setisFilePicked(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const url =
      "https://striveschool-api.herokuapp.com/api/profile/6396f0a9c96dfb001521a5bc/picture";
    const formData = new FormData();
    formData.append("post", selectedFile);
    const config = {
      headers: {
        "content-Type": "multipart/form-data",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjBhOWM5NmRmYjAwMTUyMWE1YmMiLCJpYXQiOjE2NzA4MzYzOTMsImV4cCI6MTY3MjA0NTk5M30.tjYtW0usDncqSVyv5tqHhm6jzx297N87wMwUmb9BuAs",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <>
      <label for="actual-btn">
        <BsFillImageFill
          className="ml-3 mr-2 upload-post-image"
          onChange={changeHandler}
        />
      </label>
      <input id="actual-btn" type="file" onChange={changeHandler} hidden />
      {isFilePicked && <span>{selectedFile.name}</span>}
    </>
  );
};

export default ImageUpload;
