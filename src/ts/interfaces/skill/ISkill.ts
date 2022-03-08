import ISkillFillable from "./ISkillFillable"
/**
 * Skill interface.
 * 
 * @author: Sofie Wallin
 */
export default interface ISkill extends ISkillFillable {
    id: number,
    created_at: Date,
    updated_at: Date
}
