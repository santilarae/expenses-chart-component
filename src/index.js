const chart = document.querySelector(".chart");

async function getData() {
  const res = await fetch("../data.json");
  const data = await res.json();

  return data;
}

function highestAmount(arr, property) {
  const newArray = [...arr];
  const [highest] = newArray.sort((a, b) => b[property] - a[property]);
  return highest;
}

function setHeight(highestAmount, amount) {
  const heightBar = (amount * 15) /*rem*/ / highestAmount;
  return heightBar.toFixed(1);
}

function renderCols(arr, highest, renderAt) {
  const fragment = new DocumentFragment();

  arr.forEach((element) => {
    const col = document.createElement("div");
    col.classList.add("chart__col");

    const colInfo = document.createElement("span");
    colInfo.classList.add("chart__col-info");
    colInfo.innerHTML = `$${element.amount}`;

    const colBar = document.createElement("div");
    colBar.classList.add("chart__col-bar");
    if (element == highest) {
      colBar.classList.add("chart__col-bar--highest");
    }
    const barHeight = setHeight(highest.amount, element.amount);
    colBar.style.height = `${barHeight}rem`;

    const colTitle = document.createElement("p");
    colTitle.classList.add("chart__col-title");
    colTitle.innerHTML = element.day;

    col.appendChild(colInfo);
    col.appendChild(colBar);
    col.appendChild(colTitle);

    fragment.appendChild(col);
  });

  renderAt.appendChild(fragment);
}

async function renderChart() {
  const data = await getData();
  const highest = highestAmount(data, "amount");

  renderCols(data, highest, chart);
}

renderChart();
