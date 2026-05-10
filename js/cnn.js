// Data and State
let currentStep = 0;
let animationInterval = null;

const steps = [
    {
        title: "1. The Input Image as a Grid",
        desc: "To a computer, an image is not a picture; it's a grid of numbers (pixels). In a grayscale image, numbers range from 0 (black) to 255 (white). Here we look at a simplified 4x4 pixel image.",
        render: (container) => {
            const matrixData = [
                [1, 0, 1, 0],
                [0, 1, 1, 0],
                [1, 0, 0, 1],
                [0, 0, 1, 1]
            ];

            let html = `<div class="flex flex-col items-center gap-4">
                <span class="font-medium text-slate-500">4x4 Image Matrix</span>
                <div class="matrix-bracket p-2 bg-white flex flex-col gap-1">`;

            matrixData.forEach(row => {
                html += `<div class="flex gap-1">`;
                row.forEach(val => {
                    const bgColor = val === 1 ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-800';
                    html += `<div class="w-12 h-12 flex items-center justify-center rounded-sm font-semibold text-lg border border-slate-200 ${bgColor}">${val}</div>`;
                });
                html += `</div>`;
            });

            html += `</div></div>`;
            container.innerHTML = html;
        }
    },
    {
        title: "2. The Filter (Kernel)",
        desc: "A CNN learns 'filters' (or kernels) to detect specific features like edges or textures. This filter slides across the image. Let's look at a simple 2x2 filter designed to find diagonal patterns.",
        render: (container) => {
            const filterData = [
                [1, 0],
                [0, 1]
            ];

            let html = `<div class="flex flex-col items-center gap-4">
                <span class="font-medium text-indigo-600">2x2 Kernel (Filter)</span>
                <div class="matrix-bracket p-2 bg-white flex flex-col gap-1">`;

            filterData.forEach(row => {
                html += `<div class="flex gap-1">`;
                row.forEach(val => {
                    const bgColor = val === 1 ? 'bg-indigo-500 text-white' : 'bg-indigo-50 text-indigo-900';
                    html += `<div class="w-16 h-16 flex items-center justify-center rounded-sm font-semibold text-2xl border border-indigo-200 ${bgColor}">${val}</div>`;
                });
                html += `</div>`;
            });

            html += `</div></div>`;
            container.innerHTML = html;
        }
    },
    {
        title: "3. The Convolution Operation",
        desc: "The filter slides across the image. At each step, we multiply the overlapping numbers and add them together to create a new, smaller 'Feature Map'. Watch the animation.",
        render: (container) => {
            container.innerHTML = `
                <div class="flex items-center gap-8 w-full justify-center">
                    <!-- Image -->
                    <div class="flex flex-col items-center gap-2">
                        <span class="text-sm text-slate-500 font-medium">Input (4x4)</span>
                        <div id="anim-image" class="matrix-bracket p-1 bg-white grid grid-cols-4 gap-1">
                            ${Array(16).fill(0).map((_, i) => `<div class="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-sm text-slate-700 transition-all-fast" id="img-cell-${i}">...</div>`).join('')}
                        </div>
                    </div>

                    <div class="text-2xl text-slate-400 font-bold">*</div>

                    <!-- Kernel -->
                    <div class="flex flex-col items-center gap-2">
                        <span class="text-sm text-indigo-500 font-medium">Kernel (2x2)</span>
                        <div class="matrix-bracket p-1 bg-white grid grid-cols-2 gap-1">
                            <div class="w-8 h-8 flex items-center justify-center bg-indigo-100 border border-indigo-200 rounded-sm text-indigo-800 text-sm font-bold">1</div>
                            <div class="w-8 h-8 flex items-center justify-center bg-indigo-50 border border-indigo-200 rounded-sm text-indigo-800 text-sm font-bold">0</div>
                            <div class="w-8 h-8 flex items-center justify-center bg-indigo-50 border border-indigo-200 rounded-sm text-indigo-800 text-sm font-bold">0</div>
                            <div class="w-8 h-8 flex items-center justify-center bg-indigo-100 border border-indigo-200 rounded-sm text-indigo-800 text-sm font-bold">1</div>
                        </div>
                        <div id="calc-text" class="h-6 mt-2 text-sm font-mono text-slate-600 bg-white px-2 py-1 rounded shadow-sm border border-slate-100">Waiting...</div>
                    </div>

                    <div class="text-2xl text-slate-400 font-bold">=</div>

                    <!-- Output -->
                    <div class="flex flex-col items-center gap-2">
                        <span class="text-sm text-emerald-600 font-medium">Feature Map (3x3)</span>
                        <div id="anim-output" class="matrix-bracket p-1 bg-white grid grid-cols-3 gap-1">
                            ${Array(9).fill(0).map((_, i) => `<div class="w-10 h-10 flex items-center justify-center border border-slate-200 bg-slate-50 rounded-sm text-slate-400 transition-all-fast" id="out-cell-${i}">?</div>`).join('')}
                        </div>
                    </div>
                </div>
            `;

            const imgData = [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1];
            const kernelData = [1, 0, 0, 1];

            // Populate initial image
            imgData.forEach((val, i) => {
                const cell = document.getElementById(`img-cell-${i}`);
                cell.innerText = val;
                if (val === 1) cell.classList.add('bg-slate-100', 'font-bold');
            });

            // Animation Logic
            let step = 0;
            const positions = [
                [0, 1, 4, 5], [1, 2, 5, 6], [2, 3, 6, 7],
                [4, 5, 8, 9], [5, 6, 9, 10], [6, 7, 10, 11],
                [8, 9, 12, 13], [9, 10, 13, 14], [10, 11, 14, 15]
            ];

            const animateConvolution = () => {
                // Reset all styles
                for (let i = 0; i < 16; i++) {
                    const el = document.getElementById(`img-cell-${i}`);
                    el.classList.remove('cell-highlight');
                    el.style.borderWidth = '1px';
                }
                for (let i = 0; i < 9; i++) {
                    const el = document.getElementById(`out-cell-${i}`);
                    el.classList.remove('bg-emerald-100', 'border-emerald-500', 'text-emerald-800', 'font-bold', 'scale-105');
                }

                if (step >= positions.length) step = 0; // loop back

                const pos = positions[step];
                let sum = 0;
                let calcStr = "";

                // Highlight current region & calculate
                pos.forEach((imgIdx, kIdx) => {
                    const el = document.getElementById(`img-cell-${imgIdx}`);
                    el.classList.add('cell-highlight');

                    const val = imgData[imgIdx];
                    const kVal = kernelData[kIdx];
                    const mult = val * kVal;
                    sum += mult;

                    calcStr += `(${val}×${kVal})`;
                    if (kIdx < 3) calcStr += " + ";
                });

                document.getElementById('calc-text').innerText = `${calcStr} = ${sum}`;

                // Update output cell
                const outEl = document.getElementById(`out-cell-${step}`);
                outEl.innerText = sum;
                outEl.classList.remove('bg-slate-50', 'text-slate-400');
                outEl.classList.add('bg-emerald-100', 'border-emerald-500', 'text-emerald-800', 'font-bold', 'scale-105');

                step++;
            };

            animateConvolution(); // Run first step immediately
            animationInterval = setInterval(animateConvolution, 2000);
        }
    },
    {
        title: "4. The Convolution Equation",
        desc: "Here is the formal mathematical formula for the 2D convolution operation you just saw. It calculates the value for every pixel in the new Feature Map.",
        render: (container) => {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full w-full px-10">
                    <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-200 w-full text-center relative overflow-hidden">
                        <!-- decorative blob -->
                        <div class="absolute -right-10 -top-10 w-32 h-32 bg-indigo-50 rounded-full opacity-50"></div>

                        <h3 class="text-slate-500 font-medium mb-6 uppercase tracking-wider text-sm">2D Discrete Convolution</h3>

                        <div class="math-font text-2xl md:text-3xl text-slate-800 flex flex-wrap items-center justify-center gap-2 mb-8">
                            <span>S(i, j)</span>
                            <span>=</span>
                            <span>(I * K)(i, j)</span>
                            <span>=</span>
                            <div class="flex flex-col items-center justify-center mx-1">
                                <span class="text-xs leading-none mb-1">m</span>
                                <span class="text-4xl leading-none">&sum;</span>
                                <span class="text-xs leading-none mt-1 invisible">m</span>
                            </div>
                            <div class="flex flex-col items-center justify-center mx-1">
                                <span class="text-xs leading-none mb-1">n</span>
                                <span class="text-4xl leading-none">&sum;</span>
                                <span class="text-xs leading-none mt-1 invisible">n</span>
                            </div>
                            <span>I(i+m, j+n) &middot; K(m, n)</span>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-8 border-t border-slate-100 pt-6">
                            <div class="bg-slate-50 p-3 rounded">
                                <span class="math-font font-bold text-lg">S, (I * K)</span>
                                <p class="text-sm text-slate-600 mt-1">The output Feature Map</p>
                            </div>
                            <div class="bg-slate-50 p-3 rounded">
                                <span class="math-font font-bold text-lg">I</span>
                                <p class="text-sm text-slate-600 mt-1">The Input Image matrix</p>
                            </div>
                            <div class="bg-slate-50 p-3 rounded">
                                <span class="math-font font-bold text-lg">K</span>
                                <p class="text-sm text-slate-600 mt-1">The Kernel (Filter) matrix</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    {
        title: "5. Activation (ReLU)",
        desc: "After convolution, we apply an Activation Function to introduce non-linearity. The most common is ReLU (Rectified Linear Unit), which simply turns all negative numbers into zeros.",
        render: (container) => {
            container.innerHTML = `
                <div class="flex flex-col items-center gap-8 w-full">
                    <div class="flex items-center gap-6 justify-center w-full">
                        <!-- Before -->
                        <div class="flex flex-col items-center gap-2">
                            <span class="text-sm text-slate-500 font-medium">Feature Map (with negatives)</span>
                            <div class="matrix-bracket p-2 bg-white grid grid-cols-3 gap-1">
                                <div class="w-12 h-12 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-slate-700">2</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-red-50 border border-red-200 rounded text-red-600 font-bold">-1</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-slate-700">3</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-red-50 border border-red-200 rounded text-red-600 font-bold">-4</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-slate-700">1</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-slate-700">0</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-slate-700">5</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-red-50 border border-red-200 rounded text-red-600 font-bold">-2</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-slate-700">1</div>
                            </div>
                        </div>

                        <!-- Arrow -->
                        <div class="flex flex-col items-center">
                            <div class="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md relative z-10 mb-[-10px]">ReLU Function</div>
                            <svg class="w-16 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            <div class="math-font text-xs text-slate-500 mt-1">max(0, x)</div>
                        </div>

                        <!-- After -->
                        <div class="flex flex-col items-center gap-2">
                            <span class="text-sm text-blue-600 font-medium">Activated Map</span>
                            <div class="matrix-bracket p-2 bg-white grid grid-cols-3 gap-1">
                                <div class="w-12 h-12 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-slate-700">2</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-blue-50 border border-blue-300 rounded text-blue-700 font-bold fade-in">0</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-slate-700">3</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-blue-50 border border-blue-300 rounded text-blue-700 font-bold fade-in" style="animation-delay: 0.1s">0</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-slate-700">1</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-slate-700">0</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-slate-700">5</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-blue-50 border border-blue-300 rounded text-blue-700 font-bold fade-in" style="animation-delay: 0.2s">0</div>
                                <div class="w-12 h-12 flex items-center justify-center bg-slate-100 border border-slate-200 rounded text-slate-700">1</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    {
        title: "6. Max Pooling",
        desc: "Pooling reduces the size of the feature map to save computation time and extract only the most prominent features. 'Max Pooling' takes the largest number from a specific region (usually 2x2).",
        render: (container) => {
            container.innerHTML = `
                <div class="flex items-center gap-10 justify-center w-full">
                    <!-- Input to Pool -->
                    <div class="flex flex-col items-center gap-2">
                        <span class="text-sm text-slate-500 font-medium">4x4 Feature Map</span>
                        <div class="bg-white p-2 shadow-sm rounded border border-slate-200 grid grid-cols-2 gap-2">
                            <!-- Quad 1 -->
                            <div class="grid grid-cols-2 gap-1 bg-amber-50 p-1 rounded border-2 border-amber-200">
                                <div class="w-8 h-8 flex items-center justify-center text-slate-600">1</div>
                                <div class="w-8 h-8 flex items-center justify-center text-slate-600">3</div>
                                <div class="w-8 h-8 flex items-center justify-center text-slate-600">2</div>
                                <div class="w-8 h-8 flex items-center justify-center font-bold text-amber-700 text-lg bg-amber-200 rounded-sm">9</div>
                            </div>
                            <!-- Quad 2 -->
                            <div class="grid grid-cols-2 gap-1 bg-emerald-50 p-1 rounded border-2 border-emerald-200">
                                <div class="w-8 h-8 flex items-center justify-center font-bold text-emerald-700 text-lg bg-emerald-200 rounded-sm">7</div>
                                <div class="w-8 h-8 flex items-center justify-center text-slate-600">4</div>
                                <div class="w-8 h-8 flex items-center justify-center text-slate-600">1</div>
                                <div class="w-8 h-8 flex items-center justify-center text-slate-600">0</div>
                            </div>
                            <!-- Quad 3 -->
                            <div class="grid grid-cols-2 gap-1 bg-sky-50 p-1 rounded border-2 border-sky-200">
                                <div class="w-8 h-8 flex items-center justify-center text-slate-600">0</div>
                                <div class="w-8 h-8 flex items-center justify-center font-bold text-sky-700 text-lg bg-sky-200 rounded-sm">5</div>
                                <div class="w-8 h-8 flex items-center justify-center text-slate-600">1</div>
                                <div class="w-8 h-8 flex items-center justify-center text-slate-600">2</div>
                            </div>
                            <!-- Quad 4 -->
                            <div class="grid grid-cols-2 gap-1 bg-purple-50 p-1 rounded border-2 border-purple-200">
                                <div class="w-8 h-8 flex items-center justify-center text-slate-600">2</div>
                                <div class="w-8 h-8 flex items-center justify-center text-slate-600">3</div>
                                <div class="w-8 h-8 flex items-center justify-center font-bold text-purple-700 text-lg bg-purple-200 rounded-sm">8</div>
                                <div class="w-8 h-8 flex items-center justify-center text-slate-600">4</div>
                            </div>
                        </div>
                    </div>

                    <!-- Arrow -->
                    <div class="flex flex-col items-center">
                        <span class="text-sm font-semibold text-slate-500 mb-1">Max Filter</span>
                        <svg class="w-12 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        <span class="text-xs text-slate-400 mt-1">Stride: 2</span>
                    </div>

                    <!-- Output Pool -->
                    <div class="flex flex-col items-center gap-2">
                        <span class="text-sm text-indigo-600 font-medium">Pooled Map (2x2)</span>
                        <div class="bg-white p-2 shadow-sm rounded border border-slate-200 grid grid-cols-2 gap-2">
                            <div class="w-12 h-12 flex items-center justify-center font-bold text-amber-700 text-xl bg-amber-100 border border-amber-300 rounded-sm">9</div>
                            <div class="w-12 h-12 flex items-center justify-center font-bold text-emerald-700 text-xl bg-emerald-100 border border-emerald-300 rounded-sm">7</div>
                            <div class="w-12 h-12 flex items-center justify-center font-bold text-sky-700 text-xl bg-sky-100 border border-sky-300 rounded-sm">5</div>
                            <div class="w-12 h-12 flex items-center justify-center font-bold text-purple-700 text-xl bg-purple-100 border border-purple-300 rounded-sm">8</div>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    {
        title: "7. Flattening & Classification",
        desc: "Finally, the 2D grid is flattened into a 1D column of numbers. This column acts as the input layer for a standard Neural Network (Dense layers), which makes the final prediction (e.g., Cat or Dog).",
        render: (container) => {
            container.innerHTML = `
                <div class="flex items-center justify-center gap-2 md:gap-8 w-full h-full">
                    <!-- 2x2 Grid -->
                    <div class="flex flex-col items-center gap-2">
                        <span class="text-xs text-slate-500 font-medium">Pooled Map</span>
                        <div class="bg-white p-1 rounded border border-slate-200 grid grid-cols-2 gap-1 shadow-sm">
                            <div class="w-8 h-8 bg-amber-100 border border-amber-300 rounded-sm flex items-center justify-center text-sm font-bold text-amber-700">9</div>
                            <div class="w-8 h-8 bg-emerald-100 border border-emerald-300 rounded-sm flex items-center justify-center text-sm font-bold text-emerald-700">7</div>
                            <div class="w-8 h-8 bg-sky-100 border border-sky-300 rounded-sm flex items-center justify-center text-sm font-bold text-sky-700">5</div>
                            <div class="w-8 h-8 bg-purple-100 border border-purple-300 rounded-sm flex items-center justify-center text-sm font-bold text-purple-700">8</div>
                        </div>
                    </div>

                    <!-- Connector 1 -->
                    <div class="flex flex-col items-center text-slate-400">
                        <span class="text-[10px] uppercase mb-1 font-semibold tracking-wider">Flatten</span>
                        <svg class="w-8 h-6 md:w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>

                    <!-- Flattened Array -->
                    <div class="flex flex-col items-center gap-2">
                        <span class="text-xs text-slate-500 font-medium">1D Array</span>
                        <div class="bg-white p-1 rounded border border-slate-200 flex flex-col gap-1 shadow-sm">
                            <div class="w-8 h-6 bg-amber-100 border border-amber-300 rounded-sm flex items-center justify-center text-xs font-bold text-amber-700">9</div>
                            <div class="w-8 h-6 bg-emerald-100 border border-emerald-300 rounded-sm flex items-center justify-center text-xs font-bold text-emerald-700">7</div>
                            <div class="w-8 h-6 bg-sky-100 border border-sky-300 rounded-sm flex items-center justify-center text-xs font-bold text-sky-700">5</div>
                            <div class="w-8 h-6 bg-purple-100 border border-purple-300 rounded-sm flex items-center justify-center text-xs font-bold text-purple-700">8</div>
                        </div>
                    </div>

                    <!-- Connector 2 -->
                    <div class="flex flex-col items-center text-indigo-400">
                        <span class="text-[10px] uppercase mb-1 font-semibold tracking-wider text-indigo-500">Dense</span>
                        <svg class="w-8 h-6 md:w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>

                    <!-- Output Layer -->
                    <div class="flex flex-col items-center gap-2">
                        <span class="text-xs text-slate-500 font-medium">Predictions</span>
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center gap-2">
                                <div class="w-10 h-10 rounded-full bg-indigo-50 border-2 border-indigo-500 flex items-center justify-center text-xs font-bold text-indigo-700 shadow-sm">Cat</div>
                                <span class="text-xs font-bold text-indigo-600">85%</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-10 h-10 rounded-full bg-pink-50 border-2 border-pink-500 flex items-center justify-center text-xs font-bold text-pink-700 shadow-sm">Dog</div>
                                <span class="text-xs font-bold text-pink-600">15%</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
];

// DOM Elements
const titleEl = document.getElementById('step-title');
const descEl = document.getElementById('step-desc');
const visualContainer = document.getElementById('visual-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const stepCounter = document.getElementById('step-counter');
const stepDotsContainer = document.getElementById('step-dots');

// Initialize UI
function init() {
    // Create dots
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-indigo-600' : 'bg-slate-200'}`;
        dot.id = `dot-${index}`;
        stepDotsContainer.appendChild(dot);
    });

    // Event Listeners
    btnPrev.addEventListener('click', () => changeStep(-1));
    btnNext.addEventListener('click', () => changeStep(1));

    renderStep();
}

// Logic to update UI
function changeStep(direction) {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }

    currentStep += direction;

    // Bounds checking
    if (currentStep < 0) currentStep = 0;
    if (currentStep >= steps.length) currentStep = steps.length - 1;

    renderStep();
}

function renderStep() {
    const stepData = steps[currentStep];

    // Re-trigger CSS animations by cloning and replacing elements
    titleEl.classList.remove('fade-in');
    descEl.classList.remove('fade-in');
    visualContainer.classList.remove('fade-in');

    void titleEl.offsetWidth; // Trigger reflow

    titleEl.classList.add('fade-in');
    descEl.classList.add('fade-in');
    visualContainer.classList.add('fade-in');

    // Update content
    titleEl.innerText = stepData.title;
    descEl.innerText = stepData.desc;
    stepCounter.innerText = `Step ${currentStep + 1} of ${steps.length}`;

    // Update dots
    steps.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index === currentStep) {
            dot.classList.remove('bg-slate-200');
            dot.classList.add('bg-indigo-600');
        } else {
            dot.classList.remove('bg-indigo-600');
            dot.classList.add('bg-slate-200');
        }
    });

    // Button states
    btnPrev.disabled = currentStep === 0;
    btnNext.disabled = currentStep === steps.length - 1;

    if (currentStep === steps.length - 1) {
        btnNext.innerText = "Finish";
    } else {
        btnNext.innerHTML = "Next Step &rarr;";
    }

    // Render specific visualization
    visualContainer.innerHTML = ''; // Clear previous
    stepData.render(visualContainer);
}

// Boot up
window.addEventListener('DOMContentLoaded', init);