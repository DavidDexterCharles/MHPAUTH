import {Person,AuthController}  from './index'
import {UserRegistrationDTO,UserLogInDTO} from './DTOS/APIDTO';

 //var p= new Person("David","Charles");
//console.log(p.getFullName());
// console.log(p.getFirstName());
// console.log("Apples");//


var ac = new AuthController();

// Registration Object
var urd =new UserRegistrationDTO();
urd.email="768david@mail.com";
urd.firstname="david";
urd.lastname="chalix"; 
urd.password="SomePassword123";
urd.passwordconfirm="SomePassword123";
urd.phone="123-4562";
let regResponse = ac.register(urd);//("1test@test.com","passtoHash");
// console.log(typeof regResponse); 
regResponse.then(function(result){
    console.log(result);  
}).catch((error)=>{
    console.log(error); 
});


// // //Login Object
var uld = new UserLogInDTO();
uld.email="768david@mail.com";//"test@test.com";
uld.password="SomePassword123"//;"passtoHash";
let acressult = ac.login(uld.email,uld.password);//ac.login2(uld);
// console.log(typeof acressult); 
acressult.then((ResponseObj)=>{
    //  console.log(ResponseObj); 
    //  console.log(ResponseObj.results.token); 
     ac.authenticate(ResponseObj.result.token).then((t)=>{
        console.log(t); 
     }).catch((error)=>{
        console.log(error);
     });
}).catch((error)=>{
        console.log(error); 
    });



// console.log(ac.printLowerCase("FISH"));
// console.log(require.main.filename);