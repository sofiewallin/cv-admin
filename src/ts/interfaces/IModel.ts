import IUser from "./IUser";
import IError from "./IError";

/**
 * Model interface.
 * 
 * @author: Sofie Wallin
 */
export default interface IModel {
    apiUrl: string;
    user: IUser;

    create(input: Object): Promise<Object|IError>

    readAll(): Promise<Object[]|IError>

    update(id: number, input: Object): Promise<Object|IError>

    delete(id: number): Promise<Object|IError>

}
