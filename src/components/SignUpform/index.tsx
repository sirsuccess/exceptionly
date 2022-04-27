/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Google from "../../assets/icons/📍google-icon.png";
import Linkedin from "../../assets/icons/📍linkedIn-icon.png";
import Microsoft from "../../assets/icons/📍microsoft-icon.png";
import fireBaseAuth from "../../utils/index";
import endpoints from "../../api/endpoint";
import { postCall } from "../../api/request";
import LoadingScreen from "../LoaadingScreen";
import "./styles.scss";

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
  const [loading, setLoading] = useState<boolean>(false);
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
  const errorM = {
    firstName: "First name field can not empty",
    lastName: "Last name field can not empty",
    email: "Please insert a valid mail",
    retypeEmail: "Please retype email must match email",
    password: "Please must be at least 6 charater long",
    retypePassword: "Please retype password must match password",
  };
  const [errorMessage, setErrorMessage] = useState<UserData>({
    ...errorM,
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
      ...errorMessage,
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
    if (name === "retypeEmail") {
      /* eslint-disable no-useless-escape */
      const match = value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (!match || useData.email !== value) {
        return setShowErrorMessage({
          ...showErrorMessage,
          [name]: true,
        });
      }
      return;
    }

    if (name === "password" && value.length < 6) {
      setShowErrorMessage({
        ...showErrorMessage,
        [name]: true,
      });
      return;
    }
    if (
      name === "retypePassword" &&
      (useData.password !== value || useData.retypePassword === "")
    ) {
      setShowErrorMessage({
        ...showErrorMessage,
        [name]: true,
      });
      return;
    }
  };

  const handleSumit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (showErrorMessage.firstName || useData.firstName === "") {
      setShowErrorMessage({
        ...showErrorMessage,
        firstName: true,
      });
      setLoading(false);
      return;
    }
    if (showErrorMessage.lastName || useData.lastName === "") {
      setShowErrorMessage({
        ...showErrorMessage,
        lastName: true,
      });
      setLoading(false);
      return;
    }
    if (showErrorMessage.email || useData.email === "") {
      setShowErrorMessage({
        ...showErrorMessage,
        email: true,
      });
      setLoading(false);
      return;
    }
    if (
      showErrorMessage.retypeEmail ||
      useData.retypeEmail === "" ||
      useData.email !== useData.retypeEmail
    ) {
      setShowErrorMessage({
        ...showErrorMessage,
        retypeEmail: true,
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
    if (
      showErrorMessage.retypePassword ||
      useData.password !== useData.retypePassword ||
      useData.retypePassword === ""
    ) {
      setShowErrorMessage({
        ...showErrorMessage,
        retypePassword: true,
      });
      setLoading(false);
      return;
    }

    const payload = {
      firstName: useData.firstName,
      lastName: useData.lastName,
      email: useData.email,
      password: useData.password,
      service: "email/password",
      serviceAuth: "email/password",
    };
    postCall(endpoints.createUser, payload, {})
      .then((res) => {
        setLoading(false);
        if (res.data.status === "success") {
          Swal.fire({
            title: "Success!",
            text: `Account created successfully`,
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
    <form className={!showLogin ? "signup-form" : ""} onSubmit={handleSumit}>
      {loading && <LoadingScreen />}
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
          defaultValue={useData.firstName}
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
        <a href="#" className="forgot">
          Forgot Password?
        </a>
      </div>

      <Button variant="contained" fullWidth type="submit">
        SIGN UP
      </Button>
      <div className="or">OR SIGN UP USING</div>

      <div className="icon-section">
        <div className="icon-container" onClick={() => fireBaseAuth(true, setLoading)}>
          <img src={Google} alt="Google" className="icon" />
        </div>
        <div className="icon-container">
          <img src={Linkedin} alt="Google" className="icon" />
        </div>
        <div className="icon-container" onClick={() => fireBaseAuth(false, setLoading)}>
          <img src={Microsoft} alt="Google" className="icon" />
        </div>
      </div>
    </form>
  );
}

export default SignUp;
