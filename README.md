Wages & ESIC Calculator

A lightweight, web-based tool designed to streamline salary computations for HR professionals and employees. This tool accepts various salary components, calculates the Gross Salary, determines ESIC eligibility based on current statutory limits, and computes the required Employee Contribution.

🚀 Key Features

10-Input Flexibility: Handles Basic Pay, DA, HRA, Retention, and various specific allowances.

Instant Calculation: Real-time summation and logic processing using JavaScript.

Compliance Logic: Automatically checks ESIC eligibility based on the ₹21,000 Wage Limit and ₹42,000 Gross Limit.

Precise Rounding: Calculates Employee Contribution @ 0.75% and rounds up to the next rupee as per standard practice.

Responsive Design: Works on desktops, tablets, and mobile phones.

Watermark Support: Includes a CSS-based background watermark for branding.

📂 Project Structure

/WagesCalculator
│
├── index.html      # Structure: Input forms and Result display
├── style.css       # Styling: Layout, colors, and Watermark logic
├── script.js       # Logic: The math and ESIC rules engine
└── assets/
    └── logo.png    # Your company logo (appears as background watermark)


⚙️ Logic & Formulas

The calculator uses the following logic to determine results:

Total Gross: Sum of all 10 input fields.

Wage Sum (for limit check): Basic Pay + Dearness Allowance + Retention Allowance

ESIC Eligibility Status:

YES: If Total Gross <= 42,000 AND Wage Sum <= 21,000

NO: If either condition fails.

Wages for Contribution: MAX(Wage Sum, Total Gross / 2)

Employee Contribution: ROUNDUP(Wages for Contribution * 0.75%, 0)

🛠️ How to Run Locally

Download or Clone this repository.

Ensure the assets folder contains a file named logo.png (or logo.svg).

Double-click index.html to open the calculator in your default web browser.

🎨 Customization

Change Logo: Replace assets/logo.png with your own image file.

Change Watermark Opacity: Open style.css and adjust the opacity value under body::before.

📄 License

Free to use for personal or commercial purposes.