import Auth from "./pages/Auth";
import { initializeApp } from "firebase/app";

function App() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);

  return (
    <div className="App">
      <Auth />
    </div>
  );
}

export default App;
