import { NavLink, Link, Outlet } from "react-router-dom";
// import DefaultProfile from "./DefaultProfile";
// import Spinach from "./Spinach";
// import Popeye from "./Popeye";

const ProfilesPage = () => {
  const profiles = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col gap-2">
      {profiles.map((profile) => (
        <NavLink
          key={profile}
          to={`/profiles/${profile}`}
          className={({ isActive }) => {
            return isActive ? `text-primary-700` : "";
          }}
        >
          Profile {profile}
        </NavLink>
      ))}
      <Outlet></Outlet>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default ProfilesPage;
