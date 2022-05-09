// const User = require('../models/User')
const AvailableProject = require('../models/AvailableProject')
// const topicReg = require('../models/AvailableProject')


//To view Available Projects
exports.viewAvailableProjects =async(req,res,next) => {

// console.log("Hello Project!")


try{

    const availableProjects = await AvailableProject.find()//group that is approved and have this perticular member
    console.log(availableProjects[1])// 

    res.status(201).json({
        success: true,
        data: availableProjects
    })
    

    

}catch(error){
    res.status(500).json({success:false, error:error.message})
}

};

//To view a specific project
exports.viewspecificproject = async(req,res,next) => {
    
    try{
        const availableprojectid = req.params.id;
        const availableProjects = await AvailableProject.findById(availableprojectid)//group that is approved and have this perticular member
        console.log("Projects",availableProjects)// 
    
        res.status(201).json({
            success: true,
            data: res.AvailableProject
        })
    
        
    
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}

//final increase count
exports.increasebidcount = async(req,res,next) => {
    try{
        const availableprojectid = req.body;
        const projectcount = await AvailableProject.findById(availableprojectid)
        console.log(projectcount);
        projectcount.projectBiddingCount = projectcount.projectBiddingCount + 1; 
        await projectcount.save();
        
        

    }catch(error){
        res.status(500).json({success:false, error:error.message})

    }
}


