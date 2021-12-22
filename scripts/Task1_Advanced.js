(function () {
  const btn = document.getElementById('run'),
        table = document.getElementById('table'),
        inputs = document.querySelectorAll('input[type=text]'),
        error = document.querySelector('p.error'),
        invalidClass = 'invalid';

  btn.addEventListener('click', e => {
    let fullTable = '',
        isInvalid,
        invalidFields = [];

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i],
          validField;

      validField = /^(0|[1-9]\d*)$/.test(input.value);

      if (!input.value || !validField) {
          input.classList.add(invalidClass);
          isInvalid = true;
          invalidFields.push(input.id);
      } else {
          input.classList.remove(invalidClass);
          error.innerHTML = '';
      }
    };

    if (isInvalid) {
        e.preventDefault();
        error.innerHTML = 'Wrong fields: <strong>' + invalidFields.join(', ') + '</strong>';
    };

    for (let i = 0; i < inputs[0].value; i++) {
      fullTable += createTr(inputs[1].value);
    };

    table.innerHTML = fullTable;
  });

  function createTr (val) {
    let td = '';

    for (let i = 0; i < val; i++) {
      td += `<td></td>`;
    };

    return `<tr>${td}</tr>`;
  };

  btn.addEventListener('click', () => {
    let trList = table.rows;

    [...trList].forEach(fillTable);
  });

  function fillTable (elem, index) {
    let tdList = elem.cells;

    [...tdList].forEach((item, i) => {
      item.textContent = `${index + 1}${i + 1}`
    });
  };

  table.addEventListener('click', e => {
    let target = e.target,
        td = target.closest('td'),
        randomColor = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`;

    if (!td) return;

    td.classList.contains('colored') ? td.style.background = '' : td.style.background = randomColor;

    td.classList.toggle('colored');
  });

  function getRandom(min, max){
    return Math.ceil(Math.random() * (max - min) + min);
  };
})();
