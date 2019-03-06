const choices = document.querySelector('#choices');
const orderedChoices = document.querySelector('#ordered-choices');
const orderedChoicesInput = document.querySelector('#ordered-choices-input');

function getOrderedChoicesValues() {
  let value = orderedChoicesInput.value;
  let values;
  if (value.length > 0) {
    values = value.split(',');
  } else {
    values = [];
  }
  return values;
}

function setOrderedChoicesValues(values) {
  orderedChoicesInput.value = values.join(',');
}

function createOrderButtons(id) {
  const buttonUp = document.createElement('button');
  buttonUp.classList.add('up');
  buttonUp.type = 'button';
  buttonUp.appendChild(document.createTextNode('\u2191'));
  buttonUp.setAttribute('data-id', id);

  const buttonDown = document.createElement('button');
  buttonDown.classList.add('down');
  buttonDown.type = 'button';
  buttonDown.appendChild(document.createTextNode('\u2193'));
  buttonDown.setAttribute('data-id', id);

  const wrapper = document.createElement('div');
  wrapper.classList.add('change-order');
  wrapper.appendChild(buttonUp);
  wrapper.appendChild(buttonDown);
  return wrapper;
}

function addChoice(id, label) {
  let li = document.createElement('li');
  li.setAttribute('data-choice', id);
  let wrapper = document.createElement('div');
  wrapper.classList.add('choice');

  let labelElt = document.createElement('span');
  labelElt.classList.add('choice-label');
  labelElt.appendChild(document.createTextNode(label));
  wrapper.appendChild(labelElt);
  wrapper.appendChild(createOrderButtons(id));
  li.appendChild(wrapper);
  orderedChoices.appendChild(li);

  let values = getOrderedChoicesValues();
  values.push(id);
  setOrderedChoicesValues(values);
}

function getOrderedListItem(id) {
  return orderedChoices.querySelector('li[data-choice=' + id + ']');
}

function removeChoice(id) {
  let currentListItem = getOrderedListItem(id);
  if (currentListItem !== null) {
    orderedChoices.removeChild(currentListItem);
  }
  let values = getOrderedChoicesValues();
  let filtered = values.filter(function (value) {
    return value !== id;
  });
  setOrderedChoicesValues(filtered);
}

choices.addEventListener('change', function (event) {
  const target = event.target;

  if (target.type === 'checkbox') {
    event.stopPropagation();

    let id = target.id;
    if (target.checked === true) {
      let labelElt = choices.querySelector('label[for=' + id + ']');
      let label = labelElt === null ? target.value : labelElt.textContent;
      addChoice(id, label)
    } else {
      removeChoice(id);
    }
  }
});

function moveUp(id) {
  // Change order in input field
  let orderedChoicesValues = getOrderedChoicesValues();
  let indexToMove = orderedChoicesValues.indexOf(id);
  if (indexToMove <= 0) {
    return;
  }
  orderedChoicesValues.splice(indexToMove, 1);
  orderedChoicesValues.splice(indexToMove - 1, 0, id);

  setOrderedChoicesValues(orderedChoicesValues);

  // Change order in DOM
  let currentListItem = getOrderedListItem(id);
  let previousListItem = currentListItem.previousElementSibling;
  orderedChoices.insertBefore(currentListItem, previousListItem);
  if (currentListItem.previousElementSibling === null) {
    currentListItem.querySelector('button.down').focus();
  } else {
    currentListItem.querySelector('button.up').focus();
  }
}

function moveDown(id) {
  // Change order in input field
  let orderedChoicesValues = getOrderedChoicesValues();
  let indexToMove = orderedChoicesValues.indexOf(id);
  if (indexToMove < 0 || indexToMove === orderedChoicesValues.length - 1) {
    return;
  }
  orderedChoicesValues.splice(indexToMove, 1);
  orderedChoicesValues.splice(indexToMove + 1, 0, id);

  setOrderedChoicesValues(orderedChoicesValues);

  // Change order in DOM
  let currentListItem = getOrderedListItem(id);
  let nextListItem = currentListItem.nextElementSibling;
  orderedChoices.insertBefore(nextListItem, currentListItem);
  if (currentListItem.nextElementSibling === null) {
    currentListItem.querySelector('button.up').focus();
  } else {
    currentListItem.querySelector('button.down').focus();
  }
}


orderedChoices.addEventListener('click', function (event) {
  const target = event.target;

  if (target.classList.contains('up')) {
    event.stopPropagation();
    moveUp(target.getAttribute('data-id'));
  } else if (target.classList.contains('down')) {
    event.stopPropagation();
    moveDown(target.getAttribute('data-id'));
  }
});