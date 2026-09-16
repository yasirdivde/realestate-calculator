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
    const ghasara = document.getElementById('propertyAge').value;
    const areaMode = document.getElementById('areaMode').value; // 'carpet' or 'builtup'

    // Determine built-up area based on toggle
    let area;
    if (areaMode === 'builtup') {
        area = carpetAreaInput.toFixed(3); // already built-up
    } else {
        area = (carpetAreaInput * 1.2).toFixed(3); // carpet → built-up (20% uplift)
    }

    // ----- Sector rates (commercial comiValue & landValue) -----
    let comiValue, landValue;
    if (sectorNo == 1) { comiValue = 126500; landValue = 41700; }
    else if (sectorNo == 2) { comiValue = 167500; landValue = 45100; }
    else if (sectorNo == 3) { comiValue = 132400; landValue = 35500; }
    else if (sectorNo == 4) { comiValue = 154100; landValue = 42300; }
    else if (sectorNo == 5) { comiValue = 166700; landValue = 48000; }
    else if (sectorNo == 6) { comiValue = 193800; landValue = 57700; }
    else if (sectorNo == 7) { comiValue = 182300; landValue = 52000; }
    else if (sectorNo == 8) { comiValue = 169100; landValue = 46900; }
    else if (sectorNo == 9) { comiValue = 126700; landValue = 44800; }
    else if (sectorNo == 10) { comiValue = 156200; landValue = 45400; }
    else if (sectorNo == 11) { comiValue = 163400; landValue = 42500; }
    else if (sectorNo == 12) { comiValue = 171900; landValue = 53800; }
    else if (sectorNo == 13) { comiValue = 123700; landValue = 35000; }
    else if (sectorNo == 14) { comiValue = 151000; landValue = 39300; }
    else if (sectorNo == 15) { comiValue = 151800; landValue = 44500; }
    else if (sectorNo == 16) { comiValue = 117300; landValue = 26300; }
    else if (sectorNo == 17) { comiValue = 112800; landValue = 24400; }
    else if (sectorNo == 18) { comiValue = 143400; landValue = 32000; }
    else if (sectorNo == 19) { comiValue = 154200; landValue = 45800; }
    else if (sectorNo == 20) { comiValue = 158900; landValue = 44400; }
    else if (sectorNo == 21) { comiValue = 144400; landValue = 50200; }
    else if (sectorNo == 22) { comiValue = 64700; landValue = 16000; }
    else if (sectorNo == 23) { comiValue = 110100; landValue = 29500; }
    else if (sectorNo == 24) { comiValue = 91300; landValue = 30900; }
    else if (sectorNo == 25) { comiValue = 71600; landValue = 23200; }
    else if (sectorNo == 26) { comiValue = 64700; landValue = 17000; }
    else if (sectorNo == 27) { comiValue = 148300; landValue = 42000; }
    else if (sectorNo == 28) { comiValue = 97800; landValue = 31600; }
    else if (sectorNo == 29) { comiValue = 93100; landValue = 29000; }
    else if (sectorNo == 30) { comiValue = 116000; landValue = 31000; }
    else if (sectorNo == 31) { comiValue = 100200; landValue = 30700; }
    else if (sectorNo == 32) { comiValue = 101200; landValue = 30700; }
    else if (sectorNo == 33) { comiValue = 111300; landValue = 38600; }
    else if (sectorNo == 34) { comiValue = 147000; landValue = 35100; }
    else if (sectorNo == 35) { comiValue = 142000; landValue = 38400; }
    else if (sectorNo == 36) { comiValue = 80300; landValue = 16200; }
    else if (sectorNo == 37) { comiValue = 77100; landValue = 10200; }
    else if (sectorNo == 38) { comiValue = 65400; landValue = 17200; }
    else if (sectorNo == 39) { comiValue = 97500; landValue = 26800; }
    else if (sectorNo == 40) { comiValue = 81300; landValue = 21100; }
    else if (sectorNo == 41) { comiValue = 79500; landValue = 21800; }
    else if (sectorNo == 42) { comiValue = 65900; landValue = 17100; }
    else if (sectorNo == 43) { comiValue = 70300; landValue = 18800; }
    else if (sectorNo == 44) { comiValue = 70300; landValue = 18800; }
    else if (sectorNo == 45) { comiValue = 76000; landValue = 21600; }
    else { comiValue = 0; landValue = 0; }

    // ----- Floor rise factor (always 1 for shops) -----
    const floorRise = 1;

    // ----- Depreciation fall -----
    let ghasaraFall;
    if (ghasara < 3) ghasaraFall = 0;
    else if (ghasara >= 3 && ghasara <= 5) ghasaraFall = 5;
    else ghasaraFall = ghasara;

    // ----- Applicable rate calculation -----
    const riseValue = (comiValue * floorRise) - landValue;
    const fallValue = (riseValue * (1 - (ghasaraFall / 100))) + landValue;
    const applicableRate = Math.ceil(fallValue);

    // ----- Total values (no terrace for shop) -----
    const total = area * applicableRate;
    const roundedTotal = Math.ceil(total / 100) * 100;
    const formattedTotal = formatIndianNumber(roundedTotal);
    const wordsTotal = numberToWords(roundedTotal);

    // ----- Update the result table -----
    document.getElementById('SecNo').textContent = sectorNo;
    document.getElementById('PropValue').textContent = formatIndianNumber(comiValue);
    document.getElementById('LandValue').textContent = formatIndianNumber(landValue);
    document.getElementById('CArea').textContent = area;
    document.getElementById('ghasara1').textContent = ghasara;
    document.getElementById('ghasara2').textContent = ghasaraFall;
    document.getElementById('AppRate').textContent = formatIndianNumber(applicableRate);
    document.getElementById('totalN').textContent = formattedTotal;
    document.getElementById('totalW').textContent = wordsTotal;
}