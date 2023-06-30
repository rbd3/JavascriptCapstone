const appId = 'h1Iop89yNbiyVQkls8Iz';

async function createComment(itemId, userName, userComment) {
  try {
    const res = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: itemId,
          username: userName,
          comment: userComment,
        }),
      },
    );
    if (!res.ok) throw new Error('Error creating comment for id ', itemId);
    return res;
  } catch (err) {
    return err;
  }
}

async function getComments(itemId) {
  try {
    const res = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments?item_id=${itemId}`,
    );
    if (!res.ok) throw new Error('Cannot get comment for id ', itemId);
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export { createComment, getComments };