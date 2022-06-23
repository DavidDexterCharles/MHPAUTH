const  db = require('../../../../mhpauthDB/models/index');//('../models/index');

//todo -- create IRepository interface and a Base repository 
//that userRepository will inherit to abstract away CRUD operations-- wasnt high priority as current solution had only one entity
class userRepository { 
    public current_user:any;

    constructor() {
    }
    public async adduser(user:any) {
        try {
            const result = await db.user.create(user);
            return result;
        } catch (err) {
            // console.error(`Error while creating object`, err);
            // console.log(err.errors);
            throw err.errors[0];
        }
    }
    public async getuser(id: number) {
        try {
            const result = await db.user.findOne({ where: { id: id } });
            return result;
        } catch (err) {
            // console.error(`Error while getting result`, err.message);
            throw err.errors[0];
        }
    }
    public async getuserByEmail(email: string) {
        try {
            var result = await db.user.findOne({ where: { email: email } });
            // result=result.toJSON();//https://stackoverflow.com/a/34463270/5826992 //how to convert to JSON
            return result;
        } catch (err) {
            throw err.errors[0];
        }
    }
    public async getusers() {
        try {
            const result = await db.user.findAll();
            return result;
        } catch (err) {
            throw err.errors[0];
        }
    }
    public async updateuser(user: any, id: number) {
        try {
            user.id = id;
            const result = await db.user.update(
                user,
                { where: { id: id } }
            )
            return result;
        } catch (err) {
            throw err.errors[0];
        }
    }
    public async deleteuser(id: number) {
        try {
            const result = await db.user.destroy({
                where: {
                    id: id //this will be your id that you want to delete
                }
            });
            return result;
        } catch (err) {
            throw err.errors[0];
        }
    }
}
// export = userRepository;
export{userRepository}
// var u =new userRepository();
// const result = u.getusers();
// console.log( result);