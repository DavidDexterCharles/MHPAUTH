import { ResponseObj, UserRegistrationDTO, UserLogInDTO } from '../DTOS/APIDTO';
export declare class AuthController {
    login(username: string, password: string): Promise<ResponseObj>;
    login2(accountDetails: UserLogInDTO): Promise<ResponseObj>;
    private lockoutCompleted;
    private incrementFailedAccess;
    register(accountDetails: UserRegistrationDTO, password?: string): Promise<ResponseObj>;
    passwordReset(username: string, password: string): Promise<ResponseObj>;
    authenticate(token: string, pulldetails?: boolean): Promise<ResponseObj>;
}
