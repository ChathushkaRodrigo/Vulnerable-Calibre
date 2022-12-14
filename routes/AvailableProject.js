const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()



const {viewAvailableProjects,viewspecificproject,increasebidcount,placeBidonAvailableProject,StudentBidding,updateProjectDetails,deleteProjectDetails,createProjectDetails,ViewStaffBiddings,getGroupDetails,approveBidding,rejectBidding} = require('../controllers/AvailableProject')




router.route("/availableProjects").get(viewAvailableProjects) //router for View Available Projects
router.route("/availableProjects/:id").get(viewspecificproject)  //router for viewing specific project
router.route("/availableProjects/placeBidding/:id").put(placeBidonAvailableProject) //place bidding router

router.route("/bid").post(StudentBidding) //router for create bid



router.route("/increasebidcount").post(increasebidcount)

//edit existing available project details
router.route("/updateProjectDetails/:id").put(updateProjectDetails)
//delete existing available project details
router.route("/deleteProjectDetails/:id").delete(deleteProjectDetails)
//add new available project details
router.route("/addProjectDetails").post(createProjectDetails)
//retreive supervisors biddings
router.route("/ViewStaffBiddings").get(ViewStaffBiddings)
//retreive group details
router.route("/getGroupDetails/:id").get(getGroupDetails)
//retreive Bidding
router.route("/approveBidding/:id").get(approveBidding)
//reject Bidding
router.route("/rejectBidding/:id").get(rejectBidding)

module.exports = router
