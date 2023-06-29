const generatePopupContent = (data, id) => {
  return `
    <div class="popup-content container">
      <i class="fa-solid fa-xmark close-btn"></i>
      <img src="${data.image.medium}" alt="#" class="popup-image" />
      <h3 class="popup-name">Name: ${data.name}</h3>
      <p class="popup-season">Season: ${data.season}</p>
      <p class="popup-airdate">Airdate: ${data.airdate}</p>
      <p class="popup-summary">Summary: ${data.summary}</p>
    </div>
  `;
};

const openPopup = () => {
  const itemContainer = document.querySelector('.item-container');
  const body = document.querySelector('#expandable');
  let episodesData; // Variable to store the fetched episodes data

  itemContainer.addEventListener('click', async (event) => {
    if (event.target.classList.contains('btn-flex')) {
      if (!episodesData) {
        // Fetch the episodes data only if it's not already fetched
        const response = await fetch('https://api.tvmaze.com/shows/1/episodes');
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        episodesData = await response.json();
      }

      const button = event.target;
      const episodeId = button.getAttribute('data-episode-id'); // Get the episode ID from the button's data attribute
      const episodeData = episodesData.find((episode) => episode.id === parseInt(episodeId, 10)); // Find the episode data based on the episode ID

      const popupContent = generatePopupContent(episodeData, episodeData.id);

      const popup = document.getElementById('popup');
      popup.innerHTML = popupContent;
      body.appendChild(popup);

      const closeBtn = document.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
      });

      popup.style.display = 'block';
    }
  });
};

export default openPopup;
