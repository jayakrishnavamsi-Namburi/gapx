import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";

const provider = new GoogleAuthProvider();

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken();

      const res = await axios.post(
        "https://gapx.onrender.com/api/auth/google",
        { token }
      );

      // ✅ Save JWT
      localStorage.setItem("token", res.data.token);

      console.log("Login Success:", res.data);

      // 👉 redirect (optional)
      window.location.href = "/dashboard";

    } catch (error) {
      console.log("Google Login Error:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      Continue with Google
    </button>
  );
};

export default GoogleLogin;