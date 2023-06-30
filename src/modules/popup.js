import { createComment, getComments } from './commentCount.js';

const generatePopupContent = (data) => `
    <div class="popup-content container">
      <i class="fa-solid fa-xmark close-btn"></i>
      <img src="${data.image.medium}" alt="#" class="popup-image" />
      <h3 class="popup-name">Name: ${data.name}</h3>
      <p class="popup-season">Season: ${data.season}</p>
      <p class="popup-airdate">Airdate: ${data.airdate}</p>
      <p class="popup-summary">Summary: ${data.summary}</p>
    </div>

    <div class="comments-box">
      <h3 class="comments-title">Comments</h3>
      <div class="comments-wrapper"></div>
    </div>

    <div class="add-comment-box">
      <h3 class="add-comment-title">Add a comment</h3>
      <form class="add-comment" id="add-comment" data-id="${data.id}">
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="Your name"
        />
        <textarea
          name="userComment"
          id="userComment"
          cols="30"
          rows="5"
          placeholder="Your insights"
        ></textarea>
        <button type="submit" class="submitComment">Comment</button>
      </form>
    </div>
  `;

  export const totalComment = () => {
    // Update comment count
    const commentsTextElements = document.querySelectorAll('.comments-text');
    const commentsCount = commentsTextElements ? commentsTextElements.length : 0;
    const commentsTitle = document.querySelector('.comments-title');
    
    if (commentsTitle) {
      if (commentsCount > 0) {
        commentsTitle.textContent = `Comments (${commentsCount})`;
      } else {
        commentsTitle.textContent = 'Comments (0)';
      }
    }
  };
  
const loadComments = async (itemId) => {
  try {
    const commentsWrapper = document.querySelector('.comments-wrapper');
    const data = await getComments(itemId);

    // Clear existing comments
    commentsWrapper.innerHTML = '';

    if (data.length > 0) {
      data.forEach((comment) => {
        const commentHtml = `
          <p class="comments-text">${comment.creation_date} ${comment.username}: ${comment.comment}</p>
        `;
        commentsWrapper.insertAdjacentHTML('beforeend', commentHtml);
      });
    }
        totalComment();

  } catch (err) {
    console.error('Error loading comments:', err);
  }
};

const openPopup = async () => {
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
      const episodeData = episodesData.find((episode) => episode.id === parseInt(episodeId, 10));

      const popupContent = generatePopupContent(episodeData, episodeData.id);

      const popup = document.getElementById('popup');

      popup.innerHTML = popupContent;
      body.appendChild(popup);

      const closeBtn = document.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
      });

      popup.style.display = 'block';

      // Load comments
      await loadComments(episodeData.id);
    }
  });
};



function addComment(e) {
  e.preventDefault(); // Prevent the form from submitting

  const username = document.querySelector('#userName').value;
  const userComments = document.querySelector('#userComment').value;
  const dataId = e.target.getAttribute('data-id');

  createComment(dataId, username, userComments)
    .then(() => {
      const today = new Date();
      const html = `<p class="comments-text">${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()} ${username}: ${userComments}</p>`;
      document.querySelector('.comments-wrapper').insertAdjacentHTML('beforeend', html);
      e.target.reset();

      totalComment();
    })
    .catch((err) => {
      console.error(err);
    });
}

document.addEventListener('click', () => {
  const button2 = document.querySelector('.submitComment');
  button2?.addEventListener('click', () => {
    const comContainer = document.querySelector('#add-comment');
    comContainer?.addEventListener('submit', addComment);
  });
});

export default openPopup;
