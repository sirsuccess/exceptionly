import Logo from "../../assets/images/exceptionly-logo.png";
import "./styles.scss";

function loadingScreen() {
  return (
    <div className="splash-bg">
      <div>
        <img src={Logo} alt="logo" />
      </div>
    </div>
  );
}

export default loadingScreen;
