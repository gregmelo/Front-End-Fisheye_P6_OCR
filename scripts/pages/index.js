async function getPhotographers() {
  let photographers = window.localStorage.getItem("photographers");
  if (photographers === null) {
    try {
      // Récupération des données depuis l'API
      const response = await fetch("./data/photographers.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      photographers = data.photographers;
      // Transformation des données en JSON
      const valeurPhotographers = JSON.stringify(photographers);
      // Stockage des informations dans le localStorage sous la clé "photographers"
      window.localStorage.setItem("photographers", valeurPhotographers);
    } catch (error) {
      console.error("Erreur lors de la récupération des photographes:", error);
      return { photographers: [] }; // Retourne un tableau vide en cas d'erreur
    }
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
