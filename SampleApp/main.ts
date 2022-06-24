import {AuthController,UserRegistrationDTO,userRepository,ResponseObj,UserResponseDTO, UserLogInDTO}  from 'mhpauth';


var authService = new AuthController();

let ur:userRepository; // empty database then reattempt registration
ur = new userRepository();
ur.deleteAllusers();
let regResponse;

// Registration Object
console.log("Registered User")
var urd =new UserRegistrationDTO();
urd.email="76david@mail.com";
urd.firstname="david";
urd.lastname="chalix"; 
urd.password="SomePassword123";
urd.passwordconfirm="SomePassword123";
urd.phone="123-4562";
 regResponse = authService.register(urd);//("1test@test.com","passtoHash");
regResponse.then(function(result){
    console.log("Registration successful............");  
    console.log(result.message);  
}).catch((error)=>{
    console.log(error); 
});


//Login Object
var uld = new UserLogInDTO();
uld.email=urd.email;
uld.password=urd.password;
let acressult = authService.login(uld.email,uld.password);//ac.login2(uld);
acressult.then((ResponseObj)=>{
     console.log(ResponseObj.message); 

    authService.authenticate(ResponseObj.result.token).then((t)=>{ //Authenticate User
        console.log(t.message); 
     }).catch((error)=>{
        console.log(error);
     });

}).catch((error)=>{
        console.log(error); 
    });

// Registration Object
console.log("Registered New User")
var urd2 =new UserRegistrationDTO();
urd2.email="newuserd@mail.com";
urd2.firstname="newuser";
urd2.lastname="newuser"; 
urd2.password="newuserpass";
urd2.passwordconfirm="newuserpass";
urd2.phone="111888999";
regResponse = authService.register(urd2);//("1test@test.com","passtoHash");
regResponse.then(function(result){
    console.log("Registration successful............");  
    console.log(result.message);  
}).catch((error)=>{
    console.log(error); 
});

// for(var i=1;i<=2;i++)
// {
//     console.log(`Login attempt: ${i}`); 
//     var uld = new UserLogInDTO();
//     uld.email=urd2.email;
//     uld.password=urd.password+"two fail login";
//     let acressult = authService.login(uld.email,uld.password);//ac.login2(uld);
//     acressult.then((ResponseObj)=>{
//         //console.log(ResponseObj.message); 
//         console.log("Login successful..."); 

//     }).catch((error)=>{
//         console.log("Failed Log in"); 
//             // console.log(error); 
//         });
// }