import IEducationFillable from "./IEducationFillable";

/**
 * Education interface.
 * 
 * @author: Sofie Wallin
 */
export default interface IEducation extends IEducationFillable {
    id: number,
    created_at: Date,
    updated_at: Date
}
