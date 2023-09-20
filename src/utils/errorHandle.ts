export class AppError extends Error {
    errorCode: any;
    statusCode: any;
    constructor(mssg: any, statusCode:any){
        super(mssg)
        this.statusCode=statusCode
    }
}