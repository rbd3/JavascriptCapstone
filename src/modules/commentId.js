
const createApp = async () => {
  try {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const appId = await response.text();
    console.log('App ID:', appId);
  } catch (error) {
    console.error('Error:', error);
  }
};

createApp();
