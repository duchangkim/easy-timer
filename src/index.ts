import './css/style.css';
import Timer from './components/Timer';

const basicUse = document.querySelector('.basic-use');

if (basicUse) {
  const timer = new Timer(basicUse);
}