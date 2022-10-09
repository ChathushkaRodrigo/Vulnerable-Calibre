import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
// import { Link } from "react-router-dom";
import "./StudentTopicRegistrationForm.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { setMaxListeners } from "nodemailer/lib/xoauth2";
import Swal from 'sweetalert2'
import * as DOMPurify from 'dompurify';



export default function StatusDocumentMarkingConfiguration() {

    const [error, setError] = useState("");
    const [totContribution ,setTotalContribution] = useState("");
    const[stdesc1,setstDesc01] = useState("");
    const[stdesc2,setstDesc02] = useState("");
    const[stdesc3,setstDesc03] = useState("");
    const[stdesc4,setstDesc04] = useState("");
    const[marksEn1,setmarkEn01] = useState("");
    const[marksEn2,setmarkEn02] = useState("");
    const[marksEn3,setmarkEn03] = useState("");
    const[marksEn4,setmarkEn04] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const statusDocumentMarkingID = "62ba94a728099fe3e5aacf54";

    let totalContribution = DOMPurify.sanitize(totContribution);
    let stdesc01 = DOMPurify.sanitize(stdesc1);
    let stdesc02 = DOMPurify.sanitize(stdesc2);
    let stdesc03 = DOMPurify.sanitize(stdesc3);
    let stdesc04 = DOMPurify.sanitize(stdesc4);
    let marksEn01 = DOMPurify.sanitize(marksEn1);
    let marksEn02 = DOMPurify.sanitize(marksEn2);
    let marksEn03 = DOMPurify.sanitize(marksEn3);
    let marksEn04 = DOMPurify.sanitize(marksEn4);
    //************* UPDATE PROPOSAL REPORT MARKING RUBRIK HANDLER  **********/ 
  const statusDocumentMarkingHandler = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.put(
            `/api/markingRubrik/statusDocumentMarkingConfiguration/update/${statusDocumentMarkingID}`,
            { totalContribution, stdesc01,stdesc02,stdesc03,stdesc04,marksEn01,marksEn02,marksEn03,marksEn04 }
            );

            console.log(stdesc01)
            alert("marking report updated success")

      
     
       
    } catch (error) {
        alert("Error updating marking notset")
          
    }
  };


  

  // function validationHandler(value) {
  //   if(value.includes("<")){
  //     setErrorMessage("Cannot include scripts!")
  //   }
  // }







  return (

    <div className="bg-gray-900">  
        <Header />
        <br/> <br/>
        <h1 id="caption">Status Document Details Configuration</h1>
           <br/>
           
      
           <br/> <br/> 
    <div className="bg-gray-800 ml-[35rem] mt-[20rem]">
            
          <div className="bg-gray-900 mt-[-22rem]">        
          <form onSubmit={statusDocumentMarkingHandler} className="w-[20rem]">
      <h3 className="login-screen__title"></h3>
      {error && <span className="error-message">{error}</span>}
      
      
      <div className="form-group">
        <label className="TopicNames">Total Contribution %</label> <br/><br/>
          <input type="text" 
          className = "input" style={{color:"white"}}
          name="name" 
          onChange={(e) => setTotalContribution(e.target.value)}
          value={totContribution} />
        </div>
        <br/>

        <div className="form-group">
        <label className="TopicNames">Marks Entitled for Section 01</label><br/><br/>
          <input type="text" 
          className = "input" style={{color:"white"}}
          name="name" 
          onChange={(e) => setmarkEn01(e.target.value)}
          value={marksEn1} />
        </div>

        <br/>
        <div className="form-group">
        <label className="TopicNames">Marks Entitled for Section 02</label> <br/><br/>
          <input type="text" 
          className = "input" style={{color:"white"}}
          name="name" 
          onChange={(e) => setmarkEn02(e.target.value)}
          value={marksEn2} />
        </div>
        <br/>
        <div className="form-group">
        <label className="TopicNames">Marks Entitled for Section 03</label>  <br/><br/>
          <input type="text" 
          className = "input" style={{color:"white"}}
          name="name" 
          onChange={(e) => setmarkEn03(e.target.value)}
          value={marksEn3} />
        </div>
        <br/>
        <div className="form-group">
        <label className="TopicNames">Marks Entitled for Section 04</label>  <br/><br/>
          <input type="text" 
          className = "input" style={{color:"white"}}
          name="name" 
          onChange={(e) => setmarkEn04(e.target.value)}
          value={marksEn4} />
        </div>
        <br/>
        <center/>
        <div className="form-group">
          <div className="editor">
          <label className="TopicNames">Section 01</label>  <br/><br/>
        <CKEditor 
        editor={ClassicEditor}
        data={stdesc01}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setstDesc01(data)
        }}
        />
        <br/>

        <label className="TopicNames">Section 02</label> <br/><br/>
                <CKEditor
        editor={ClassicEditor}
        data={stdesc2}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setstDesc02(data)
        }}
        />
        <br/>
        <label className="TopicNames">Section 03</label> <br/><br/>
                <CKEditor
        editor={ClassicEditor}
        data={stdesc3}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setstDesc03(data)
        }}
        />
        <br/>
        <label className="w-[30rem] text-slate-50">Section 04</label> <br/><br/>
                <CKEditor className="section-content"
        editor={ClassicEditor}
        data={stdesc4}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setstDesc04(data)
        }}
        /> 
        <br/>
       
       
          </div>
    
          </div>
          <div className="form-group">


    </div>
                  <br/>




      <button type="submit" className="ml-[5rem]" id="Log1Button">
          Submit!
        </button>
        <br/>  <br/>

        
      </form>
      </div>
          </div>

    </div>
  )
}
