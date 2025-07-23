const rikishiMatchups = [
  { east: "Hoshoryu", west: "Kotozakura" },
  { east: "Onosato", west: "Abi" },
  { east: "Daieisho", west: "Wakamotoharu" },
  { east: "Shodai", west: "Asanoyama" },
  { east: "Takayasu", west: "Tobizaru" },
  { east: "Meisei", west: "Ura" },
  { east: "Takanosho", west: "Mitakeumi" },
  { east: "Tamawashi", west: "Shonannoumi" },
  { east: "Hiradoumi", west: "Kinbozan" },
  { east: "Oho", west: "Sadanoumi" }
];

function createMatchupRow(match, index) {
  const tr = document.createElement('tr');

  const eastTd = document.createElement('td');
  eastTd.textContent = match.east;

  const eastRadioTd = document.createElement('td');
  const eastRadio = document.createElement('input');
  eastRadio.type = 'radio';
  eastRadio.name = `match${index}`;
  eastRadio.value = match.east;
  eastRadioTd.className = "radio-container";
  eastRadioTd.appendChild(eastRadio);

  const westRadioTd = document.createElement('td');
  const westRadio = document.createElement('input');
  westRadio.type = 'radio';
  westRadio.name = `match${index}`;
  westRadio.value = match.west;
  westRadioTd.className = "radio-container";
  westRadioTd.appendChild(westRadio);

  const westTd = document.createElement('td');
  westTd.textContent = match.west;

  tr.appendChild(eastTd);
  tr.appendChild(eastRadioTd);
  tr.appendChild(westRadioTd);
  tr.appendChild(westTd);

  return tr;
}

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('matchupsBody');
  rikishiMatchups.forEach((match, index) => {
    tableBody.appendChild(createMatchupRow(match, index));
  });
});
