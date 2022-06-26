// import {AuthController,UserRegistrationDTO,userRepository,ResponseObj,UserResponseDTO, UserLogInDTO}  from 'mhpauth';
import {AuthController, ResponseObj, UserLogInDTO, UserRegistrationDTO, UserResponseDTO}  from '../src/services/index'


let ur:any;//userRepository
let curr_useremail= `${makeid(6)}@mail.com`
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
      let ac:AuthController;//AuthController
      let regResponse:ResponseObj;
      let urd:UserRegistrationDTO;//UserRegistrationDTO
      ac = new AuthController();
      urd =new UserRegistrationDTO();
      urd.email=curr_useremail;//"user1@mail.com";
      urd.firstname="f1";
      urd.lastname="l1"; 
      urd.password="SomePassword123";
      urd.passwordconfirm="SomePassword123";
      urd.phone="123-4562";
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
      let ac:AuthController;//AuthController
      let regResponse:ResponseObj;
      let urd:UserRegistrationDTO;//UserRegistrationDTO

      ac = new AuthController();
      var uld = new UserLogInDTO();
      uld.email=curr_useremail;//"user1@mail.com";//urd.email;
      uld.password="SomePassword123";//urd.password;
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
      let ac:AuthController;//AuthController
      let regResponse:ResponseObj;
      let urd:UserRegistrationDTO;//UserRegistrationDTO
      ac = new AuthController();

      regResponse = await ac.authenticate(shared_user.token);
      expect(regResponse).toBeInstanceOf(ResponseObj);
      expect(regResponse.IsSuccess).toBe(true);
      expect(regResponse.result).toBeInstanceOf(UserResponseDTO);;
      console.log(regResponse);
    });
  });

    describe('Test User Lock Out', () => 
    {
      let ac:AuthController;//AuthController
      ac = new AuthController();
        it("Should lock existing user out after 3 failed password attempts", async () => 
        {
            var  uld = new UserLogInDTO();
            uld.email=curr_useremail;//"user1@mail.com";
            uld.password="SomePassword1234"; 
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