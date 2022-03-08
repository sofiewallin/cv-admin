import IWorkExperienceFillable from "./IWorkExperienceFillable";

/**
 * Work experience interface.
 * 
 * @author: Sofie Wallin
 */
export default interface IWorkExperience extends IWorkExperienceFillable {
    id: number,
    created_at: Date,
    updated_at: Date
}
