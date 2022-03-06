import IModule from "../interfaces/IModule";
import IUser from "../interfaces/IUser";

/**
 * View.
 * 
 * @author: Sofie Wallin
 */
 export default class View {
    // Properties
    readonly apiUrl: string;
    readonly appContent: HTMLElement;
    readonly user?: IUser;

    /**
     * Constructor
     */
     constructor(apiUrl: string, user?: IUser, appContent?: HTMLElement) {
        this.apiUrl = apiUrl;
        this.appContent = appContent;
        this.user = user;
    }

    /**
     * Append module to view.
     */
     async appendModule(module: IModule, containerElement: HTMLElement): Promise<void> {
        const createdModule = await module.return();
        containerElement.append(createdModule);
    }
 }