import IModule from "../interfaces/IModule";
import IUser from "../interfaces/IUser";

/**
 * View base.
 * 
 * @author: Sofie Wallin
 */
export default class View {
    readonly apiUrl: string;
    readonly appContent: HTMLElement;
    readonly user: IUser;

    constructor(apiUrl: string, user?: IUser, appContent?: HTMLElement) {
        this.apiUrl = apiUrl;
        this.appContent = appContent;
        this.user = user;
    }

    /**
     * Append module to view.
     */
    async appendModule(module: IModule, element: HTMLElement): Promise<void> {
        const createdModule = await module.create();
        element.append(createdModule);
    }
}
