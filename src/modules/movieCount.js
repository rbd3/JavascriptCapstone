const badge = document.querySelector('.badge');
const movieCount = async () => {
  try {
    const response = await fetch('https://api.tvmaze.com/shows/1/episodes');
    let data = await response.json();
    data = data.splice(0, 12);
    badge.innerHTML = data.length;
  } catch (error) {
    console.log(error);
  }
};
export default movieCount;