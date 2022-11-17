import * as service from "../../services/auth-service.ts"
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import MyTuits from "./my-tuits.js";
import MyLikes from "./my-likes";
import { profile, logout } from "../../services/auth-service.ts";

const Profile = () => {

  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);
  const logout = () => {
    service.logout()
      .then(() => navigate('/login'));
  }

  return (
    <div>
      <h4>{profile.username}</h4>
      <h6>@{profile.username}</h6>
      <button onClick={logout}>
        Logout</button>
        <ul className="mt-4 nav nav-pills nav-fill">
                            <li className="nav-item">
                                <Link to="/profile/mylikes">
                                    Likes</Link>
                            </li>
        </ul>
        {/* <Link to="/profile/mylikes">
        Likes</Link> */}


        {profile.username &&
                    <Routes>
                        <Route path="/mytuits" element={<MyTuits/>}/>
                        <Route path="/mylikes"
               element={<MyLikes/>}/>
                    </Routes>
                }

    </div>
  );
};
export default Profile;

