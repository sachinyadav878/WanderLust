const Listing=require("../models/listing")

module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }

  module.exports.createNewListing= (req, res) => {
    res.render("listings/new.ejs");
   }

   module.exports.showListing= async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
    if(!listing){
      req.flash("error","Listing you requested for does not exist!")
      res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  }

  module.exports.createNewForm=async (req, res,next) => {
    let url=req.file.path;
    let filename=req.file.filename;  
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New listing Created"); 
    res.redirect("/listings");
}

module.exports.editlisting= async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested for does not exist!")
      res.redirect("/listings");
    }
    let originalImage=listing.image.url;
   originalImage= originalImage.replace("/upload","/upload/h_100,w_100")
    res.render("listings/edit.ejs", { listing,originalImage});
  }

  module.exports.update=async (req, res) => {
    let { id } = req.params;
      let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });
      if( typeof req.file !=="undefined"){
      let url=req.file.path;
      let filename=req.file.filename;
      listing.image={url,filename};
      await listing.save();
      }
    req.flash("success"," listing Updated!");
    res.redirect(`/listings/${id}`);
  }

  module.exports.delete=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," listing Deleted!");
    res.redirect("/listings");
  }