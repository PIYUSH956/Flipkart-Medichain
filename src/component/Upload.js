import React from "react";

const Upload = () =>{
    console.log("In Upload");

    const handleChange = (e)=>{
        console.log(e.target.files[0]);
    }
    return <>
    <h1>Upload </h1>
   
   
    
    <input type="file" onChange={handleChange} />


    </>
}

export default Upload;