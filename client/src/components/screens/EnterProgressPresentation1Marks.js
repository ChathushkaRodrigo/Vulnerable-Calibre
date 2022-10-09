import { useState, useEffect } from "react";
import axios from "axios";
import "./EnterProgressPresentation1Marks.css";
import Header from "../Header/Header";
import Swal from 'sweetalert2'

const EnterProgressPresentation1Marks = ({history}) => {
    const Swal = require('sweetalert2')
    const [error,setError]= useState("");
    const [privateData, setPrivateData] = useState("");
    const [groupID, setgroupID]= useState("");
    const [studentIDs, setstudentIDs]= useState("");
    const [studentnames, setstudentnames]= useState("");
    const [provengapmarks1, setprovengapmarks1] = useState("");
    const [provengapmarks2, setprovengapmarks2] = useState("");
    const [capabilitymarks1, setcapabilitymarks1] = useState("");
    const [capabilitymarks2, setcapabilitymarks2] = useState("");
    const [implementationmarks1, setimplementationmarks1] = useState("");
    const [implementationmarks2, setimplementationmarks2] = useState("");
    const [implementationmarks3, setimplementationmarks3] = useState("");
    const [implementationmarks4, setimplementationmarks4] = useState("");
    const [implementationmarks5, setimplementationmarks5] = useState("");
    const [communicationmarks1,setcommunicationmarks1] = useState("");
    const [communicationmarks2, setcommunicationmarks2] = useState("");
    const [commercializationmarks, setcommercializationmarks] = useState("");
    const [extrafeedback, setextrafeedback] = useState("");
    const [recommendation, setrecommendation] = useState("");
    const[examiner1,setexaminer1] = useState("");
    const [examiner2, setexaminer2] = useState("");
    const [moderator, setmoderator] = useState("");
    const [enterprogresspresentation1marks, setenterprogresspresentation1marks]= useState("");
    const[fetchenterprogresspresentation1marksData, setenterprogresspresentationmarksData] = useState("");
    const[excellent,setExcellentGrade] = useState("");
    const[good,setGoodRange] = useState("");
    const[average,setAverageRange] = useState("");
    const[belowAverage,setBelowAvg] = useState("");
    const[lO1,setl01] = useState("");
    const[l02,setl02] = useState("");
    const[l03,setl03] = useState("");
    const[l04,setl04] = useState("");
    const [l05,setl05]=useState("");
    const [totalContribution,setTotalContribution]=useState("");
    const progressPresentationMarkingDocumentID = "62bff056d30adeec12925a07";

    useEffect(() => {
        const fetchenterprogresspresentation1marksData = async () => {
            const enterprogresspresentation1marksconfig = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`,
                }
            }
            try{
                const { data } = await axios.get("/api/staffPrivate/addprogresspresentation1marks",enterprogresspresentation1marksconfig);
                const enterprogresspresentation1marksArray = data.data.split("/")
                console.log(enterprogresspresentation1marksArray[0])
                const enterprogresspresentation1marks1 = enterprogresspresentation1marksArray[0].split(",")
                setenterprogresspresentation1marks(enterprogresspresentation1marks1)
                setenterprogresspresentationmarksData(enterprogresspresentation1marksArray[0]);


            }catch(error){

            }
        }
        const fetchPrivateDate = async () => {
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                },
            }
            try{
                const { data } = await axios.get("/api/staffPrivate/staffPrivate",config);
                setPrivateData(data.data);


            }catch(error){
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");

            }
        }
        fetchPrivateDate();
        fetchenterprogresspresentation1marksData()
    }, [history])
    //logout feature
    const logOutHandler = () => {
        localStorage.removeiTEM("authToken");
        history.push("/login");
    }

    const enterprogresspresentation1marksHandler = async (e) =>{
        e.preventDefault();
        const config = {
            header: {
                "Content-Type":"application/json",
            }
        }
        try{
            const {data}= await axios.post(
                "/api/staffPrivate/addprogresspresentation1marks",
                {groupID, studentIDs, studentnames, provengapmarks1, provengapmarks2, capabilitymarks1, capabilitymarks2, implementationmarks1, implementationmarks2, implementationmarks3, implementationmarks4, implementationmarks5,communicationmarks1,communicationmarks2,commercializationmarks,extrafeedback,recommendation,examiner1,examiner2, moderator,enterprogresspresentation1marks},config
            );


            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Successfully added marks!!'
              })

            history.push("/staffPrivate");
        }catch(error){
            setError(error.response.data.error);
            setTimeout(()=>{
                setError("");
            },5000)

        }

        
    }



     //********* RETRIEVE STATUS DOCUMENT 1 CONFIGURATION DETAILS  *********/
     const getRelevantProgressPresentation01MarkingConfigData =async ()=>{
     
        try{
          const{data}=await axios.get(`/api/markingRubrik/progressPresentationMarkingConfiguration/${progressPresentationMarkingDocumentID}`);
         
        // console.log(data.StatusDocumentDetails.affectedTotalContribution)
        setTotalContribution(data.ProgressPresentation01Details.affectedTotalContribution)
        setExcellentGrade(data.ProgressPresentation01Details.excellentGradeRange)
        setGoodRange(data.ProgressPresentation01Details.goodGradeRange)
        setAverageRange(data.ProgressPresentation01Details.averageGradeRange)
        setBelowAvg(data.ProgressPresentation01Details.belowAverageGradeRange)
        setl01(data.ProgressPresentation01Details.affectedL01Grade)
        setl02(data.ProgressPresentation01Details.affectedL02Grade)
        setl03(data.ProgressPresentation01Details.affectedL03Grade)
        setl04(data.ProgressPresentation01Details.affectedL04Grade)
        setl05(data.ProgressPresentation01Details.affectedL05Grade)
        
         
        console.log()
        }catch(error){
          
            
          
        }
        
  
      }
      getRelevantProgressPresentation01MarkingConfigData();


return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) : ( 

    <>
    <div id="progressback"  >
    <Header/>
    <p style={{color:"#FFF",textAlign:"right"}}>
    {privateData}  
    &nbsp;&nbsp;&nbsp;&nbsp;
   
    <button onClick={logOutHandler} id="logout">Log Out</button>
      </p>
      
      <p style={{color:"#FFF"}}>
      <br/><br/><br/><br/>
      
      </p>
    
        
      <div className="enterprogresspresentation1marksbackground">        
      <form onSubmit={enterprogresspresentation1marksHandler} className="group-screen__form_Enterprogress_marks">
  <h3 className="login-screen__title" style={{marginTop:"20px",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>CDAP -Progress Presentation 1 - Mark Sheet [Total contribution = {totalContribution}]</h3>
  {error && <span className="error-message">{error}</span>}
  <div className="form-group">
    <table className="progresstablemarks1">
        <tr>
            <td style={{padding:"5px",margin:"5px"}}>
            <label>
       <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Student ID:</b></label><br/><br/>
      <input type="text" style={{marginLeft:"150px",borderColor:"royalblue"}} 
      name="name" required
      className = "input" id="StudentIDInput"
      onChange={(e) => setstudentIDs(e.target.value)}
      value={studentIDs} />
                

            </td>
            <td>
            <label>
       <b style={{fontSize:"medium"}}>Student Name:</b></label><br/><br/>
      <input type="text" style={{marginLeft:"100px",borderColor:"royalblue"}}
      name="name" required
      pattern = "[a-zA-Z\s]{3,}"
      className = "input"
      onChange={(e) => setstudentnames(e.target.value)}
      value={studentnames} />

            </td>
        </tr>
    </table><br/>
    <label>
       <b style={{fontSize:"medium",marginLeft:"65px"}}>Group ID:</b></label><br/><br/>
      <input type="text" style={{marginLeft:"475px",borderColor:"royalblue"}}
      className = "input"
      name="name" required
      onChange={(e) => setgroupID(e.target.value)}
      value={groupID} />
      
    
    </div>
   
    <div className="form-group">
    <table className="proposalpresentationmarking" style={{width:"100%",marginLeft:"0"}}>
    <tr>
    <th className="proposalpresentationmarking">Sub Assessment Criteria </th>
    <th className="proposalpresentationmarking"> Excellent[{excellent}] </th>
    <th className="proposalpresentationmarking"> Good[{good}] </th>
    <th className="proposalpresentationmarking"> Average[{average}] </th>
    <th className="proposalpresentationmarking"> Below Average [{ belowAverage}] </th>
    <th className="proposalpresentationmarking"> Marks[out of 100] </th>
    </tr>
    </table>
    </div>
    <table className="border-none">
    <tr className="border-none">  
    {/* <div dangerouslySetInnerHTML={{__html:  }}  /> */}
      <p className="text-2xl text-center pt-3 pb-3 ">Proven gap/Creative Solution [Based on LO1] - [{lO1}%]</p>
    
    </tr>
    </table>
    <table  style={{width:"100%",marginLeft:"0"}}> 
    <tr>
    <td className="proposalpresentationmarking" >
    Problem definition (30%)
    </td>
    <td className="proposalpresentationmarking">
    The identified problem is clearly presented referring to the current implementation

    </td>
    <td className="proposalpresentationmarking">
    The identified problem is adequately presented referring to the current implementation

    </td>
    <td className="proposalpresentationmarking">
    The identified problem is marginally presented referring to the current implementation

    </td>
    <td className="proposalpresentationmarking">
    The identified problem is not clearly presented. The current implementation does not help to understand the problem.
    </td>

    <td colspan="2" className="proposalpresentationmarking">

    <input type="number" required style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderWidth:"1px",borderStyle:"solid",borderColor:"royalblue"}}
            name="name" 
            min="0" max="100"
            className = "bg-black py-2 pl-2 text-right"
        onChange={(e) => setprovengapmarks1(e.target.value)}
        value={provengapmarks1} />
        


    </td>



    </tr>

    <tr>
    <td className="proposalpresentationmarking">
    Proof of concept (70%)

    </td>
    <td className="proposalpresentationmarking">
    The current implementation clearly demonstrates proof of concept of the proposed solution

    </td>
    <td className="proposalpresentationmarking">
    The current implementation adequately demonstrates proof of concept of the proposed solution

    </td>
    <td className="proposalpresentationmarking">
    The current implementation shows some evidence of proof of concept of the proposed solution.

    </td>
    <td className="proposalpresentationmarking">
    The current implementation lacks evidence of proof of concept of the proposed solution.

    </td>

    <td colspan="2" className="proposalpresentationmarking">

    <input type="number" required style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderWidth:"1px",borderStyle:"solid",borderColor:"royalblue"}}
            name="name" 
            min="0" max="100"
            className = "bg-black py-2 pl-2 text-right"
        onChange={(e) => setprovengapmarks2(e.target.value)}
        value={provengapmarks2} />
        


    </td>

    </tr>
    </table>

    {/* <tr>
    <td className="proposalpresentationmarking">

    </td>
    </tr> */}

<table className="border-none">
    <tr className="border-none">  
    <p className="text-2xl text-center pt-3 pb-3 ">
    Capability in applying the knowledge in particular stream [Based on LO2] - [{l02}%]
    </p>
    </tr>
    </table>

    <table  style={{width:"100%",marginLeft:"0"}}>
    <tr>
    <td className="proposalpresentationmarking">
    Application of key pillars
    in the specialized area of
    knowledge
    (30%)

    </td>
    <td className="proposalpresentationmarking">
    The current implemetation clearly shows that the most appropriate research/knowledge areas have been identified and are being applied.

    </td>
    <td className="proposalpresentationmarking">
    The current implemetation adequately shows that the most appropriate research/knowledge areas have been identified and are being applied.

    </td>
    <td className="proposalpresentationmarking">
    The current implemetation shows some evidence of application of appropriate research/knowledge areas. The most appropriate research/knowledge areas are not being applied in some parts of the project.

    </td>
    <td className="proposalpresentationmarking">
    The current implemetation shows little or no evidence of application of appropriate research/knowledge areas. The most appropriate research/knowledge areas are not being applied in some parts of the project.


    </td>

    <td colspan="2" className="proposalpresentationmarking">

    <input type="number" required style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderWidth:"1px",borderStyle:"solid",borderColor:"royalblue"}}
            name="name" 
            min="0" max="100"
            className = "bg-black py-2 pl-2 text-right"
        onChange={(e) => setcapabilitymarks1(e.target.value)}
        value={capabilitymarks1} />
        


    </td>

    </tr>

    <tr>
    <td className="proposalpresentationmarking">
    Application of
    technologies in the
    relevant key pillar/area
    (70%)

    </td>
    <td className="proposalpresentationmarking">
    Technologies being applied are well presented and in-depth knowledge of technologies is demonstrated

    </td>
    <td className="proposalpresentationmarking">
    Technologies being applied are adequately presented. An acceptable knowledge of technolgies is presented.

    </td>
    <td className="proposalpresentationmarking">
    Technologies being applied are presented with missing details. Some knowledge of technologies is demonstrated.

        </td>
    <td className="proposalpresentationmarking">
    Technologies being applied are poorly presented with incomplete/missing details. Knowledge of technologies is poorly demonstrated.

    </td>

    <td colspan="2" className="proposalpresentationmarking">

    <input type="number" required style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderWidth:"1px",borderStyle:"solid",borderColor:"royalblue"}}
            name="name" 
            min="0" max="100"
            className = "bg-black py-2 pl-2 text-right"
        onChange={(e) => setcapabilitymarks2(e.target.value)}
        value={capabilitymarks2} />
      


    </td>

    </tr>
    </table>

    <table>

    <tr> <br></br>
    <div className="l0percentage"> 
        Solution Implementation [Based on LO3] - [{l03}]    
        </div><br></br><br></br>
    {/* <th  className="tableheading">Solution Implementation [Based on LO3] - [{l03}]</th> */}

    </tr>
    <tr>
    <td className="proposalpresentationmarking">
    Design Excellence (20%)

    </td>
    <td className="proposalpresentationmarking">
    Demonstrated excellent design features

    </td>
    <td className="proposalpresentationmarking">
    Demonstrated sufficient design features

    </td>
    <td className="proposalpresentationmarking">
    Demonstrated marginal/minimal design features

    </td>
    <td className="proposalpresentationmarking">
    Demonstrated poor design features

    </td>

    <td colspan="2" className="proposalpresentationmarking">

    <input type="number" required style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderWidth:"1px",borderStyle:"solid",borderColor:"royalblue"}}
            name="name" 
            min="0" max="100"
            className = "bg-black py-2 pl-2 text-right"
        onChange={(e) => setimplementationmarks1(e.target.value)}
        value={implementationmarks1} />
        


    </td>

    </tr>
    <tr>
    <td className="proposalpresentationmarking">
    Completion of prototype/product/research (30%)

    </td>
    <td className="proposalpresentationmarking">
    Work completed is satisfactory (approximately 50% where applicable) and no identifiable delay as per the project plan

    </td>
    <td className="proposalpresentationmarking">
    Work completed is acceptable. There are minor delays as per the project plan. Corrective actions have been identified and are being executed.
    </td>
    <td className="proposalpresentationmarking">
    Work completed is not not sufficient. There are some delays as per the project plan. Acceptable corrective actions have been identified.
    </td>
    <td className="proposalpresentationmarking">
    Work completed is not not sufficient. There are major delays as per the project plan. Acceptable corrective actions have not been identified.
    </td>

    <td colspan="2" className="proposalpresentationmarking">

    <input type="number" required style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderWidth:"1px",borderStyle:"solid",borderColor:"royalblue"}}
            name="name" 
            min="0" max="100"
            className = "bg-black py-2 pl-2 text-right"
        onChange={(e) => setimplementationmarks2(e.target.value)}
        value={implementationmarks2} />
        


    </td>

    </tr>
    <tr>
    <td className="proposalpresentationmarking">
    Standards/best practices (20%)

    </td>
    <td className="proposalpresentationmarking">
    Application of appropriate standards/best practices is well demonstrated and clear evidence are present

    </td>
    <td className="proposalpresentationmarking">
    Application of appropriate standards/best practices is adequately demonstrated and some evidence are present

    </td>
    <td className="proposalpresentationmarking">
    Application of some standards/best practices is demonstrated. Few evidence are present

    </td>
    <td>
    Application of standards/best practices is not demonstrated. No evidence.

    </td>

    <td colspan="2">

    <input type="number" required style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderWidth:"1px",borderStyle:"solid",borderColor:"royalblue"}}
            name="name" 
            min="0" max="100"
            className = "bg-black py-2 pl-2 text-right"
        onChange={(e) => setimplementationmarks3(e.target.value)}
        value={implementationmarks3} />
        


    </td>
    </tr>
    {/* new */}
    <tr>
    <td className="proposalpresentationmarking">
    User Requirements / Functional Requirements 20%

    </td>
    <td className="proposalpresentationmarking">
    Comprehensive and realistic user requirements and the functional requirements well described.

    </td>
    <td className="proposalpresentationmarking">
    Comprehensive and realistic user requirements and the functional requirements adequately described.

    </td>
    <td className="proposalpresentationmarking">
    Comprehensive and realistic user requirements and the functional requirements barely described.

    </td>
    <td>
    Comprehensive and realistic user requirements and the functional requirements poorly described.

    </td>

    <td colspan="2">

    <input type="number" required style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderWidth:"1px",borderStyle:"solid",borderColor:"royalblue"}}
            name="name" 
            min="0" max="100"
            className = "bg-black py-2 pl-2 text-right"
        onChange={(e) => setimplementationmarks4(e.target.value)}
        value={implementationmarks4} />
        


    </td>
    </tr>

    {/* new */}

    <tr>
    <td className="proposalpresentationmarking">
    Risk mitigation (10%)

    </td>
    <td className="proposalpresentationmarking">
    Project risks and appropriate measures have been clearly identified. Corrective actions are being executed or a comprehensive execution plan exists

    </td>
    <td className="proposalpresentationmarking">
    Project risks and appropriate measures have been adequately identified. Corrective actions are being executed or a comprehensive execution plan exists

    </td>
    <td className="proposalpresentationmarking">
    Some project risks have been identified. Acceptable corrective actions are not being executed. An acceptable plan does not exist.

    </td>
    <td>
    No clear understanding of project risks. An acceptable risk mitigation plan does not exist.

    </td>

    <td colspan="2">

    <input type="number" required style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderWidth:"1px",borderStyle:"solid",borderColor:"royalblue"}}
            name="name" 
            min="0" max="100"
            className = "bg-black py-2 pl-2 text-right"
        onChange={(e) => setimplementationmarks5(e.target.value)}
        value={implementationmarks5} />
        


    </td>
    </tr>



    {/* <tr>
    <td>

    </td>
    </tr> */}

    <tr> <br></br>
    <div className="l2percentage">
        Effective communication [Based on LO4]-[{l04}%]
    </div><br></br><br></br>
    {/* <th>
    Effective Communication [Based on LO4] - [{l04}]
    </th> */}

    </tr>
    <tr>
    <td>
    Communication skills
    (60%)

    </td>
    <td>
    Excellent structure and smooth flow of the presentation.Excellent performance at the Q&A session

    </td>
    <td>
    Well developed structure and good flow of the presentation. Good performance at the Q&A session.

    </td>
    <td>
    Fairly developed structure and the flow of the presentation. Fair performance at the Q&A session.

    </td>
    <td>
    Poorly developed structure and fragmented flow of the presentation. Poor performance at the Q&A session.

    </td>

    <td colspan="2">

    <input type="number" required style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderWidth:"1px",borderStyle:"solid",borderColor:"royalblue"}}
            name="name" 
            min="0" max="100"
            className = "bg-black py-2 pl-2 text-right"
        onChange={(e) => setcommunicationmarks1(e.target.value)}
        value={communicationmarks1} />
        


    </td>

    </tr>
    <tr>
    <td>
    Presentation skills (40%)

    </td>
    <td>
    Excellent stage presence, body language, eye contact, voice projection and clarity. Commendable use of visual aids. Excellent time management.

    </td>
    <td>
    Good stage presence and body language Use of visual aids Hardly managed the time

    </td>
    <td>
    Average stage presence with no body language Little or no use of visual aids poor time management

    </td>
    <td>
    Poor stage presence No use of visual aids Poor time management

    </td>

    <td colspan="2">

    <input type="number" required style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderWidth:"1px",borderStyle:"solid",borderColor:"royalblue"}}
            name="name" 
            min="0" max="100"
            className = "bg-black py-2 pl-2 text-right"
        onChange={(e) => setcommunicationmarks2(e.target.value)}
        value={communicationmarks2} />
        


    </td>
    </tr>


    {/* <tr>
    <td>

    </td>
    </tr> */}

    <tr> <br></br>
    <div className="l3percentage">
    Ability of commercialization / potential for entrepreneurship [Based on LO5] - [{l05}]

    </div><br></br><br></br>
    {/* <th>
    Ability of commercialization / potential for entrepreneurship [Based on LO5] - [{l05}]
    </th> */}

    </tr>
    <tr>
    <td>
    Ability of
    commercialization /
    potential for
    entrepreneurship
    100%

    </td>
    <td>
    Demonstrated sound evidence
    to prove business potential
    highlighting many achievable
    user benefits

    </td>
    <td>
    Sufficient evidence to
    prove business potential
    highlighting some
    achievable user benefits

    </td>
    <td>
    Few evidence to prove
    business potential with
    few user benefits

    </td>
    <td>
    Very few or No
    evidence to prove
    business potential
    with unachievable
    or No user
    benefits

    </td>

        <td colspan="2">

        <input type="number" required style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderWidth:"1px",borderStyle:"solid",borderColor:"royalblue"}}
            name="name" 
            min="0" max="100"
            className = "bg-black py-2 pl-2 text-right"
        onChange={(e) => setcommercializationmarks(e.target.value)}
        value={commercializationmarks} />
        


    </td>

    </tr>

        <tr style={{borderStyle:"none"}}>
            <br/>
        <label>
        <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Extra feedback:</b></label><br/><br/>
        
        <input type="text" style={{borderColor:"royalblue",marginLeft:"50px"}}
        name="name" required
        className = "proposalpresentationfeedback"
        onChange={(e) => setextrafeedback(e.target.value)}
        value={extrafeedback} />


        <label>
        <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Recommend for NBQSA (Yes/No)</b></label><br/><br/>
        
        <input type="text" style={{borderColor:"royalblue",marginLeft:"50px"}}
        name="name" required
        className = "proposalpresentationfeedback"
        onChange={(e) => setrecommendation(e.target.value)}
        value={recommendation} />


        </tr>
        </table>
        <br></br>

    
   
  

        <table  style={{width:"100%",marginLeft:"0"}}>
            <tr>
                <td style={{padding:"5px"}}>
                <label>
       <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:"medium",marginLeft:"-25px"}}>Examiner 1:</b></label><br/><br/>
      <input type="text" style={{margin:"10px",borderColor:"royalblue"}}
      name="name" required
      className = "input"
      pattern = "[a-zA-Z\s]{3,}"
      onChange={(e) => setexaminer1(e.target.value)}
      value={examiner1} />

                </td>
            <td className="tabletd1">
            <label>
       <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:"medium",marginLeft:"-25px"}}>Examiner 2:</b></label><br/><br/>
      <input type="text" style={{margin:"10px",borderColor:"royalblue"}}
      name="name" required
      className = "input"
      pattern = "[a-zA-Z\s]{3,}"
      onChange={(e) => setexaminer2(e.target.value)}
      value={examiner2} />
            </td>
    
    <td className="tabletd1">
            <label>
       <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:"medium",marginLeft:"-25px"}}>Moderator:</b></label><br/><br/>
      <input type="text" style={{margin:"10px",borderColor:"royalblue"}}
      name="name" required
      pattern = "[a-zA-Z\s]{3,}"
      className = "input"
      onChange={(e) => setmoderator(e.target.value)}
      value={moderator} />
            </td>
            </tr>
        </table>
   
              
     
             


    <button type="submit" className="btn btn-primary1" id="Log1Button" style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:"medium",marginLeft:"-25px",paddingTop:"5px"}}>
      Enter marks
    </button>

    
    </form></div>
    </div>
  
      {/* <Footer/> */}
 
    </>
    );
}
export default EnterProgressPresentation1Marks;






