import DefaultPic from "../../assets/default-profile.jpg";

export default function UserInfo({
  userProfilePic,
  userName,
  userMobileNumber,
}) {
  return (
    <div className="border rounded-lg p-4">
      <h4 className="text-2xl font-semibold">User Info:</h4>
      <div className="flex items-center gap-4">
        <img src={userProfilePic || DefaultPic} className="w-12 rounded-full" />
        <div className="text-left">
          <p className="text-sm">{userMobileNumber}</p>
          <p className="font-semibold">{userName}</p>
        </div>
      </div>
    </div>
  );
}
