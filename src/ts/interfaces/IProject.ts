// Project types
enum ProjectType {
    Professional = 'Professional',
    Student = 'Student',
    Personal = 'Personal'
}

/**
 * Project interface.
 * 
 * @author: Sofie Wallin
 */
 export default interface IProject {
    title: string,
    website?: string,
    description?: string,
    logo: string,
    type: ProjectType,
    order: number
}
