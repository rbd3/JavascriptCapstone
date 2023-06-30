// const fetch = require('node-fetch');
const movieCount = require('./movieCount.js'); // Replace with the actual file name

jest.mock('node-fetch', () => jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue([]) }));

describe('movieCount', () => {
  test('should update badge innerHTML with correct count', async () => {
    const badgeMock = {
      innerHTML: '',
    };

    const responseData = [
      { id: 1, name: 'Episode 1' },
      { id: 2, name: 'Episode 2' },
      { id: 3, name: 'Episode 3' },
    ];
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(responseData) });

    await movieCount(badgeMock);

    expect(global.fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1/episodes');
    expect(parseInt(badgeMock.innerHTML, 10)).toEqual(3);
  });

  test('should handle error and log it', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');

    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    await movieCount({});

    expect(global.fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1/episodes');
    expect(consoleLogSpy).toHaveBeenCalledWith(new Error('Network error'));
  });
});
