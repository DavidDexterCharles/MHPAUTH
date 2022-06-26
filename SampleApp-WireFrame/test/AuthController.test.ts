// import {AuthController,UserRegistrationDTO,userRepository,ResponseObj,UserResponseDTO, UserLogInDTO}  from 'mhpauth';
// import {AuthController, ResponseObj, UserLogInDTO, UserRegistrationDTO, UserResponseDTO}  from '../src/services/index'

import { UserResponseDTO, AuthController, ResponseObj, UserRegistrationDTO, UserLogInDTO } from "mhpauth";


let ur:any;//userRepository
let curr_useremail= `${makeid(6)}@mail.com`;
let some_password="SomePassword123";//"SomePassword123"
let some_firstname="sfname";
let some_lastname="slname";
let some_phone="s-777-8864";
  // beforeAll(async () => { // clean user table before run 
  //   ur = new userRepository();
  //   await ur.deleteAllusers();
  //   });

  // afterAll(async () => {   // clean user table after run 
  //   ur = new userRepository();
  //   await ur.deleteAllusers();
  // });
  function makeid(length:number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
   }
   return result;
}

describe('AuthController Functionality', () => {
  let shared_user:UserResponseDTO;
  describe('Test Registration', () => {
    it('should register new user', async () => 
    {
      expect.assertions(3);
      let ac:AuthController;//AuthController
      let regResponse:ResponseObj;
      let urd:UserRegistrationDTO;//UserRegistrationDTO
      ac = new AuthController();
      urd =new UserRegistrationDTO();
      urd.email=curr_useremail;//"user1@mail.com";
      urd.firstname=some_firstname;
      urd.lastname=some_lastname; 
      urd.password=some_password;
      urd.passwordconfirm=some_password;
      urd.phone=some_phone;
      regResponse = await ac.register(urd); 
      expect(regResponse).toBeInstanceOf(ResponseObj);
      expect(regResponse.IsSuccess).toBe(true);
      expect(regResponse.result).toBeInstanceOf(UserResponseDTO);
      shared_user=regResponse.result.UserResponseDTO;
      console.log(regResponse);
    });
    
  });
  describe('Test Login', () => {
    it('should login new user', async () => 
    {
      expect.assertions(2);
      let ac:AuthController;//AuthController
      let regResponse:ResponseObj;
      let urd:UserRegistrationDTO;//UserRegistrationDTO

      ac = new AuthController();
      var uld = new UserLogInDTO();
      uld.email=curr_useremail;//"user1@mail.com";//urd.email;
      uld.password=some_password;//urd.password;
      regResponse = await ac.login(uld.email,uld.password);
      expect(regResponse).toBeInstanceOf(ResponseObj);
      expect(regResponse.result).toBeInstanceOf(UserResponseDTO);//UserResponseDTO implies sucess response
      shared_user = regResponse.result;
      console.log(regResponse);
    });
  });
  describe('Test Authenticate', () => {
    it('should authenticate returning user', async () => 
    {
      expect.assertions(3);
      let ac:AuthController;//AuthController
      let regResponse:ResponseObj;
      ac = new AuthController();

      regResponse = await ac.authenticate(shared_user.token);
      expect(regResponse).toBeInstanceOf(ResponseObj);
      expect(regResponse.IsSuccess).toBe(true);
      expect(regResponse.result).toBeInstanceOf(UserResponseDTO);;
      console.log(regResponse);
    });
  });
  describe('Test Password  Reset', () => {
    let thenewpassword="thenewpassword";
    
    it('should reset a users password', async () => 
    {
      expect.assertions(3);
      let ac:AuthController;//AuthController
      let regResponse:ResponseObj;
      ac = new AuthController();

      regResponse = await ac.passwordReset(curr_useremail,thenewpassword);
      expect(regResponse).toBeInstanceOf(ResponseObj);
      expect(regResponse.IsSuccess).toBe(true);
      expect(regResponse.result).toBeInstanceOf(UserResponseDTO);
      console.log(regResponse);
    });
    it('should login with new password', async () => 
    {
      expect.assertions(2);

      let ac:AuthController;//AuthController
      let regResponse:ResponseObj;
      let urd:UserRegistrationDTO;//UserRegistrationDTO

      ac = new AuthController();
      var uld = new UserLogInDTO();
      uld.email=curr_useremail;
      uld.password=thenewpassword;
      regResponse = await ac.login(uld.email,uld.password);
      expect(regResponse).toBeInstanceOf(ResponseObj);
      expect(regResponse.result).toBeInstanceOf(UserResponseDTO);//UserResponseDTO implies sucess response
      shared_user = regResponse.result;
      console.log(regResponse);
    });
    it('should reset a users password back to original', async () => 
    {
      expect.assertions(2);
      let ac:AuthController;//AuthController
      let regResponse:ResponseObj;
      ac = new AuthController();
      //set password back to original afterwards
      regResponse = await ac.passwordReset(curr_useremail,some_password);
      expect(regResponse.IsSuccess).toBe(true);
      expect(regResponse.result).toBeInstanceOf(UserResponseDTO);
      console.log(regResponse);
    });
  });

    describe('Test User Lock Out', () => 
    {
      let ac:AuthController;//AuthController
      ac = new AuthController();
        it("Should lock existing user out after 3 failed password attempts", async () => 
        {
            expect.assertions(9);//9 because each expect is an assertion within this it block
            var  uld = new UserLogInDTO();
            uld.email=curr_useremail;//"user1@mail.com";
            uld.password=some_password+"makepasswordwrong";
            const throwingFunction = () => ac.login(uld.email,uld.password)
            await throwingFunction().catch(error => 
            {
                // console.log("111111111111111111111111111111111111111111111"); //the numbers just easily idicates what email log out attempt we are at
                console.log(error); 
                expect(error).toBeInstanceOf(ResponseObj)
                expect(error.IsSuccess).toBe(false)
                expect(error.message).toMatch(new RegExp('Incorrect password'))
                // expect(error).toMatchObject(
                // {
                //     details: new RegExp('Invalid payload provided'),
                // })
            });
            const throwingFunction2 = () => ac.login(uld.email,uld.password)
            await throwingFunction2().catch(error => 
            {
                // console.log("2222222222222222222222222222222222222222222222222222222"); 
                console.log(error); 
                expect(error).toBeInstanceOf(ResponseObj)
                expect(error.IsSuccess).toBe(false)
                expect(error.message).toMatch(new RegExp('Incorrect password'))
                // expect(error).toMatchObject(
                // {
                //     details: new RegExp('Invalid payload provided'),
                // })
            });
            const throwingFunction3 = () => ac.login(uld.email,uld.password)
            await throwingFunction3().catch(error => 
            {
                // console.log("333333333333333333333333333333333333333333333333333333333"); 
                console.log(error); 
                expect(error).toBeInstanceOf(ResponseObj)
                expect(error.IsSuccess).toBe(false)
                expect(error.message).toMatch(new RegExp('Account Locked for 20 minutes and will be reavailable after...'))
                // expect(error).toMatchObject(
                // {
                //     details: new RegExp('Invalid payload provided'),
                // })
            });
         })
      });
});