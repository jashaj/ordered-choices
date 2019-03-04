const choices = document.querySelector('#choices');

function goUp(target) {
  let currentItem = target.closest('li');
  let previousItem = currentItem.previousElementSibling;
  let parent = currentItem.parentElement;

  let moveUp = currentItem.cloneNode(true);
  moveUp.classList.add('moved');
  parent.insertBefore(moveUp, previousItem);
  parent.removeChild(currentItem);

  let newPrevious = moveUp.previousElementSibling;
  if (newPrevious === null) {
    moveUp.querySelector('.down').focus();
  }
  else {
    moveUp.querySelector('.up').focus();
  }

  setTimeout(() => moveUp.classList.remove('moved'), 500);
}

function goDown(target) {
  let currentItem = target.closest('li');
  let nextItem = currentItem.nextElementSibling;
  let parent = currentItem.parentElement;

  parent.insertBefore(nextItem.cloneNode(true), currentItem);
  parent.removeChild(nextItem);
  currentItem.classList.add('moved');
  let newNext = currentItem.nextElementSibling;
  if (newNext === null) {
    currentItem.querySelector('.up').focus();
  }
  else {
    currentItem.querySelector('.down').focus();
  }

  setTimeout(() => currentItem.classList.remove('moved'), 500);
}

choices.addEventListener('click', event => {
  const target = event.target;
  let classList = target.classList;
  if (classList.contains('up')) {
    goUp(target);
    event.stopPropagation();
  }
  else if (classList.contains('down')) {
    goDown(target);
    event.stopPropagation();
  }
  // else do nothing
});