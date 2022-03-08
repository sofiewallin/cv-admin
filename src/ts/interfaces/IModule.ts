/**
 * Module interface.
 * 
 * @author: Sofie Wallin
 */
export default interface IModule {
    module: HTMLElement;

    create(): Promise<HTMLElement>;
}
