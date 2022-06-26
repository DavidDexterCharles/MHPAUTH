"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const db = require('../../../../mhpauthDB/models/index'); //('../models/index');
//todo -- create IRepository interface and a Base repository 
//that userRepository will inherit to abstract away CRUD operations-- wasnt high priority as current solution had only one entity
class userRepository {
    constructor() {
    }
    adduser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.user.create(user);
                return result;
            }
            catch (err) {
                // console.error(`Error while creating object`, err);
                // console.log(err.errors);
                throw err.errors[0];
            }
        });
    }
    getuser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.user.findOne({ where: { id: id } });
                return result;
            }
            catch (err) {
                // console.error(`Error while getting result`, err.message);
                throw err.errors[0];
            }
        });
    }
    getuserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var result = yield db.user.findOne({ where: { email: email } });
                // result=result.toJSON();//https://stackoverflow.com/a/34463270/5826992 //how to convert to JSON
                return result;
            }
            catch (err) {
                throw err.errors[0];
            }
        });
    }
    getusers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.user.findAll();
                return result;
            }
            catch (err) {
                throw err.errors[0];
            }
        });
    }
    updateuser(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                user.id = id;
                const result = yield db.user.update(user, { where: { id: id } });
                return result;
            }
            catch (err) {
                throw err.errors[0];
            }
        });
    }
    deleteuser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.user.destroy({
                    where: {
                        id: id //this will be your id that you want to delete
                    }
                });
                return result;
            }
            catch (err) {
                throw err.errors[0];
            }
        });
    }
    deleteAllusers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db.user.destroy({
                    where: {},
                    truncate: true
                });
                return result;
            }
            catch (err) {
                throw err.errors[0];
            }
        });
    }
}
exports.userRepository = userRepository;
// var u =new userRepository();
// const result = u.getusers();
// console.log( result);
//# sourceMappingURL=userRepository.js.map