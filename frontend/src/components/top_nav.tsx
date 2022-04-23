import logo from "../assets/icon.png";
import styles from "../../styles/TopNav.module.css";
import Image from "next/image";
import { AppBar, Box, Container } from "@mui/material";
const TopNav = () => {
  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            alignItems: "center",
          }}
        >
          <h3 className={styles.name}>Exploding kittens</h3>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          <h3 className={styles.name}>Exploding kittens</h3>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Image
            src={logo}
            // layout="responsive"
            width={"100"}
            height="100"
            alt="no"
          />
        </Box>
      </Container>
    </AppBar>
  );
};

export default TopNav;

/*<div className={styles.topContainer}>
      <Image src={logo} width={50} height={50} alt="no" />
      <h3 className={styles.name}>Exploding kittenssss</h3>
    </div>*/
