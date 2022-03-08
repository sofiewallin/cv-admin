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

    create(inputData: Object): Promise<Object|IError>

    readAll(): Promise<Object[]|IError>

    update(id: number, inputData: Object): Promise<Object|IError>

    delete(id: number): Promise<Object|IError>

}
