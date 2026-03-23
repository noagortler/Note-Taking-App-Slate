// dark/light mode toggle
const themeSwitch = document.getElementById("theme-switch");

if (themeSwitch) {

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        themeSwitch.checked = true;
        document.querySelector(".theme-text").textContent = "Dark";
    }

    themeSwitch.addEventListener("change", function() {
        if (themeSwitch.checked) {
            document.body.classList.add("dark-mode");
            document.querySelector(".theme-text").textContent = "Dark";
            localStorage.setItem("darkMode", "true");
        } else {
            document.body.classList.remove("dark-mode");
            document.querySelector(".theme-text").textContent = "Light";
            localStorage.setItem("darkMode", "false")
        }
    });
}


// edit note button - nav to edit page
document.querySelectorAll(".note-card-actions .edit-btn, .note-actions .edit-btn").forEach(button => {
    button.addEventListener("click", function() {
        window.location.href = `/notes/${this.id}/edit`;
    });
});

// change header color when category changes on edit page
const categorySelect = document.getElementById("category");
if (categorySelect) {
    categorySelect.addEventListener("change", function() {
        const header = document.querySelector(".edit-header");
        header.classList.remove("notes", "todo", "list");

        if (this.value === "Notes") header.classList.add("notes");
        if (this.value === "To-Do") header.classList.add("todo");
        if (this.value === "List") header.classList.add("list");
    });
}

// saved edited note
const editForm = document.getElementById("edit-form");
if (editForm) {
    document.getElementById("save-btn").addEventListener("click", function () {
        console.log("Save button clicked");
        const noteId = editForm.dataset.id;
        console.log("Note ID: " + noteId);
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const category = document.getElementById("category").value;

        fetch(`/notes/${noteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, content, category })
        })
            .then(res => {
                if (res.status === 200) {
                    window.location.href = "/notes";
                } else {
                    alert("Error updating note. Please try again.");
                }
            })
            .catch(err => {
                console.log("Update error", err);
            });
    });
}

// cancel edit
const cancelBtn = document.getElementById("cancel-btn");
if (cancelBtn) {
    cancelBtn.addEventListener("click", function() {
        window.location.href = "/notes";
    });
}

// delete note
document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", function () {
        const noteId = this.id;
        console.log("Deleting note with ID:", noteId);

        fetch(`/notes/${noteId}`, {
            method: "DELETE"
        })
            .then(res => {
                if (res.status === 204) {
                    window.location.href = "/notes";
                } else {
                    alert("Error deleting note. Please try again.");
                }
            })
            .catch(err => {
                console.log("Delete error", err);
            });
    });
});

// delete account
const deleteAccountBtn = document.getElementById("delete-account-btn");
if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", function() {
        const password = document.getElementById("delete-password").value;

        if (!password) {
            alert("Please enter your password.");
            return;
        }

        if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) {
            return;
        }

        fetch("/settings", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({password})
        })
        .then(res => {
            if (res.status === 200) {
                window.location.href = "/login";
            } else {
                return res.json().then(data => {
                    alert(data.message);
                });
            }
        })
        .catch(err => {
            console.log("Delete account error", err);
        });
    });
}
