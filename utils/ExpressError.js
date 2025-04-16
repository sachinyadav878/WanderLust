class Expreeserror extends Error{
    constructor(status,message){
        super();
        this.statusCode=statusCode;
        this.message=message;
    }
}

module.exports=Expreeserror;