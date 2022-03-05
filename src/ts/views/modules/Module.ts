import View from "../View";

import IUser from "../../interfaces/IUser";

/**
 * View.
 * 
 * @author: Sofie Wallin
 */
 export default class Module extends View {
     // Properties
     public user: IUser;
     public module: HTMLElement;

    /**
     * Constructor
     */
    constructor(apiUrl?: string, user?: IUser) {
        super(apiUrl);

        this.user = user;
    }
 }
