function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  // Appel la fonction createForm définie globalement
  if (typeof createForm === "function") {
    createForm();
  } else {
    console.error("createForm n'est pas définie.");
  }
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Fermer le modal en cliquant sur le bouton de fermeture grace à la touche echap
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

const lastNameField = document.getElementById("last");
const firstNameField = document.getElementById("first");
const emailField = document.getElementById("email");
