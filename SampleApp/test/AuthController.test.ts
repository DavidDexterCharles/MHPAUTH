import {AuthController,UserRegistrationDTO,userRepository,ResponseObj,UserResponseDTO, UserLogInDTO}  from 'mhpauth';

describe('AuthController Functionality', () => {
  
  let ac:AuthController;//AuthController
  let ur:any;//userRepository
  let user:UserResponseDTO;
  let urd:UserRegistrationDTO;//UserRegistrationDTO
  let regResponse:ResponseObj;//UserRegistrationDTO
  beforeAll(async () => { // clean user table before run 
    ur = new userRepository();
    await ur.deleteAllusers();
    
    //test with one user-- wasnt sure how deep I should go regarding writting unit tests
    urd =new UserRegistrationDTO();
    urd.email="user1@mail.com";
    urd.firstname="f1";
    urd.lastname="l1"; 
    urd.password="SomePassword123";
    urd.passwordconfirm="SomePassword123";
    urd.phone="123-4562";

    });

  afterAll(async () => {   // clean user table after run 
    ur = new userRepository();
    await ur.deleteAllusers();
  });
  
  beforeEach(() => {
      ac = new AuthController();
      regResponse = new ResponseObj();
  });

  describe('Test Registration', () => {
    it('should register new user', async () => 
    {
      regResponse = await ac.register(urd); 
      expect(regResponse).toBeInstanceOf(ResponseObj);
      expect(regResponse.IsSuccess).toBe(true);
      expect(regResponse.result).toBeInstanceOf(UserResponseDTO);
      user=regResponse.result.UserResponseDTO;
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
      var uld = new UserLogInDTO();
      uld.email="user1@mail.com";//urd.email;
      uld.password="SomePassword123";//urd.password;
      regResponse = await ac.login(uld.email,uld.password);
      expect(regResponse).toBeInstanceOf(ResponseObj);
      expect(regResponse.result).toBeInstanceOf(UserResponseDTO);//UserResponseDTO implies sucess response
      user = regResponse.result;
      // console.log(user);
    });
  });
  describe('Test Authenticate', () => {
    it('should authenticate returning user', async () => 
    {
      regResponse = await ac.authenticate(user.token);
      expect(regResponse).toBeInstanceOf(ResponseObj);
      expect(regResponse.IsSuccess).toBe(true);
      expect(regResponse.result).toBeInstanceOf(UserResponseDTO);;
      // console.log(user.token);
    });
  });
  describe('Test User Lockout', () => {
    // it('should Lock user Account', async () => 
    // {
    //   regResponse = await ac.authenticate(user.token);
    //   expect(regResponse).toBeInstanceOf(ResponseObj);
    //   expect(regResponse.IsSuccess).toBe(true);
    //   expect(regResponse.result).toBeInstanceOf(UserResponseDTO);;
    //   // console.log(user.token);
    // });
    test("should Lock user Account after 3 tries", () => {
      const t = async () => {
        // throw new TypeError();
        regResponse = await ac.authenticate(user.token);
        throw regResponse;
      };
      expect(t).toThrow(TypeError);
    });
  });
  
  
});