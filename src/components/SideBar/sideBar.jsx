import { NavLink } from "react-router-dom";
import styles from "./sideBar.module.css";
import { FaTh, FaGlobe, FaClipboardList, FaMoneyBillAlt } from "react-icons/fa";
import Logo from "../../images/logo.jpg";
import NavBar from "../NavBar/navBar";

const SideBar = ({ children }) => {
  const menuItem = [
    {
      path: "/",
      name: "Дашборд",
      icon: <FaTh />,
    },
    {
      path: "/domains",
      name: "Проверка Доменов",
      icon: <FaGlobe />,
    },
    {
      path: "/data-leads",
      name: "Список Лидов",
      icon: <FaClipboardList />,
    },
    {
      path: "/pre-money",
      name: "Домонетка",
      icon: <FaMoneyBillAlt />,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.topSection}>
          <img className={styles.logoImg} src={Logo} alt="logo" />
          <h2 className={styles.logoText}>SALT AGENCY</h2>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }>
            <div className={styles.icon}>{item.icon}</div>
            <p className={styles.textLink}>{item.name}</p>
          </NavLink>
        ))}
      </div>
      <div className={styles.wrapper}>
        <NavBar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default SideBar;
