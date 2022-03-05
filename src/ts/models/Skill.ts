// Interfaces
import IError from "../interfaces/IError";
import ISkill from "../interfaces/ISkill";
import IUser from "../interfaces/IUser";

export default class Skill {

    // Properties
    public apiUrl: string;
    public user: IUser;

    /**
     * Constructor
     */
    constructor(apiUrl: string, user: IUser) {
        this.apiUrl = apiUrl;
        this.user = user;
    }

    /**
     * Create skill.
     */
    async create(skill: ISkill)/*: Promise<ISkill|IError>*/ {

    }

    /**
     * Read all skills.
     */
     async readAll()/*: Promise<ISkill[]|IError>*/ {
        
    }

    /**
     * Update one skill by id.
     */
     async update(id: number)/*: Promise<ISkill|IError>*/ {
        
    }

    /**
     * Delete one skill by id.
     */
     async delete(id: number)/*: Promise<ISkill|IError>*/ {
        
    }
}
