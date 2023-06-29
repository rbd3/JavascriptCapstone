import totalComment from '../src/modules/popup.js';

const simulateDOM = () => {
  const span = document.createElement('span');
  span.id = 'comments-1';
  document.body.appendChild(span);
};

simulateDOM();

const dummyArray = ['comment1', 'comment2', 'comment3'];

describe('totalCommentsCounter', () => {
    totalComment(dummyArray.length, 1);
  const span = document.querySelector('#comments-1');

  test('should put the right amount of total items', () => {
    expect(span.innerHTML).toBe(`${dummyArray.length} comments,`);
  });
});