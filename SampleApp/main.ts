import {AuthController,UserRegistrationDTO,/*userRepository,*/ResponseObj,UserResponseDTO, UserLogInDTO}  from 'mhpauth';


var authService = new AuthController();

// let ur:userRepository; // empty database then reattempt registration
// ur = new userRepository();
// ur.deleteAllusers();

let regResponse;

let some_email="som@mail.com";
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


//Login Object
var uld = new UserLogInDTO();
uld.email=some_email; 
uld.password=some_password;
let login1 = authService.login(uld.email,uld.password);
// let login2 = authService.login2(uld);
login1.then((regResponse)=>{
     console.log(regResponse); 
    //  console.log(ResponseObj.message); 
    authService.authenticate(regResponse.result.token).then((regResponse2)=>{ //Authenticate User
        console.log(regResponse2); 
        // console.log(regResponse2.message); 
     }).catch((error)=>{
        console.log(error);
     });
}).catch((error)=>{
        console.log(error); 
    });

