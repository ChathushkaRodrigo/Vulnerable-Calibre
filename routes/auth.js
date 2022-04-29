const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const { register,viewmarks, login,forgotpassword,resetpassword,groupregister,suggestsupervisor,group,GroupregisterConfirm} = require('../controllers/auth')

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/forgotpassword").post(forgotpassword)

router.route("/resetpassword/:resetToken").put(resetpassword)

router.route("/groupregister").post(groupregister)//Group reg route

router.route("/suggestsupervisor").get(suggestsupervisor)//suggested supervisor

router.route("/group").get(group)//to view marks

router.route("/groupconfirm/:resetToken").put(GroupregisterConfirm)

// router.route("/groupregister").get(groupregister)//Group registration
module.exports = router