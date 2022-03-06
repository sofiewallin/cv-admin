import IUser from "../../../interfaces/IUser";
import SkillArticle from "./SkillArticle";

export default class SkillForm extends SkillArticle {
    /**
     * Return module.
     */
    async return(): Promise<HTMLElement> {
        const form = document.createElement('form') as HTMLFormElement;

        this.module = form;

        return this.module;
    }
}