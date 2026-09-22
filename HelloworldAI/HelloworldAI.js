const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("name-input");
const greeting = document.getElementById("greeting");

nameForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    greeting.textContent = `Hello, ${name} !`;
});