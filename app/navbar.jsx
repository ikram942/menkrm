import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import styles from "./Navbar.module.css";
export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles["top-bar"]}>
        <span>🌍 MOROCCO (MAD د.م)</span>
      </div>

      <div className={styles["nav-main"]}>
        <h1 className={styles.logo}>Mensavil</h1>

        <nav className={styles.menu}>
          <a href="#">HOME</a>
          <a href="#">PRODUCTS</a>
          <a href="#">TUTORIALS</a>
          <a href="#">MANAGE SUBSCRIPTION</a>
          <a href="#">GIFTING</a>
          <a href="#">CONTACT US</a>
        </nav>

        <div className={styles.icons}>
          <FaSearch />
          <FaUser />
          <FaShoppingCart />
        </div>
      </div>
    </header>
  );
}