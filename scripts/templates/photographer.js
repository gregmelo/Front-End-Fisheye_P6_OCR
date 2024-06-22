function photographerTemplate(data) {
  const { name, id, portrait, city, country, tagline, price } = data;

  const picture = `../../assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("photographer_card");
    const anchor = document.createElement("a");
    anchor.setAttribute("href", `../../photographer.html?id=${id}`);
    anchor.setAttribute("aria-label", `Voir le profil de ${name}`);

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);

    const h2 = document.createElement("h2");
    h2.classList.add("photographer_card__name");
    h2.textContent = name;

    anchor.appendChild(img);
    anchor.appendChild(h2);
    article.appendChild(anchor);

    const h3 = document.createElement("h3");
    h3.classList.add("photographer_card__location");
    h3.textContent = `${city}, ${country}`;
    article.appendChild(h3);

    const p = document.createElement("p");
    p.classList.add("photographer_card__tagline");
    p.textContent = tagline;
    article.appendChild(p);

    const span = document.createElement("span");
    span.classList.add("photographer_card__price");
    span.textContent = `${price}€/jour`;
    article.appendChild(span);

    return article;
  }
  return { name, picture, getUserCardDOM };
}

function photographerTemplateById(data) {
  const { name, portrait, city, country, tagline } = data;
  const picture = `../../assets/photographers/${portrait}`;

  function getUserHeaderDOM() {
    const header = document.querySelector(".photograph-header");
    header.innerHTML = "";

    // Créer les éléments pour les informations du photographe
    const photographerInfo = document.createElement("div");
    photographerInfo.classList.add("photographer_info");

    const h1 = document.createElement("h1");
    h1.textContent = name;

    const location = document.createElement("p");
    location.classList.add("photographer_location");
    location;
    location.textContent = `${city}, ${country}`;

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

  function getUserSelectDOM() {
    const select = document.querySelector(".photograph-select");
    select.innerHTML = "";

    // Créer les éléments pour les informations du photographe
    const label = document.createElement("label");
    label.setAttribute("for", "filter");
    label.innerHTML = "Trier par";
    select.appendChild(label);

    const photographerSelect = document.createElement("select");
    photographerSelect.classList.add("photographer_select");
    photographerSelect.setAttribute("name", "filter");
    photographerSelect.setAttribute("id", "filter");

    // Créer et ajouter les options
    const option1 = document.createElement("option");
    option1.classList.add("photographer_select__option");
    option1.setAttribute("id", "popularite");
    option1.setAttribute("selected", "selected");
    option1.value = "popularite";
    option1.text = "Popularité";
    photographerSelect.appendChild(option1);

    const option2 = document.createElement("option");
    option2.classList.add("photographer_select__option");
    option2.setAttribute("id", "date");
    option2.value = "date";
    option2.text = "Date";
    photographerSelect.appendChild(option2);

    const option3 = document.createElement("option");
    option3.classList.add("photographer_select__option");
    option3.setAttribute("id", "titre");
    option3.value = "titre";
    option3.text = "Titre";
    photographerSelect.appendChild(option3);

    // Ajouter le select au DOM
    select.appendChild(photographerSelect);
  }

  return {
    name,
    picture,
    getUserHeaderDOM,
    getUserSelectDOM,
  };
}
