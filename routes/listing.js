const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrap = require("../utils/wrap.js")
const { isLoggedIn, isowner, validateListing } = require("../middleware.js")
const listingcontroller = require("../controller/listing.js")
const multer  = require('multer')
const {storage}=require("../cloudconfig.js")
const upload = multer({ storage })

router
  .route("/")
  .get(wrap(listingcontroller.index))
  .post(isLoggedIn,upload.single("listing[image]"), validateListing, wrap(listingcontroller.createNewForm));

//   new route 
router.get("/new", isLoggedIn, listingcontroller.createNewListing);

router.route("/:id")
  .get(wrap(listingcontroller.showListing))
  .put(isLoggedIn, isowner,upload.single("listing[image]"), validateListing, wrap(listingcontroller.update))
  .delete(isLoggedIn, isowner, wrap(listingcontroller.delete));


// edit route
router.get("/:id/edit", isLoggedIn, isowner, wrap(listingcontroller.editlisting));


module.exports = router;