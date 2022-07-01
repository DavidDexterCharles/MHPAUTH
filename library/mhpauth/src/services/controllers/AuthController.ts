const repos = require('../repositories/index');
const db = require('../../../../mhpauthDB/models/index');//('../models/index');
const jwt = require("jsonwebtoken"); 
const util = require('util');
const jwtVerifyAsync = util.promisify(jwt.verify);
const bcrypt = require('bcryptjs');
import * as moment from 'moment';
require('dotenv').config();
import {ResponseObj,successResponse,failureResponse,UserResponseDTO,UserRegistrationDTO,UserLogInDTO,isValidDTO} from '../DTOS/APIDTO';

export class AuthController  {
    public a:any;
    constructor(atime:number=20){
        this.a=atime;
    }
    public async login(username:string, password:string):Promise<ResponseObj>// to match with official interface, recommend use for login2 however
    {
        try 
        {
            var accountDetails = new UserLogInDTO();
            accountDetails.email=username;
            accountDetails.password=password;
            return await this.login2(accountDetails);
        } 
        catch (error)
        {
            throw error;     
        }
    }

    //If your login request is via a user 
    // supplying a username and password then a POST 
    // is preferable, as details will be sent in 
    // the HTTP messages body rather than the URL
    //UserLogInDTO is used to suggest POST request usage rather than GET request
    public async login2(accountDetails:UserLogInDTO):Promise<ResponseObj>{
        
        const validation = (await isValidDTO(UserLogInDTO));// check if dto object is valid and matches specifications
        if(validation.hasErrors)
        {
            // console.log(validation.errors); 
            throw failureResponse(validation.errors[0],"dto violation- one or more fields did not pass validation");
        }
        try {
            var s = new repos.userRepository();
            // console.log(accountDetails.email +"-================================================");
            const result =await s.getuserByEmail(accountDetails.email);//(username);
            // console.log(result);
            if(!result){
                throw  new Error("Login Failed Invalid Username or Password");// intentionally Not letting user no whether the user exists or not to deter exploits
            }
            // at each login attempt, need to check if accessfailedcount is >=  3 and if lockoutend have elapsed 
            //if lockoutend elapsed then set accessfailedcount to 0 and lockoutend to null
            // otherwise reject login access


            const {id,email, firstname,lastname,phone,emailconfirmed,accessfailedcount,lockoutend,password}=result.toJSON();

            var urdto = new UserResponseDTO();
            urdto.firstname = firstname;
            urdto.lastname=lastname;
            urdto.email=email;
            urdto.phone=phone;
            urdto.emailconfirmed=emailconfirmed;
            urdto.accessfailedcount=accessfailedcount;
            urdto.lockoutend=lockoutend;
            urdto.id = id;

            if(!await this.lockoutCompleted(urdto))
            {
                throw  new Error(`Account Locked for 20 minutes and will be reavailable after ${lockoutend}`);
            }
            const passMatch = await bcrypt.compare(accountDetails.password, password);
            if (!passMatch) {
                var u = await this.incrementFailedAccess(urdto);
                urdto=u;
                if (u.accessfailedcount>=3)
                    throw  new Error(`Account Locked for 20 minutes and will be reavailable after ${lockoutend}`);
                else
                    throw  new Error( "Incorrect password");
            }
            else{
                if(accessfailedcount>0)
                {
                    var s = new repos.userRepository();
                    urdto.accessfailedcount = 0;
                    urdto.lockoutend=null;
                    var user = db.user.build(urdto).toJSON();
                    const rofupdate = await s.updateuser(user,user.id);
                }
            }
            //secretkey generated by running the following command in node "crypto.randomBytes(64).toString("hex");"
            var secretkey = process.env.SECRET_KEY;//key stored in .env not included on git commits accessed using require('dotenv').config();
            var token = await jwt.sign({UserResponseDTO:{email,firstname,lastname,id}}, secretkey,{expiresIn: '1h'});
            urdto.token=token;
            return  successResponse(urdto,"User Logged In Sucessfully");
        } 
        catch (err)
        {
            // console.log( err);
            // throw err;
            throw failureResponse(err,err.message);
        }
    }

    private async lockoutCompleted(urdto:UserResponseDTO):Promise<boolean>
    {
        if(urdto.accessfailedcount>=3)
        {
            var beginningTime = moment(urdto.lockoutend);
            var endTime = moment().toDate();//now
            if(beginningTime.isBefore(endTime))// then time for lockoutend has elapsed and the user should regain access
            {
                var s = new repos.userRepository();
                urdto.accessfailedcount = 0;
                urdto.lockoutend=null;
                var user = db.user.build(urdto).toJSON();
                const result = await s.updateuser(user,user.id);
                return true;
            }
            else{
                return false;
            }
        }
        else
        {
            return true;
        }
    }
    private async incrementFailedAccess(urdto:UserResponseDTO):Promise<UserResponseDTO>
    {
        var s = new repos.userRepository();
        urdto.accessfailedcount = urdto.accessfailedcount+1;
        if(urdto.accessfailedcount>=3){
            var current_timestamp = moment().toDate();
            urdto.lockoutend = moment(current_timestamp).add(this.a, 'm').toDate();
        }
        var user = db.user.build(urdto).toJSON();
        const result = await s.updateuser(user,user.id);
        return urdto;
    }

    //made password optional parameter , however if it is passed in it will 
    //overwrite the ppassword and password confirm fields in accountDetails
    public async register(accountDetails:UserRegistrationDTO,password:string=""):Promise<ResponseObj> 
    {
        if(password)
        {
            accountDetails.password=password;
            accountDetails.passwordconfirm=password;
        }
        // accountDetails.password="hidt";//hash and confirm password before validating
        const validation = (await isValidDTO(accountDetails));// check if dto object is valid and matches specifications
        if(validation.hasErrors)
        {
            // console.log(validation.errors); 
            // accountDetails.password=accountDetails.password.replace(/\w/gi  , '-');//replace entered password with dashes for privacy reasons
            // accountDetails.passwordconfirm=accountDetails.passwordconfirm.replace(/\w/gi  , '-');//replace entered password with dashes for privacy reasons
            throw failureResponse(validation.errors[0],"dto violation- one or more fields did not pass validation please see (errors) for details");
        }
        if(!(accountDetails.password===accountDetails.passwordconfirm))
        {
            // accountDetails.password=accountDetails.password.replace(/\w/gi  , '-');//replace entered password with dashes for privacy reasons
            // accountDetails.passwordconfirm=accountDetails.passwordconfirm.replace(/\w/gi  , '-');//replace entered password with dashes for privacy reasons
            throw  failureResponse(accountDetails,'Registration Failed "Password was different from Confirmation Password" ');
        }
        try 
        {
            // accountDetails.password=await bcrypt.hash(accountDetails.password, 12);
            var s = new repos.userRepository();

            var existinguser =await s.getuserByEmail(accountDetails.email);
            if(existinguser){
                throw  new Error("Registration Failed The E-mail is already in use");
            }
            accountDetails.password=await bcrypt.hash(accountDetails.password, 12);
            accountDetails.createdat=moment().toDate();
            var user = db.user.build(accountDetails).toJSON();
            // console.log(user); ///* const {email, firstname,lastname,password}=accountDetails;user.email=email;*/
            // console.log(accountDetails);  
            var result = await s.adduser(user);
            
            const {id,email, firstname,lastname,phone,emailconfirmed,accessfailedcount}=result.toJSON();
            var urdto = new UserResponseDTO();
            urdto.firstname = firstname;
            urdto.lastname=lastname;
            urdto.email=email;
            urdto.phone=phone;
            urdto.emailconfirmed=emailconfirmed;
            urdto.accessfailedcount=accessfailedcount;
            urdto.id = id;

            return successResponse(urdto,"Registration Completed Sucessfully");
        } catch (err) {
            // console.log(err);
            // return err;
            throw failureResponse(err,err.message);
            // throw err;
        }
    }
    public async passwordReset(username:string, password:string):Promise<ResponseObj> 
    {
        try 
        {
            var urdto = new UserResponseDTO();
            var s = new repos.userRepository();
            var existinguser =await s.getuserByEmail(username);
            if(existinguser)
            {
                const {id,email, firstname,lastname,phone,emailconfirmed,accessfailedcount}=existinguser.toJSON();
                //UserResponseDTO
                urdto.firstname = firstname;
                urdto.lastname=lastname;
                urdto.email=email;
                urdto.phone=phone;
                urdto.emailconfirmed=emailconfirmed;
                urdto.accessfailedcount=accessfailedcount;
                urdto.id = id;

                var uregdto = new UserRegistrationDTO();
                uregdto.password = password;
                const validation = (await isValidDTO(uregdto,true));
                if(validation.hasErrors)
                {
                    throw failureResponse(validation.errors[0],"Password does not satisfy requirements");
                }
                uregdto.password=await bcrypt.hash(password, 12);
                existinguser.password = await bcrypt.hash(password, 12);
                existinguser.save();//fixed the save
                // var user = db.user.build(uregdto).toJSON();
                // await s.updateuser(user,id);
                // console.log(uregdto);
                return successResponse(urdto,"PasswordReset Completed Sucessfully");
            }
            else{
                throw  failureResponse(username,"User does not exist");
            }
        } 
        catch (error) {
            throw error;
        }
    }
    public async authenticate(token: string,pulldetails:boolean=false) :Promise<ResponseObj>
    {
        try {
            var secretkey = process.env.SECRET_KEY;//key stored in .env not included on git commits accessed using require('dotenv').config();
            var authData = await jwtVerifyAsync(token, secretkey);
            var urdto = new UserResponseDTO();
            // console.log(authData.UserResponseDTO.email);

            // if pulldetails iss true then return all allowable details about the user, essentially user profile
            //may want to query database also in the event user no llonger active... not implented
            if(pulldetails){
                var s = new repos.userRepository();
                var existinguser =await s.getuserByEmail(authData.UserResponseDTO.email);
                if(existinguser)
                {
                    const {id,email, firstname,lastname,phone,emailconfirmed,accessfailedcount}=existinguser.toJSON();
                    urdto.firstname = firstname;
                    urdto.lastname=lastname;
                    urdto.email=email;
                    urdto.phone=phone;
                    urdto.emailconfirmed=emailconfirmed;
                    urdto.accessfailedcount=accessfailedcount;
                    urdto.id = id;
                    return successResponse(urdto,"User Authenticated Sucessfully");
                }
            }
            else{
                const {id,email, firstname,lastname}=authData.UserResponseDTO;
                urdto.firstname = firstname;
                urdto.lastname=lastname;
                urdto.email=email;
                urdto.id=id;
            }
            
            return successResponse(urdto,"User Authenticated Sucessfully");
        } catch (err) {
            throw  failureResponse(err,'Invalid User');
        }
    }
}