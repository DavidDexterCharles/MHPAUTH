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

## Quick Setup (library|SampleApp)
The following steps detail quick setup using library containing all node modules installed along with already build commands and dist file executed:

- 

## Detail Setup (library-WireFrame|SampleApp-WireFrame)
The following instructions contains added details on setup steps. These steps can be done using library-Wireframe which does not include preinstalled node modules or builds like the dist folder which is required for the module to be linked and used as a standalone library by other aplication SamlpleApp. 

 ### Steps orderd by priority listed below:
1 Git clone this repository  

2 Open comand prompt as administrator and cd to  *\MHPAUTH\library\mhpauth*, execute the following commands:
* `npm install`
* `npm run build` [generates the `**dist**` folder within *\MHPAUTH\library\mhpauth*]

3 Navigate in the same terminal change directory to *\MHPAUTH\library\mhpauthDB*, do the following steps:
* Execute command `npm install`
* In this directory there is also a "[SetupDataBase.sql](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/library/mhpauthDB/SetupDataBase.sql)" execute this script in your MySql database. three(3) database schmeas: "myhealthpassdev", "myhealthpasstest", and "myhealthpass" will be generated and each of them will contain a single table called user.
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
    "devenv":"env NODE_ENV=development nodemon main.js",
    "testenv":"env NODE_ENV=test nodemon main.js",
    "prodenv":"env NODE_ENV=production nodemon main.js"    
  },
```




# Outputs/Deliverables

 
 ## Describe the **data and object model** to support the **authentication** and **authorization** requirements. 
 
 ### **Data Transfer Objects** 
 
 - Data Transfer Object (DTO) [UserRegistrationDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L31)
    - A DTO is an object for carrying data between processes. One main advantage of DTO is that they can help hide implementation details of Domain Objects(DO). The DTOS  developed for this solution are at [*\MHPAUTH\library\mhpauth\src\services\DTOS\APIDTO.ts*](https://github.com/DavidDexterCharles/MHPAUTH/blob/master/library/mhpauth/src/services/DTOS/APIDTO.ts).
    - A library called [class-validator](https://www.npmjs.com/package/class-validator) was used to apply strict rules to fields of the dto. Using class-validator along with helper method [isValidDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L5) at APIDTO.ts allowed for validation of user registration data being sent to the registration function of the library.
    -  [UserRegistrationDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L31) : This DTO is what is sent by the user upon registration and is accepeted as a parameter by the [register](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L136) function in AuthController. The implementation details it hides includes:
        - id 
        - createdat
        - accessfailedcount- increments each time for every failed login up to 3 times then locks user account. The attribute lockoutend in the database is then set to 20mins in the future.
        - lockoutend -this attribute is set to 20 mins in the future when max failed logging attempts occured. If the user trys to log in they will be rejected until the time has elapsed
        - emailconfirmed
        
    - [UserRegistrationDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L31) also adds feature for user password confirmation via the passwordconfirm field.

- Data Transfer Object (DTO) [UserResponseDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L86) 
    - the next dto created was a user response object that hides details such as user password. Validation isn't really done on this object as it is being rapped into another object called [ResponseObj](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L73). 
    - [UserResponseDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L86)  also contains details of the JWT token which is an authorization token generated upon successful login (using the [login function](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L13) of the library) and is used and passed to the [authenticate function](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L192) to authenticate subsequent requests of an authorized user.
- Data Transfer Object (DTO) - About [ResponseObj](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L73)
    -  The purpose of the  [ResponseObj](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L73) is to provide a standard and consistent response/return object to the developer using the api. This  object should **NEVER** be sent to a client but is strictly for providing additional helpful details to the developer. It is expected that only the [result]() field of the [ResponseObj](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L73) object is forwarded or seen by the client. Upon success the result field will contain a [UserRegistrationDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L31), upon failure due to authentication,DTO validation, etc. the [result]() field of [ResponseObj]() would be empty and the  [errors] field would be populated with useful details about the error which will assist the developer in utilizing the API.
    - The object upon successful reseponse would actual store a [UserResponseDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L86)  in its results fileds, its  IsSuccess value would be set to true and any other message details regarding the successful response would be avaailable in the message field. The errors field would be empty if the response was successful. 
    - If the an error does occur whther its due to data not found in the database or a DTO did not pass all its validation checks. Then the errors field of [UserResponseDTO](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L86) will get populated with details of the error and the results field would be empty. 
    
    - The helper methods used for generating and returning approriate response object to the developer are [successResponse](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/SampleApp/node_modules/mhpauth/src/services/DTOS/APIDTO.ts#L23) andd [failureResponse](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/SampleApp/node_modules/mhpauth/src/services/DTOS/APIDTO.ts#L15). Also all the major methods of the [AuthController](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L11) which includes [login](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L13),[register](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L136), and [authenticate](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/controllers/AuthController.ts#L192) all return [ResponseObj](https://github.com/DavidDexterCharles/MHPAUTH/blob/c1b85ac4df2371473b1a7ed4a444d0dd4378b3b6/library/mhpauth/src/services/DTOS/APIDTO.ts#L73)

### **Data Transfer Objects** 

1 In developing this solution the tech stack used included MySQL and Nodejs. NodeJS is a backend javascript runtime that allows developers to develop applications, services, aand libraries using javascrit/typescript. 

2

The progrmming language comprised mianly of typescript and javascript. Though NodeJs was used as the server side progr

2

## The 




# other
**Solution Implemented:** The purpose of this library is to provide a develper with a reusable and portable solution for authenticationa and authorization. 

In developing this solution the following assumptions and reasons for those assumptions were made:


have been developed to be used by another developer that wishes to have out of the box authorization and authenti

1 



## Library Interface
## Project Structure

