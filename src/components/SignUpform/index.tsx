import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./styles.scss";
import Google from "../../assets/icons/📍google-icon.png";
import Linkedin from "../../assets/icons/📍linkedIn-icon.png";
import Microsoft from "../../assets/icons/📍microsoft-icon.png";
import fireBaseAuth from "../../utils/index";

type AppProps = {
  showLogin: boolean;
};

type UserError = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  retypeEmail: boolean;
  password: boolean;
  retypePassword: boolean;
};
type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  retypeEmail: string;
  password: string;
  retypePassword: string;
};

function SignUp({ showLogin }: AppProps) {
  const [useData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    retypeEmail: "",
    password: "",
    retypePassword: "",
  });

  const [showErrorMessage, setShowErrorMessage] = useState<UserError>({
    firstName: false,
    lastName: false,
    email: false,
    retypeEmail: false,
    password: false,
    retypePassword: false,
  });
  const [errorMessage, setErrorMessage] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    retypeEmail: "",
    password: "",
    retypePassword: "",
  });

  const handleOnchange = (e: any) => {
    const { name, value } = e.target;
    setShowErrorMessage({
      ...showErrorMessage,
      [name]: false,
    });
    setUserData({
      ...useData,
      [name]: value,
    });
  };

  const handleError = (e: any) => {
    const { name, value } = e.target;
    if (name === "email") {
      const match = value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (!match) {
        return setShowErrorMessage({
          ...showErrorMessage,
          [name]: true,
        });
      }
      return;
    }

    if (value.length < 6) {
      setShowErrorMessage({
        ...showErrorMessage,
        [name]: true,
      });
    }
  };

  return (
    <form className={!showLogin ? "signup-form" : ""}>
      <div className="input-control">
        <TextField
          error={showErrorMessage.firstName}
          margin="none"
          id="fullwidth"
          fullWidth
          label="First Name*"
          name="firstName"
          type="text"
          onChange={handleOnchange}
          defaultValue={useData.email}
          onBlur={handleError}
          helperText={showErrorMessage.firstName && errorMessage.firstName}
          variant="standard"
        />
      </div>
      <div className="input-control">
        <TextField
          error={showErrorMessage.lastName}
          margin="none"
          id="fullwidth"
          fullWidth
          label="Last Name*"
          name="lastName"
          type="text"
          onChange={handleOnchange}
          defaultValue={useData.lastName}
          onBlur={handleError}
          helperText={showErrorMessage.lastName && errorMessage.lastName}
          variant="standard"
        />
      </div>
      <div className="input-control">
        <TextField
          error={showErrorMessage.email}
          margin="none"
          id="fullwidth"
          fullWidth
          label="Email"
          name="email"
          type="email"
          onChange={handleOnchange}
          defaultValue={useData.email}
          onBlur={handleError}
          helperText={showErrorMessage.email && errorMessage.email}
          variant="standard"
        />
      </div>
      <div className="input-control">
        <TextField
          error={showErrorMessage.retypeEmail}
          margin="none"
          id="fullwidth"
          fullWidth
          label="Retype Email*"
          name="retypeEmail"
          type="email"
          onChange={handleOnchange}
          defaultValue={useData.retypeEmail}
          onBlur={handleError}
          helperText={showErrorMessage.retypeEmail && errorMessage.retypeEmail}
          variant="standard"
        />
      </div>
      <div className="input-control">
        <TextField
          error={showErrorMessage.password}
          margin="none"
          id="fullwidth"
          fullWidth
          label="Password *"
          type="password"
          name="password"
          onChange={handleOnchange}
          defaultValue={useData.password}
          onBlur={handleError}
          helperText={showErrorMessage.password && errorMessage.password}
          variant="standard"
        />
      </div>
      <div className="input-control">
        <TextField
          error={showErrorMessage.retypePassword}
          margin="none"
          id="fullwidth"
          fullWidth
          label="Retype Password*"
          type="password"
          name="retypePassword"
          onChange={handleOnchange}
          defaultValue={useData.password}
          onBlur={handleError}
          helperText={
            showErrorMessage.retypePassword && errorMessage.retypePassword
          }
          variant="standard"
        />
      </div>
      <div className=" remindme">
        <div>
          <input type="checkbox" name="accept" id="accept" />
          <label htmlFor="accept">Remember Me</label>
        </div>
        <div className="forgot">Forgot Password?</div>
      </div>

      <Button variant="contained" fullWidth type="submit">
        SIGN UP
      </Button>
      <div className="or">OR SIGN UP USING</div>

      <div className="icon-section">
        <Button className="icon-container" onClick={() => fireBaseAuth(true)}>
          <img src={Google} alt="Google" className="icon" />
        </Button>
        <Button className="icon-container">
          <img src={Linkedin} alt="Google" className="icon" />
        </Button>
        <Button className="icon-container" onClick={() => fireBaseAuth(false)}>
          <img src={Microsoft} alt="Google" className="icon" />
        </Button>
      </div>
    </form>
  );
}

export default SignUp;
