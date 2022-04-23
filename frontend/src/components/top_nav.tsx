import logo from "../assets/icon.png"
import styles from "@/styles/TopNav.module.css";
import Image from "next/image";
const TopNav = () => {
    return (
        <div className={styles.topContainer}>
            <Image src={logo} width={50} height={50} alt="no" />
            <h3 className={styles.name}>Exploding kittens</h3>
        </div>
    );
}

export default TopNav;