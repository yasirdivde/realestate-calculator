// ********************* Helper Functions *********************
function formatIndianNumber(num) {
    let parts = num.toString().split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1] ? '.' + parts[1] : '';
    let lastThreeDigits = integerPart.slice(-3);
    let otherDigits = integerPart.slice(0, -3);
    if (otherDigits) {
        lastThreeDigits = ',' + lastThreeDigits;
    }
    return otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThreeDigits + decimalPart;
}

function numberToWords(num) {
    const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const scales = ["", "Thousand", "Lakh", "Crore"];

    if (num === 0) return "Zero";

    let words = [];
    let chunks = [];
    chunks.push(num % 1000);
    num = Math.floor(num / 1000);

    while (num > 0) {
        chunks.push(num % 100);
        num = Math.floor(num / 100);
    }
    chunks = chunks.reverse();

    for (let i = 0; i < chunks.length; i++) {
        let chunk = chunks[i];
        if (chunk > 0) {
            let chunkWords = [];
            if (Math.floor(chunk / 100) > 0) {
                chunkWords.push(units[Math.floor(chunk / 100)] + " Hundred");
                chunk %= 100;
            }
            if (chunk > 10 && chunk < 20) {
                chunkWords.push(teens[chunk - 10]);
            } else {
                if (Math.floor(chunk / 10) > 0) {
                    chunkWords.push(tens[Math.floor(chunk / 10)]);
                }
                if (chunk % 10 > 0) {
                    chunkWords.push(units[chunk % 10]);
                }
            }
            if (scales[chunks.length - 1 - i]) {
                chunkWords.push(scales[chunks.length - 1 - i]);
            }
            words.push(chunkWords.join(" "));
        }
    }
    return words.join(" ").trim();
}

// ********************* Main Calculation *********************
function calculateAndPopulate() {
    // Get form values using the new IDs
    const sectorNo = document.getElementById('sectorNumber').value;
    const carpetAreaInput = parseFloat(document.getElementById('carpetArea').value);
    const terraceAreaInput = parseFloat(document.getElementById('terraceArea').value) || 0;
    const ghasara = document.getElementById('propertyAge').value;
    const floorNumber = document.getElementById('floorNumber').value;

    // Built-up area = carpet area * 1.2
    const area = (carpetAreaInput * 1.2).toFixed(3);

    // ----- Sector rates (resiValue & landValue) -----
    let resiValue, landValue;
    if (sectorNo == 1) { resiValue = 94900; landValue = 41700; }
    else if (sectorNo == 2) { resiValue = 134000; landValue = 45100; }
    else if (sectorNo == 3) { resiValue = 106100; landValue = 35500; }
    else if (sectorNo == 4) { resiValue = 122400; landValue = 42300; }
    else if (sectorNo == 5) { resiValue = 132200; landValue = 48000; }
    else if (sectorNo == 6) { resiValue = 155700; landValue = 57700; }
    else if (sectorNo == 7) { resiValue = 145800; landValue = 52000; }
    else if (sectorNo == 8) { resiValue = 135200; landValue = 46900; }
    else if (sectorNo == 9) { resiValue = 94700; landValue = 44800; }
    else if (sectorNo == 10) { resiValue = 123900; landValue = 45400; }
    else if (sectorNo == 11) { resiValue = 130800; landValue = 42500; }
    else if (sectorNo == 12) { resiValue = 137600; landValue = 53800; }
    else if (sectorNo == 13) { resiValue = 99000; landValue = 35000; }
    else if (sectorNo == 14) { resiValue = 121300; landValue = 39300; }
    else if (sectorNo == 15) { resiValue = 121200; landValue = 44500; }
    else if (sectorNo == 16) { resiValue = 93700; landValue = 26300; }
    else if (sectorNo == 17) { resiValue = 90400; landValue = 24400; }
    else if (sectorNo == 18) { resiValue = 115200; landValue = 32000; }
    else if (sectorNo == 19) { resiValue = 122000; landValue = 45800; }
    else if (sectorNo == 20) { resiValue = 127400; landValue = 44400; }
    else if (sectorNo == 21) { resiValue = 115600; landValue = 50200; }
    else if (sectorNo == 22) { resiValue = 51800; landValue = 16000; }
    else if (sectorNo == 23) { resiValue = 88000; landValue = 29500; }
    else if (sectorNo == 24) { resiValue = 65500; landValue = 30900; }
    else if (sectorNo == 25) { resiValue = 57200; landValue = 23200; }
    else if (sectorNo == 26) { resiValue = 45900; landValue = 17000; }
    else if (sectorNo == 27) { resiValue = 118600; landValue = 42000; }
    else if (sectorNo == 28) { resiValue = 72100; landValue = 31600; }
    else if (sectorNo == 29) { resiValue = 64900; landValue = 29000; }
    else if (sectorNo == 30) { resiValue = 92700; landValue = 31000; }
    else if (sectorNo == 31) { resiValue = 80200; landValue = 30700; }
    else if (sectorNo == 32) { resiValue = 81000; landValue = 30700; }
    else if (sectorNo == 33) { resiValue = 89100; landValue = 38600; }
    else if (sectorNo == 34) { resiValue = 117700; landValue = 35100; }
    else if (sectorNo == 35) { resiValue = 113700; landValue = 38400; }
    else if (sectorNo == 36) { resiValue = 64200; landValue = 16200; }
    else if (sectorNo == 37) { resiValue = 61800; landValue = 20200; }
    else if (sectorNo == 38) { resiValue = 52200; landValue = 17200; }
    else if (sectorNo == 39) { resiValue = 78000; landValue = 26800; }
    else if (sectorNo == 40) { resiValue = 55800; landValue = 21100; }
    else if (sectorNo == 41) { resiValue = 55700; landValue = 21800; }
    else if (sectorNo == 42) { resiValue = 46900; landValue = 17100; }
    else if (sectorNo == 43) { resiValue = 49100; landValue = 18800; }
    else if (sectorNo == 44) { resiValue = 49100; landValue = 18800; }
    else if (sectorNo == 45) { resiValue = 55700; landValue = 21600; }
    else { resiValue = 0; landValue = 0; }

    // ----- Floor rise factor -----
    let floorRise;
    if (floorNumber < 5) floorRise = 1;
    else if (floorNumber >= 5 && floorNumber <= 10) floorRise = 1.05;
    else if (floorNumber >= 11 && floorNumber <= 20) floorRise = 1.075;
    else floorRise = 1.10;

    // ----- Depreciation fall -----
    let ghasaraFall;
    if (ghasara < 3) ghasaraFall = 0;
    else if (ghasara >= 3 && ghasara <= 5) ghasaraFall = 5;
    else ghasaraFall = ghasara;

    // ----- Applicable rate calculation -----
    const riseValue = (resiValue * floorRise) - landValue;
    const fallValue = (riseValue * (1 - (ghasaraFall / 100))) + landValue;
    const applicableRate = Math.ceil(fallValue);

    // ----- Total values -----
    const total = area * applicableRate;
    const totalTerraceArea = terraceAreaInput * (applicableRate * 40 / 100);
    const grandTotal = total + totalTerraceArea;
    const roundedTotal = Math.round(grandTotal / 100) * 100;
    const formattedTotal = formatIndianNumber(roundedTotal);
    const wordsTotal = numberToWords(roundedTotal);

    // ----- Update the result table -----
    document.getElementById('SecNo').textContent = sectorNo;
    document.getElementById('PropValue').textContent = formatIndianNumber(resiValue);
    document.getElementById('LandValue').textContent = formatIndianNumber(landValue);
    document.getElementById('CArea').textContent = area;
    document.getElementById('TerArea').textContent = terraceAreaInput;
    document.getElementById('flrN').textContent = floorNumber;
    document.getElementById('ghasara1').textContent = ghasara;
    document.getElementById('ghasara2').textContent = ghasaraFall;
    document.getElementById('AppRate').textContent = formatIndianNumber(applicableRate);
    document.getElementById('totalN').textContent = formattedTotal;
    document.getElementById('totalW').textContent = wordsTotal;

    // Optionally handle terrace row visibility if needed (not required)
   document.getElementById('terraceRow').style.display = (terraceAreaInput == 0) ? 'none' : 'table-row';
}