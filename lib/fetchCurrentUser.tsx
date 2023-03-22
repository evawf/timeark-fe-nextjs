import axios from "axios";

axios.defaults.withCredentials = true;

export default async function FetchCurrentUser() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/user`
  );
  console.log("res: ", res);
  if (res.data) {
    return res.data;
  } else {
    return "Please login first";
  }
}
