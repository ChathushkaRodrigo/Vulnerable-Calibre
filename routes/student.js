const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()


const {viewfeedback,viewmarks, viewAvailableGroups, StudentTopicInterestingForm,userprofilemanagement,edituserprofile,viewimage,status,retrieveData,retrieveImages,exploitCyber,blacklistPrevention,whiteListPrevention} = require('../controllers/student')




router.route("/viewfeedback").get(viewfeedback)//to view feedback

router.route("/viewmarks").get(viewmarks)//to view marks

router.route("/studenttopicinterestingform").post(StudentTopicInterestingForm)//student topic interestings

router.route("/userprofilemanagement").get(userprofilemanagement)//student profile

router.route("/edituserprofile").put(edituserprofile)//student - edit profile feature


// router.route("/viewimage").get(viewimage)

router.route("/status").get(status)


router.route("/retrieveData").get(retrieveData)

router.route("/retrieveImages").get(retrieveImages)

router.route("/vulnerable").get(exploitCyber)

router.route("/vulnerable").get(blacklistPrevention)

router.route("/vulnerableWhiteList").get(whiteListPrevention)

module.exports = router