import axios from 'axios';
import useConstants from "../Constants/uesConstants";

let headers = {
  "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Origin set to ": "*",
  method: "post",
};
export default class Profile {
    uploadImage(imageData) {
        var auth = "Bearer ".concat(localStorage.getItem('token'))
        return axios.post('/api/uploadProfileImage',imageData, { headers: { Authorization: auth } })
            .then((response) => {
                localStorage.setItem('profile_image', response.data.success);
                return response;
            }
            )
            .catch((error) => {
                return error;
            });
    }
}