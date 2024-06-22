// Fonction pour extraire l'ID de l'URL
function getPhotographerIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerById(id) {
  let photographers = window.localStorage.getItem("photographers");
  if (photographers === null) {
    try {
      // Récupération des données depuis l'API
      const response = await fetch("/data/photographers.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Afficher la structure des données pour débogage
      console.log("Données reçues depuis l'API :", data);

      // Extraire les photographes de la réponse
      photographers = data.photographers;

      // Transformation des données en JSON
      const valeurPhotographers = JSON.stringify(photographers);

      // Stockage des informations dans le localStorage sous la clé "photographers"
      window.localStorage.setItem("photographers", valeurPhotographers);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données depuis l'API :",
        error
      );
      return null;
    }
  } else {
    // Ici, nous analysons les données stockées pour obtenir l'objet global
    photographers = JSON.parse(photographers);
  }

  // Vérifiez si photographers est bien un tableau
  if (Array.isArray(photographers)) {
    // Filtrer le photographe en fonction de l'ID
    const photographer = photographers.find((p) => p.id == id);
    return photographer;
  } else {
    console.error("Photographers data is not an array:", photographers);
    return null;
  }
}

async function displayPhotographerData(photographer) {
  // Ici on s'assure que photographer n'est pas undefined
  if (photographer) {
    const photographerModel = photographerTemplateById(photographer);
    photographerModel.getUserHeaderDOM();
    photographerModel.getUserSelectDOM();
  } else {
    console.error("Photographer not found");
  }
}

async function init() {
  // Récupère l'ID du photographe depuis l'URL
  const photographerId = getPhotographerIdFromUrl();
  console.log("ID du photographe récupéré de l'URL:", photographerId);

  // Récupère les datas du photographe en fonction de son ID
  const photographer = await getPhotographerById(photographerId);
  console.log("Photographe trouvé:", photographer);

  displayPhotographerData(photographer);
}

init();
