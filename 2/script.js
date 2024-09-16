const data = [
    {A: "A1", B: "B1", C: "C1"},
    {A: "A1", B: "B1", C: "C2"},
    {A: "A1", B: "B1", C: "C3"},
    {A: "A1", B: "B2", C: "C4"},
    {A: "A1", B: "B2", C: "C5"},
    {A: "A1", B: "B3", C: "C6"},
    {A: "A2", B: "B4", C: "C7"},
    {A: "A2", B: "B5", C: "C8"},
    {A: "A2", B: "B5", C: "C9"},
    {A: "A3", B: "B6", C: "C10"},
]

const selectA = document.querySelector("#A");
const selectB = document.querySelector("#B");
const selectC = document.querySelector("#C");

const tableContainer = document.querySelector(".table-container");

function renderTable(data) {
    tableContainer.innerHTML = "";

    data.forEach(row => {
        const tableRow = tableContainer.appendChild(document.createElement("tr"));
        for (let i in row) {
            const tableData = tableRow.appendChild(document.createElement("td"));
            tableData.innerText = row[i];
        }
    });
}

function renderOptions(select, key) {
    select.innerHTML = "<option>Toate</option>";

    const uniqueBValues = new Set();

    data.forEach(item => {
        uniqueBValues.add(item[key]);
    });

    uniqueBValues.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });
}

const selects = [
    { select: selectA, key: 'A' },
    { select: selectB, key: 'B' },
    { select: selectC, key: 'C' }
];

function deleteOptions(select, key, filteredData) {
    for (let i = 0; i < select.options.length; i++) {
        const optionText = select.options[i].textContent;
        if (optionText !== "Toate" && !filteredData.some(item => item[key] === optionText)) {
            select.remove(i);
            i--;
        }
    }
}

//Poate sterge din B și C
function filterDataA() {
    let filteredData = data;

    renderOptions(selectB, 'B');
    renderOptions(selectC, 'C');

    if (selectA.value !== "Toate") {
        filteredData = filteredData.filter(item => item.A === selectA.value);
    }

    deleteOptions(selectB, 'B', filteredData);
    deleteOptions(selectC, 'C', filteredData);

    //Daca a ramas o singura optiune in B, sterge "Toate"
    if (selectB.options.length === 2) {
        selectB.remove(0);
    }

    //Daca a ramas o singura optiune in C, sterge "Toate"
    if (selectC.options.length === 2) {
        selectC.remove(0);
    }

    renderTable(filteredData);
}

//Poate sterge din C
function filterDataB() {
    let filteredData = data;

    renderOptions(selectC, 'C');

    if (selectB.value !== "Toate") {
        filteredData = filteredData.filter(item => item.B === selectB.value);
    } else  {
        filteredData = filteredData.filter(item => item.A === selectA.value);
    }

    deleteOptions(selectC, 'C', filteredData);

    if (selectC.options.length === 2) {
        selectC.remove(0);
    }

    const matchingItem = filteredData.find(item => item.B === selectB.value);

    if (matchingItem) {
        selectA.value = matchingItem.A;
        selectC.value = matchingItem.C;
    }

    if (selectC.options.length > 2) {
        selectC.value = "Toate";
    }

    renderTable(filteredData);
}

function filterDataC() {
    let filteredData = data;

    if (selectC.value !== "Toate") {
        filteredData = filteredData.filter(item => item.C === selectC.value);
    } else  {
        filteredData = filteredData.filter(item => item.A === selectA.value);
        filteredData = filteredData.filter(item => item.B === selectB.value);
    }

    const matchingItem = filteredData.find(item => item.C === selectC.value)

    if (matchingItem) {
        selectA.value = matchingItem.A;
        selectB.value = matchingItem.B;
    }

    renderTable(filteredData);
}

selectA.addEventListener("change", filterDataA);
selectB.addEventListener("change", filterDataB);
selectC.addEventListener("change", filterDataC);

renderTable(data);
selects.forEach(({ select, key }) => {
    renderOptions(select, key);
});