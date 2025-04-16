const express=require("express");
const router=express.Router({mergeParams:true});
const wrap=require("../utils/wrap.js")
const Expreeserror=require("../utils/ExpressError.js")
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js")


const reviewcontroller=require("../controller/review.js")

   // review post Route

   router.post("/", isLoggedIn,validateReview,wrap(reviewcontroller.postroute));

  // review Delete route

  router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrap(reviewcontroller.deletereview));

module.exports=router;