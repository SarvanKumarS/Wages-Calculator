/**
 * Wages & ESIC Calculator Logic (Updated)
 * Handles reading 11 inputs, performing specific ESIC math, and updating the UI.
 */

function calculateWages() {
    // --- 1. GET INPUT VALUES ---
    const getVal = (id) => {
        const element = document.getElementById(id);
        // Safety check if element exists (handling potential HTML mismatch)
        if (!element) return 0;
        const value = element.value;
        return value === "" ? 0 : parseFloat(value);
    };

    const basicPay = getVal("basicPay");
    const da = getVal("da");
    const retention = getVal("retention");
    const inclusive = getVal("inclusive"); // Added Inclusive Allowance
    const hra = getVal("hra");
    const travelling = getVal("travelling");
    const washing = getVal("washing");
    const conveyance = getVal("conveyance");
    const overtime = getVal("overtime");
    const other1 = getVal("other1");
    const other2 = getVal("other2");

    // --- 2. CALCULATIONS ---

    // Logic A: Calculate Wage Sum (Basic + DA + Retention + Inclusive)
    // Used for ESIC eligibility check and contribution calculation base
    const wageSum = basicPay + da + retention + inclusive;

    // Output 1: Total Gross Salary (Sum of all 11 inputs)
    const totalGross = basicPay + da + retention + inclusive + hra + travelling + washing + conveyance + overtime + other1 + other2;

    // Output 2: Coverable under ESIC?
    // Condition: IF (Total Gross <= 42000) AND (Wage Sum <= 21000) THEN 'YES' ELSE 'NO'
    let isCoverable = "NO";
    if (totalGross <= 42000 && wageSum <= 21000) {
        isCoverable = "YES";
    }

    // Output 3: Wages for ESI Contribution
    // Formula Step 1: MAX(Wage Sum, Total Gross / 2)
    const calculatedWageBasis = Math.max(wageSum, totalGross / 2);
    
    // Formula Step 2: IF (result <= 20000) THEN print value ELSE print 0
    let finalWagesForESI = 0;
    if (calculatedWageBasis <= 21000) {
        finalWagesForESI = calculatedWageBasis;
    } else {
        finalWagesForESI = 0;
    }

    // Output 4: Employee Contribution @ 0.75%
    // Formula: ROUNDUP(Wages for ESI Contribution * 0.75%, 0)
    let employeeContribution = Math.ceil(finalWagesForESI * 0.0075); 

    // --- 3. UPDATE UI ---
    
    // Update text content with currency formatting
    document.getElementById("outTotalGross").textContent = formatCurrency(totalGross);
    
    const coverableEl = document.getElementById("outCoverable");
    coverableEl.textContent = isCoverable;
    
    // Dynamic styling for YES/NO
    if (isCoverable === "YES") {
        coverableEl.style.color = "#27ae60"; // Green
        coverableEl.style.backgroundColor = "#e8f6f3";
    } else {
        coverableEl.style.color = "#c0392b"; // Red
        coverableEl.style.backgroundColor = "#fdedec";
    }

    document.getElementById("outWagesESI").textContent = formatCurrency(finalWagesForESI);
    document.getElementById("outContribution").textContent = formatCurrency(employeeContribution);
}

// Helper to format numbers as currency (Indian Standard)
function formatCurrency(num) {
    return num.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });
}

function resetForm() {
    // Reset output displays
    document.getElementById("outTotalGross").textContent = "0.00";
    document.getElementById("outCoverable").textContent = "-";
    document.getElementById("outCoverable").style.color = "inherit";
    document.getElementById("outCoverable").style.backgroundColor = "transparent";
    document.getElementById("outWagesESI").textContent = "0.00";
    document.getElementById("outContribution").textContent = "0.00";
}
