import IUser from "../interfaces/IUser";

/**
 * Model base.
 * 
 * @author: Sofie Wallin
 */
export default class Model {
    public apiUrl: string;
    public user: IUser;

    constructor(apiUrl: string, user: IUser) {
        this.apiUrl = apiUrl;
        this.user = user;
    }
}
