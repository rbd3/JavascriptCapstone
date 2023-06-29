const appId = 'PpondcBRXs1hVf77EHGj';
const movieLikes = async (id) => {
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
export default movieLikes;
