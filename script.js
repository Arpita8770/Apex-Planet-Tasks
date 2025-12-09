document.addEventListener("DOMContentLoaded", () => {
    setupFormValidation();
    setupTodoList();
});

function setupFormValidation() {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const successMsg = document.getElementById("form-success");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); 

        clearError("name-error");
        clearError("email-error");
        clearError("subject-error");
        clearError("message-error");
        successMsg.textContent = "";

        let isValid = true;

        if (nameInput.value.trim() === "") {
            setError("name-error", "Name is required.");
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        if (emailValue === "") {
            setError("email-error", "Email is required.");
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError("email-error", "Please enter a valid email address.");
            isValid = false;
        }

        if (subjectInput.value.trim() === "") {
            setError("subject-error", "Subject is required.");
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            setError("message-error", "Message should be at least 10 characters.");
            isValid = false;
        }

        if (isValid) {
            successMsg.textContent = "Form submitted successfully! (Demo only, no real submit.)";
            form.reset();
        }
    });
}

function setError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
}

function clearError(id) {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
}

function isValidEmail(email) {
    // Very simple email regex for demo
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

    const todoInput = document.getElementById("todo-text");
    const addBtn = document.getElementById("add-todo");
    const list = document.getElementById("todo-list");
    const todoError = document.getElementById("todo-error");

    addBtn.addEventListener("click", () => {
        const text = todoInput.value.trim();
        todoError.textContent = "";

        if (text === "") {
            todoError.textContent = "Please enter a task before adding.";
            return;
        }

        const li = document.createElement("li");
        li.className = "todo-item";
        const span = document.createElement("span");
        span.textContent = text;
        span.className = "todo-text";

        span.addEventListener("click", () => {
            span.classList.toggle("completed");
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "delete-btn";

        delBtn.addEventListener("click", () => {
            list.removeChild(li);
        });

        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);

        todoInput.value = "";
        todoInput.focus();
    });

    todoInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            addBtn.click();
        }
    });