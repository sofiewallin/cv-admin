import IModule from "../interfaces/IModule";

/**
 * View.
 * 
 * @author: Sofie Wallin
 */
 export default class View {
    // Properties
    protected apiUrl: string;
    protected appRoot: HTMLElement;

    /**
     * Constructor
     */
     constructor(apiUrl: string, appRoot?: HTMLElement) {
        this.apiUrl = apiUrl;
        this.appRoot = appRoot;
    }

    /**
     * Append module to view.
     */
     async appendModule(module: IModule, element: HTMLElement): Promise<void> {
        const createdModule = await module.create();
        element.append(createdModule);
    }
 }