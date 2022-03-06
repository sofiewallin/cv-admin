import IError from "./IError";
import IUser from "./IUser";

/**
 * Model interface.
 * 
 * @author: Sofie Wallin
 */
 export default interface IModel {
    apiUrl: string;
    user: IUser;

    create(): Promise<any|IError>

    readAll(): Promise<any|IError>

    update(id: number): Promise<any|IError>

    delete(id: number): Promise<any|IError>

}
