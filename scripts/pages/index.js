async function getPhotographers() {
  // Récupération des photographes éventuellement stockés dans le localStorage
  let photographers = window.localStorage.getItem("photographers");
  if (photographers === null) {
    // Récupération des données depuis l'API
    const reponse = await fetch("/data/photographers.json");
    photographers = await reponse.json();
    // Transformation des données en JSON
    const valeurPhotographers = JSON.stringify(photographers);
    // Stockage des informations dans le localStorage sous la clé "photographers"
    window.localStorage.setItem("photographers", valeurPhotographers);
  } else {
    photographers = JSON.parse(photographers);
  }
  // Retourner le tableau photographers seulement une fois récupéré
  return photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
