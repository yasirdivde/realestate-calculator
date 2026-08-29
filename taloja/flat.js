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
    const areaMode = document.getElementById('areaMode').value; // 'carpet' or 'builtup'

    // Determine built-up area based on toggle
    let area;
    if (areaMode === 'builtup') {
        area = carpetAreaInput.toFixed(3); // already built-up
    } else {
        area = (carpetAreaInput * 1.2).toFixed(3); // carpet → built-up (20% uplift)
    }

    // ----- Sector rates (resiValue & landValue) for Taloja -----
    let resiValue, landValue;
    if (sectorNo == 1) { resiValue = 56700; landValue = 19000; }
    else if (sectorNo == 2) { resiValue = 69400; landValue = 19000; }
    else if (sectorNo == 3) { resiValue = 51900; landValue = 19000; }
    else if (sectorNo == 4) { resiValue = 76500; landValue = 15100; }
    else if (sectorNo == 5) { resiValue = 76600; landValue = 15000; }
    else if (sectorNo == 6) { resiValue = 58900; landValue = 14600; }
    else if (sectorNo == 7) { resiValue = 75900; landValue = 15000; }
    else if (sectorNo == 8) { resiValue = 65300; landValue = 15000; }
    else if (sectorNo == 9) { resiValue = 75300; landValue = 18500; }
    else if (sectorNo == 10) { resiValue = 68000; landValue = 20000; }
    else if (sectorNo == 11) { resiValue = 66000; landValue = 19000; }
    else if (sectorNo == 12) { resiValue = 58900; landValue = 20000; }
    else if (sectorNo == 13) { resiValue = 58300; landValue = 19600; }
    else if (sectorNo == 14) { resiValue = 73700; landValue = 18500; }
    else if (sectorNo == 15) { resiValue = 68300; landValue = 13500; }
    else if (sectorNo == 16) { resiValue = 70500; landValue = 14300; }
    else if (sectorNo == 17) { resiValue = 76500; landValue = 15100; }
    else if (sectorNo == 18) { resiValue = 76500; landValue = 15100; }
    else if (sectorNo == 19) { resiValue = 63700; landValue = 16200; }
    else if (sectorNo == 20) { resiValue = 72100; landValue = 18000; }
    else if (sectorNo == 21) { resiValue = 52900; landValue = 18100; }
    else if (sectorNo == 22) { resiValue = 52900; landValue = 18100; }
    else if (sectorNo == 23) { resiValue = 76300; landValue = 17300; }
    else if (sectorNo == 24) { resiValue = 69200; landValue = 17300; }
    else if (sectorNo == 25) { resiValue = 50000; landValue = 14300; }
    else if (sectorNo == 26) { resiValue = 75900; landValue = 17300; }
    else if (sectorNo == 27) { resiValue = 54000; landValue = 18300; }
    else if (sectorNo == 28) { resiValue = 51400; landValue = 18100; }
    else if (sectorNo == 29) { resiValue = 51400; landValue = 18100; }
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

    // Hide terrace row if terrace area is zero
    document.getElementById('terraceRow').style.display = (terraceAreaInput == 0) ? 'none' : 'table-row';
}