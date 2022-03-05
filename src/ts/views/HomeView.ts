// Interfaces
import IUser from "../interfaces/IUser";

// Modules
import Navigation from "./modules/Navigation";
import LogoutButton from "./modules/LogoutButton";

/**
 * Home View.
 * 
 * @author: Sofie Wallin
 */
export default class HomeView {

    // Properties
    private apiUrl: string;
    private user: IUser;
    private mainHeader: HTMLElement;
    private appRoot: HTMLElement;

    /**
     * Constructor
     */
    constructor(user: IUser, apiUrl: string, appRoot: HTMLElement) {
        this.apiUrl = apiUrl;
        this.user = user;
        this.mainHeader = document.querySelector('#main-header') as HTMLElement;
        this.appRoot = appRoot;
    }

    /**
     * Render view.
     */
    async render(): Promise<void> {
        // Create logout button module and add it to header
        const navigation = new Navigation();
        const createdNavigation = await navigation.create();
        this.mainHeader.append(createdNavigation);

        // Create log out button module and add it to header
        const logoutButton = new LogoutButton(this.apiUrl, this.user);
        const createdLogoutButton = await logoutButton.create();
        this.mainHeader.append(createdLogoutButton);
    }
}
