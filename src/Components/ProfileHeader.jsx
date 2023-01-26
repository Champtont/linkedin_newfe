import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import EditModal from "./EditModal";
import { AiOutlineDownload } from "react-icons/ai";
import { Link } from "react-router-dom";
import { fetchPDFAction } from "../redux/actions";
import { useDispatch } from "react-redux";

//PDF Endpoint

const ProfileHeader = () => {
  const usersData = useSelector((state) => state.user.currentUser);
  const usersLoaded = useSelector((state) => state.user.usersLoaded);

  const dispatch = useDispatch();

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
              <button id="moreBtn" className="rounded-pill bottomNavButtons">
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
        <Button onClick={dispatch(fetchPDFAction)}>
          <div id="floatingProfileDropDown" className="">
            <div className="d-flex">
              <div className="mr-2">
                <AiOutlineDownload />
              </div>
              <div>Save to PDF</div>
            </div>
          </div>
        </Button>
      </div>
    </>
  );
};

export default ProfileHeader;
