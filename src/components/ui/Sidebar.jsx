import { Link, useLocation } from "react-router-dom";
import { NavRoutes } from "../../routes/NavRoutes";

export default function Sidebar({ visible }) {
  const location = useLocation();
  return (
    <aside
      className={`fixed top-[65px] xl:top-[74px] z-50 bg-base-100 h-full w-[250px] border-r transition-transform duration-300 ${
        visible ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <nav>
        <ul>
          {NavRoutes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                className={`flex items-center gap-2 p-4 hover:bg-primary hover:text-white ${
                  location.pathname === route.path
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                <route.icon size={30} />
                <h4 className="font-semibold">{route.label}</h4>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
