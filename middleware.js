const { listingSchema } = require("./Schema");

//function - validation for schema with JOI
module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");//if additional details comes it will seprated by comma then print
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}; 