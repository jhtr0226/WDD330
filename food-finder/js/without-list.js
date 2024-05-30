import { initTemplate } from "./base.mjs";
import { dark } from "./dark-mode.mjs";
dark();
initTemplate();
document.addEventListener('DOMContentLoaded', () => {
    const withoutIngredientsForm = document.getElementById('without-ingredients-form');

    loadIngredients('without');

    withoutIngredientsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addIngredient('without');
    });
});

function addIngredient(type) {
    const input = document.querySelector(`#${type}-ingredients-form input[name="ingredient"]`);
    const ingredient = input.value.trim();

    if (ingredient) {
        const list = document.getElementById(`${type}-ingredients-list`);
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteIngredient(type, ingredient, listItem);

        listItem.appendChild(deleteButton);
        list.appendChild(listItem);

        saveIngredient(type, ingredient);
        input.value = '';
    }
}

function saveIngredient(type, ingredient) {
    let ingredients = JSON.parse(localStorage.getItem(`${type}-ingredients`)) || [];
    ingredients.push(ingredient);
    localStorage.setItem(`${type}-ingredients`, JSON.stringify(ingredients));
}

function loadIngredients(type) {
    const ingredients = JSON.parse(localStorage.getItem(`${type}-ingredients`)) || [];
    const list = document.getElementById(`${type}-ingredients-list`);

    ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteIngredient(type, ingredient, listItem);

        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    });
}

function deleteIngredient(type, ingredient, listItem) {
    listItem.remove();

    let ingredients = JSON.parse(localStorage.getItem(`${type}-ingredients`)) || [];
    ingredients = ingredients.filter(item => item !== ingredient);
    localStorage.setItem(`${type}-ingredients`, JSON.stringify(ingredients));
}