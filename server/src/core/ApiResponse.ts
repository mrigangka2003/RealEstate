class ApiResponse{
    statuscode:number ;
    data :any ;
    message :string ;
    success:boolean ;

    constructor(statuscode:number , data:any , message:string , success :boolean){
        this.statuscode = statuscode ;
        this.data = data ;
        this.message = message ;
        this.success = statuscode<400
    }
}

export {ApiResponse} ;