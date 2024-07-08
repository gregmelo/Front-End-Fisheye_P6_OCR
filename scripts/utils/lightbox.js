/**
 * @property {HTMLElement} element
 * @property {string[]} images Liste des media des images de la galerie
 * @property {string} src src de l'image actuellement affichée
 *
 */
class Lightbox {
  static init() {
    const links = Array.from(document.querySelectorAll(".lightbox-link"));
    const gallery = links.map((media) => {
      const src = media.getAttribute("src");
      console.log(`src extrait : ${src}`); // Ajout d'un log pour vérifier les srcs
      return src;
    });
    console.log("gallery : ", gallery);
    links.forEach((media) => {
      media.addEventListener("click", (e) => {
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute("src"), gallery);
      });
    });
  }

  /**
   * @param {string} media media de l'image à afficher
   * @param {string[]} images Liste des media des images de la galerie
   */
  constructor(media, images) {
    console.log("media : ", media);
    console.log("images : ", images);
    this.element = this.buildDOM(media);
    this.images = images;
    this.loadMedia(media);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }
  /**
   *
   * @param {string} media media de l'image à afficher
   */

  loadMedia(media) {
    this.media = null;
    const container = this.element.querySelector(".lightbox__media");
    const loader = document.createElement("div");
    loader.classList.add("lightbox__loader");
    container.innerHTML = "";
    container.appendChild(loader);

    // Déterminer si le média est une image ou une vidéo
    const isImage = media.match(/\.(jpeg|jpg|gif|png)$/) !== null;
    const isVideo = media.match(/\.(mp4|webm|ogg)$/) !== null;

    if (isImage) {
      const image = new Image();
      image.onload = () => {
        container?.removeChild(loader);
        container?.appendChild(image);
        this.media = media;
      };
      image.src = media;
    } else if (isVideo) {
      const video = document.createElement("video");
      video.controls = true;
      video.onloadeddata = () => {
        container?.removeChild(loader);
        container?.appendChild(video);
        this.media = media;
      };
      video.src = media;
      video.load();
    } else {
      console.error("Unsupported media type:", media);
      container?.removeChild(loader);
    }
  }

  /**
   * @param {KeyboardEvent} e
   */
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    }
  }

  /**
   * Ferme la lightbox
   * @param {MouseEvent} e
   */
  close(e) {
    e.preventDefault();
    this.element.style.display = "none";
    document.body.classList.remove("no-scroll");
    window.setTimeout(() => {
      this.element.remove();
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  /**
   * Affiche l'image suivante
   * @param {MouseEvent} e
   */
  next(e) {
    e.preventDefault();
    let index = this.images.findIndex((image) => image === this.media);
    if (index === this.images.length - 1) {
      index = -1;
    }
    this.loadMedia(this.images[index + 1]);
  }

  /**
   * Affiche l'image suivante
   * @param {MouseEvent} e
   */
  prev(e) {
    e.preventDefault();
    let index = this.images.findIndex((image) => image === this.media);
    if (index === 0) {
      index = this.images.length;
    }
    this.loadMedia(this.images[index - 1]);
  }

  /**
   * @param {string} media media de l'image à afficher
   * @return {HTMLElement}
   */
  buildDOM(media) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.style.display = "block";
    document.body.classList.add("no-scroll");
    dom.innerHTML = `
        <button class="lightbox__close"></button>
          <button class="lightbox__prev"></button>
          <div class="lightbox__media"></div>
          <button class="lightbox__next"></button>
    `;
    dom
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightbox__next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox__prev")
      .addEventListener("click", this.prev.bind(this));
    return dom;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Lightbox.init();
});
