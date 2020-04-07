import axios from "axios";
import useConstants from "../Constants/uesConstants";

let headers = {
  "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
};

export async function create(data) {
  let gettingtoken = localStorage.getItem("usertoken");

  console.log("token is comuing", gettingtoken);
  let response = axios
    .post(process.env.REACT_APP_BASE_URL + useConstants.createNote, data)
    .then((res) => {
      console.log("res", res);
      localStorage.setItem("email", res.success.email);
    })
    .catch((err) => {
      console.log("err", err);
    });
  console.log("to check for response", response);
  return response;
}

export async function getNotes(data) {
  let gettingtoken = localStorage.getItem("usertoken");
  try {
    let response = await axios.get(
      process.env.REACT_APP_BASE_URL + useConstants.getNotes,
      data
    );
    return response;
  } catch (err) {
    return err;
  }
}