import RightSideUser from "./RightSideUser";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";

const ProfileRight = () => {
  const usersList = useSelector((state) => state.user.users);
  const usersSecond = usersList[0];
  const areUsersLoaded = useSelector((state) => state.user.usersLoaded);
  console.log("the users are: ", usersList);
  console.log("the users from the second array are: ", usersSecond);
  console.log("are the users loaded? :", areUsersLoaded);
  return (
    <div id="profileRight">
      <p>
        <strong>Add to your feed now</strong>
      </p>
      <div>
        {areUsersLoaded &&
          usersSecond.slice(0, 6).map((user) => (
            <div key={user._id}>
              <RightSideUser user={user} />
            </div>
          ))}
      </div>
      <p style={{ marginTop: ".5em", fontWeight: "500" }}>
        View all recommandations <AiOutlineArrowRight />
      </p>
    </div>
  );
};
export default ProfileRight;
