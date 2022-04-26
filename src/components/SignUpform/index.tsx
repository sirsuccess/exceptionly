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
    setErrorMessage({
      ...useData,
      [name]: "",
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
    postCall(endpoints.login, useData, {})
      .then((res) => {
        console.log({ res });
        if (res.data) {
          Swal.fire({
            title: "Success!",
            text: `Hi, you have successfully sign-in`,
            icon: "success",
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            title: "Oops!",
            text: "Something when wrong, try again",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Oops!",
          text: "Something when wrong",
          icon: "error",
          confirmButtonText: "Close",
        });
      });
  };

  return (
    <form className={!showLogin ? "signup-form" : ""} onSubmit={handleSumit}>
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
        <a href="#" className="forgot">Forgot Password?</a>
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
