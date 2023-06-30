import './style.css';
import loadMovies from './modules/displayItems.js';
<<<<<<< HEAD
import movieCount from './modules/movieCount.js';

loadMovies();
movieCount();
=======
import openPopup from './modules/popup.js';

loadMovies();

document.addEventListener('DOMContentLoaded', () => {
  openPopup();
});
>>>>>>> dev
