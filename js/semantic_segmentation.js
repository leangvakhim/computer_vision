// --- 1. Define the Map (12 cols x 10 rows) ---
// 0: Sky, 1: Car, 2: Road
const mapData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], // Car top
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0], // Car body
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], // Car body
    [0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0], // Car body + wheel arches
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], // Road
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], // Road
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], // Road
];

// Specific pixel to highlight (e.g., a piece of the car body)
const targetPixel = { r: 5, c: 4 };

// --- 2. DOM Elements ---
const gridContainer = document.getElementById('grid-container');
const magGlass = document.getElementById('magnifying-glass');
const contentTitle = document.getElementById('content-title');
const contentText = document.getElementById('content-text');
const visualTitle = document.getElementById('visual-title');
const stepCounter = document.getElementById('step-counter');
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const mathContainer = document.getElementById('math-container');
const katexRender = document.getElementById('katex-render');
const scoreboardContainer = document.getElementById('scoreboard-container');
const stepDots = document.getElementById('step-dots');

let pixels = [];
let magInterval = null;

// --- 3. Initialize Grid ---
function createGrid() {
    gridContainer.innerHTML = '<div id="magnifying-glass" class="magnifying-glass rounded"></div>';
    pixels = [];
    for (let r = 0; r < 10; r++) {
        let row = [];
        for (let c = 0; c < 12; c++) {
            const div = document.createElement('div');
            div.className = 'pixel';
            // Assign base classes for shape logic later
            const type = mapData[r][c];
            div.dataset.type = type;
            div.dataset.r = r;
            div.dataset.c = c;
            gridContainer.appendChild(div);
            row.push(div);
        }
        pixels.push(row);
    }
}

// Helper to set visual state of the grid
function setGridVisualState(state) {
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 12; c++) {
            const p = pixels[r][c];
            p.className = 'pixel'; // Reset

            if (state === 'blank') {
                // Just borders
            } else if (state === 'camera') {
                if (p.dataset.type == '0') p.classList.add('sky-orig');
                if (p.dataset.type == '1') p.classList.add('car-orig');
                if (p.dataset.type == '2') p.classList.add('road-orig');
            } else if (state === 'segmented') {
                if (p.dataset.type == '0') p.classList.add('sky-seg');
                if (p.dataset.type == '1') p.classList.add('car-seg');
                if (p.dataset.type == '2') p.classList.add('road-seg');
            }
        }
    }
}

// --- 4. Story Steps Data ---
const steps = [
    {
        title: "1. The Giant Grid Paper",
        visualTitle: "Digital Images as Grids",
        text: "<p>Imagine you have a giant piece of grid paper. To a computer, every picture is just a giant grid made of tiny squares called <strong>pixels</strong>.</p><p>Before the AI can understand what is in the picture, it just sees different numbers representing brightness or color in each tiny square.</p>",
        math: "",
        onEnter: () => {
            setGridVisualState('camera');
            magGlass.style.display = 'none';
            scoreboardContainer.classList.add('hidden');
            stopMagnifyingGlass();
        }
    },
    {
        title: "2. The Rules of the Game",
        visualTitle: "The Goal: Semantic Segmentation",
        text: "<p>Someone asks you to color the picture with special rules: you must use a specific color for everything in the world category.</p><p>For example, every car must be <strong>Red</strong>, and every road must be <strong>Dark Gray</strong>. The AI isn't finding 'Car 1' or 'Car 2', it just asks: <em>'Does this dot belong to the Car category?'</em></p>",
        math: "",
        onEnter: () => {
            setGridVisualState('segmented');
            magGlass.style.display = 'none';
            scoreboardContainer.classList.add('hidden');
        }
    },
    {
        title: "3. The Magnifying Glass",
        visualTitle: "Convolution: Scanning for Patterns",
        text: "<p>The AI cannot see the whole picture at once like we do. Instead, it slides a tiny mathematical <strong>'magnifying glass'</strong> (called a convolution filter) across the image.</p><p>It looks at a few dots at a time, searching for simple patterns like straight lines, circles, or edges.</p>",
        math: "(f * g)(x, y) = \\sum_{i}\\sum_{j} f(i, j) \\cdot g(x-i, y-j)",
        onEnter: () => {
            setGridVisualState('camera');
            scoreboardContainer.classList.add('hidden');
            startMagnifyingGlass();
        }
    },
    {
        title: "4. The Scoreboard",
        visualTitle: "Calculating Probabilities",
        text: "<p>Let's focus on one specific dot on the side of the car.</p><p>As the AI looks through its magnifying glass, it gives that single dot a score based on what patterns it detected. It acts like a voting system. <em>'I give this dot 90 points for being a Car, 10 for Road, and 0 for Sky.'</em></p>",
        math: "\\text{Softmax}(z_i) = \\frac{e^{z_i}}{\\sum_{j=1}^K e^{z_j}}",
        onEnter: () => {
            stopMagnifyingGlass();
            setGridVisualState('camera');

            // Highlight target pixel
            const tp = pixels[targetPixel.r][targetPixel.c];

            // Position Mag Glass statically over it
            const pGlass = document.getElementById('magnifying-glass');
            pGlass.style.display = 'block';
            pGlass.style.width = 'calc(100% / 12)';
            pGlass.style.height = 'calc(100% / 10)';
            pGlass.style.left = `${(targetPixel.c / 12) * 100}%`;
            pGlass.style.top = `${(targetPixel.r / 10) * 100}%`;
            pGlass.classList.add('pulse-border');

            // Show scoreboard and animate bars
            scoreboardContainer.classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('score-car').style.width = '90%';
                document.getElementById('val-car').innerText = '90';
                document.getElementById('score-road').style.width = '10%';
                document.getElementById('val-road').innerText = '10';
                document.getElementById('score-sky').style.width = '0%';
                document.getElementById('val-sky').innerText = '0';
            }, 100);
        }
    },
    {
        title: "5. Winner Takes It All",
        visualTitle: "Argmax: Making the Decision",
        text: "<p>The AI looks at the scoreboard for that specific dot. Since <strong>'Car'</strong> got the highest score (90 points), the AI officially assigns that category.</p><p>It paints that tiny dot Red. </p>",
        math: "\\text{Prediction} = \\text{argmax}(\\text{Scores})",
        onEnter: () => {
            // Keep scoreboard open
            const pGlass = document.getElementById('magnifying-glass');
            pGlass.classList.remove('pulse-border');
            pGlass.style.borderColor = '#ef4444'; // Red border

            // Paint the specific pixel
            const tp = pixels[targetPixel.r][targetPixel.c];
            tp.className = 'pixel car-seg';
        }
    },
    {
        title: "6. The Real World",
        visualTitle: "Filling the Picture",
        text: "<p>It repeats this exact process millions of times in a fraction of a second until the whole picture is filled in!</p><p><strong>Why is this useful?</strong><br>🏎️ <strong>Robot Cars:</strong> Know exactly which pixels are drivable road (Gray) and which are obstacles (Red).<br>🩺 <strong>Robot Doctors:</strong> Scan medical images to color healthy cells blue and isolate sick cells red.</p>",
        math: "",
        onEnter: () => {
            scoreboardContainer.classList.add('hidden');
            const pGlass = document.getElementById('magnifying-glass');
            pGlass.style.display = 'none';
            pGlass.style.borderColor = '#3b82f6'; // Reset border

            // Sequential fill animation
            let delay = 0;
            for (let r = 0; r < 10; r++) {
                for (let c = 0; c < 12; c++) {
                    setTimeout(() => {
                        const p = pixels[r][c];
                        if (p.dataset.type == '0') p.className = 'pixel sky-seg';
                        if (p.dataset.type == '1') p.className = 'pixel car-seg';
                        if (p.dataset.type == '2') p.className = 'pixel road-seg';
                    }, delay);
                    delay += 15; // Speed of filling
                }
            }
        }
    }
];

let currentStep = 0;

// --- 5. Animation Helpers ---
function startMagnifyingGlass() {
    const pGlass = document.getElementById('magnifying-glass');
    pGlass.style.display = 'block';
    pGlass.classList.remove('pulse-border');

    // 3x3 kernel size relative to grid
    pGlass.style.width = 'calc(100% / 12 * 3)';
    pGlass.style.height = 'calc(100% / 10 * 3)';

    let r = 0;
    let c = 0;

    const moveGlass = () => {
        pGlass.style.left = `${(c / 12) * 100}%`;
        pGlass.style.top = `${(r / 10) * 100}%`;

        c++;
        if (c > 9) { // max col for 3x3 window on 12 col grid
            c = 0;
            r++;
            if (r > 7) r = 0; // max row for 3x3 on 10 row grid
        }
    };

    moveGlass(); // Initial position
    magInterval = setInterval(moveGlass, 300);
}

function stopMagnifyingGlass() {
    clearInterval(magInterval);
}

function resetScoreboard() {
    document.getElementById('score-car').style.width = '0%';
    document.getElementById('val-car').innerText = '0';
    document.getElementById('score-road').style.width = '0%';
    document.getElementById('val-road').innerText = '0';
    document.getElementById('score-sky').style.width = '0%';
    document.getElementById('val-sky').innerText = '0';
}

// --- 6. Core Logic ---
function updateUI() {
    const step = steps[currentStep];

    contentTitle.innerText = step.title;
    contentText.innerHTML = step.text;
    visualTitle.innerText = step.visualTitle;
    stepCounter.innerText = `Step ${currentStep + 1} / ${steps.length}`;

    // Handle Math Rendering
    if (step.math) {
        mathContainer.classList.remove('hidden');
        katex.render(step.math, katexRender, {
            displayMode: true,
            throwOnError: false
        });
    } else {
        mathContainer.classList.add('hidden');
    }

    // Update Dots
    stepDots.innerHTML = '';
    for (let i = 0; i < steps.length; i++) {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full ${i === currentStep ? 'bg-indigo-600' : 'bg-gray-300'}`;
        stepDots.appendChild(dot);
    }

    // Reset specific UI elements before entering new state
    resetScoreboard();

    // Execute specific step visual logic
    step.onEnter();

    // Button States
    btnBack.disabled = currentStep === 0;
    btnNext.disabled = currentStep === steps.length - 1;
}

// --- 7. Event Listeners ---
btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    }
});

btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

// --- Initialize ---
window.onload = () => {
    // Ensure KaTeX is loaded before initializing
    if (typeof katex !== 'undefined') {
        createGrid();
        updateUI();
    } else {
        // simple retry if CDN is slow
        setTimeout(() => {
            createGrid();
            updateUI();
        }, 500);
    }
};