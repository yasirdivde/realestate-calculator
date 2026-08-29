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

    // ----- Sector rates (Taloja commercial) -----
    let comiValue, landValue;
    if (sectorNo == 1) { comiValue = 76500; landValue = 19000; }
    else if (sectorNo == 2) { comiValue = 86900; landValue = 19000; }
    else if (sectorNo == 3) { comiValue = 76500; landValue = 19000; }
    else if (sectorNo == 4) { comiValue = 95800; landValue = 15100; }
    else if (sectorNo == 5) { comiValue = 95600; landValue = 15000; }
    else if (sectorNo == 6) { comiValue = 73600; landValue = 14600; }
    else if (sectorNo == 7) { comiValue = 94800; landValue = 15000; }
    else if (sectorNo == 8) { comiValue = 81700; landValue = 15000; }
    else if (sectorNo == 9) { comiValue = 94200; landValue = 18500; }
    else if (sectorNo == 10) { comiValue = 85800; landValue = 20000; }
    else if (sectorNo == 11) { comiValue = 84200; landValue = 19000; }
    else if (sectorNo == 12) { comiValue = 78800; landValue = 20000; }
    else if (sectorNo == 13) { comiValue = 76500; landValue = 19600; }
    else if (sectorNo == 14) { comiValue = 92100; landValue = 18500; }
    else if (sectorNo == 15) { comiValue = 85400; landValue = 13500; }
    else if (sectorNo == 16) { comiValue = 88200; landValue = 14300; }
    else if (sectorNo == 17) { comiValue = 95800; landValue = 15100; }
    else if (sectorNo == 18) { comiValue = 95800; landValue = 15100; }
    else if (sectorNo == 19) { comiValue = 79600; landValue = 16200; }
    else if (sectorNo == 20) { comiValue = 90200; landValue = 18000; }
    else if (sectorNo == 21) { comiValue = 75800; landValue = 18100; }
    else if (sectorNo == 22) { comiValue = 75800; landValue = 18100; }
    else if (sectorNo == 23) { comiValue = 95400; landValue = 17300; }
    else if (sectorNo == 24) { comiValue = 86600; landValue = 17300; }
    else if (sectorNo == 25) { comiValue = 73600; landValue = 14300; }
    else if (sectorNo == 26) { comiValue = 95000; landValue = 17300; }
    else if (sectorNo == 27) { comiValue = 77300; landValue = 18300; }
    else if (sectorNo == 28) { comiValue = 75800; landValue = 18100; }
    else if (sectorNo == 29) { comiValue = 75800; landValue = 18100; }
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
    const roundedTotal = Math.round(total / 100) * 100;
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