import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import Swal from "sweetalert2";
import endpoints from "../api/endpoint";
import { postCall } from "../api/request";

export default function fireBaseAuth(isGoogle: boolean, setLoading: any) {
  setLoading(true)
  const auth = getAuth();
  const provider = isGoogle
    ? new GoogleAuthProvider()
    : new OAuthProvider("microsoft.com");

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential: any = isGoogle
        ? GoogleAuthProvider.credentialFromResult(result)
        : OAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user:any = result.user;
      const [firstName, lastName] = user.displayName?.split(" ")
      const payload = {
        firstName: firstName,
        lastName: lastName || firstName,
        email: user.email,
        password: "password",
        service: credential.signInMethod,
        serviceAuth: token,
      };
      postCall(endpoints.createUser, payload, {})
      setLoading(false)
      Swal.fire({
        title: "Success!",
        text: `Hi ${user.displayName} you have successfully sign-in with ${user.email} using ${credential.signInMethod}`,
        icon: "success",
        confirmButtonText: "Close",
      });
    })
    .catch((error) => {
      setLoading(false)
      Swal.fire({
        title: "Error!",
        text: "Something when wrong, try again",
        icon: "error",
        confirmButtonText: "Close",
      });
    });
}
