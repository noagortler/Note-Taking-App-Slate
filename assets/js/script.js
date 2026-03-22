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
document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", function () {
        window.location.href = `/notes/${this.id}/edit`;
    });
});

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
