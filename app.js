import {GradientCreator} from './gradientCreator.js';

var grad = new GradientCreator('gradient', 'add-color', 'type-toggle');
grad.addColor( '#833ab4', 0);
grad.addColor( '#75c887', 50);
grad.addColor( '#fcb045', 100);
//grad.print();