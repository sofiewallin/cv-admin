import App from "../../../App";
import Skill from "../../../models/Skill";
import Module from "../Module";
import IModule from "../../../interfaces/IModule";
import IUser from "../../../interfaces/IUser";
import ISkill from "../../../interfaces/ISkill";
import IError from "../../../interfaces/IError";
import IModel from "../../../interfaces/IModel";
import SkillArticle from "./SkillArticle";

/**
 * Skills section module.
 * 
 * @author: Sofie Wallin
 */
export default class SkillsSection extends Module implements IModule {
    // Properties
    private skills: ISkill[];

    /**
     * Get all skills from API.
     */
    async getSkills(): Promise<ISkill[]> {
        const skillModel = new Skill(this.apiUrl, this.user);
        let skills = await skillModel.readAll();

        if (!Array.isArray(skills)) {
            skills = skills as IError;
            const app = new App();
            await app.writeMessage('error', skills.error);  
            return;
        }

        return skills as ISkill[];
    }

    /**
     * Return module.
     */
    async return(): Promise<HTMLElement> {
        // Create section
        const section = await this.returnSection('skills');
        this.module = section;

        const heading = await this.returnHeading(2, 'Skills');
        this.module.append(heading);

        // Get skills
        this.skills = await this.getSkills();
        
        // List professional skills
        const professionalSkills = await this.returnSkillList('Professional');
        this.module.append(professionalSkills);

        // List technical skills
        const technicalSkills = await this.returnSkillList('Technical');
        this.module.append(technicalSkills);

        // List personal skills
        const personalSkills = await this.returnSkillList('Personal');
        this.module.append(personalSkills);

        // List lingual skills
        const lingualSkills = await this.returnSkillList('Lingual');
        this.module.append(lingualSkills);

        // Return module
        return this.module;
    }

    async returnSkillList(skillType: string): Promise<HTMLUListElement> {
        const type = skillType;
        const heading = await this.returnHeading(3, type);
        this.module.append(heading);

        const filteredSkills = this.skills.filter(skill => skill.type === type);
        const skillListItems = await this.returnSkillListItems(filteredSkills);
        const skillList = await this.returnUlList(`${type.toLowerCase()}-skills`, skillListItems);
        
        return skillList;
    }

    async returnSkillListItems(skills: ISkill[]): Promise<HTMLLIElement[]> {
        let listItems: HTMLLIElement[] = [];

        if (skills.length > 0) {
            skills.map(async skill => {
                const listItem = document.createElement('li') as HTMLLIElement;
                listItem.id = `skill-${skill.id}`
                const newSkill = new SkillArticle(
                    this.apiUrl,
                    this.user,
                    skill.id, 
                    skill.title, 
                    skill.order
                );
                listItem.append(await newSkill.return());
                listItems.push(listItem);
            });
        }

        const newSkill = new SkillArticle(this.apiUrl, this.user);
        const newSkillListItem = document.createElement('li') as HTMLLIElement;
        newSkillListItem.classList.add('new-skill');
        newSkillListItem.append(await newSkill.return());
        listItems.push(newSkillListItem);

        return listItems;
    }
}
