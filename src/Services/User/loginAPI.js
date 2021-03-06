import axios from "axios";
import { toast } from "react-toastify";

export const loginUser = async (
  tempEmail,
  tempPassword,
  dispatchAuth,
  navigate,
  location
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/auth/login",
      data: { email: tempEmail, password: tempPassword },
    });
    if (res.status === 200) {
      dispatchAuth({
        type: "GET_USER_DETAILS",
        payload: res.data.foundUser,
      });
      localStorage.setItem("token", res.data.encodedToken);

      localStorage.setItem("first", res.data.foundUser.firstName);
      const whereTo = location?.state?.from?.pathname;
      navigate(whereTo || "../explore", { replace: true });
      toast.success("Login Success");
    }
  } catch (e) {
    console.log("error occured:  ", tempEmail, tempPassword, e);
    toast.error("Login Error");
  }
};
