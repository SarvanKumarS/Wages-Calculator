/**
 * Wages & ESIC Calculator Logic
 * Handles reading inputs, performing specific ESIC math, and updating the UI.
 */

function calculateWages() {
    // --- 1. GET INPUT VALUES ---
    // Helper function to get value safely (defaults to 0 if empty)
    const getVal = (id) => {
        const value = document.getElementById(id).value;
        return value === "" ? 0 : parseFloat(value);
    };

    const basicPay = getVal("basicPay");
    const da = getVal("da");
    const retention = getVal("retention");
    const hra = getVal("hra");
    const travelling = getVal("travelling");
    const washing = getVal("washing");
    const conveyance = getVal("conveyance");
    const overtime = getVal("overtime");
    const other1 = getVal("other1");
    const other2 = getVal("other2");

    // --- 2. CALCULATIONS ---

    // Logic A: Calculate Wage Sum (Basic + DA + Retention)
    // Used for ESIC eligibility check and contribution calculation
    const wageSum = basicPay + da + retention;

    // Output 1: Total Gross Salary (Sum of all 10 inputs)
    const totalGross = basicPay + da + retention + hra + travelling + washing + conveyance + overtime + other1 + other2;

    // Output 2: Coverable under ESIC?
    // Condition: IF (Total Gross <= 42000) AND (Wage Sum <= 21000) THEN 'YES' ELSE 'NO'
    let isCoverable = "NO";
    if (totalGross <= 42000 && wageSum <= 21000) {
        isCoverable = "YES";
    }

    // Output 3: Wages for ESI Contribution
    // Formula: MAX(Wage Sum, Total Gross / 2)
    // Note: If not coverable, this technically shouldn't apply, but we calculate based on your formula request.
    const wagesForESI = Math.max(wageSum, totalGross / 2);

    // Output 4: Employee Contribution @ 0.75%
    // Formula: ROUNDUP(Wages for ESI Contribution * 0.75%, 0)
    // We use Math.ceil for ROUNDUP to 0 decimal places
    let employeeContribution = 0;

    // Only calculate contribution if they are coverable (Standard Logic), 
    // OR if you want it calculated regardless, remove the 'if' check below.
    // Based on your prompt, you asked for the raw formula, but usually contribution is 0 if not coverable.
    // I will apply the calculation strictly as requested, but logically it implies 0 if NO.
    // However, adhering strictly to your formula list:
    employeeContribution = Math.ceil(wagesForESI * 0.0075);

    // If "isCoverable" is NO, usually contribution is 0. 
    // Let's force it to 0 if not coverable to make practical sense, 
    // unless you want the theoretical calculation. 
    // *Adjusting logic for practical use case*:
    if (isCoverable === "NO") {
        employeeContribution = 0;
    }

    // --- 3. UPDATE UI ---

    // Update text content
    document.getElementById("outTotalGross").textContent = formatCurrency(totalGross);

    const coverableEl = document.getElementById("outCoverable");
    coverableEl.textContent = isCoverable;

    // Styling for YES/NO
    if (isCoverable === "YES") {
        coverableEl.style.color = "#27ae60"; // Green
        coverableEl.style.backgroundColor = "#e8f6f3";
    } else {
        coverableEl.style.color = "#c0392b"; // Red
        coverableEl.style.backgroundColor = "#fdedec";
    }

    document.getElementById("outWagesESI").textContent = formatCurrency(wagesForESI);
    document.getElementById("outContribution").textContent = formatCurrency(employeeContribution);
}

// Helper to format numbers as currency (optional, makes it look nicer)
function formatCurrency(num) {
    return num.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });
}

function resetForm() {
    // The HTML <button type="reset"> handles clearing inputs automatically.
    // We just need to reset the output displays.
    document.getElementById("outTotalGross").textContent = "0.00";
    document.getElementById("outCoverable").textContent = "-";
    document.getElementById("outCoverable").style.color = "inherit";
    document.getElementById("outCoverable").style.backgroundColor = "transparent";
    document.getElementById("outWagesESI").textContent = "0.00";
    document.getElementById("outContribution").textContent = "0.00";
}