import { html } from "../../../node_modules/lit-html/lit-html.js";
import { addFormTemplate, editFormTemplate } from "./formTemplates.js";
import { tableTemplate } from "./tableTemplate.js";
import { loadButtonTemplate } from "./loadButtonTemplate.js";

export const mainTemplate = () => {
    return html`
                ${loadButtonTemplate()} ${tableTemplate()}

                <form id="add-form">${addFormTemplate()}</form>
                <form id="edit-form" style="display: none"></form>`;
}