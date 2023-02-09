class Caroussel {
  /**
   * @param {HTMLElement} element
   */
  constructor(element, options = {}) {
    console.log("coucou");
    this.element = element;
    this.options = Object.assign(
      {},
      {
        slidesToScroll: 1,
        slidesVisible: 1,
        loop: true,
      },
      options
    );
    let children = [].slice.call(element.children);
    this.currentItem = 0;
    this.isMobile = true;

    this.root = this.createDivWithClass("carou");
    this.root.setAttribute("tabindex", "0");
    this.container = this.createDivWithClass("carou__container");

    this.root.appendChild(this.container);
    this.element.appendChild(this.root);

    this.moveCallbacks = [];

    this.items = children.map((child) => {
      let item = this.createDivWithClass("carou__item");
      item.style.width = "100%";
      item.appendChild(child);
      this.container.appendChild(item);
      return item;
    });

    this.setStyle();
    this.createNavigation();
    this.moveCallbacks.forEach((cb) => cb(0));
    this.onWindowResize();
    window.addEventListener("resize", this.onWindowResize.bind(this));
    this.root.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight" || e.key === "Right") {
        this.next();
      }
      if (e.key === "ArrowLeft" || e.key === "Left") {
        this.prev();
      }
    });
  }

  setStyle() {
    let ratio = this.items.length / this.slidesVisible;
    this.container.style.width = ratio * 100 + "%";
    this.items.forEach(
      (item) => (item.style.width = 100 / this.slidesVisible / ratio + "%")
    );
  }

  createNavigation() {
    let nextButton = this.createDivWithClass("caroussel__next");
    let previousButton = this.createDivWithClass("caroussel__previous");
    this.root.appendChild(nextButton);
    this.root.appendChild(previousButton);
    nextButton.addEventListener("click", this.next.bind(this));
    previousButton.addEventListener("click", this.prev.bind(this));
    if (!this.options.loop) {
      this.onMove((index) => {
        if (index === 0) {
          this.root.removeChild(previousButton);
        } else {
          this.root.appendChild(previousButton);
        }
        if (this.items[this.currentItem + this.slidesVisible] === undefined) {
          this.root.removeChild(nextButton);
        } else {
          this.root.appendChild(nextButton);
        }
      });
    }
  }

  next() {
    this.gotoItem(this.currentItem + this.slidesToScroll);
  }

  prev() {
    this.gotoItem(this.currentItem - this.slidesToScroll);
  }

  gotoItem(index) {
    if (this.options.loop) {
      if (index < 0) {
        index = this.items.length - this.options.slidesVisible;
      } else if (
        index >= this.items.length ||
        (this.items[this.currentItem + this.slidesVisible] === undefined &&
          index > this.currentItem)
      ) {
        index = 0;
      }
    }
    let translateX = (index * -100) / this.items.length;
    this.container.style.transform = "translate3d(" + translateX + "%, 0, 0)";
    this.currentItem = index;
    this.moveCallbacks.forEach((cb) => cb(index));
  }

  createDivWithClass(className) {
    let div = document.createElement("div");
    div.setAttribute("class", className);
    return div;
  }

  onMove(cb) {
    this.moveCallbacks.push(cb);
  }

  onWindowResize() {
    let mobile = window.innerWidth < 800;
    if (mobile !== this.isMobile) {
      this.isMobile = mobile;
      this.setStyle();
      this.moveCallbacks.forEach((cb) => cb(this.currentItem));
    }
  }

  get slidesToScroll() {
    return this.isMobile ? 1 : this.options.slidesToScroll;
  }

  get slidesVisible() {
    return this.isMobile ? 1 : this.options.slidesVisible;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  new Caroussel(document.querySelector("#carousel"), {
    slidesVisible: 2,
    slidesToScroll: 1,
    loop: false,
  });
});
