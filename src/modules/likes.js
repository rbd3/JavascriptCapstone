let appId = '';
export const createApp = async () => {
  const item1 = 'olaniMovies';
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        item_id: item1,
      }),
    });
  const data = await response.text();
  appId = data;
  console.log(appId)
  addLikeCount();
};

export const movieLikes = async (id) => {
  const item1 = id;
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        item_id: item1,
      }),
    });

  const data = await response.text();
  console.log(data);
};

export const addLikeCount = async () => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes`);
    console.log(response);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
