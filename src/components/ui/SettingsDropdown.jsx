import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-daisyui";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { logOut } from "../../features/auth/authSlice";
import DefaultPic from "../../assets/default-profile.jpg";

export default function SettingsDropdown({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    dispatch(logOut())
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  return (
    <Dropdown.Details end>
      <Dropdown.Details.Toggle
        shape="circle"
        className="avatar tooltip tooltip-left"
        data-tip="account settings"
      >
        <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
          <img
            src={user?.profilePic ? user?.profilePic : DefaultPic}
            className="rounded-full object-cover w-full h-full"
          />
        </div>
      </Dropdown.Details.Toggle>
      <Dropdown.Menu className="mt-3 z-[1] w-52 menu-sm text-secondary">
        <Dropdown.Item onClick={() => navigate("/settings")}>
          <IoSettingsOutline size={25} />
          <p>Settings</p>
        </Dropdown.Item>
        <Dropdown.Item className="text-error" onClick={handleLogout}>
          <IoLogOutOutline size={25} />
          <p>Logout</p>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Details>
  );
}
