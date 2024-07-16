// @ts-nocheck

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "modalTitle");
  modal.setAttribute("aria-describedby", "modalDescription");
  // Appel la fonction createForm définie globalement
  if (typeof createForm === "function") {
    createForm();
  } else {
    console.error("createForm n'est pas définie.");
  }

  const bodyContent = document.getElementById("body");
  bodyContent.setAttribute("aria-hidden", "true");

  // Focus sur le premier élément de la modal
  const focusableElements = modal.querySelectorAll(
    "img, button, input, textarea"
  );
  if (focusableElements.length > 0) {
    focusableElements[1].focus();
  }
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");

  // Rendre les éléments en arrière-plan accessibles à nouveau
  const bodyContent = document.getElementById("body");
  bodyContent.removeAttribute("aria-hidden");

  // Restaurer le focus sur l'élément qui a ouvert la modal dans ce cas le bouton "contactez-moi"
  const triggerButton = document.getElementById("openModalButton");
  if (triggerButton) {
    triggerButton.focus();
  }
}

// Fermer le modal en cliquant sur le bouton de fermeture grace à la touche echap
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
  const modal = document.getElementById("contact_modal");
  if (modal.style.display === "block" && event.key === "Tab") {
    const focusableElements = modal.querySelectorAll(
      "img, button, input, textarea"
    );
    const firstElement = focusableElements[1];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Si Shift+Tab est pressé
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Si Tab est pressé
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
});

function validateFirstNameLastName(firstNameField, lastNameField) {
  let nameRegExp = /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ-]{1,}$/;
  let isValid = true;

  if (!nameRegExp.test(firstNameField.value.trim())) {
    firstNameField.parentElement.setAttribute(
      "data-error",
      "Le prénom est invalide. Il doit contenir au moins 2 caractères et ne peut contenir que des lettres (minuscules ou majuscules), des lettres accentuées et des tirets."
    );
    firstNameField.parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  } else {
    firstNameField.parentElement.removeAttribute("data-error");
    firstNameField.parentElement.removeAttribute("data-error-visible");
  }

  if (!nameRegExp.test(lastNameField.value.trim())) {
    lastNameField.parentElement.setAttribute(
      "data-error",
      "Le nom est invalide. Il doit contenir au moins 2 caractères et ne peut contenir que des lettres (minuscules ou majuscules), des lettres accentuées et des tirets."
    );
    lastNameField.parentElement.setAttribute("data-error-visible", "true");
    isValid = false;
  } else {
    lastNameField.parentElement.removeAttribute("data-error");
    lastNameField.parentElement.removeAttribute("data-error-visible");
  }

  return isValid;
}

function validateField(field, regex, errorMessage) {
  if (field) {
    const value = field.value.trim();
    if (!regex.test(value)) {
      field.parentElement.setAttribute("data-error", errorMessage);
      field.parentElement.setAttribute("data-error-visible", "true");
      return false;
    } else {
      field.parentElement.removeAttribute("data-error");
      field.parentElement.removeAttribute("data-error-visible");
      return true;
    }
  } else {
    console.error("Field is null");
    return false;
  }
}

function validateForm() {
  const firstName = document.getElementById("Prenom");
  const lastName = document.getElementById("Nom");
  const email = document.getElementById("Email");
  const message = document.getElementById("Votre_message");

  const isFirstNameLastNameValid = validateFirstNameLastName(
    firstName,
    lastName
  );
  const isEmailValid = validateField(
    email,
    /^([a-z0-9._%+-]+)@([a-z0-9.-]+)\.([a-z]{2,})$/,
    "L'email est invalide. Veuillez entrer un email valide."
  );
  const isMessageValid = validateField(
    message,
    /.+/,
    "Le message ne peut pas être vide."
  );

  return isFirstNameLastNameValid && isEmailValid && isMessageValid;
}

function handleSubmit(event) {
  event.preventDefault();
  if (validateForm()) {
    const formData = new FormData(event.target);
    console.log("Form Data:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    closeModal();
    event.target.reset();
  } else {
    console.log("Invalid form submission");
  }
  return {
    validateForm,
    handleSubmit,
    displayModal,
    closeModal,
  };
}
