import React, { Component } from 'react'
import FormData from 'form-data';
const formdata = new FormData()

export default class ImgUpload extends Component {
getImage = (event) =>{
    formdata.append('profile',event.target.files[0]);
    this.props.uploadImage(formdata);
}

    render() {
        console.log(this.state)

        return (
            <div>
            <input className='uploadImageInput'onChange={this.getImage} type='file' name='file' ></input>
            </div>
        )
    }
}
