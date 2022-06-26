declare class userRepository {
    current_user: any;
    constructor();
    adduser(user: any): Promise<any>;
    getuser(id: number): Promise<any>;
    getuserByEmail(email: string): Promise<any>;
    getusers(): Promise<any>;
    updateuser(user: any, id: number): Promise<any>;
    deleteuser(id: number): Promise<any>;
    deleteAllusers(): Promise<any>;
}
export { userRepository };
