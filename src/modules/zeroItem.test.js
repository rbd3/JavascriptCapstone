const movieCount = require('./movieCount.js');

// Mock the fetch function and the response it returns
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), // Simulate an empty response
  })
);

describe('movieCount function', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    global.fetch.mockClear();
  });

  test('should fetch data and update badgeElement correctly', async () => {
    const badgeElement = {
      innerHTML: '',
    };

    await movieCount(badgeElement);


    expect(global.fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1/episodes');

    expect(parseInt(badgeElement.innerHTML)).toBe(0);
  });
});