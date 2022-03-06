import Model from "./Model";
import ISkill from "../interfaces/ISkill";
import IError from "../interfaces/IError";
import IModel from "../interfaces/IModel";

export default class Skill extends Model implements IModel {
    /**
     * Create skill in API.
     */
    async create(skill: ISkill): Promise<ISkill|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/skills`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                },
                body: JSON.stringify(skill)
            });
        
            const createdSkill = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when creating skill. Try again.');
            }

            return createdSkill;

        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Read all skills from API.
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
                throw new Error('Something went wrong when fetching skills. Try again by reloading page.');
            }
 
            return skills;

        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Update one skill by id in API.
     */
    async update(id: number, skill: ISkill): Promise<ISkill|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/skills/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                },
                body: JSON.stringify(skill)
            });
        
            const updatedSkill = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when updating skill. Try again.');
            }

            return updatedSkill;

        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Delete one skill by id in API.
     */
    async delete(id: number): Promise<ISkill|IError> {
        try {
            const response = await fetch(`${this.apiUrl}/skills/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.user.token}`
                }
            });
        
            const deletedSkill = await response.json();
        
            if (!response.ok) {
                throw new Error('Something went wrong when deleting skill. Try again.');
            }

            return deletedSkill;

        } catch (error) {
            return { error: error.message };
        }
    }
}
