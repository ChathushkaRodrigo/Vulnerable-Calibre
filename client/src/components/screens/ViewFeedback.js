import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewFeedback.css";
// import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideNavigationBar from "../SideNavigationBar/sideNavigationBarComponent";

const ViewFeedback = ({history}) => { 
  const [fetchFeedbackData, setFeedbackData] = useState("")
  const [privateData, setPrivateData] = useState("");
  const [error, setError] = useState("");
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
      const feedbackconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
          
        const {data} = await axios.get("/api/student/viewfeedback",feedbackconfig);
       
        setFeedbackData(data.data);
        
      } catch (error) {

        // setError("Oops couldn't retreive group data");//fix this
      }
    };
  
    fetchFeedbackData()
    fetchPrivateDate()
  }, [history]);
  

  
  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :
  (

<div className="view-feedback">
  <Header/>
  <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
  <SideNavigationBar page="StudentFeedbacks"/>
  </div>
  <br/>
      <h1 id="caption" style={{marginTop:"-875px"}}>My Feedbacks</h1>
      <br/><br/>
      <div className="card">
      <div className="container">
        <h4 id="feedback-topic"><b>Milestone 1 </b></h4> 
        <hr id="hr1"></hr>
        <p className="feedbackcontent"> {fetchFeedbackData}</p> 
      </div>
      </div>
      <br/>
      <div className="card">
      <div className="container">
        <h4 id="feedback-topic"><b>Milestone 2 </b></h4> 
        <hr id="hr1"></hr>
        <p className="feedbackcontent"> Not available</p> 
      </div>
      </div>
      <br/>
      <div className="card">
      <div className="container">
        <h4 id="feedback-topic"><b>Milestone 3 </b></h4> 
        <hr id="hr1"></hr>
        <p className="feedbackcontent"> Not available</p> 
      </div>
      </div>
      <br/><br/>
      <div className="card">
      <div className="container">
        <h4 id="feedback-topic"><b>Milestone 4 </b></h4> 
        <hr id="hr1"></hr>
        <p className="feedbackcontent"> Not available</p> 
      </div>
     
      </div>


      <br/>
      <Footer/>
</div>
 
    
)  
};

export default ViewFeedback;
