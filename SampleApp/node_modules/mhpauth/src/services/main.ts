import {AuthController}  from './index'
import {UserRegistrationDTO,UserLogInDTO} from './DTOS/APIDTO';

var authService = new AuthController();

// let ur:userRepository; // empty database then reattempt registration
// ur = new userRepository();
// ur.deleteAllusers();

let regResponse;

let some_email="UvFrDxr@mail.com";
let some_password="SomePassword123";
let some_firstname="sfname";
let some_lastname="slname";
let some_phone="s-777-8864";
 
// Registration Object
console.log("Registered User")
var urd =new UserRegistrationDTO();
urd.email=some_email;
urd.firstname=some_firstname;
urd.lastname=some_lastname; 
urd.password=some_password;
urd.passwordconfirm=some_password;
urd.phone=some_phone;
regResponse = authService.register(urd);
regResponse.then(function(regResponse){
    console.log(regResponse);  
}).catch((error)=>{
    console.log(error); 
});

//here we reset password using the same password,                                                                                 
//feel free to experiment by changing password value to new password, below nested login should fail along with authenticate
var passwordResetresponse =  authService.passwordReset(some_email,some_password);
 
passwordResetresponse.then(function(passwordResetResults)
{
    console.log(passwordResetResults);  
        //Login Object
        var uld = new UserLogInDTO();
        uld.email=some_email; 
        uld.password=some_password;
        let login1 = authService.login(uld.email,uld.password);// Login attempt here
        // let login2 = authService.login2(uld);
        login1.then((login1results)=>{
            console.log(login1results); 
            //  console.log(login1results.message); 
            authService.authenticate(login1results.result.token).then((authenticateresults)=>{ //Authentication of the User that successfuly logged in
                console.log(authenticateresults); 
                // console.log(authenticateresults.message); 
            }).catch((error)=>{
                console.log(error);
            });
        }).catch((error)=>{
                console.log(error); 
            });
}).catch((error)=>{
    console.log(error); 
});



