export class Color {
constructor(code, position, creatorEl){
    this.code = code; // color code
    this.position = position;
    this.gradientCreator = creatorEl; // ref to the object wich holds the functions
    this.el = null; // dom element, will be attached created later
    this.isMoving = false;
}

buildHTML(){
    const c = document.createElement('div'); 
    //create tooltips
    const tooltipContainer = document.createElement('div');
    tooltipContainer.classList.add('tooltip-container');
    const editTooltip = document.createElement('span');
    editTooltip.classList.add('tooltip')
    editTooltip.innerHTML = 'e';
    tooltipContainer.appendChild(editTooltip);

    c.appendChild(tooltipContainer)
    c.style.left = this.position + '%';
    c.style.backgroundColor = this.code;
    c.classList.add('color');
    this.setEventListeners(c)
    this.el = c;
    return c;
}

setEventListeners(c){
    const moveEventHandler = (event) => {
        this.isMoving = true;
        this.setPosition(event);
    };

    c.addEventListener('mousedown', (evt) => {
        evt.preventDefault();
        document.addEventListener('mousemove', moveEventHandler);
        //remove movementHandler, on mouseup
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', moveEventHandler);
        }, {once: true});
    });

     /*
     *open the color picker and assign the value to this object
     *if the elemt is dragged around, do not execute the function
    */
     const clickEventHandler = (evt) => {
        if(this.isMoving){
            this.isMoving = false;
            return;
        }
        var picker = this.gradientCreator.colorPicker;
        picker.focus();
        picker.value = this.code;
        picker.click();
        picker.addEventListener('change', (evt) => {
            this.setColor(evt.target.value);
        }, {once: true})
    };

    c.addEventListener('click', clickEventHandler)
}
 
setPosition(event){
    const parent = this.el.parentElement;
    const realPos = this.position + this.gradientCreator.pxToPercent(event.movementX);
    console.log(this.el.offsetWidth)
    const displayPos = this.position + this.gradientCreator.pxToPercent(event.movementX - (this.el.offsetWidth / 2))
    //console.log(event.clientX + ' ' + parent.offsetLeft)
    if(realPos >= 0 && realPos <= 100 ){
        console.log(realPos + ' ' + displayPos)
        this.position = realPos;
        this.el.style.left = realPos + '%';
        this.gradientCreator.updateGradient();
    }
}

setColor(colorCode){
    console.log(colorCode)
    this.code = colorCode;
    this.el.style.backgroundColor = colorCode;
    this.gradientCreator.updateGradient();
}

getCSSCode(){
    return this.code + ' ' + this.position + '%';
}

}


 