// LogoPage.jsx
import { CSSProperties } from "react";

const LogoPage = () => {

  return (
    <div style={styles.logoContainer}>
      <h1>Welcome to Our App!</h1>
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
    backgroundColor: "#f4f4f4",
    color: "black",
  },
  logo: {
    width: "200px",
    height: "auto",
  },
};

export default LogoPage;