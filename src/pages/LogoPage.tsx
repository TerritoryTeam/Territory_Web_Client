// LogoPage.jsx
import { CSSProperties } from "react";

const LogoPage = () => {
  return (
    <div style={styles.logoContainer}>
      <img style={styles.logo} src="/assets/logo.png"></img>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#6575A8",
    color: "black",
  },
  logo: {
    width: "480px",
    height: "auto",
  },
};

export default LogoPage;