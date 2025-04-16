const Listing=require("./models/listing.js")
const Review=require("./models/review.js");
const Expreeserror=require("./utils/ExpressError.js")
const {listingSchema}=require("./schema.js");
const {reviewSchema}=require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must logged in to create a  listing");
       return res.redirect("/login")
      }
      next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if( req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl;
    }
    next();
}

module.exports.isowner= async(req,res,next)=>{
    let { id } = req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","you don't have permission to edit/delete");
      return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
   if(error){
    let errMSG=error.details.map((el)=>el.message).join(",");
    throw new Expreeserror(400,errMSG);
   }else{
    next();
   }

  }

 module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
   if(error){
    let errMSG=error.details.map((el)=>el.message).join(",");
    throw new Expreeserror(400,errMSG);
   }else{
    next();
   }
  };

  module.exports.isReviewAuthor= async(req,res,next)=>{
    let {id, reviewId } = req.params;
    let review= await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error","you are not the author of this review");
      return res.redirect(`/listings/${id}`);
    }
    next();
}

