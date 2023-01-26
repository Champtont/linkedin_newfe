import { useSelector } from "react-redux";
import EditModal from "./EditModal";
import { AiOutlineDownload } from "react-icons/ai";
import { useState } from "react";
import { fetchPDFAction } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

//Endpoint
const filesBaseEndPoint =
  "http://localhost:3002/files/63ce8b0e38f02b88b50f552f/experiences/downloadCSV";

const ProfileHeader = () => {
  const usersData = useSelector((state) => state.user.currentUser);
  const usersLoaded = useSelector((state) => state.user.usersLoaded);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <div id="profileContainer">
        <div id="upperCardBackgroundImage"></div>
        <div id="userProfilePic">
          <img
            className="profile-image img-fluid"
            src={usersData.image}
            alt={usersData.name}
          />
        </div>
        <div id="lowerProfileCard" className="d-flex justify-content-between">
          <div>
            <div className="mb-3">
              <h3 className="m-0">
                {usersData.name} {usersData.surname}
              </h3>
              <p className="m-0">{usersData.title}</p>
              <p className="m-0 greyedInfo">
                {usersData.area} - <a href="#">Contact Info</a>
              </p>

              <a href="#">1 Connection</a>
            </div>
            <div>
              <button
                id="openBtn"
                className="mr-3 rounded-pill bottomNavButtons"
                variant="primary"
              >
                Open to
              </button>
              <button
                id="addToProfileBtn"
                className="mr-3 rounded-pill bottomNavButtons"
                variant="outline-primary"
              >
                Add Profile Section
              </button>
              <button
                id="moreBtn"
                className="rounded-pill bottomNavButtons"
                onClick={() => {
                  if (show === false) {
                    handleShow();
                  } else {
                    handleClose();
                  }
                }}
              >
                More
              </button>
            </div>
          </div>
          <div>
            <EditModal />
          </div>
        </div>
      </div>
      <div id="profileButtonBox">
        {show === true && (
          <div id="floatingProfileDropDown" className="d-flex">
            <button onClick={dispatch(fetchPDFAction)}>
              <div className="d-flex">
                <div className="mr-2">
                  <AiOutlineDownload size={23} />
                </div>
                <div>Save to PDF</div>
              </div>
            </button>
            <button>
              <div className="d-flex">
                <div className="mr-2">
                  <AiOutlineDownload size={23} />
                </div>
                <div>Save to CSV</div>
              </div>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileHeader;
