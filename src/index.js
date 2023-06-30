import './style.css';
import loadMovies from './modules/displayItems.js';
import movieCount from './modules/movieCount.js';
import openPopup from './modules/popup.js';

loadMovies();
const badge = document.querySelector('.badge');
movieCount(badge);
movieCount();
openPopup();
