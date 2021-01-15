import './css/style.css';
import Timer from './components/Timer';

const basicUse = document.querySelector('.basic-use');
const smallUse = document.querySelector('.small');
const normalUse = document.querySelector('.normal');

if (basicUse) {
  const timer = new Timer(basicUse);
}
if (smallUse) {
  const smTimer = new Timer(smallUse);
}
if (normalUse) {
  new Timer(normalUse);
}
