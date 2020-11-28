let toggleElement = function(evt){
    console.log(evt.target.dataset.toggleElement)
    let el = document.getElementById(evt.target.dataset.toggleElement);
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function toggleGradientType(el){
    
}

