"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.UserResponseDTO = exports.ResponseObj = exports.UserLogInDTO = exports.UserRegistrationDTO = exports.successResponse = exports.failureResponse = exports.isValidDTOField = exports.isValidDTO = void 0;
//DTO using [class-validato] https://www.npmjs.com/package/class-validator
// all DTOS were placed in this class to allow for one time imports from "class-validator"
const class_validator_1 = require("class-validator");
function isValidDTO(dto, Validate1Field = false) {
    return __awaiter(this, void 0, void 0, function* () {
        let vresult;
        if (Validate1Field)
            vresult = yield (0, class_validator_1.validate)(dto, { skipMissingProperties: true }); //https://stackoverflow.com/a/66703740/5826992
        else
            vresult = yield (0, class_validator_1.validate)(dto);
        if (vresult.length > 0) {
            return { hasErrors: true, errors: vresult };
        }
        else {
            return { hasErrors: false, errors: vresult };
        }
    });
}
exports.isValidDTO = isValidDTO;
function isValidDTOField(dto) {
    return __awaiter(this, void 0, void 0, function* () {
        let vresult = yield (0, class_validator_1.validate)(dto, { skipMissingProperties: true });
        if (vresult.length > 0) {
            return { hasErrors: true, errors: vresult };
        }
        else {
            return { hasErrors: false, errors: vresult };
        }
    });
}
exports.isValidDTOField = isValidDTOField;
function failureResponse(error, message) {
    let r = new ResponseObj();
    r.IsSuccess = false;
    r.message = message;
    r.errors = error;
    r.result = [];
    return r;
}
exports.failureResponse = failureResponse;
function successResponse(results, message) {
    let r = new ResponseObj();
    r.IsSuccess = true;
    r.message = message;
    r.errors = [];
    r.result = results;
    return r;
}
exports.successResponse = successResponse;
class UserRegistrationDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100, { message: 'Firstname Max length is 100 characters.' })
], UserRegistrationDTO.prototype, "firstname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100, { message: 'Lastname Max length is 100 characters.' })
], UserRegistrationDTO.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(240, { message: 'Email Max length is 240 characters.' }),
    (0, class_validator_1.IsEmail)()
], UserRegistrationDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(240, { message: 'Phone Max length is 240 characters.' })
], UserRegistrationDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(11, { message: 'Password Min length is 11 characters.' })
], UserRegistrationDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(11, { message: 'Password Min length is 11 characters.' }),
    (0, class_validator_1.MaxLength)(25, { message: 'Password Max length is 25 characters.' })
], UserRegistrationDTO.prototype, "passwordconfirm", void 0);
exports.UserRegistrationDTO = UserRegistrationDTO;
class UserLogInDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(240, { message: 'Email Max length is 240 characters.' }),
    (0, class_validator_1.IsEmail)()
], UserLogInDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)()
], UserLogInDTO.prototype, "password", void 0);
exports.UserLogInDTO = UserLogInDTO;
class ResponseObj {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)()
], ResponseObj.prototype, "IsSuccess", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], ResponseObj.prototype, "message", void 0);
exports.ResponseObj = ResponseObj;
class UserResponseDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100, { message: 'Firstname Max length is 100 characters.' })
], UserResponseDTO.prototype, "firstname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100, { message: 'Lastname Max length is 100 characters.' })
], UserResponseDTO.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(240, { message: 'Email Max length is 240 characters.' }),
    (0, class_validator_1.IsEmail)()
], UserResponseDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(240, { message: 'Phone Max length is 240 characters.' })
], UserResponseDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)()
], UserResponseDTO.prototype, "emailconfirmed", void 0);
__decorate([
    (0, class_validator_1.IsInt)()
], UserResponseDTO.prototype, "accessfailedcount", void 0);
__decorate([
    (0, class_validator_1.IsDate)()
], UserResponseDTO.prototype, "lockoutend", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], UserResponseDTO.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsInt)()
], UserResponseDTO.prototype, "id", void 0);
exports.UserResponseDTO = UserResponseDTO;
//# sourceMappingURL=APIDTO.js.map