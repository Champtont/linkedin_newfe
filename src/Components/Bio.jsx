import { Button, Container } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

const BioBox = (props) => {
  const usersData = useSelector((state) => state.user.currentUser);
  const contact = useSelector((state) => state.user.contact);
  const location = useLocation();

  return (
    <Container id="bioContainer" className="my-3">
      <div className="d-flex justify-content-between">
        <h3>About</h3>
        {location.pathname === "/Profile" && (
          <Button id="editButton">
            <BsPencil size={20} />
          </Button>
        )}
      </div>
      <div>
        {location.pathname === "/Profile" && <p>{usersData.bio}</p>}
        {location.pathname !== "/Profile" && <p>{contact.bio}</p>}
      </div>
    </Container>
  );
};

export default BioBox;
