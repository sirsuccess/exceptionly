import { useState } from "react";
import "./styles.scss";
import Logo from "../../assets/images/logo.png";
import ExceptionalLogo from "../../assets/images/exceptionly-logo.png";
import LoginForm from "../Loginform";
import SignUpForm from "../SignUpform";

function AuthCard() {
  const [showLogin, setShowLogin] = useState<any>(true);

  return (
    <div
      className={`auth-card ${showLogin ? "diff-name" : "auth-card-height"}`}
    >
      <div className="auth-card-left">
        <div className="logo-container">
          <img src={Logo} alt="company logo" />
        </div>
        <div className="bottom-section">
          <div className="title">WELCOME TO THE MARKETPLACE</div>
          <p>
            Exceptionly provides hands-on tested remote software engineers
            unlike any other outsourcing company. Our product delivers talent
            directly for hiring without a lifetime markup over 400%.
          </p>
        </div>
      </div>
      <div className="auth-card-right">
        <div className="logo">
          <img src={ExceptionalLogo} alt=" exceptionly logo" />
        </div>
        <div className="title">
          {showLogin ? "Sign in" : "Sign up"} to your account
        </div>
        {showLogin ? (
          <LoginForm showLogin={showLogin} />
        ) : (
          <SignUpForm showLogin={showLogin} />
        )}

        <div className="footer">
          {showLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setShowLogin(!showLogin)}>
            {" "}
            {showLogin ? "Create an account" : "SIGN IN HERE"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthCard;
