/**
 * Skill interface.
 * 
 * @author: Sofie Wallin
 */
 export default interface ISkill {
    id: number,
    title: string,
    type: string,
    order: number,
    created_at: Date,
    updated_at: Date
}