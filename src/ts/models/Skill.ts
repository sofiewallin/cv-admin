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
    async readAll(): Promise<ISkill[]|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/skills`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                }
            });
        
            const skills = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when fetching skills. Reload page.');
            }
 
            return skills;

        } catch (error) {
            return { error: error.message };
        }
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
