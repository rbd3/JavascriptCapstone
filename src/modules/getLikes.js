const appId = 'PpondcBRXs1hVf77EHGj';
const addlikeCount = async (itemid) => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes/`);
    const data = await response.json();
    const itemLikes = data.find((like) => like.item_id === itemid);
    console.log(itemLikes);
    return itemLikes ? itemLikes.likes : 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default addlikeCount;
