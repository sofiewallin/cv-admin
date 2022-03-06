import IUser from "../interfaces/IUser";

export default class Model {
    // Properties
    public apiUrl: string;
    public user: IUser;

    /**
     * Constructor
     */
    constructor(apiUrl: string, user: IUser) {
        this.apiUrl = apiUrl;
        this.user = user;
    }
}
