// delete note
document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", function() {
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


// edit note
document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", function() {
        window.location.href = `/notes/${this.id}/edit`;
    });
});