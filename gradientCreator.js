 import {Color} from "./color.js";
 
 export class GradientCreator{
      constructor(gradientID, addButton, typeToggleElement){
          this.colors = [];
          this.currentCssString = '';
          this.gradientElement = document.getElementById(gradientID);
          this.codeElement = document.getElementById('css-code')
          this.addColorElement = document.getElementById(addButton);
          this.addColorElement.addEventListener('click', ()=> {this.addColor('#ffffff')})
          this.colorPicker = document.getElementById('color-picker');
          this.typeToggleElement = document.getElementById(typeToggleElement);
          this.gradientType = 'linear-gradient'
          this.gradientDegree = '90deg';
      }

      addColor(code, position = 50){
        var newColor = new Color(code, position, this);
        this.colors.push(newColor);
        this.print();
      }

      
      print(colors = this.colors){

        var toggleFunction = () => {this.toggleGradientType()};
        this.typeToggleElement.addEventListener('click', toggleFunction);

        var line = document.getElementById('line');
        colors.forEach(function(c){
          // if the color object has no element it must ne new, therefore we print it
          if(!c.el)
            line.appendChild(c.buildHTML());
        })
        this.updateGradient();
      }

        pxToPercent(pos){
        return (pos / this.gradientElement.clientWidth) * 100;
    }

    updateGradient(){
      console.log(this)
        var cssString = this.gradientType + '(';
        if(this.gradientType === 'linear-gradient')
        cssString = cssString + this.gradientDegree + ',';
        
        var arr = this.colors;
        arr.sort(compareByPosition).forEach(function(color, index){
            cssString = cssString.concat(color.getCSSCode());
            if(arr.length -1 > index)
                cssString += ','
        })
        cssString = cssString.concat(')');
        console.log(cssString)
        this.setCssCode(cssString);
    }

    setCssCode(cssString){
        this.gradientElement.style.background = cssString;
        this.currentCssString = cssString;
        this.codeElement.innerHTML = cssString;
      }

      toggleGradientType(){
        console.log(this.type == 'linear-gradient' ? 'radial-gradient': 'linear-gradient')
        this.gradientType = this.gradientType === 'linear-gradient' ? 'radial-gradient': 'linear-gradient';
        this.updateGradient();
        this.setCssCode();
      }

  }


  //Helper Functions
  function compareByPosition( a, b ) {
    if ( a.position < b.position ){
      return -1;
    }
    if ( a.position > b.position ){
      return 1;
    }
    return 0;
  }
