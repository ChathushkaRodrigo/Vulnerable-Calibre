import axios from 'axios';
import React from 'react'
import "./GroupScreen.css";
import {useParams} from 'react-router-dom';
import { useState } from "react";
export default function ProjectBidding() {
  const [bidPlacedGroup, setBiddingPlacedGroup] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    // const [error, setError] = useState("");
    const [projectName,setProjectName] =useState("");
    const [projectDesc,setProjectDesc] =useState("");
    const [projectSupervisedBy,setProjectSupervisedBy]=useState("");
    
        const params =useParams();
        const projectID = params.id;
        console.log(projectID)
    

    //*******BIDDING PLACE HANDLER FUNCTION *******/
    const biddingPlaceHandler = async (e) => {
      e.preventDefault();
      try {
        
        const { data } = await axios.put(
          `http://localhost:5000/api/AvailableProject/availableProjects/placeBidding/${projectID}`,
          { bidPlacedGroup,date,time }
          );
          alert("Bidding success")
        console.log(data)
        console.log(bidPlacedGroup)
       
      } catch (error) {
        // setError(error.response.data.error);  
        // console.log(error.response.data.error)
        alert("Error bidding notset")
            
      }
    };
    const getRelevantProjectData =async ()=>{
     
      try{
        const{data}=await axios.get(`http://localhost:5000/api/AvailableProject/availableProjects/${projectID}`);
        console.log(data.availableProjects.projectSupervisedBy)
        setProjectName(data.availableProjects.projectName)
        setProjectDesc(data.availableProjects.projectDescription)
        setProjectSupervisedBy(data.availableProjects.projectSupervisedBy)

      }catch(error){
        
        
      }
      

    }
    getRelevantProjectData();


  return (
    <div> Project Details 
        <h1>{projectName}</h1>
        <h1>{projectDesc}</h1>
        <h1>{projectSupervisedBy}</h1>

          {/* Form  */}
          <form onSubmit={biddingPlaceHandler} >
       <div>
        <label>
          Your Group ID:</label>
          <input type="text" 
          className = "input"
          name="name" 
          onChange={(e) => setBiddingPlacedGroup(e.target.value)}
          value={bidPlacedGroup} />  
        </div>
        <div>
        <label>
           Date:</label>
          <input type="text" 
          name="name" 
          className = "input"
          onChange={(e) => setDate(e.target.value)}
          value={date} />
          </div>
          <div>
        <label>
           Time :</label>
          <input type="text" 
          name="name" 
          className = "input"
          onChange={(e) => setTime(e.target.value)}
          value={time} />
          </div>
      <button type="submit" className="btn btn-primary1" id="Log1Button">
         Place Bid
         </button>

        
      </form>
     

    </div>
  )
}