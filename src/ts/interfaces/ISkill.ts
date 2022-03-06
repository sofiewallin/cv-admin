import IObject from "./IObject"

// Skill types
enum SkillType {
    Professional = 'Professional',
    Technical = 'Technical',
    Personal = 'Personal',
    Lingual = 'Lingual'
}

/**
 * Skill interface.
 * 
 * @author: Sofie Wallin
 */
 export default interface ISkill extends IObject {
    title: string,
    type: SkillType,
    order: number
}
