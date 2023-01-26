class Caroussel{

  /**
   * @param {HTMLElement} element 
   */
  constructor(element, options = {}) {
    console.log("coucou")
    this.element = element
    this.options = Object.assign({}, {
      slidesToScroll: 1,
      slidesVisible: 1
    }, options)
    let children = [].slice.call(element.children)
    this.currentItem = 0

    this.root = this.createDivWithClass('carou')
    this.container = this.createDivWithClass('carou__container')
    
    this.root.appendChild(this.container)
    this.element.appendChild(this.root)

    this.items = children.map((child) => {
      let item = this.createDivWithClass('carou__item')
      item.style.width = "100%"
      item.appendChild(child)
      this.container.appendChild(item)
      return item
    })

    this.setStyle();
    this.createNavigation();
  }

  setStyle(){
    let ratio = this.items.length / this.options.slidesVisible
    this.container.style.width = (ratio * 100) + "%"
    this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%")
  }

  createNavigation(){
      let nextButton = this.createDivWithClass('caroussel__next')
      let previousButton = this.createDivWithClass('caroussel__previous')
      this.root.appendChild(nextButton)
      this.root.appendChild(previousButton)
      nextButton.addEventListener('click', this.next.bind(this))
      previousButton.addEventListener('click', this.prev.bind(this))
  }

  next(){
    this.gotoItem(this.currentItem + this.options.slidesToScroll)
  }
  
  prev(){
    this.gotoItem(this.currentItem - this.options.slidesToScroll)
  }

  gotoItem(index){
    if (index<0){
      index = this.items.length - this.options.slidesVisible
    } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined){
      index = 0
    }
    let translateX = index * -100 / this.items.length
    this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
    this.currentItem = index
  }

  createDivWithClass (className){
    let div = document.createElement('div')
    div.setAttribute('class', className)
    return div
  }



}

document.addEventListener('DOMContentLoaded', function() {
  new Caroussel(document.querySelector('#carousel'), {
    slidesVisible: 1, 
    slidesToScroll: 1
  })

})


