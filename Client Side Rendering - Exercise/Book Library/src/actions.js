import { render } from "../../node_modules/lit-html/lit-html.js";
import { getBookById } from "./api.js";
import { editFormTemplate } from "./templates/formTemplates.js";

export async function editButtonHandler(id) {
    document.querySelector("#add-form").style.display = "none";

    const currentBook = await getBookById(id);
    const formElement = document.querySelector("#edit-form");
    formElement.style.display  = "block";
    render(editFormTemplate(currentBook, id), formElement);
}