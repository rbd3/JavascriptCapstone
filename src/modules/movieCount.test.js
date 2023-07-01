const movieCount = require('./movieCount.js');

// Mock the fetch function and the response it returns
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(Array(12).fill({})),
}));

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

    // Assert fetch function is called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1/episodes');

    // Assert badgeElement's innerHTML is updated with the correct data length (12 in this case)
    expect(parseInt(badgeElement.innerHTML, 10)).toBe(12);
  });

  test('should handle errors and log them', async () => {
    // Mock the fetch function to throw an error
    global.fetch = jest.fn(() => Promise.reject('Mocked error'));

    // Mock the console.log function to prevent logs from being displayed during tests
    console.log = jest.fn();

    await movieCount({});

    // Assert fetch function is called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1/episodes');

    // Assert that the error is logged
    expect(console.log).toHaveBeenCalledWith('Mocked error');
  });
});
