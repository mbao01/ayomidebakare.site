let slides;
let slideIndex = 1;

function showSlidesByClick(n) {
  n = n || slideIndex++;

  if (slides) {
    let i;
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[slideIndex - 1].style.display = 'block';
  }
}

// Next Image
function plusSlides(n) {
  showSlidesByClick(slideIndex += n);
}

// Previous Image
function currentSlide(n) {
  showSlidesByClick(slideIndex = n);
}

export default (groupId) => {
  if (groupId && typeof groupId === 'string') {
    slides = (document.getElementById(groupId) || {}).children;

    setTimeout(showSlidesByClick, 3000); // Change image every 2 seconds
  }
}
