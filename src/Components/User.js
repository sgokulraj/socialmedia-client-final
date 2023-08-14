import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Stylesheet/User.css";
import {
  MdManageAccounts,
  MdOutlineAssuredWorkload,
  MdOutlineMyLocation,
} from "react-icons/md";

function User({ userId, picturePath }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`https://smoggy-lamb-waders.cyclic.cloud/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = await response.json();
    setUser(userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <section className="userContainer">
      <div className="userDiv" onClick={() => navigate(`/profile/${userId}`)}>
        <div className="imageContainer">
          <div>
            {/* img not proper then give height and width to div */}
            <img
              src={picturePath}
              className="profileImg"
              alt={`${firstName}`}
            />
          </div>
          <div className="nameContianer">
            <h4>{`${firstName} ${lastName}`}</h4>
            <p>{`${friends.length} friends`}</p>
          </div>
        </div>
        <MdManageAccounts style={{ fontSize: "25px"}}/>
      </div>
      <hr />
      <div className="infoDiv">
        <div className="locationInfo">
          <MdOutlineMyLocation style={{ marginTop: "5px" }} />
          <p>{`${location}`}</p>
        </div>
        <div className="locationInfo">
          <MdOutlineAssuredWorkload style={{ marginTop: "5px" }} />
          <p>{`${occupation}`}</p>
        </div>
      </div>
      <hr />
      <div className="viewDiv">
        <div className="impressions">
          <p>Profile views</p>
          <p style={{ fontWeight: "bold" }}>{`${viewedProfile}`}</p>
        </div>
        <div className="impressions">
          <p>Impressions</p>
          <p style={{ fontWeight: "bold" }}>{`${impressions}`}</p>
        </div>
      </div>
    </section>
  );
}

export default User;
