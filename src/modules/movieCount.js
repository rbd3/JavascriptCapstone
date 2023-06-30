const movieCount = async (badgeElement) => {
  try {
    const response = await fetch('https://api.tvmaze.com/shows/1/episodes');
    let data = await response.json();
    data = data.splice(0, 12);
    badgeElement.innerHTML = data.length;
  } catch (error) {
    console.log(error);
  }
};

module.exports = movieCount;
