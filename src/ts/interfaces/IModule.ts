/**
 * Login details interface.
 * 
 * @author: Sofie Wallin
 */
 export default interface IModule {
    module: HTMLElement;

    return(): Promise<HTMLElement>;
}
