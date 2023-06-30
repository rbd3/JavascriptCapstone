const createApp = async () => {
  try {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const appId = await response.text();
    return appId;
  } catch (error) {
    return error;
  }
};

createApp();
