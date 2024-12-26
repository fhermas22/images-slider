const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // montre et cache l'icone prec/suiv en accord avec la valeur du carousel lorsqu'il défile à gauche
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // obtiens le max de largeur scrollable 
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // obtiens la largeur de la premiere images & ajoute 14 comme valeur de margin
        // si cliqué l'icone est à gauche, reduit la valeur de la largeur depuis le carousel defile à gauche sinon le lui ajoute
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth: firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // appelle showHideIcons après 60ms
    })
});

const autoSlide = () => {
    // s'il n'y a pas d'image laissée pour faire défiler le retour ici
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff); // met une valeur positive à positionDiff
    let firstImgWidth = firstImg.clientWidth + 14;
    // obtiens une différence de valeur dont on a besoin pour ajouter ou réduire depuis le carousel gauche vers le centre img moyen
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // si l'utilisateur défile vers la droite
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // si l'utilisateur défile vers la gauche
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // met à jour les valeurs variables globales sur l'évènement souris bas
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // défilement des images/carousel vers la gauche selon le pointeur de la souris  
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    autoSlide();

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
