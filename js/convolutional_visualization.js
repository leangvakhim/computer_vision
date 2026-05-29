// --- Data Definitions ---

// 4x4 Input Matrix (designed to match the user's specific text example for the top-right spot)
// At step 3 (top-right, x=2, y=0), the 2x2 patch needs to be:
// Top-left: 1, Top-right: 0, Bottom-left: 1, Bottom-right: 0
const inputMatrix = [
    [0, 1, 1, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0]
];

// 2x2 Kernel Matrix
const kernelMatrix = [
    [1, 0],
    [0, 1]
];

// Precalculate Feature Map (3x3)
const featureMap = [];
for (let y = 0; y < 3; y++) {
    let row = [];
    for (let x = 0; x < 3; x++) {
        let sum = 0;
        for (let ky = 0; ky < 2; ky++) {
            for (let kx = 0; kx < 2; kx++) {
                sum += inputMatrix[y + ky][x + kx] * kernelMatrix[ky][kx];
            }
        }
        row.push(sum);
    }
    featureMap.push(row);
}

// --- State ---
let currentStep = 0; // 0 to 8 (9 total steps for 3x3 feature map)
const totalSteps = 9;

// --- DOM Elements ---
const inputGrid = document.getElementById('input-grid');
const kernelGrid = document.getElementById('kernel-grid');
const featureGrid = document.getElementById('feature-grid');
const stepCounter = document.getElementById('step-counter');
const btnBack = document.getElementById('btn-back');
const btnNext = document.getElementById('btn-next');
const mathDiv = document.getElementById('math-formula');

// --- Core Functions ---

function init() {
    // Setup static Kernel grid
    kernelGrid.innerHTML = '';
    for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 2; x++) {
            const div = document.createElement('div');
            div.className = 'w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border-2 rounded text-lg md:text-xl grid-cell highlight-kernel';
            div.innerText = kernelMatrix[y][x];
            kernelGrid.appendChild(div);
        }
    }

    // Render general formulas using KaTeX
    katex.render("\\text{Input Size} - \\text{Kernel Size} + 1 = \\text{Feature Map Size}", document.getElementById('formula-rule'), { displayMode: true });
    katex.render("\\begin{aligned} &\\text{Input} = 4 \\\\ &\\text{Kernel} = 3 \\\\ &\\text{Math: } 4 - 3 + 1 = 2 \\\\ &\\textbf{Result: } \\text{Feature Map is } 2 \\times 2 \\end{aligned}", document.getElementById('example-math'), { displayMode: true });

    updateVisualization();
}

function changeStep(delta) {
    currentStep += delta;
    if (currentStep < 0) currentStep = 0;
    if (currentStep >= totalSteps) currentStep = totalSteps - 1;
    updateVisualization();
}

function updateVisualization() {
    // Update Buttons & Counter
    btnBack.disabled = currentStep === 0;
    btnNext.disabled = currentStep === totalSteps - 1;
    stepCounter.innerText = currentStep + 1;

    const currentX = currentStep % 3;
    const currentY = Math.floor(currentStep / 3);

    // 1. Render Input Grid (Sandbox)
    inputGrid.innerHTML = '';
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            const div = document.createElement('div');
            // Check if cell is within the current 2x2 "Magnifying Glass" view
            const isHighlighted = (x >= currentX && x < currentX + 2) && (y >= currentY && y < currentY + 2);

            div.className = `w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border-2 rounded text-lg md:text-xl grid-cell ${isHighlighted ? 'highlight-input z-10 scale-110 shadow-md' : 'bg-white border-gray-200 text-gray-500'}`;
            div.innerText = inputMatrix[y][x];
            inputGrid.appendChild(div);
        }
    }

    // 2. Render Feature Map (Notepad)
    featureGrid.innerHTML = '';
    let stepIndex = 0;
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            const div = document.createElement('div');

            if (stepIndex < currentStep) {
                // Already calculated
                div.className = 'w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border-2 rounded text-lg md:text-xl grid-cell bg-white border-green-300 text-green-700';
                div.innerText = featureMap[y][x];
            } else if (stepIndex === currentStep) {
                // Currently calculating
                div.className = 'w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border-2 rounded text-lg md:text-xl grid-cell highlight-feature scale-110 shadow-md z-10';
                div.innerText = featureMap[y][x];
            } else {
                // Future calculation (hidden)
                div.className = 'w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border-2 rounded text-lg md:text-xl grid-cell inactive-feature border-dashed border-gray-300';
                div.innerText = '?';
            }

            featureGrid.appendChild(div);
            stepIndex++;
        }
    }

    // 3. Generate Math Formula using KaTeX
    // Extract the 4 values from input and kernel
    const i11 = inputMatrix[currentY][currentX];
    const i12 = inputMatrix[currentY][currentX + 1];
    const i21 = inputMatrix[currentY + 1][currentX];
    const i22 = inputMatrix[currentY + 1][currentX + 1];

    const k11 = kernelMatrix[0][0];
    const k12 = kernelMatrix[0][1];
    const k21 = kernelMatrix[1][0];
    const k22 = kernelMatrix[1][1];

    const score = featureMap[currentY][currentX];

    // Build standard display formula
    const latexString = `
        \\begin{aligned}
        \\text{Score} &= (${i11} \\times ${k11}) + (${i12} \\times ${k12}) + (${i21} \\times ${k21}) + (${i22} \\times ${k22}) \\\\
        &= (${i11 * k11}) + (${i12 * k12}) + (${i21 * k21}) + (${i22 * k22}) \\\\
        &= \\mathbf{${score}}
        \\end{aligned}
    `;

    try {
        katex.render(latexString, mathDiv, { displayMode: true });
    } catch (e) {
        console.error("KaTeX Error:", e);
        mathDiv.innerText = "Error rendering math.";
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);