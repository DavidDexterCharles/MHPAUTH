import {AuthController,UserRegistrationDTO,userRepository,ResponseObj,UserResponseDTO, UserLogInDTO}  from 'mhpauth';

let ur:any;//userRepository
  beforeAll(async () => { // clean user table before run 
    ur = new userRepository();
    await ur.deleteAllusers();
    });

  afterAll(async () => {   // clean user table after run 
    ur = new userRepository();
    await ur.deleteAllusers();
  });

describe('AuthController Functionality', () => {
  
  // let ac:AuthController;//AuthController
 
  let shared_user:UserResponseDTO;

  // let regResponse:ResponseObj;//UserRegistrationDTO

  
  
  // beforeEach(() => {
  //     ac = new AuthController();
  //     regResponse = new ResponseObj();
  // });

  describe('Test Registration', () => {
    it('should register new user', async () => 
    {
      let ac:AuthController;//AuthController
      let regResponse:ResponseObj;
      let urd:UserRegistrationDTO;//UserRegistrationDTO

      ac = new AuthController();
      //test with one user-- wasnt sure how deep I should go regarding writting unit tests
      urd =new UserRegistrationDTO();
      urd.email="user1@mail.com";
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
      // expect(regResponse.).toBeInstanceOf(ResponseObj);//should pass
      // expect(regResponse.).toBeInstanceOf(ResponseObj);//should pass

      // console.log(regResponse.IsSuccess);
      // expect(stack.top).toBe(-1);
      // expect(stack.items).toEqual({});
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
      uld.email="user1@mail.com";//urd.email;
      uld.password="SomePassword123";//urd.password;
      regResponse = await ac.login(uld.email,uld.password);
      expect(regResponse).toBeInstanceOf(ResponseObj);
      expect(regResponse.result).toBeInstanceOf(UserResponseDTO);//UserResponseDTO implies sucess response
      shared_user = regResponse.result;
      // console.log(user);
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
      // console.log(user.token);
    });
  });
  describe('Test Invalid Login', () => {
    let ac:AuthController;//AuthController
    ac = new AuthController();
        it("should fail if incorrect password", async () => {
          var  uld = new UserLogInDTO();
            uld.email="user1@mail.com";
            uld.password="SomePassword1234"; 
          await expect(ac.login(uld.email,uld.password)).rejects.toBeInstanceOf(
                          ResponseObj
                        );
                        console.log("---------------------------------------------------------------------------");
        })
  });
  describe('Test User Lock Out', () => {
        let ac:AuthController;//AuthController
        ac = new AuthController();
        it.only("Should lock after 3 attempts", async () => 
        {
            var  uld = new UserLogInDTO();
            uld.email="user1@mail.com";
            uld.password="SomePassword1234"; 
            const throwingFunction = () => ac.login2(uld)
            await throwingFunction().catch(error => 
            {
                console.log(error); 
                expect(error).toBeInstanceOf(ResponseObj)
                // expect(error.message).toMatch(new RegExp('Could not login user'))
                // expect(error).toMatchObject(
                // {
                //     details: new RegExp('Invalid payload provided'),
                // })
            })
        })
  });
  // describe('Test User Lockout', () => {
  //   let ac:AuthController;//AuthController
  //   ac = new AuthController();
  //   var  uld = new UserLogInDTO();
  //   uld.email="76david@mail.com";
  //   uld.password="SomePassword1234"; 
  //       it('throws an error when it is not possible to create an user', async () => {
  //         const throwingFunction = () => ac.login2(uld)
  //         const throwingFunction2 = () => ac.login2(uld)
  //         // This is what prevents the test to succeed when the promise is resolved and not rejected
  //         expect.assertions(3)
      
  //         await throwingFunction().catch(error => {
  //             expect(error).toBeInstanceOf(Error)
  //             expect(error.message).toMatch(new RegExp('Could not login user'))
  //             expect(error).toMatchObject({
  //                 details: new RegExp('Invalid payload provided'),
  //             })
  //         })
  //     })
  // });
  
  // describe('Test User Lockout', () => {
  //   // it('should Lock user Account', async () => 
  //   // {
  //   //   regResponse = await ac.authenticate(user.token);
  //   //   expect(regResponse).toBeInstanceOf(ResponseObj);
  //   //   expect(regResponse.IsSuccess).toBe(true);
  //   //   expect(regResponse.result).toBeInstanceOf(UserResponseDTO);;
  //   //   // console.log(user.token);
  //   // });
  //   test("should Lock user Account after 3 tries", () => {
  //     const t = async () => {
  //       // throw new TypeError();
  //       regResponse = await ac.authenticate(user.token);
  //       throw regResponse;
  //     };
  //     expect(t).toThrow(TypeError);
  //   });
  // });
  
  
});