const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrap = require("../utils/wrap.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller=require("../controller/user.js")


router.route("/signup")
.get(usercontroller.createuser)
.post(wrap(usercontroller.postsignup));

router.route("/login")
.get(usercontroller.loginroute)
.post(saveRedirectUrl ,passport.authenticate("local", { failureRedirect: "/login",failureFlash:true }),usercontroller.login);

// logout
router.get("/logout",usercontroller.getroute)



module.exports=router;