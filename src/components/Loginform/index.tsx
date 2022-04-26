/* eslint-disable jsx-a11y/anchor-is-valid */
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
  email: boolean;
  password: boolean;
};

type UserData = {
  email: string;
  password: string;
};

function LoginForm({ showLogin }: AppProps) {
  const [useData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const [showErrorMessage, setShowErrorMessage] = useState<UserError>({
    email: false,
    password: false,
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
    <form className={showLogin ? "login-form" : ""}>
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
          helperText={
            showErrorMessage.email ? "Please insert a valid mail" : ""
          }
          variant="standard"
        />
      </div>
      <div className="input-control">
        <TextField
          error={showErrorMessage.password}
          margin="none"
          id="fullwidth"
          name="password"
          onChange={handleOnchange}
          fullWidth
          label="Password"
          type="password"
          defaultValue={useData.password}
          onBlur={handleError}
          helperText={
            showErrorMessage.password
              ? "Please must be at least 6 charater long"
              : ""
          }
          variant="standard"
        />
      </div>
      <div className="remindme">
        <div>
          <input type="checkbox" name="accept" id="accept" />
          <label htmlFor="accept">Remember Me</label>
        </div>
        {/* <Link to="/about" className="forgot">Forgot Password?</Link> */}

        <a className="forgot">Forgot Password?</a>
      </div>

      <Button variant="contained" fullWidth type="submit">
        SIGN IN
      </Button>
      <div className="or">OR</div>
      <div className="button-container">
        <Button
          variant="contained"
          fullWidth
          onClick={() => fireBaseAuth(true)}
        >
          {" "}
          <img src={Google} alt="Google" className="icon" /> SIGN IN WITH GOOGLE
        </Button>
        <Button variant="contained" fullWidth>
          <img src={Linkedin} alt="Google" className="icon" />
          SIGN IN WITH Linkedin
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="error"
          onClick={() => fireBaseAuth(false)}
        >
          {" "}
          <img src={Microsoft} alt="Google" className="icon" />
          SIGN IN WITH Microsoft
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
