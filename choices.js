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
  console.log('registered', orderedChoicesInput.value);
}

function addChoice(id, label) {
  let li = document.createElement('li');
  li.setAttribute('data-choice', id);
  li.textContent = label;
  orderedChoices.appendChild(li);

  let values = getOrderedChoicesValues();
  values.push(id);
  setOrderedChoicesValues(values);
}

function removeChoice(id) {
  let li = orderedChoices.querySelector(`li[data-choice=${id}]`);
  if (li !== null) {
    orderedChoices.removeChild(li);
  }
  let values = getOrderedChoicesValues();
  let filtered = values.filter(value => value !== id);
  setOrderedChoicesValues(filtered);
}

choices.addEventListener('change', event => {

  const target = event.target;

  if (target.type === 'checkbox') {
    event.stopPropagation();

    let id = target.id;
    if (target.checked === true) {
      let labelElt = choices.querySelector(`label[for=${id}]`);
      let label = labelElt === null ? target.value : labelElt.textContent;
      addChoice(id, label)
    } else {
      removeChoice(id);
    }
  }

});