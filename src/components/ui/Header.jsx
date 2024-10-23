import { Navbar, Swap } from "react-daisyui";
import { greetings } from "../../utils/greetings";
import SettingsDropdown from "./SettingsDropdown";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";

export default function Header({ user, visible, handleSidebar }) {
  return (
    <Navbar className="fixed bg-base-100 z-50 px-4 border-b">
      <Navbar.Start className="gap-2">
        <Swap
          onElement={<IoCloseOutline size={30} />}
          offElement={<IoMenuOutline size={30} />}
          active={!visible}
          onClick={handleSidebar}
        />

        <h3 className="text-primary">RideSwift</h3>
      </Navbar.Start>
      <Navbar.End>
        <div className="hidden text-right text-secondary m-2 lg:block">
          <p className="text-xs">{greetings()} </p>
          <h4 className="font-semibold">{user?.username}</h4>
        </div>
        <SettingsDropdown user={user} />
      </Navbar.End>
    </Navbar>
  );
}
