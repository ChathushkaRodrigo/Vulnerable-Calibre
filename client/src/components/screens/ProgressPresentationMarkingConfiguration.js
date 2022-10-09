                    import React from 'react'
                    import "./ProposalMarkingConfiguration.css";
                    import Header from "../Header/Header";
                    import Footer from "../Footer/Footer";
                    import {useParams} from 'react-router-dom';
                    import { useState } from "react";
                    import axios from 'axios';
                    import Swal from 'sweetalert2'

                    export default function ProgressPresentationMarkingConfiguration() {

                        const Swal = require('sweetalert2');
                        const [totalContribution ,setTotalContribution] = useState("");
                        const [excellent,setExcellent] = useState("");
                        const [good,setGood] = useState("");
                        const [average,setAverage] = useState("");
                        const [belowAverage,setBelowAverage] = useState("");
                        const [l01,setl01] = useState("");
                        const [l02,setl02] = useState("");
                        const [l03,setl03] = useState("");
                        const [l04,setl04] = useState("");
                        const [l05,setl05] = useState("");

                        
                        
                        const progressPresentationMarkingID = "62bff056d30adeec12925a07";
                        
                        //************* UPDATE PROPOSAL MARKING RUBRIK HANDLER  **********/ 
                        const progressPresentationMarkingHandler = async (e) => {
                            e.preventDefault();
                            try{
                                Swal.fire({
                                    title:'Do you want to save the changes?',
                                    showDenyButton:true,
                                    showCancelButton:true,
                                    confirmButtonText:'Save',
                                    denyButtonText:`Don't save`,
                                }).then((result) => {
                                    if(result.isConfirmed){
                                        Swal.fire('Saved!','','success')
                                        const { data } = axios.put(
                                            `/api/markingRubrik/progressPresentationMarkingConfiguration/update/${progressPresentationMarkingID}`,
                                            { totalContribution,excellent,good,average,belowAverage,l01,l02,l03,l04,l05 }
                                            );

                                    }else if(result.isDenied){
                                        Swal.fire('Changes are saved','','info')

                                    }
                                })
                            }catch(error){
                                alert('Error update not set')
                            }
                            
                        };


                    return (


                        <div id="back">
                            <Header/>
                            <br/>
                            <h1 className='heading-prop'> Progress Presentation 01 Grading</h1>
                                {/* Develop the form to take admin inputs for proposal Configurations field by field */}<br/> <br/>
                                <p className='proposalText'>Enter changes to the relevant field, <br/>if the required data to input is not available enter <b> N/A </b>for the respective fields </p>
                                <form className='proposalUpdateForm' onSubmit={progressPresentationMarkingHandler} >
                                <center>
                                <input type="number" placeholder="Total Contribution % "     onChange={(e) => setTotalContribution(e.target.value)} value={totalContribution}/>
                                <input type="number" placeholder="Excellent Grade Range"     onChange={(e) => setExcellent(e.target.value)}value={excellent}/>
                                <input type="number" placeholder="Good Grade Range"          onChange={(e) => setGood(e.target.value)}value={good}/>
                                <input type="number" placeholder="Average Grade Range"       onChange={(e) => setAverage(e.target.value)}value={average}/>
                                <input type="number" placeholder="Below Average Grade Range" onChange={(e) => setBelowAverage(e.target.value)}value={belowAverage} />
                                <input type="number" placeholder="L01 Affected Precentage %" onChange={(e) => setl01(e.target.value)}value={l01}/>
                                <input type="number" placeholder="L02 Affected Precentage %" onChange={(e) => setl02(e.target.value)}value={l02} />
                                <input type="number" placeholder="L03 Affected Precentage %" onChange={(e) => setl03(e.target.value)}value={l03}/>
                                <input type="number" placeholder="L04 Affected Precentage %" onChange={(e) => setl04(e.target.value)}value={l04}/>
                                <input type="number" placeholder="L05 Affected Precentage %" onChange={(e) => setl05(e.target.value)}value={l05}/>
                                </center>
                                <center>
                                <input type="submit" value="Update" />
                                </center>
                                </form>
                            <Footer/>
                        </div>
                    )
                    }
