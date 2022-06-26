export declare function isValidDTO(dto: any, Validate1Field?: boolean): Promise<{
    hasErrors: boolean;
    errors: import("class-validator").ValidationError[];
}>;
export declare function isValidDTOField(dto: any): Promise<{
    hasErrors: boolean;
    errors: import("class-validator").ValidationError[];
}>;
export declare function failureResponse(error: any, message: string): ResponseObj;
export declare function successResponse(results: any, message: string): ResponseObj;
export declare class UserRegistrationDTO {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    passwordconfirm: string;
    createdat: Date;
}
export declare class UserLogInDTO {
    email: string;
    password: string;
}
export declare class ResponseObj {
    IsSuccess: boolean;
    message: string;
    errors: any;
    result: any;
}
export declare class UserResponseDTO {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    emailconfirmed: boolean;
    accessfailedcount: number;
    lockoutend: Date;
    token: any;
    id: number;
}
