import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import Swal from "sweetalert2";

export default function fireBaseAuth(isGoogle: boolean) {
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
      const user = result.user;
      console.log({ token, user, credential });
      Swal.fire({
        title: "Success!",
        text: `Hi ${user.displayName} you have successfully sign-in with ${user.email} using ${credential.signInMethod}`,
        icon: "success",
        confirmButtonText: "Close",
      });
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      Swal.fire({
        title: "Error!",
        text: "Something when wrong",
        icon: "error",
        confirmButtonText: "Close",
      });
      // ...
    });
}
