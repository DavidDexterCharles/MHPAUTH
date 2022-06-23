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
* In this directory there is also a "SetupDataBase.sql" execute this script in your MySql database. three(3) database schmeas: "myhealthpassdev", "myhealthpasstest", and "myhealthpass" will be generated and each of them will contain a single table called user.
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


## Library Interface



## Project Structure

