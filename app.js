// 1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
// HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

const dostupneRecepty = recepty;
const seznamReceptu = document.querySelector('#recepty');

// vygenerovanie seznamu receptu v leve casti stranky pomocou createElement
vygenerujSeznamReceptu();

function vygenerujSeznamReceptu() {

  for (let i=0; i < dostupneRecepty.length; i++) {

    let obalRecept = document.createElement('div');
    let obrazekDiv = document.createElement('div');
    let popisReceptuDiv = document.createElement('div');
    let obrazekReceptu = document.createElement('img');
    let popisReceptu = document.createElement('h3');

    obalRecept.setAttribute('class', 'recept');
    obrazekDiv.setAttribute('class', 'recept-obrazek');
    popisReceptuDiv.setAttribute('class', 'recept-info')

    obrazekReceptu.src = dostupneRecepty[i].img;
    obrazekDiv.appendChild(obrazekReceptu);
    obalRecept.appendChild(obrazekDiv);

    popisReceptu.textContent = dostupneRecepty[i].nadpis;
    popisReceptuDiv.appendChild(popisReceptu);

    // zavolanie funkcie na onclick na zobrazenie detailu receptu
    obalRecept.onclick = zobrazDetailReceptu;

    obalRecept.appendChild(popisReceptuDiv);

    seznamReceptu.appendChild(obalRecept);

    document.querySelector('#recept-foto').style.display = "none"
    document.querySelector('.recept-kategorie').style.display = "none"
    document.querySelector('.fa-star').style.display = "none"
  
    // zavolani funkce pro načtení a zobrazení hodnoty z Local Storage
    nactiPoslednyRecept();
  }
};
  // iny sposob

// const seznamElement = document.querySelector('#recepty')

// let seznamReceptu = '';
// dostupneRecepty.forEach(recept => {
//   seznamReceptu +=
//  `<div class="recept">
//     <div class="recept-obrazek">
//         <img src="${recept.img}" alt="Obrazek">
//     </div>

//     <div class="recept-info">
//         <h3>${recept.nadpis}</h3>
//     </div>)
//  </div>`
// });
// seznamElement.innerHTML = seznamReceptu;

  // ---------------------------------------------------------
document.querySelector('#hledat').onkeyup = searchFilter;
 // 2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat by se měl seznam receptů vyfiltrovat podle hledaného slova.

function searchFilter() {

  let input = document.querySelector('#hledat');
  let filter = input.value.toLowerCase();
  
  seznamReceptu.innerHTML = "";

  for (i = 0; i < dostupneRecepty.length; i++) {
    
    let nazovReceptu = dostupneRecepty[i].nadpis;

    if (nazovReceptu.toLowerCase().indexOf(filter) > -1) {
    
      let hladanyRecept =
      `<div class="recept" onclick="zobrazDetailReceptu(event)">
          <div class="recept-obrazek">
              <img src="${dostupneRecepty[i].img}" alt="Obrazek">
          </div>

          <div class="recept-info">
              <h3>${dostupneRecepty[i].nadpis}</h3>
          </div>
      </div>`


      seznamReceptu.innerHTML += hladanyRecept;
    } 
  }
//  v pripade, ze ziadny vysledok neodpoveda hladanemu slovu
  if (seznamReceptu.innerHTML === "") {
    seznamReceptu.innerHTML = 'Nic nenalezeno.'
  }

};


  // --------------------------------------------------------
  // 3) Doplň filtrovanání receptů podle kategorie.

document.querySelector('#kategorie').onchange = kategorie;

const selectKategorie = document.querySelector("#kategorie");
selectKategorie.onchange = kategorie;

function kategorie() { 
  if (selectKategorie.selectedIndex === 1) {
    
    getByValue (dostupneRecepty, 'Snídaně')
  }
  else if (selectKategorie.selectedIndex === 2) {
    getByValue (dostupneRecepty, 'Hlavní jidlo');
  }
  else if (selectKategorie.selectedIndex === 3) {
    getByValue (dostupneRecepty, 'Dezert');
  }
  else if (selectKategorie.selectedIndex === 0) {
    seznamReceptu.innerHTML = '';
    vygenerujSeznamReceptu();
  }
}

function getByValue(arr, value) {
  seznamReceptu.innerHTML = '';
  for (var i=0, iLen=arr.length; i<iLen; i++) {

    if (arr[i].kategorie == value) { 
      let hledanaKategorie =
        `<div class="recept" onclick="zobrazDetailReceptu(event)">
          <div class="recept-obrazek">
              <img src="${dostupneRecepty[i].img}" alt="Obrazek">
          </div>
    
          <div class="recept-info">
              <h3>${dostupneRecepty[i].nadpis}</h3>
          </div>
        </div>`;
    seznamReceptu.innerHTML += hledanaKategorie;

  }}
}

// -------------------------------------------------------
// 4) Doplň řazení receptů podle hodnocení.
const razeni = document.querySelector('#razeni');
razeni.onchange = zoradPodleHodnoceni;

function zoradPodleHodnoceni() { 
  let kopieSeznamReceptu = [...dostupneRecepty];
  
  if (razeni.selectedIndex === 1 ) {
    seznamReceptu.innerHTML = '';
     
    kopieSeznamReceptu.sort(function (a, b) {
        return b.hodnoceni - a.hodnoceni;
     });
    vytvorRecept(kopieSeznamReceptu);
  } else if (razeni.selectedIndex === 2 ) {
    seznamReceptu.innerHTML = '';
     
    kopieSeznamReceptu.sort(function (a, b) {
        return a.hodnoceni - b.hodnoceni;
     });
     vytvorRecept(kopieSeznamReceptu); 
  } else {
    seznamReceptu.innerHTML = '';
    vygenerujSeznamReceptu();
  }
};

// ----------------------------------------------------

function vytvorRecept(kopieSeznamReceptu) {
  for (i = 0; i < kopieSeznamReceptu.length; i++) {
    let hledanaKategorie =
    `<div class="recept" onclick="zobrazDetailReceptu(event)">
      <div class="recept-obrazek">
          <img src="${kopieSeznamReceptu[i].img}" alt="Obrazek">
      </div>
  
      <div class="recept-info">
          <h3>${kopieSeznamReceptu[i].nadpis}</h3>
      </div>
    </div>`;
    seznamReceptu.innerHTML += hledanaKategorie 
  }
};
  // ---------------------------------------------------

  // 5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
  // Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
  // recept-hodnoceni, recept-nazev, recept-popis.
  

function zobrazDetailReceptu(event) {
    document.querySelector('#recept-foto').style.display = "";
    document.querySelector('.recept-kategorie').style.display = "";
    document.querySelector('.fa-star').style.display = "";
    
    // v pripade ze je v local storage ulozeny posledny recept, pracuj s touto hodnotou, ak ne, vezmi hodnotu h3 po kliknuti na recept
    oznacenyRecept = event.currentTarget === undefined ? event : event.currentTarget.querySelector('h3').innerHTML;

    for (i = 0; i < dostupneRecepty.length; i++) {
      if (oznacenyRecept.indexOf(dostupneRecepty[i].nadpis) > -1) {
        let obrazek = document.querySelector('#recept-foto');
        obrazek.src = dostupneRecepty[i].img;
        let kat = document.querySelector('#recept-kategorie');
        kat.innerHTML = dostupneRecepty[i].kategorie;
        let hod = document.querySelector('#recept-hodnoceni');
        hod.innerHTML = dostupneRecepty[i].hodnoceni;
        let nazev = document.querySelector('#recept-nazev');
        nazev.innerHTML = dostupneRecepty[i].nadpis;
        let popis = document.querySelector('#recept-popis');
        popis.innerHTML = dostupneRecepty[i].popis;

        ulozPoslednyRecept(oznacenyRecept);
      }
    }
};

  // -------------------------------------------------------------------------
  // 6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
  //
  
  // funkce pro načtení a zobrazení hodnoty z Local Storage
  function nactiPoslednyRecept() {
  	// načteme z local storage
  	let elementPoslednyRecept = localStorage.getItem('poslednyRecept');

  	if (elementPoslednyRecept !== null && elementPoslednyRecept !== undefined) {
  		zobrazDetailReceptu(elementPoslednyRecept);
  	}
  };

  // funkce pro uložení hodnoty do local storage
  function ulozPoslednyRecept(nazovReceptu) {
  
  	// a uložíme do local storage pod jménem "poslednyRecept"
  	localStorage.setItem('poslednyRecept', nazovReceptu);
  };
