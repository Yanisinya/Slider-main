// Инициализация массива картинок с описанием
let images = [{
  src: "images/compl-proj-img1.jpg", 
  alt: "image 1",
  city: "Rostov-on-Don<br> LCD admiral",
  apartmentArea: "81 m2",
  repairTime: "3.5 months",
  repairCost: "Upon request"
}, {
  src: "images/compl-proj-img2.jpg", 
  alt: "image 2",
  city: "Sochi<br> Thieves",
  apartmentArea: "105 m2",
  repairTime: "4 months",
  repairCost: "Upon request"
}, {
  src: "images/compl-proj-img3.jpg", 
  alt: "image 3",
  city: "Rostov-on-Don<br> Patriotic",
  apartmentArea: "93 m2",
  repairTime: "3 months",
  repairCost: "Upon request"
}];

function initSlider() {
  if (!images || !images.length) return;

  let complProjContainer = document.querySelector(".completed-projects-container");
  let complProjImage = complProjContainer.querySelector(".compl-proj-right-img");

  let complProjArrows = complProjContainer.querySelectorAll(".compl-proj-descr-nav-arrow");
  let complProjDots = complProjContainer.querySelector(".compl-proj-descr-nav");
  let complProjMenu = complProjContainer.querySelector(".compl-proj-right-menu");
  let complProjLines = complProjContainer.querySelector(".compl-proj-right-lines");

  // Вспомогательные функции для определения следующего по направлению индекса
  const nextLeft = num => num === 0? images.length - 1 : num - 1;
  const nextRight = num => num === images.length - 1? 0 : num + 1;

  // Устанавливаем картинку, ее описание и окружение по индексу
  function setImage(index) {
    let complProjCity = complProjContainer.querySelector(".city");
    let complProjArea = complProjContainer.querySelector(".apartment-area");
    let complProjTime = complProjContainer.querySelector(".repair-time");
    let complProjCost = complProjContainer.querySelector(".repair-cost");

    // Устанавливаем точку и пункт меню, пока не переписали индекс текущей картики
    setDot(index);
    setMenu(index);

    complProjImage.innerHTML = `<img src="${images[index].src}" alt="${images[index].alt}" data-index="${index}">`;
    complProjCity.innerHTML = images[index].city;
    complProjArea.innerHTML = images[index].apartmentArea;
    complProjTime.innerHTML = images[index].repairTime;
    complProjCost.innerHTML = images[index].repairCost;
  }

  // Устанавливаем точку по индексу
  function setDot(index) {
    let curIndex = +complProjImage.querySelector(".compl-proj-right-img img").dataset.index;
    let dot = complProjDots.querySelector(`.compl-proj-descr-nav-list-item.n${curIndex}`);
    if (dot && dot.classList.contains("active")) {
      dot.classList.remove("active");
    }
    
    complProjDots.querySelector(`.compl-proj-descr-nav-list-item.n${index}`).classList.add("active");
  }

  // Устанавливаем меню и линию подчеркивания по индексу
  function setMenu(index) {
    let curIndex = +complProjImage.querySelector(".compl-proj-right-img img").dataset.index;

    let item = complProjMenu.querySelector(`.compl-proj-right-menu-item.n${curIndex}`);
    if (item && item.classList.contains("active")) {
      item.classList.remove("active");
    }

    let line = complProjLines.querySelector(`.compl-proj-right-line.n${curIndex}`);
    if (line && line.classList.contains("active")) {
      line.classList.remove("active");
    }

    complProjMenu.querySelector(`.compl-proj-right-menu-item.n${index}`).classList.add("active");
    complProjLines.querySelector(`.compl-proj-right-line.n${index}`).classList.add("active");
  }

  // Инициализация событий стрелок слайдера
  function eventsArrows() {
    complProjArrows.forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curIndex = +complProjImage.querySelector(".compl-proj-right-img img").dataset.index;
        let nextIndex;

        if (arrow.classList.contains("left")) {
          nextIndex = nextLeft(curIndex);
        } else {
          nextIndex = nextRight(curIndex);
        }

        setImage(nextIndex);
      });
    });
  }

  // Инициализация событий точек слайдера
  function eventsDots() {
    let dots = complProjDots.querySelectorAll(".compl-proj-descr-nav-list-item");
    dots.forEach(dot => {
      dot.addEventListener("click", function() {
        setImage(+this.dataset.index);
      });
    });
  }

  // Инициализация событий меню слайдера
  function eventsMenu() {
    let menu = complProjMenu.querySelectorAll(".compl-proj-right-menu-item");
    menu.forEach(item => {
      item.addEventListener("click", function() {
        setImage(+this.dataset.index);
      });
    });
  }
  
  eventsArrows();
  eventsDots();
  eventsMenu();
}

document.addEventListener("DOMContentLoaded", function() {
  initSlider();
});