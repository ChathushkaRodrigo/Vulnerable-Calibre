const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const Group = require('../models/Group')
const jwt = require("jsonwebtoken");
const { Console } = require('console')
const StudentTopicInterestingForm = require('../models/StudentTopicInteresting')
const SubmissionPage = require('../models/SubmissionPage')
const StudentIdImage = require('../models/StudentIdImage')
const imgModel = require('../models/ImageUpload');
const axios = require('axios')

const { decode } = require('jsonwebtoken');

//To view feedback
exports.viewfeedback =async(req,res,next) => {


    let token//to retreive username in backend

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }

    if(token =="null"){
        logged(token,res)
    }
    else{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)


    const user = await User.findById(decoded.id)
    console.log(user.feedback)
    // const{email}=req.body;
    
    try{
        res.status(201).json({
            success: true,
            data: user.feedback
        })
    }catch(error){
        next(error)
    }
}
};


// old view marks method

exports.viewmarks =async(req,res,next) => {
    //const{email}=req.body;
    
    let token//to retreive username in backend
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }

    if(token == "null"){
        logged(token,res)
    }
    else{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        
        const user = await User.findById(decoded.id)
   

        try{
     /*   const studentmarks = await User.findOne({
         email
         
        })*/
        // const marks = studentmarks.marks
        // console.log(marks)
        res.status(201).json({
            success: true,
            data: user.marks
        })
        
    }catch(error){
        next(error)
    }
}
};

//Student topic interesting
exports.StudentTopicInterestingForm = async(req,res,next) => { //Student Recommendation Form
    console.log("Student recommendation api run")
    const {s_ID,Q1,Q2,Q3,Q4,Q5,Q6,Q7} = req.body
    let token = s_ID;
    //console.log(student_ID)
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }
     const decoded = jwt.verify(token,process.env.JWT_SECRET)
     const user = await User.findById(decoded.id)
    //  console.log(user._id)
     const student_ID = user._id;
    try{
        const user = await StudentTopicInterestingForm.create({
            student_ID,Q1,Q2,Q3,Q4,Q5,Q6,Q7
            
        })
        console.log("Student recommendation success")
        // sendToken(user, 201, res)
    }catch(error){
        next(error)
        console.log("Student recommendation error")
    }
};

//user profile management

exports.userprofilemanagement =async(req,res,next) => {


    let token//to retreive username in backend

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }

    if(token =="null"){
        logged(token,res)
    }
    else{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)


    const user = await User.findById(decoded.id)
    // console.log(user.feedback)
    // const{email}=req.body;
    
    try{
        res.status(201).json({
            success: true,
            data: user
        })
    }catch(error){
        next(error)
    }
}
};

exports.edituserprofile = async(req,res,next) => {
    try{
        const{personalAddress,phoneNumber}=req.body;

        let token//to retreive username in backend

    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }
    console.log(req.headers.authorization);
    if(token =="null"){
        logged(token,res)
    }
    else{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)


    const user = await User.findById(decoded.id)
    user.address = personalAddress;
    user.phoneNumber = phoneNumber;
    await user.save();

    res.status(201).json({
        success: true
    })
        
        
    }
    }catch(error){
        res.status(500).json({success:false, error:error.message})

    }
}

exports.status =async(req,res,next) => {


    let token//to retreive username in backend

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }

    if(token =="null"){
        logged(token,res)
    }
    else{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)


    const user = await User.findById(decoded.id)
//use the batchID to retreive data with the batchID
    const batch = await SubmissionPage.find(user.batchID)
    console.log(batch)
    try{
        res.status(201).json({
            success: true,
            data: batch
        })
    }catch(error){
        next(error)
    }
}
};


exports.retrieveData =async(req,res,next) => {


    let token//to retreive username in backend

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }

    if(token =="null"){
        logged(token,res)
    }
    else{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)


    const user = await User.findById(decoded.id)
    // console.log(user.feedback)
    // const{email}=req.body;
    
    try{
        res.status(201).json({
            success: true,
            data: user
        })
    }catch(error){
        next(error)
    }
}
};

exports.retrieveImages =async(req,res,next) => {

try{
    let token//to retreive username in backend

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)


    imgModel.find({ID:decoded.id}, (err, items) => {
        if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
        }
        else {

        // console.log(items[0]+"hello")
        let image = {img:{data:{data:""}}}
        const images = items.map(item => {
            if(item.ID==decoded.id){
                image = item
            }else{
                image = {img:{data:{data:""}}}
            }
        })
        console.log(decoded.id)
  
        res.status(201).json({
            success: true,
            data: image
        })
        }
      });

    
    }catch(error){
        console.log(error)
    }
};

exports.exploitCyber =async(req,res,next) => {

    try{
        // let token//to retreive username in backend
    
        const vulURL = req.query.vulURL;
        const request = await axios.get(vulURL);
        // user.updateProfileImage(imageReq.data);

        //create a studentIdimage object and save to database
        
        const image = await StudentIdImage.create({
            link : vulURL,
            Studentid : "123456"
        })


        console.log(image)
        console.log(request)
        res.send(request.data);
        }catch(error){
            console.log(error)
        }
    };


    exports.blacklistPrevention =async(req,res,next) => {
        try{
    
            var validator = require('validator');
     
            var fullUrl = req.query.vulURL
            var ans = validator.isURL(fullUrl, { require_valid_protocol: false });
          
    
            if(ans == true){
                var vulnerableDomain = ["localhost" , "torrent", "opera" ]
                var  iURL = req.query.vulURL
                  
            //checking the subsets
            const  intersection = vulnerableDomain.filter(element => iURL.includes(element));
            // res.send(intersection)
                
                if (intersection.length != 0){
                    const message = "blocked url"
                    res.send(message);
                }
    
                else{
                res.send("authorized url")
                }
    
            }else
                res.send("not IPv4 or IPv6 url")
    
    
         
    
        }catch(error){
            console.log(error)
        }
     
        };
    
    
    
    exports.whiteListPrevention =async(req,res,next) => {
    
        try{
            //validator
            var validator = require('validator');
     
            var fullUrl = req.query.vulURL
            var ans = validator.isURL(fullUrl, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_port: false, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false, allow_fragments: true, allow_query_components: true, disallow_auth: false, validate_length: true });
          
    
            if(ans == true){
                var trustableDomain = ["google" , "gmail", "facebook" ]
                var  iURL = req.query.vulURL
                  
            //checking the subsets
            const  intersection = trustableDomain.filter(element => iURL.includes(element));
                
                if (intersection.length != 0){
                    const message = "authorized url"
                    res.send(message);
                }
    
                else{
                res.send("query has unauthorized url")
                }
    
            }else
                res.send("not IPv4 or IPv6 url")
    
    
            }catch(error){
                console.log(error)
            }
    
        };
    


const logged = (token,res) => {//check if token is null
    if(token == "null"){
        console.log("You are not logged in")
        res.status(500).json({success:false})
    }
}



//invalid urt http://127.1
//modified DNS vap.me:5000
