import axios from "axios";
import useConstants from "../Constants/uesConstants";
let userData = JSON.parse(localStorage.getItem("userDetails"))

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
//  let gettingtoken = localStorage.getItem("usertoken");
  try {
    let response = await axios.get(
      process.env.REACT_APP_BASE_URL + useConstants.getNotes,
      data
    );
    //console.log("akl",data)
    return response;
  } catch (err) {
    return err;
  }
}





export async function getTrash(data) {
//  let gettingtoken = localStorage.getItem("usertoken");
  try {
    let response = await axios.get(
      process.env.REACT_APP_BASE_URL + useConstants.displaytrash,
      data
    );
    return response;
  } catch (err) {
    return err;
  }
}

export async function noteColor(data){
 //let gettingtoken = localStorage.getItem("usertoken");
  try{
      const response = await axios.post(process.env.REACT_APP_BASE_URL + useConstants.noteColor,
        data);
      return response
  } catch(err){
      return err
  }
}

export async function trashNote(data){
  //let gettingtoken = localStorage.getItem("usertoken");

  try{
   // let data =trashNote.id
  // console.log("jfhfhff",data);
   console.log("NoteService Trashid ",data)
      const response = await axios.post(process.env.REACT_APP_BASE_URL + useConstants.trashNote,
        data);
      return response
  } catch(err){
      return err;
  }
}

export async function restoreNote(data){
// let gettingtoken = localStorage.getItem("usertoken");
  try{
   // let data =trashNote.id
  // console.log("jfhfhff",data);
   console.log("NoteService Trashid ",data)
      const response = await axios.post(process.env.REACT_APP_BASE_URL + useConstants.restoreNote,
        data );
      //   ,
      //   {
      //     headers: {
      //         Authorization:userData.id
      // }}
     
      return response
  } catch(err){
      return err;
  }
}



export async function deleteNotes(data){
  //let gettingtoken = localStorage.getItem("usertoken");
   try{
    // let data =trashNote.id
   // console.log("jfhfhff",data);
    console.log("dele ",data)
       const response = await axios.post(process.env.REACT_APP_BASE_URL + useConstants.deleteNotes,
         data );
       //   ,
       //   {
       //     headers: {
       //         Authorization:userData.id
       // }}
      
       return response
   } catch(err){
       return err;
   }
 }

 export async function archiveNote(data){
  try{
   // let data =trashNote.id
  // console.log("jfhfhff",data);
   console.log("NoteService Trashid ",data)
      const response = await axios.post(process.env.REACT_APP_BASE_URL + useConstants.archiveNote,
        data);
      return response
  } catch(err){
      return err;
  }
}

export async function editNote(data){
  try{
   // let data =trashNote.id
  // console.log("jfhfhff",data);
   console.log("NoteService Trashid ",data)
      const response = await axios.post(process.env.REACT_APP_BASE_URL + useConstants.editNote,
        data);
      return response
  } catch(err){
      return err;
  }
}


export async function unarchiveNote(data){
  try{
   // let data =trashNote.id
  // console.log("jfhfhff",data);
   console.log("NoteService Trashid ",data)
      const response = await axios.post(process.env.REACT_APP_BASE_URL + useConstants.unarchiveNote,
        data);
      return response
  } catch(err){
      return err;
  }
}


export async function updatePin(data){
  try{
   // let data =trashNote.id
  // console.log("jfhfhff",data);
   console.log("NoteService Trashid ",data)
      const response = await axios.post(process.env.REACT_APP_BASE_URL + useConstants.updatePin,
        data);
      return response
  } catch(err){
      return err;
  }
}

export async function createLabel(data){
  try{
   // let data =trashNote.id
  // console.log("jfhfhff",data);
   console.log("NoteService Trashid ",data)
      const response = await axios.post(process.env.REACT_APP_BASE_URL + useConstants.createLabel,
        data);
      return response
  } catch(err){
      return err;
  }
}

