async function getPhotographers() {
  let photographers = window.localStorage.getItem("photographers");
  if (photographers === null) {
    // Récupération des données depuis l'API
    const reponse = await fetch("./data/photographers.json");
    const data = await reponse.json();
    photographers = data.photographers;
    // Transformation des données en JSON
    const valeurPhotographers = JSON.stringify(photographers);
    // Stockage des informations dans le localStorage sous la clé "photographers"
    window.localStorage.setItem("photographers", valeurPhotographers);
  } else {
    photographers = JSON.parse(photographers);
  }
  return { photographers };
}

async function displayData(data) {
  if (!data || !data.photographers) {
    console.error("Data format is incorrect:", data);
    return;
  }

  const photographersSection = document.querySelector(".photographer_section");
  data.photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const data = await getPhotographers();
  displayData(data);
}

init();
