import IModule from "./IModule";
import IUser from "./IUser";

/**
 * View interface.
 * 
 * @author: Sofie Wallin
 */
 export default interface IView {
    readonly apiUrl: string;
    readonly appContent: HTMLElement;
    readonly user?: IUser;

    render(): Promise<void>

    appendModule(module: IModule, element: HTMLElement): Promise<void>
}
