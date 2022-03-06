import IObject from "./IObject"

// Ecucation types
enum EducationType {
    Program = 'Program',
    Course = 'Course'
}

/**
 * Education interface.
 * 
 * @author: Sofie Wallin
 */
 export default interface IEducation extends IObject {
    name: string,
    degree?: string,
    institution: string,
    institution_website?: string,
    start_date: Date,
    end_date?: Date,
    type: EducationType,
    order: number
}
