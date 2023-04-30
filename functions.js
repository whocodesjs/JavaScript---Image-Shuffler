// /**
//  * @author Jovain Chisholm 000905188
//  * @description This file contains the functions that are used in the index.html file.The functions are used to change the images and update the number of times the images update.The functions are also used to start and stop the timer.
//  */

// Wait for DOM content to load before executing code

document.addEventListener("DOMContentLoaded", () => {
  // Array of images
  const imageArray = [
    [
      "assets/img/boy-with-sea-skate-256x256.png",
      "assets/img/child-with-icecream-512x512.png",
      "assets/img/dexters-laboratory-character-512x512.png",
    ],
    [
      "assets/img/cartoon-aeroplane-256x256.png",
      "assets/img/saturn-planet-512x512.png",
      "assets/img/sky-black-256x256.png",
    ],
    [
      "assets/img/white-elephant-512x512.png",
      "assets/img/two-flying-bird-black-256x256.png",
      "assets/img/tiger-cub-512x512.png",
    ],
  ];
  // Selects the DOM elements that are needed and assigns them to variables
  const randomizeBtn = document.getElementById("randomize-btn");
  const stopBtn = document.getElementById("stop-btn");
  const updateCount = document.getElementById("update-count");
  const images = document.querySelectorAll("img");
  const refreshTime = document.getElementById("refresh-time-input");

  // This function updates the number of time the images update
  const increaseUpdateCount = () =>
    (updateCount.textContent = parseInt(updateCount.textContent) + 1);
  // This function adds event listeners to the images
  const addEventListenersToImages = () =>
    images.forEach((element) => {
      element.addEventListener("click", () => {
        element.classList.add("transition");
        changeImage(element);
        resetTimer();
        increaseUpdateCount();
      });
      element.addEventListener("transitionend", () =>
        element.classList.remove("transition")
      );
    });

  // This function chooses three random images from the imageArray
  const chooseThreeImages = () => {
    document
      .querySelectorAll(".imageItemBlock")
      .forEach((element) => element.remove());

    // This function chooses a random index from the imageArray
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    shuffleArray(imageArray[randomIndex]).forEach((src, i) => {
      // This function creates an image element and adds it to the DOM
      const image = document.createElement("img");
      image.src = src;
      image.className = "imageItemBlock";
      document.getElementById(`image${i + 1}`).appendChild(image);
    });
    addEventListenersToImages();
    increaseUpdateCount();
    startCountdownTimer(refreshTime.value);
  };
  // This function changes the image source to a random image from the imageArray
  const changeImage = (image) => {
    // This function chooses a random index from the imageArray
    const randomNum = Math.floor(Math.random() * imageArray.length);
    image.src =
      imageArray[randomNum][
        Math.floor(Math.random() * imageArray[randomNum].length)
      ];
  };
  // This function resets the timer
  const resetTimer = () =>
    clearInterval(startCountdownTimer) &&
    clearInterval(timer) &&
    (timer = setInterval(chooseThreeImages, refreshTime.value));

  // This function stops the timer
  const stopTimer = () => clearInterval(timer);
  // This function starts the timer
  const startTimer = () =>
    (timer = setInterval(chooseThreeImages, refreshTime.value));
  // This function shuffles the imageArray
  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  let timer = setInterval(chooseThreeImages, refreshTime.value);

  randomizeBtn.addEventListener("click", chooseThreeImages);

  stopBtn.addEventListener("click", () => {
    // This function checks if the timer is stopped or not
    const isStopped = stopBtn.getAttribute("data-val") === "true";
    isStopped
      ? (stopTimer(), (stopBtn.innerHTML = "Start"))
      : (startTimer(), (stopBtn.innerHTML = "Stop"));
    stopBtn.setAttribute("data-val", isStopped ? "false" : "true");
  });

  refreshTime.addEventListener("change", resetTimer);
});

function startCountdownTimer(refreshTime) {
  let secondsLeft = refreshTime / 1000;

  const startCountdownTimer = setInterval(() => {
    document.getElementById("countdown").innerHTML = secondsLeft.toFixed(1);
    secondsLeft -= 0.1;
    if (secondsLeft < 0) {
      clearInterval(startCountdownTimer);
    }
  }, 100);
}
