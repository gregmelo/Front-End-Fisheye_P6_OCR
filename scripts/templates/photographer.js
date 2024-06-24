function photographerTemplate(data) {
  // Extraire les informations du photographe
  const { name, id, portrait, city, country, tagline, price } = data;
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

    // Créer l'image du photographe
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);

    // Créer le nom du photographe
    const h2 = document.createElement("h2");
    h2.classList.add("photographer_card__name");
    h2.textContent = name;

    // Ajouter les éléments à la carte du photographe
    anchor.appendChild(img);
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
  const { name, portrait, city, country, tagline } = data;
  const picture = `./assets/photographers/${portrait}`;
  // Extraire les informations des médias
  const { id, photographerId, title, image, video, likes, date, price } =
    medias;
  console.log("Medias :", medias);

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
    location;
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

    // Créer et ajouter les options
    // Ajouter une option pour trier par popularité
    const option1 = document.createElement("option");
    option1.classList.add("photographer_select__option");
    option1.setAttribute("id", "popularite");
    option1.setAttribute("selected", "selected");
    option1.value = "popularite";
    option1.text = "Popularité";
    photographerSelect.appendChild(option1);
    // Ajouter une option pour trier par date
    const option2 = document.createElement("option");
    option2.classList.add("photographer_select__option");
    option2.setAttribute("id", "date");
    option2.value = "date";
    option2.text = "Date";
    photographerSelect.appendChild(option2);
    // Ajouter une option pour trier par titre
    const option3 = document.createElement("option");
    option3.classList.add("photographer_select__option");
    option3.setAttribute("id", "titre");
    option3.value = "titre";
    option3.text = "Titre";
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
    });
  }

  // Créer la galerie pour les médias du photographe
  function getPhotographerGalleryDOM() {
    // Sélectionner le conteneur de la galerie
    const gallery = document.querySelector(".photograph-gallery");
    gallery.innerHTML = "";

    // Créer les éléments pour les photos du photographe
    const galleryContainer = document.createElement("div");
    galleryContainer.classList.add("photograph-gallery__container");

    // Extraire le prénom du photographe
    const firstName = data.name.split(" ")[0];
    console.log("Prénom du photographe :", firstName);

    // Créer les modèles pour les photos
    medias.forEach((media) => {
      // Créer le modèle pour la photo
      const photoTemplate = document.createElement("div");
      photoTemplate.classList.add("photo-template");

      // Créer l'élément pour la photo
      let mediaElement;
      // Vérifier si la photo est une image ou une vidéo
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
      // Ajouter les attributs communs à la photo
      mediaElement.classList.add("photo-template__photo");
      mediaElement.setAttribute("alt", media.title);
      mediaElement.setAttribute("aria-label", media.title);

      // Créer les éléments pour les informations de la photo
      const photoInfo = document.createElement("div");
      photoInfo.classList.add("photo-template__info");

      // Créer l'élément pour le titre de la photo
      const photoTitle = document.createElement("span");
      photoTitle.classList.add("photo-template__title");
      photoTitle.textContent = media.title;

      // Créer les éléments pour les likes
      const likeContainer = document.createElement("div");
      likeContainer.classList.add("photo-template__like-container");

      // Créer l'élément pour le nombre de likes
      const likeCount = document.createElement("span");
      likeCount.classList.add("photo-template__like-count");
      likeCount.textContent = media.likes;

      // Créer le bouton pour les likes
      const likeButton = document.createElement("button");
      likeButton.classList.add("photo-template__like-button");
      likeButton.setAttribute("aria-label", "Like");

      // Ajouter un écouteur d'événements pour le bouton de like
      let incrementLike = true;
      likeButton.addEventListener("click", () => {
        // Incrémenter ou décrémenter le nombre de likes
        if (incrementLike) {
          media.likes += 1;
          incrementLike = false;
        } else {
          media.likes -= 1;
          incrementLike = true;
        }
        // Mettre à jour le nombre de likes
        likeCount.textContent = media.likes;
      });

      // Créer l'icône pour les likes
      const likeIcon = document.createElement("i");
      likeIcon.classList.add(
        "fa-solid",
        "fa-heart",
        "photo-template__like-icon"
      );
      likeIcon.setAttribute("aria-label", "Like");

      // Ajouter les éléments au modèle de photo
      likeButton.appendChild(likeIcon);
      likeContainer.appendChild(likeCount);
      likeContainer.appendChild(likeButton);
      photoTemplate.appendChild(mediaElement);
      photoTemplate.appendChild(photoInfo);
      photoInfo.appendChild(photoTitle);
      photoInfo.appendChild(likeContainer);

      // Ajouter le modèle de photo au conteneur de la galerie
      galleryContainer.appendChild(photoTemplate);
    });

    // Ajouter les éléments au DOM
    gallery.appendChild(galleryContainer);

    return galleryContainer;
  }

  function getPhotographerInsert() {
    // Sélectionner le conteneur de la insert
    const gallery = document.querySelector(".photograph-insert");
    gallery.innerHTML = "";

    // Créer les éléments pour l'insert
    const insertContainer = document.createElement("div");
    insertContainer.classList.add("photograph-insert__container");

    const insertLike = document.createElement("div");
    insertLike.classList.add("photograph-insert__like");

    const insertLikeCount = document.createElement("p");
    insertLikeCount.classList.add("photograph-insert__like-count");
    insertLikeCount.textContent = "0";

    const insertLikeIcon = document.createElement("i");
    insertLikeIcon.classList.add(
      "fa-solid",
      "fa-heart",
      "photograph-insert__like-icon"
    );

    const insertPrice = document.createElement("p");
    insertPrice.classList.add("photograph-insert__price");

    insertLike.appendChild(insertLikeCount);
    insertLike.appendChild(insertLikeIcon);
    insertContainer.appendChild(insertLike);
    insertContainer.appendChild(insertPrice);

    return insertContainer;
  }

  return {
    name,
    picture,
    getUserHeaderDOM,
    getUserSelectDOM,
    getPhotographerGalleryDOM,
    getPhotographerInsert,
  };
}
