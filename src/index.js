import './style.css';
import loadMovies from './modules/displayItems.js';
import movieCount from './modules/movieCount.js';

loadMovies();
const badge = document.querySelector('.badge');
movieCount(badge);
