import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "react-daisyui";
import { changeProfilePic } from "../features/auth/authSlice";
import EditPersonalInfoForm from "../components/forms/EditPersonalInfoForm";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";
import DefaultProfile from "../assets/default-profile.jpg";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const handleLogoChange = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (!window.confirm("Are you sure you want to change your profile pic?"))
      return;
    try {
      if (e.target.files[0]) {
        dispatch(changeProfilePic(e.target.files[0])).unwrap();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Account Settings</h1>
      <p className="text-xl mb-4">
        Manage your profile and privacy settings.
      </p>
      <div className="flex items-center gap-4">
        <div className="avatar">
          <label
            htmlFor="logo-upload"
            className="tooltip tooltip-right cursor-pointer"
            data-tip="change profile pic"
          >
            <div
              onClick={handleLogoChange}
              className="w-[60px] h-[60px] rounded-full"
            >
              <img
                src={user?.profilePic ? user?.profilePic : DefaultProfile}
                alt="profile pic"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </label>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {user?.username}
          </h2>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="max-w-lg">
        <Divider />
        <h4 className="text-2xl font-semibold mb-2">Edit Personal Info</h4>
        <p className="mb-4">
          Update your personal information to keep your profile accurate and
          up-to-date.
        </p>
        <EditPersonalInfoForm user={user} />
        <Divider />
        <h4 className="text-2xl font-semibold mb-2">Change Password</h4>
        <p className="mb-4">
          Secure your account by changing your password regularly. Ensure it is
          strong and unique.
        </p>
        <ChangePasswordForm />
      </div>
    </>
  );
}
