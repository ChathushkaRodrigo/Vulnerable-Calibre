import { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
// import { Link } from "react-router-dom";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import image from "../../images/Bunny.jpg"
import Swal from 'sweetalert2'
import SideNavigationBar from "../SideNavigationBar/sideNavigationBarComponent";
// import { set } from "mongoose";
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>

const VulSSRF = ({history}) => {
  const Swal = require('sweetalert2')
  const [fetchFeedbackData, setFeedbackData] = useState("")
  const [privateData, setPrivateData] = useState("");
  const [error, setError] = useState("");
  const [fileData, setFileData] = useState("");
  const [vuldata, setDatavul] = useState("");
  const [vulUserInput, setvulUserInput] = useState("");
  const [aboutUserText, setaboutUserText] = useState("<img onerror='alert(localStorage.getItem(\"authToken\"));' src='invalid-image' />");
//   const [aboutUserText, setaboutUserText] = useState(`<img onerror='alert(localStorage.getItem(\"authToken\"));' src='invalid-image' />`);
//   const [imageUploadData, setimageUploadData] = useState({img:{data:{data:""}}});
  //const [isDisabled, setDisabled] = useState(false);
  useEffect(() => {

    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data} = await axios.get("/api/private", config);

        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    const fetchFeedbackData = async () => {
      const userprofileconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {

        const {data} = await axios.get("/api/student/userprofilemanagement",userprofileconfig);

        setFeedbackData(data.data);

      } catch (error) {

        // setError("Oops couldn't retreive group data");//fix this
      }
    };

    const fetchImages = async () => {
      const userprofileconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {

        const {data} = await axios.get("/api/student/vulnerable?vulURL=http://localhost:7535/",userprofileconfig);
        console.log(data)
        setDatavul(data);
        // setimageUploadData(data.data);
        // data.data.array.forEach(function(image) {
        //   console.log(image.name)
        // });
      } catch (error) {
          console.log(error)
        // setError("Oops couldn't retreive group data");//fix this
      }
    };

    fetchFeedbackData()
    fetchPrivateDate()
    fetchImages()
  }, [history]);

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
    //setDisabled(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
 //SUCCESS SWEET ALERT MESSAGE
 Swal.fire({
  title: 'Do you want to save the changes?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Save',
  denyButtonText: `Don't save`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire('Saved!', '', 'success')
    // Handle File Data from the state Before Sending
    const data = new FormData();
    data.append("image", fileData);
    fetch("http://localhost:5000/single", {
      method: "POST",
      body: data,
    })
      .then((result) => {
        console.log("File Sent Successful");
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
})

  };
  const setVulnerableFunc = (e) => {
  
    //make a get request
    
    const userprofileconfig = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    };
    
    try {
        const {data} = axios.get("/api/student/vulnerable?vulURL="+vulUserInput,userprofileconfig);
        console.log(data)
        // setDatavul(data);

    }
    catch (error) {
        console.log(error)
        // setError("Oops couldn't retreive group data");//fix this
    }
}
  // localStorage.setItem("authToken", data.token);

  // history.push("/");

  return  error ? (

    <span className="error-message">{error}</span>

  ) :
  (

 <div id="userprofileClass" className="">
   {/* <Header/> */}
   {/* <div class="flex float-left items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded" > */}
    {/* <meta name="viewport" content="width=device-width,initial-scale=1"/> */}

    <SideNavigationBar page="StudentProfile"/>
   {/* </div> */}

  <div className="float-right lg:w-4/5 mt-[-50rem] ml-20rem2 pl-24 pt-20 bg-gray-800">

      {/* profile image */}
      <div className="float-left  lg:w-2/5  ">

    <h1 style={{ color: 'white' }}>Upload your profile picture link to get the ID</h1>


              {/* <input type="text"  id="ID" name="ID" value={vulUserInput} style={{marginBottom:"10px"}}></input> */}
              {/* input field that change changes t4h vuluserinput hook when typed in */}
                <input type="text"  id="ID" name="ID" value={vulUserInput} style={{marginBottom:"10px"}} onChange={(e) => setvulUserInput(e.target.value)}></input>
              <button onClick={setVulnerableFunc} type="submit" className="ml-[rem] mt-3 text-white bg-[#121518] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2" >Submit!</button>

              <img src = {vulUserInput}></img>
      </div>







</div>
</div>



)
};

export default VulSSRF;