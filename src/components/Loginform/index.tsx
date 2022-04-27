/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./styles.scss";
import Google from "../../assets/icons/📍google-icon.png";
import Linkedin from "../../assets/icons/📍linkedIn-icon.png";
import Microsoft from "../../assets/icons/📍microsoft-icon.png";
import fireBaseAuth from "../../utils/index";
import endpoints from "../../api/endpoint";
import { postCall } from "../../api/request";
import LoadingScreen from "../LoaadingScreen";

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

  const [loading, setLoading] = useState<boolean>(false);

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
      /* eslint-disable no-useless-escape */
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

  const handleSumit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (showErrorMessage.email || useData.email === "") {
      setShowErrorMessage({
        ...showErrorMessage,
        email: true,
      });
      setLoading(false);
      return;
    }
    if (showErrorMessage.password || useData.password === "") {
      setShowErrorMessage({
        ...showErrorMessage,
        password: true,
      });
      setLoading(false);
      return;
    }
    postCall(endpoints.login, useData, {})
      .then((res) => {
        setLoading(false);
        if (res.data.status === "success") {
          Swal.fire({
            title: "Success!",
            text: `Hi, ${res.data.data.user.firstName} ${res.data.data.user.lastName} you have successfully sign-in`,
            icon: "success",
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            title: "Oops!",
            text: `${res.data.message}`,
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          title: "Oops!",
          text: "Something when wrong",
          icon: "error",
          confirmButtonText: "Close",
        });
      });
  };

  return (
    <form className={showLogin ? "login-form" : ""} onSubmit={handleSumit}>
      {loading && <LoadingScreen />}
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
        <a href="#" className="forgot">
          Forgot Password?
        </a>
      </div>

      <Button variant="contained" fullWidth type="submit">
        SIGN IN
      </Button>
      <div className="or">OR</div>
      <div className="button-container">
        <Button
          variant="contained"
          fullWidth
          onClick={() => fireBaseAuth(true, setLoading)}
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
          onClick={() => fireBaseAuth(false, setLoading)}
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
