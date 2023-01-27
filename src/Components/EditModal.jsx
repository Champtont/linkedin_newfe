import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser, fetchProfile } from "../redux/actions";
import { BsPencil } from "react-icons/bs";
import axios from "axios";

function EditModal({ data }) {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.currentUser);

  const [show, setShow] = useState(false);
  const [name, setname] = useState(usersData.name);
  const [email, setemail] = useState(usersData.email);
  const [surname, setsurname] = useState(usersData.surname);
  const [title, settitle] = useState(usersData.title);
  const [bio, setbio] = useState(usersData.bio);
  const [area, setarea] = useState(usersData.area);
  const [selectedFile, setselectedFile] = useState();
  const [isFilePicked, setisFilePicked] = useState(false);

  //endpoint stuff
  const userBaseEndPoint = "https://linkedinbe-production.up.railway.app/users";
  const thisUser = "/63ce8b0e38f02b88b50f552f";

  const changeFileHandler = (event) => {
    setselectedFile(event.target.files[0]);
    setisFilePicked(true);
  };

  const handleEditName = (event) => {
    setname(event.target.value);
    console.log(name);
  };

  const handleEditSurname = (event) => {
    setsurname(event.target.value);
    console.log(surname);
  };

  const handleEditEmail = (event) => {
    setemail(event.target.value);
    console.log(email);
  };

  const handleEditTitle = (event) => {
    settitle(event.target.value);
    console.log(title);
  };

  const handleEditBio = (event) => {
    setbio(event.target.value);
    console.log(bio);
  };

  const handleEditArea = (event) => {
    setarea(event.target.value);
    console.log(area);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      name: name,
      surname: surname,
      email: email,
      username: usersData.username,
      title: title,
      bio: bio,
      area: area,
      image: usersData.image,
    };
    console.log(user);
    console.log("We are editing users here");

    const options = {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
        /*Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjBhOWM5NmRmYjAwMTUyMWE1YmMiLCJpYXQiOjE2NzA4MzYzOTMsImV4cCI6MTY3MjA0NTk5M30.tjYtW0usDncqSVyv5tqHhm6jzx297N87wMwUmb9BuAs",*/
      },
    };
    const fetchURL = userBaseEndPoint + thisUser;

    try {
      let response = await fetch(fetchURL, options);
      console.log(response);
      if (response.ok) {
        console.log("Edit was successful");
        let usersData = await response.json();

        if (isFilePicked) {
          const url = userBaseEndPoint + thisUser + `/profilePic`;
          console.log(url);
          const formData = new FormData();
          formData.append("profilePic", selectedFile);
          const config = {
            method: "POST",
            headers: {
              "content-Type": "multipart/form-data",
              /*Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjBhOWM5NmRmYjAwMTUyMWE1YmMiLCJpYXQiOjE2NzA4MzYzOTMsImV4cCI6MTY3MjA0NTk5M30.tjYtW0usDncqSVyv5tqHhm6jzx297N87wMwUmb9BuAs",*/
            },
          };
          axios.post(url, formData, config).then((response) => {
            console.log(response.data);
          });
        }

        console.log(usersData);
        dispatch(fetchProfile());
      }
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button id="editButton" onClick={handleShow}>
        <BsPencil size={20} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Intro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          * Indicates required
          <Form onSubmit={handleSubmit}>
            <Form.Label>First name*</Form.Label>
            <Form.Control type="text" onChange={handleEditName} value={name} />
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              onChange={handleEditSurname}
              value={surname}
            />
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={handleEditEmail}
            />
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={handleEditTitle}
            />
            <Form.Label>Bio</Form.Label>
            <Form.Control type="text" value={bio} onChange={handleEditBio} />
            <br />
            <Form.Label>Profile Image</Form.Label>
            <Form.Control type="file" onChange={changeFileHandler} />
            <br />
            <Form.Label>Area</Form.Label>
            <Form.Control type="text" value={area} onChange={handleEditArea} />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button type="Submit" variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
