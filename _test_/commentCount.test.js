import { totalComment } from '../src/modules/popup.js';

// Mock the necessary DOM elements
document.body.innerHTML = `
  <div class="comments-title"></div>
  <div class="comments-text"></div>
  <div class="comments-text"></div>
  <div class="comments-text"></div>
`;

describe('totalComment', () => {
  test('should update the comment count in the comments-title element', () => {
    totalComment();

    const commentsTitle = document.querySelector('.comments-title');
    const commentsCount = parseInt(commentsTitle.textContent.match(/\d+/)[0], 10);

    expect(commentsCount).toBe(3);
  });
});
