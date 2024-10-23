import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Sidebar from "../ui/Sidebar";

export default function HomeLayout() {
  const { user } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(true);

  const handleSidebar = () => {
    setVisible((prev) => !prev);
  };

  return (
    <section className="text-secondary">
      <Header user={user} visible={visible} handleSidebar={handleSidebar} />
      <main className="flex">
        <Sidebar visible={visible} />
        <article
          className={`overflow-hidden mt-[74px] flex-1 p-2 lg:p-4 transition-all duration-300 ${
            visible ? "ml-0" : "ml-0 md:ml-[250px]"
          }`}
        >
          <Outlet />
        </article>
      </main>
    </section>
  );
}
