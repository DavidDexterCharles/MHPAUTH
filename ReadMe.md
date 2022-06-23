# Library Usage Guide 

### Required technologies:
- NodeJS version [node-v16.15.1](https://nodejs.org/en/)
- MySql database and MySql workbench
- Note the correct version of nodejs should be used. 
- Node version manager: If system have different version of NodeJS then [nvm](https://github.com/nvm-sh/nvm) can be used to setup/select with correct version of NodeJS. For windows installation see :[Install nvm for windows](https://github.com/coreybutler/nvm-windows/releases).
    - Open terminal as **administrator** and run the following below commands
    - ``nvm install 16.15.1``
    - ``nvm ls``
    - `nvm use 16.15.1`

## Library Interface

![Alt text](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/gitimages/FinalInterface.PNG)

### Data Transfer Objeccts DTOs:

#### UserLoginDTO
![Alt text](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/gitimages/UserLoginDTO.PNG)

#### UserRegistrationDTO
![Alt text](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/gitimages/UserRegistrationDTO.PNG)

#### UserResponeDTO
![Alt text](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/gitimages/UserResponeDTO.PNG)

#### ResponseObj
![Alt text](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/gitimages/ResponseObj.PNG)

##### TWO(2) ResponseObj Example :
![Alt text](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/gitimages/ResponseObjInUse.png)


# Option (A) - Quick Setup (library|SampleApp)
*See* **Option (B)** for detail setup **or** continue here to skip steps:

The following steps detail quick setup using library containing all node modules installed along with already build commands and dist file executed:

1  Details of Quick Setup 
   - Steps Already Completed for **library** : Every step that would have involved running a node "npm command" in   **library** folder[\MHPAUTH\library](https://github.com/DavidDexterCharles/MHPAUTH/tree/Master_Backup/library) has already been completed {see **Detail Setup** below for more info}. 

2 Remaining steps for  **library** : 
  - Navigate to *\MHPAUTH\library\mhpauthDB*. In this directory there is also a "[SetupDataBase.sql](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/library/mhpauthDB/SetupDataBase.sql)" execute this script on your MySql server (possibly through MsqlWorkBench or phpMyadmin). three(3) database schmeas: "myhealthpassdev", "myhealthpasstest", and "myhealthpass" will be generated and each of them will contain a single table called user.

  - Next navigate to *\MHPAUTH\library\mhpauthDB\config* open the `config.json` file and change the "username" and "password" to use your local database info. Example: `config.json `:
```json
{
 "development": {
      "username": "YourUserName",
      "password": "YourPassword",
      "database": "MyHealthPassdev",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    .......
```
3 Open command prompt as administrator, change directory to *\MHPAUTH\SampleApp* and execute the following command:
 
 * `npm link ../library/mhpauth`

4 Other *Commands:* that can be ran in *\MHPAUTH\SampleApp* for testing app and exploring functionality: 
    
- "`npm start`" (OR)  "`npm run dev-env`" starts the nodemon server with `main.ts` as the entry point script. All files within this *SampleApp* directory when edited will trigger a re-run of `main.ts` while nodemon is executing. Note that the default database used when executing the `npm start` (OR)  "`npm run dev-env`" command is "**myhealthpassdev**". 

- The other commands for executeing `main.ts` on the test database "**myhealthpasstest**" and dummy-production database "**myhealthpass**". are "`npm run test-env`" and "`npm run prod-env`" respectively.

- "`npm run test` will run the tests located in the test folder at *\MHPAUTH\SampleApp\test*. Example `AuthController.test.ts`. The test were developed using [JEST](https://jestjs.io/docs/getting-started) a JavaScript testing framework. The test by default are set to run on the test version of the database "**myhealthpasstest**". 

# Option (B) - Detail Setup (library-WireFrame|SampleApp-WireFrame)
Note: *this setup should be carried out using library-WireFrame SampleApp-WireFrame removing '-WireFrame' from the folder name. The node modules for SampleApp and library were included already in the git push for the purpose/intention of providing a quick setup alternative **Option (A)**.*

The following instructions contains added details on setup steps. These steps can be done using library-Wireframe which does not include preinstalled node modules or builds like the dist folder which is required for the module to be linked and used as a standalone library by other aplication SamlpleApp. 

 ### Steps orderd by priority listed below:
1 Git clone this repository  

2 Open comand prompt as administrator and cd to  *\MHPAUTH\library\mhpauth*, execute the following commands:
* `npm install`
* `npm run build` [generates the `**dist**` folder within *\MHPAUTH\library\mhpauth*]

3 Via the same terminal change directory to *\MHPAUTH\library\mhpauthDB*, do the following steps:
* Execute command `npm install`
* In this directory there is also a "[SetupDataBase.sql](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/library/mhpauthDB/SetupDataBase.sql)" execute this script on your MySql server (possibly through MsqlWorkBench). three(3) database schmeas: "myhealthpassdev", "myhealthpasstest", and "myhealthpass" will be generated and each of them will contain a single table called user.
```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(256) DEFAULT NULL,
  `email` varchar(256) NOT NULL,
  `password` longtext,
  `lockoutend` timestamp NULL DEFAULT NULL,
  `accessfailedcount` int(11) DEFAULT '0',
  `createdat` timestamp NULL DEFAULT NULL,
  `firstname` varchar(145) DEFAULT NULL,
  `lastname` varchar(145) DEFAULT NULL,
  `emailconfirmed` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
```
* Next change directory to *\MHPAUTH\library\mhpauthDB\config* and type the following command **`start ..`** [dont forget to type the two dot after start]. The file explorer will pop up, open the `config.json` file and change the "username" and "password" to use your local database. `config.json `snippet:
```json
{
 "development": {
      "username": "YourUserName",
      "password": "YourPassword",
      "database": "MyHealthPassdev",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    .......
```
4 Change directory to *\MHPAUTH\SampleApp* and execute the following command:
 
 * `npm link ../library/mhpauth`
    
    - ([Important Notice](https://github.com/npm/npm/issues/17287)) during late stages of development it was discoverd that an npm specific update caused the node_modules generated from the local *mhpauth* library to get overwritten when `npm install` is run in SampleApp. Details of the issue mentioned [Here](https://github.com/npm/npm/issues/17287). Please kindly avoid running npm install in SampleApp as the behaviour is still shakey and wasnt discovered until late stages.
 
 5 **Exploring the commands** that can be executed within **`\MHPAUTH\SampleApp`** directory. The file `main.ts` imports the `AuthController` and other `classes/functions` which were used to implement the solution. `main.ts` can be edited to explore functionality regarding db updates, api validation checks, and other features supported by the library:
    
#### *Commands:*
    
- "`npm start`" (OR)  "`npm run dev-env`" starts the nodemon server with `main.ts` as the entry point script. All files within this *SampleApp* directory when edited will trigger a re-run of `main.ts` while nodemon is executing. Note that the default database used when executing the `npm start` (OR)  "`npm run dev-env`" command is "**myhealthpassdev**". 

- The other commands for executeing `main.ts` on the test database "**myhealthpasstest**" and dummy-production database "**myhealthpass**". are "`npm run test-env`" and "`npm run prod-env`" respectively.

- "`npm run test` will run the tests located in the test folder at *\MHPAUTH\SampleApp\test*. Example `AuthController.test.ts`. The test were developed using [JEST](https://jestjs.io/docs/getting-started) a JavaScript testing framework. The test by default are set to run on the test version of the database "**myhealthpasstest**". 

- Details on how these commands are executed can be found in the package.json file within **\MHPAUTH\SampleApp** . `package.json`:
```json
 "scripts": {
    "test": "env NODE_ENV=test jest --coverage --watchAll --verbose",
    "start": "env NODE_ENV=development nodemon main.ts",
    "devenv":"env NODE_ENV=development nodemon main.ts",
    "testenv":"env NODE_ENV=test nodemon main.ts",
    "prodenv":"env NODE_ENV=production nodemon main.ts"    
  },
```
# Brief on `.env`

Note: In  both SampleApp [*\MHPAUTH\SampleApp*](https://github.com/DavidDexterCharles/MHPAUTH/tree/master/SampleApp) and mhpauth [MHPAUTH\library\mhpauth](https://github.com/DavidDexterCharles/MHPAUTH/tree/master/library/mhpauth) , the file [`.env`](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/SampleApp/.env) is used. They both store the generated secrety key. Apart from the encryption key all other private info present that was present in .env. were removed. The .env file was kept in the repo for ease of demo and would be excluded and added to the .gitignore file otherwise.

# List of Assumptions and descisions made for design
1) Username is equivalent to the user email, this was done because account details can include firstname, lastname, etc. It is expected that the user name should be unique.

2) Login designed to take a single UserLogInDTO since the request woud usually be sent via a post body . two functions exists in AuthController login(username,password) and login2(accountDetails:UserLogInDTO). Function login(...) uses the login2(...) which provides validation on the accountDetails of type UserLogInDTO.

3) Register(accountDetails,password) has been implemented as register(accountDetails:UserRegistrationDTO,password:string=""). The second parameter is optional and therefore only accountDetails object needs to be sent. It is expected that the data will be coming from a form and hence the same UserRegistrationDTO can be utilized for such a post request and forwarded directly to the library for procesing. The UserRegistrationDTO also have a password and password confirmation field that is usedd by the library to confirm user password. If the developer still decide to pass 2nd parameter to the register function then password fields in the UserRegistrationDTO object would be overwritten and processed accordingly.

# Enforced modern security best practices
1) The passwords are not stored as plain text but were hashed in the [registration function](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L167) using [bcrypt](https://www.npmjs.com/package/bcrypt) which is a password-hashing function which is resistant to brute-force search attacks even with increasing computation power.

2) Implementation details of Domain objects "like the user table in the database" are hidden through the use of DTO(data transfer objects).

3) [JWT (JSON Web Token)](https://jwt.io/introduction) was used for generating authentication tokens and were given an expiery time of 1 hour. Also only 
JWT: is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. [The secret key](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L85) required by JWT was stored on the computer system in a .env file. The file may have been included in this git repo for easy demo purposes but all real sensitive info have been removed from it. This file should never be made public in real practice. Finally minimum data is added to the JWT token which were "email, firstname, lastname, and id".

4) [The authenticate(token)](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L86) function accepts a token. The token based authentication was implemented using JWT 




# Data and object models for authentication and authorization

 
 Describe the **data and object model** to support the **authentication** and **authorization** requirements. 
 
 ### **Data Transfer Objects** 
 
 - Data Transfer Object (DTO) [UserRegistrationDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L31)
    - A DTO is an object for carrying data between processes. One main advantage of DTO is that they can help hide implementation details of [Domain Objects(DO)](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauthDB/models/user.js). The DTOS  developed for this solution are at [*\MHPAUTH\library\mhpauth\src\services\DTOS\APIDTO.ts*](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/library/mhpauth/src/services/DTOS/APIDTO.ts).
    - A library called [class-validator](https://www.npmjs.com/package/class-validator) was used to apply strict rules to fields of the dto. Using class-validator along with helper method [isValidDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L5) at APIDTO.ts allowed for validation of user registration data being sent to the registration function of the library.
    -  [UserRegistrationDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L31) : This DTO is what is sent by the user upon registration and is accepeted as a parameter by the [register](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L136) function in AuthController. The implementation details it hides includes:
        - id 
        - createdat
        - accessfailedcount- increments each time for every failed login up to 3 times then locks user account. The attribute lockoutend in the database is then set to 20mins in the future.
        - lockoutend -this attribute is set to 20 mins in the future when max failed logging attempts occured. If the user trys to log in they will be rejected until the time has elapsed
        - emailconfirmed
        
    - [UserRegistrationDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L31) also adds feature for user password confirmation via the passwordconfirm field.

-  Data Transfer Object (DTO) [UserLogInDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L62) accepts fields email, and password. This dto is used by the login function and validation is done on the email address.

- Data Transfer Object (DTO) [UserResponseDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L86) 
    - the next dto created was a user response object that hides details such as user password. Validation isn't really done on this object as it is being rapped into another object called [ResponseObj](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L73). 
    - [UserResponseDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L86)  also contains details of the JWT token which is an authorization token generated upon successful login (using the [login function](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L13) of the library) and is used and passed to the [authenticate function](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L192) to authenticate subsequent requests of an authorized user.
- Data Transfer Object (DTO) - About [ResponseObj](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L73)
    -  The purpose of the  [ResponseObj](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L73) is to provide a standard and consistent response/return object to the developer using the api. This  object should **NEVER** be sent to a client but is strictly for providing additional helpful details to the developer. It is expected that only the [result]() field of the [ResponseObj](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L73) object is forwarded or seen by the client. Upon success the result field will contain a [UserResponseDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L86), upon failure due to authentication,DTO validation, etc. the [result]() field of [ResponseObj]() would be empty and the  [errors] field would be populated with useful details about the error which will assist the developer in utilizing the API.
    - The object upon successful reseponse would actual store a [UserResponseDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L86)  in its results fileds, its  IsSuccess value would be set to true and any other message details regarding the successful response would be avaailable in the message field. The errors field would be empty if the response was successful. 
    - If the an error does occur whther its due to data not found in the database or a DTO did not pass all its validation checks. Then the errors field of [UserResponseDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L86) will get populated with details of the error and the results field would be empty. 
    
    - The helper methods used for generating and returning approriate response object to the developer are [successResponse](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/SampleApp/node_modules/mhpauth/src/services/DTOS/APIDTO.ts#L23) andd [failureResponse](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/SampleApp/node_modules/mhpauth/src/services/DTOS/APIDTO.ts#L15). Also all the major methods of the [AuthController](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L11) which includes [login](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L13),[register](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L136), and [authenticate](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L192) all return [ResponseObj](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L73)

### **Data Access Object(DAO)** and the **Repository**
In simplest terms a DAO is just an object that execute SQL and return results in some basic data structure [[ref..1]](https://stackoverflow.com/a/41531743/5826992). An ORM (object relational mapper) called [sequelize](https://sequelize.org/) was used to provide a "**user**" data acess object along with other built in functionalities which was futher utilized to create the [userRepository class](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/repositories/userRepository.ts#L11). Note: Repositories are classes or components that encapsulate the logic required to access data sources. [userRepository class](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/repositories/userRepository.ts#L11) provided CRUD related services for interacting with database and was used by AuthController.ts to implement the desired/requested functionality. The AuthController contains the core functions of the API that is to be utilized by the developer. 



# App Testing and Unit Tests with Jest

## Background

To run or test the application  all commands previously mentioned see: ([Option B -Commands](https://github.com/DavidDexterCharles/MHPAUTH/tree/Master_Backup#commands)) are to be executed in the **\MHPAUTH\SampleApp** directory.

Command Listing for quick reference :
#### *Commands:*
    
- "`npm start`" (OR)  "`npm run dev-env`" starts the nodemon server with `main.ts` as the entry point script. All files within this *SampleApp* directory when edited will trigger a re-run of `main.ts` while nodemon is executing. Note that the default database used when executing the `npm start` (OR)  "`npm run dev-env`" command is "**myhealthpassdev**". 

- The other commands for executeing `main.ts` on the test database "**myhealthpasstest**" and dummy-production database "**myhealthpass**". are "`npm run test-env`" and "`npm run prod-env`" respectively.

- "`npm run test` will run the tests located in the test folder at *\MHPAUTH\SampleApp\test*. Example `AuthController.test.ts`. The test were developed using [JEST](https://jestjs.io/docs/getting-started) a JavaScript testing framework. The test by default are set to run on the test version of the database "**myhealthpasstest**". 

- Details on how these commands are executed can be found in the package.json file within **\MHPAUTH\SampleApp** . `package.json`:
```json
 "scripts": {
    "test": "env NODE_ENV=test jest --coverage --watchAll --verbose",
    "start": "env NODE_ENV=development nodemon main.ts",
    "devenv":"env NODE_ENV=development nodemon main.ts",
    "testenv":"env NODE_ENV=test nodemon main.ts",
    "prodenv":"env NODE_ENV=production nodemon main.ts"    
  },
```
## Regarding running and testing all commands should be assumed to have been executed in the following directory 

## Running main.ts

The entry point for *SampleApp* is `main.ts`. The purpose of main.ts is for  demonstrating how a sperate stand alone app can import and utilize fetures of the **mhpauth** library note library follder also contains **mhpauthDB** this seperation was done to give the developer a means to easily add there environment specific database configurations.

#### Library file structure:
![Alt text](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/gitimages/mhpAuthLibrary.PNG)

The Library file structure contains
- *mhpauth* : this is the actual library(typescript module) that provides Access to the [following](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/library/mhpauth/src/services/index.ts) classes. The main class within the scope of feature requests is AuthController and is what will be used the most regarding testing the *mhpauth* module:
```js
export { AuthController } from './controllers/AuthController';
export { userRepository } from './repositories/userRepository';
export { UserRegistrationDTO,
         UserLogInDTO,ResponseObj,
         UserResponseDTO,
         successResponse,
         failureResponse,isValidDTO } from './DTOS/APIDTO';
```
- 
## Running the tests

- When `npm run test` is executed the following command "`env NODE_ENV=test jest --coverage --watchAll --verbose`" is run that tells jest that the environment we are testing in is a test environment ( which will cause the tests to read/write to the test database :myhealthpasstest)