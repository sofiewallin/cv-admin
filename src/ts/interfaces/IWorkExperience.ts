/**
 * Work experience interface.
 * 
 * @author: Sofie Wallin
 */
 export default interface IWorkExperience {
    role: string,
    workplace?: string,
    workplace_website?: string,
    start_date: Date,
    end_date?: Date,
    order: number
}
