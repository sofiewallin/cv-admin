/**
 * Project interface.
 * 
 * @author: Sofie Wallin
 */
export default interface IProject {
    id: number,
    title: string,
    website: string,
    description: string,
    logo: string,
    type: string,
    order: number,
    created_at: Date,
    updated_at: Date
}
