import IProjectFillable from "./IProjectFillable"
/**
 * Project interface.
 * 
 * @author: Sofie Wallin
 */
export default interface IProject extends IProjectFillable {
    id: number,
    created_at: Date,
    updated_at: Date
}
