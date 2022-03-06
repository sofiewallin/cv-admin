import IObject from "./IObject"

/**
 * Work experience interface.
 * 
 * @author: Sofie Wallin
 */
 export default interface IWorkExperience extends IObject {
    role: string,
    workplace?: string,
    workplace_website?: string,
    start_date: Date,
    end_date?: Date,
    order: number
}
