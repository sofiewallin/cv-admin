import App from "../../../App";
import Skill from "../../../models/Skill";
import Module from "../Module";
import IModule from "../../../interfaces/IModule";
import ISkill from "../../../interfaces/ISkill";
import IError from "../../../interfaces/IError";
import SkillArticle from "./SkillArticle";
import SkillForm from "./SkillForm";

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

        // Write error if there is one
        if (!Array.isArray(skills)) {
            const app = new App();
            await app.writeMessage('error', (skills as IError).error);  
            return;
        }

        return skills as ISkill[];
    }

    /**
     * Return module.
     */
    async return(): Promise<HTMLElement> {
        // Create section and set as module
        const section = await this.returnSection('skills');
        this.module = section;

        // Create section heading and add it to section
        const heading = await this.returnHeading(2, 'Skills');
        this.module.append(heading);

        // Get all skills
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
        const heading = await this.returnHeading(3, skillType);
        this.module.append(heading);

        const filteredSkills = this.skills.filter(skill => skill.type === skillType);
        const skillListItems = await this.returnSkillListItems(filteredSkills, skillType.toLowerCase());
        const skillList = await this.returnUlList(`${skillType.toLowerCase()}-skills`, skillListItems);
        
        return skillList;
    }

    async returnSkillListItems(skills: ISkill[], skillType: string): Promise<HTMLLIElement[]> {
        let listItems: HTMLLIElement[] = [];

        if (skills.length > 0) {
            const result = skills.map(async skill => {
                const listItem = document.createElement('li') as HTMLLIElement;
                listItem.id = `skill-${skill.id}`;

                await this.appendModule(
                    new SkillArticle(
                        this.apiUrl,
                        this.user,
                        skill.id, 
                        skill.title, 
                        skill.order
                    ), listItem
                );

                await this.appendModule(
                    new SkillForm(
                        this.apiUrl, 
                        this.user, 
                        true,
                        'Skill',
                        skillType,
                        skill.id, 
                        skill.title, 
                        skill.order
                    ), listItem
                );

                listItems.push(listItem);
            });
            await Promise.all(result);
        }

        const newSkillFormListItem = document.createElement('li') as HTMLLIElement;
        newSkillFormListItem.classList.add('new-skill');
        await this.appendModule(
            new SkillForm(this.apiUrl, this.user, false, 'Skill', skillType), 
            newSkillFormListItem
        );
        listItems.push(newSkillFormListItem);

        return listItems;
    }
}
