// @ts-nocheck

function photographerTemplate(data) {
  // Extraire les informations du photographe
  const { name, id, portrait, city, country, tagline, price } = data;
  console.log("Photographer :", data);
  // Créer le chemin de l'image
  const picture = `./assets/photographers/${portrait}`;
  // Créer le template pour la carte du photographe
  function getUserCardDOM() {
    // Créer les éléments pour la carte du photographe
    const article = document.createElement("article");
    article.classList.add("photographer_card");
    // Créer un lien pour rediriger vers la page du photographe
    const anchor = document.createElement("a");
    anchor.setAttribute("href", `./photographer.html?id=${id}`);
    anchor.setAttribute("aria-label", `Voir le profil de ${name}`);

    anchor.setAttribute("role", "link");

    const figureimg = document.createElement("figure");
    figureimg.classList.add("photographer_card__img");
    figureimg.setAttribute("aria-label", `Portrait de ${name}`);
    // Créer l'image du photographe
    const img = document.createElement("img");
    if (id === 243) {
      img.classList.add("photographer_card__img--ellie");
    } else if (id === 82) {
      img.classList.add("photographer_card__img--tracy");
    }
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);
    figureimg.appendChild(img);
    // Créer le nom du photographe
    const h2 = document.createElement("h2");
    h2.classList.add("photographer_card__name");
    h2.textContent = name;

    // Ajouter les éléments à la carte du photographe
    anchor.appendChild(figureimg);
    anchor.appendChild(h2);
    article.appendChild(anchor);

    // Créer les éléments pour les informations du photographe
    const h3 = document.createElement("h3");
    h3.classList.add("photographer_card__location");
    h3.textContent = `${city}, ${country}`;
    article.appendChild(h3);

    // Créer les éléments pour la tagline et le prix
    const p = document.createElement("p");
    p.classList.add("photographer_card__tagline");
    p.textContent = tagline;
    article.appendChild(p);

    // Créer l'élément pour le prix
    const span = document.createElement("span");
    span.classList.add("photographer_card__price");
    span.textContent = `${price}€/jour`;
    article.appendChild(span);

    return article;
  }
  return { name, picture, getUserCardDOM };
}

function photographerTemplateById(data, medias) {
  // Extraire les informations du photographe
  const { name, id, portrait, city, country, tagline, price } = data;
  const picture = `./assets/photographers/${portrait}`;
  // Extraire les informations des médias
  // const { id, photographerId, title, image, video, likes, date, price } =
  //   medias;
  console.log("Medias :", medias);

  // Fonction pour mettre à jour la somme des likes
  function updateTotalLikes() {
    // Calculer le nombre total de likes
    const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0);
    // Sélectionner le conteneur du nombre total de likes
    const overlayLikeCount = document.querySelector(
      ".photograph-overlay__like-count"
    );
    // Mettre à jour le nombre total de likes
    overlayLikeCount.textContent = totalLikes;
  }

  // Créer le header pour le photographe
  function getUserHeaderDOM() {
    const header = document.querySelector(".photograph-header");
    header.innerHTML = "";

    // Créer les éléments pour les informations du photographe
    const photographerInfo = document.createElement("div");
    photographerInfo.classList.add("photographer_info");

    // Créer l'élément pour le nom
    const h1 = document.createElement("h1");
    h1.textContent = name;

    // Créer l'élément pour la localisation
    const location = document.createElement("p");
    location.classList.add("photographer_location");
    location.textContent = `${city}, ${country}`;

    // Créer l'élément pour la tagline
    const taglineElem = document.createElement("p");
    taglineElem.classList.add("photographer_tagline");
    taglineElem.setAttribute(
      "aria-label",
      `Tagline du photographe : ${tagline}`
    );
    taglineElem.textContent = tagline;

    // Ajouter les informations du photographe au conteneur d'infos
    photographerInfo.appendChild(h1);
    photographerInfo.appendChild(location);
    photographerInfo.appendChild(taglineElem);

    // Créer l'élément pour l'image
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("photographer_img_container");
    // Créer le portrait du photographe
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);
    img.setAttribute("aira-label", `Portrait de ${name}`);
    img.classList.add("photographer_portrait");
    if (id === 243) {
      img.classList.add("photographer_portrait--ellie");
    } else if (id === 82) {
      img.classList.add("photographer_portrait--tracy");
    }
    imgContainer.appendChild(img);

    // Créer le bouton de contact
    const contactButton = document.createElement("button");
    contactButton.classList.add("contact_button");
    contactButton.textContent = "Contactez-moi";
    contactButton.setAttribute("onclick", "displayModal()");

    // Ajouter le conteneur principal au header
    header.appendChild(photographerInfo);
    header.appendChild(contactButton);
    header.appendChild(imgContainer);

    return header;
  }

  // Créer le select pour trier les médias
  function getUserSelectDOM() {
    // Sélectionner le conteneur du select
    const select = document.querySelector(".photograph-select");
    select.innerHTML = "";

    // Créer le label
    const label = document.createElement("label");
    label.setAttribute("for", "filter");
    label.innerHTML = "Trier par";
    select.appendChild(label);
    // Créer le select
    const photographerSelect = document.createElement("select");
    photographerSelect.classList.add("photographer_select");
    photographerSelect.setAttribute("name", "filter");
    photographerSelect.setAttribute("id", "filter");

    photographerSelect.setAttribute("role", "listbox");

    // Créer et ajouter les options
    // Ajouter une option pour trier par popularité
    const option1 = document.createElement("option");
    option1.classList.add("photographer_select__option");
    option1.setAttribute("id", "popularite");
    option1.setAttribute("selected", "selected");
    option1.value = "popularite";
    option1.text = "Popularité";
    option1.setAttribute("role", "option");
    photographerSelect.appendChild(option1);
    // Ajouter une option pour trier par date
    const option2 = document.createElement("option");
    option2.classList.add("photographer_select__option");
    option2.setAttribute("id", "date");
    option2.value = "date";
    option2.text = "Date";
    option2.setAttribute("role", "option");
    photographerSelect.appendChild(option2);
    // Ajouter une option pour trier par titre
    const option3 = document.createElement("option");
    option3.classList.add("photographer_select__option");
    option3.setAttribute("id", "titre");
    option3.value = "titre";
    option3.text = "Titre";
    option3.setAttribute("role", "option");
    photographerSelect.appendChild(option3);

    // Ajouter le select au DOM
    select.appendChild(photographerSelect);

    // Ajouter un écouteur d'événements pour le select
    select.addEventListener("change", (event) => {
      // Trier les médias en fonction de la valeur sélectionnée
      if (event.target.value === "popularite") {
        // Trier les médias par popularité
        medias.sort((a, b) => b.likes - a.likes);
      } else if (event.target.value === "date") {
        // Trier les médias par date
        medias.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (event.target.value === "titre") {
        // Trier les médias par titre
        medias.sort((a, b) => a.title.localeCompare(b.title));
      }
      getPhotographerGalleryDOM();
      Lightbox.init();
    });
  }

  // Créer la galerie pour les médias du photographe
  function getPhotographerGalleryDOM() {
    const gallery = document.querySelector(".photograph-gallery");
    gallery.innerHTML = "";

    const galleryContainer = document.createElement("div");
    galleryContainer.classList.add("photograph-gallery__container");

    const firstName = data.name.split(" ")[0];

    medias.forEach((media) => {
      const photoTemplate = document.createElement("div");
      photoTemplate.classList.add("photo-template");

      let mediaElement;
      if (media.image) {
        mediaElement = document.createElement("img");
        mediaElement.setAttribute(
          "src",
          `./assets/images/${firstName}/${media.image}`
        );
      } else if (media.video) {
        mediaElement = document.createElement("video");
        mediaElement.setAttribute(
          "src",
          `./assets/images/${firstName}/${media.video}`
        );
      }
      mediaElement.classList.add("photo-template__photo");
      mediaElement.classList.add("lightbox-link");
      mediaElement?.setAttribute("id", media.id);
      mediaElement.setAttribute("alt", media.title);
      mediaElement.setAttribute("aria-label", media.title);
      mediaElement.setAttribute("tabindex", "0");

      const photoInfo = document.createElement("div");
      photoInfo.classList.add("photo-template__info");

      const photoTitle = document.createElement("span");
      photoTitle.classList.add("photo-template__title");
      photoTitle.textContent = media.title;

      const likeContainer = document.createElement("div");
      likeContainer.classList.add("photo-template__like-container");

      const likeCount = document.createElement("span");
      likeCount.classList.add("photo-template__like-count");
      likeCount.textContent = media.likes;

      const likeButton = document.createElement("button");
      likeButton.classList.add("photo-template__like-button");
      likeButton.setAttribute("aria-label", "Like");
      likeButton.setAttribute("aria-pressed", "false");

      let incrementLike = true;
      likeButton.addEventListener("click", () => {
        if (incrementLike) {
          media.likes += 1;
          likeButton.setAttribute("aria-pressed", "true");
          incrementLike = false;
        } else {
          media.likes -= 1;
          likeButton.setAttribute("aria-pressed", "false");
          incrementLike = true;
        }
        likeCount.textContent = media.likes;
        updateTotalLikes();
      });

      const likeIcon = document.createElement("i");
      likeIcon.classList.add(
        "fa-solid",
        "fa-heart",
        "photo-template__like-icon"
      );
      likeIcon.setAttribute("aria-label", "Like");

      likeButton.appendChild(likeIcon);
      likeContainer.appendChild(likeCount);
      likeContainer.appendChild(likeButton);
      photoTemplate.appendChild(mediaElement);
      photoTemplate.appendChild(photoInfo);
      photoInfo.appendChild(photoTitle);
      photoInfo.appendChild(likeContainer);

      galleryContainer.appendChild(photoTemplate);
    });

    gallery.appendChild(galleryContainer);

    return galleryContainer;
  }

  function getPhotographerOverlay() {
    // Sélectionner le conteneur de la overlay
    const overlay = document.querySelector(".photograph-overlay");
    overlay.innerHTML = "";

    // Créer les éléments pour l'overlay
    const overlayLike = document.createElement("div");
    overlayLike.classList.add("photograph-overlay__like");

    const overlayLikeCount = document.createElement("p");
    overlayLikeCount.classList.add("photograph-overlay__like-count");

    const overlayLikeIcon = document.createElement("i");
    overlayLikeIcon.classList.add(
      "fa-solid",
      "fa-heart",
      "photograph-overlay__like-icon"
    );
    overlayLikeIcon.setAttribute("aria-hidden", "true");
    overlayLikeIcon.setAttribute("aria-label", "Like");

    const overlayPrice = document.createElement("p");
    overlayPrice.classList.add("photograph-overlay__price");
    overlayPrice.textContent = `${price}€/jour`;

    overlayLike.appendChild(overlayLikeCount);
    overlayLike.appendChild(overlayLikeIcon);
    overlay.appendChild(overlayLike);
    overlay.appendChild(overlayPrice);

    // Initialise la somme des likes
    updateTotalLikes();

    return overlay;
  }

  // Fonction de suppression des accents
  function removeAccents(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s/g, "_");
  }

  function createForm() {
    const modalDiv = document.querySelector(".modal");
    modalDiv.innerHTML = "";

    const header = document.createElement("header");
    const h2 = document.createElement("h2");
    h2.innerHTML = "Contactez-moi" + "<br>" + data.name;
    header.appendChild(h2);
    const img = document.createElement("img");
    img.setAttribute("src", "./assets/icons/close.svg");
    img.setAttribute("onclick", "closeModal()");
    img.setAttribute("alt", "Fermer le formulaire de contact");
    img.setAttribute("aria-label", "Fermer le formulaire de contact");
    header.appendChild(img);
    modalDiv.appendChild(header);

    const form = document.createElement("form");
    form.setAttribute("id", "contact_form");
    form.addEventListener("submit", handleSubmit);
    form.setAttribute("aria-labelledby", "contactez-moi");

    const div = document.createElement("div");

    const labels = ["Prénom", "Nom", "Email", "Votre message"];
    labels.forEach((labelText) => {
      // Créer une div pour contenir le couple label-input
      const containerDiv = document.createElement("div");
      containerDiv.classList.add("input_container");

      // Créer et configurer le label
      const label = document.createElement("label");
      const id = removeAccents(labelText);
      label.innerHTML = labelText;
      label.setAttribute("for", id);
      label.classList.add("contact_label");
      containerDiv.appendChild(label);

      // Créer et configurer l'input ou textarea
      if (labelText === "Votre message") {
        const textarea = document.createElement("textarea");
        textarea.setAttribute("name", id);
        textarea.setAttribute("id", id);
        textarea.setAttribute("aria-label", "Entrez votre message ici");
        textarea.setAttribute("aria-required", "true");
        textarea.setAttribute("rows", "5");
        textarea.setAttribute("cols", "33");
        containerDiv.appendChild(textarea);
      } else {
        const input = document.createElement("input");
        if (labelText === "Email") {
          input.setAttribute("type", "email");
          input.setAttribute("aria-label", "Entrez votre adresse email");
        } else {
          input.setAttribute("type", "text");
          input.setAttribute(
            "aria-label",
            `Entrez votre ${labelText.toLowerCase()}`
          );
        }
        input.setAttribute("name", id);
        input.setAttribute("id", id);
        input.setAttribute("aria-required", "true");
        containerDiv.appendChild(input);
      }

      // Ajouter le containerDiv au div parent
      div.appendChild(containerDiv);
    });

    form.appendChild(div);

    const button = document.createElement("button");
    button.classList.add("contact_button");
    button.innerHTML = "Envoyer";
    button.setAttribute("aria-label", "Envoyer le formulaire de contact");
    form.appendChild(button);

    modalDiv.appendChild(form);

    return modalDiv;
  }

  // Rendre la fonction createForm accessible globalement
  window.createForm = createForm;

  return {
    name,
    picture,
    getUserHeaderDOM,
    getUserSelectDOM,
    getPhotographerGalleryDOM,
    getPhotographerOverlay,
    createForm,
  };
}
