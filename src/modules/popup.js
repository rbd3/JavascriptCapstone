const generatePopupContent = (data) => {
    return `
      <div class="popup-content container">
        <i class="fa-solid fa-xmark close-btn"></i>
        <img src="${data.image.original}" alt="#" class="popup-image" />
        <h3 class="popup-name">Name: ${data.name}</h3>
        <p class="popup-season">Season: ${data.season}</p>
        <p class="popup-airdate">Airdate: ${data.airdate}</p>
        <p class="popup-summary">Summary: ${data.summary}</p>
      </div>
    `;
  };
  
  const openPopup = () => {
    const itemContainer = document.querySelector('.item-container');
    itemContainer.addEventListener('click', async (event) => {
      if (event.target.classList.contains('btn-flex')) {
        const response = await fetch('https://api.tvmaze.com/shows/1/episodes');
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const button = event.target;
        const index = Array.from(button.parentNode.parentNode.children).indexOf(button.parentNode);
        const episodeData = data[index];
    
        const popupContent = generatePopupContent(episodeData);
    
        const popup = document.getElementById('popup');
        popup.innerHTML = popupContent;
    
        const closeBtn = document.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
          popup.style.display = 'none';
        });
    
        popup.style.display = 'block';
      }
    });
  };
  
  export default openPopup;
  