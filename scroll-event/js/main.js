// First screen
const firstScreen = document.querySelector('.first-screen');
const logo = document.querySelector('.logo');

window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrollPosition = window.pageYOffset;
  const logoScale = 1 + (scrollHeight - scrollPosition - clientHeight) / clientHeight;

  logo.style.transform = `scale(${logoScale})`;

  if (scrollPosition > clientHeight) {
    logo.classList.add('hidden');
  }
});

// Second screen
const secondScreen = document.querySelector('.second-screen');
const imageContainer = document.querySelector('.image-container');
const images = document.querySelectorAll('.image');

window.addEventListener('scroll', () => {
  const scrollPosition = imageContainer.getBoundingClientRect().left + imageContainer.scrollLeft;

  images.forEach(image => {
    const imagePosition = image.getBoundingClientRect().left - secondScreen.getBoundingClientRect().left;

    if (imagePosition < scrollPosition - window.innerWidth / 2 || imagePosition > scrollPosition + window.innerWidth / 2) {
      image.classList.add('hidden');
    } else {
      image.classList.remove('hidden');
    }
  });
});

// Third screen
const thirdScreen = document.querySelector('.third-screen');
const textContainer = document.querySelector('.text-container');
const texts = document.querySelectorAll('.text');

window.addEventListener('scroll', () => {
  const centerPosition = thirdScreen.getBoundingClientRect().top + window.innerHeight / 2;

  texts.forEach(text => {
    const textPosition = text.getBoundingClientRect().top;

    if (textPosition < centerPosition - text.clientHeight / 2 || textPosition > centerPosition + text.clientHeight / 2) {
      text.classList.remove('center');
    } else {
      text.classList.add('center');
    }
  });
});

// Fourth screen
const fourthScreen = document.querySelector('.fourth-screen');
const blurImage = document.querySelector('.blur');
const logoContainer = document.querySelector('.logo-container');
const logoImages = document.querySelectorAll('.logo-image');

let previousScrollPosition = 0;

window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;

  // Animate background image
  if (scrollPosition > thirdScreen.offsetTop + thirdScreen.clientHeight && scrollPosition < fourthScreen.offsetTop) {
    const blurAmount = (scrollPosition - thirdScreen.offsetTop - thirdScreen.clientHeight) / (fourthScreen.offsetTop - thirdScreen.offsetTop - thirdScreen.clientHeight);
    blurImage.style.filter = `blur(${blurAmount * 10}px)`;
  } else {
    blurImage.style.filter = 'blur(0)';
  }

  // Animate logo images
  if (scrollPosition > fourthScreen.offsetTop - window.innerHeight && scrollPosition < fourthScreen.offsetTop + fourthScreen.clientHeight) {
    const logoContainerWidth = logoContainer.clientWidth;
    const logoImagesWidth = logoImages.length * logoImages[0].clientWidth + (logoImages.length - 1) * 10;
    const logoImagesPosition = (scrollPosition - (fourthScreen.offsetTop - window.innerHeight)) / (fourthScreen.clientHeight + window.innerHeight) * (logoImagesWidth - logoContainerWidth);
    logoContainer.style.transform = `translateX(-${logoImagesPosition}px)`;

    if (scrollPosition > previousScrollPosition) {
      logoImages.forEach(image => {
        const imagePosition = image.getBoundingClientRect().left;

        if (imagePosition < fourthScreen.getBoundingClientRect().left || imagePosition > fourthScreen.getBoundingClientRect().right) {
          image.classList.add('hidden');
        } else {
          image.classList.remove('hidden');
        }
      });
    } else {
      logoImages.forEach(image => {
        const imagePosition = image.getBoundingClientRect().left;

        if (imagePosition < fourthScreen.getBoundingClientRect().left - image.clientWidth || imagePosition > fourthScreen.getBoundingClientRect().right + image.clientWidth) {
          image.classList.add('hidden');
        } else {
          image.classList.remove('hidden');
        }
      });
    }

    previousScrollPosition = scrollPosition;
  } else {
    logoContainer.style.transform = 'translateX(0)';
  }
});
