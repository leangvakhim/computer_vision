// --- CONTENT DATA ---
const steps = [
    {
        title: "The Giant Picture Book",
        text: `
            <h2 class="text-xl font-bold text-indigo-700 mb-4">Playing "I Spy"</h2>
            <p class="mb-4">Imagine you are playing a game of "I Spy" with a giant, highly detailed picture book.</p>
            <p class="mb-4">Instead of looking at the whole page at once and getting overwhelmed, you take a piece of cardboard and cut a tiny window out of it.</p>
            <p class="mb-4">Let's say you cut that window into a very specific shape like a diagonal line. You will use this to scan the image!</p>
        `,
        renderVisual: (container) => {
            container.innerHTML = `
                <div class="relative w-64 h-64 bg-slate-200 border-4 border-slate-300 rounded-lg shadow-inner overflow-hidden flex items-center justify-center">
                    <div class="text-slate-400 text-center p-4">Giant Image<br>(Too big to see all at once!)</div>
                    <div class="absolute top-4 left-4 w-24 h-24 border-4 border-indigo-500 bg-indigo-500/20 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] rounded"></div>
                    <div class="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded shadow">Cardboard Window</div>
                </div>
            `;
        }
    },
    {
        title: "Sliding It Around",
        text: `
            <h2 class="text-xl font-bold text-indigo-700 mb-4">How to play the game:</h2>
            <ul class="space-y-3 mb-4 list-none">
                <li class="flex gap-2"><span class="text-indigo-500">1.</span> <b>Slide It Around:</b> You place your cardboard window at the top left corner and look only at what is inside.</li>
                <li class="flex gap-2"><span class="text-indigo-500">2.</span> <b>Check for a Match:</b> Does the picture perfectly match your shape? If yes, shout "Found one!" (High score!). If no, give it a zero.</li>
                <li class="flex gap-2"><span class="text-indigo-500">3.</span> <b>Keep Moving:</b> Slide over a tiny bit and check again until the whole page is scanned.</li>
            </ul>
            <div class="p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-900 shadow-sm mt-6">
                <strong>The Tech Secret:</strong> In a Convolutional Neural Network (CNN), that cardboard window is called the <b>Filter</b> (or <b>Kernel</b>).
            </div>
        `,
        renderVisual: (container) => {
            container.innerHTML = `
                <div class="relative w-60 h-60 grid grid-cols-5 grid-rows-5 gap-1 bg-white border-2 border-slate-300 p-1">
                    ${Array(25).fill(0).map(() => `<div class="bg-slate-200 rounded-sm"></div>`).join('')}
                    <div class="absolute top-1 left-1 w-[68px] h-[68px] border-4 border-indigo-500 bg-indigo-500/30 rounded-sm animate-sliding-kernel z-10 pointer-events-none flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                        <span class="text-indigo-900 font-bold drop-shadow-md">🔍</span>
                    </div>
                </div>
            `;
        }
    },
    {
        title: "A Real-World Example",
        text: `
            <h2 class="text-xl font-bold text-indigo-700 mb-4">Finding a Cat 🐈</h2>
            <p class="mb-4">A computer doesn't know what a "cat" is right away. Instead, it uses many different Magic Detectives (Filters) working together:</p>
            <ul class="space-y-3 mb-4">
                <li class="p-3 bg-white border border-slate-200 rounded shadow-sm flex items-center gap-3">
                    <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-xl">🔺</div>
                    <div><b>Filter 1:</b> Looks only for pointy ears.</div>
                </li>
                <li class="p-3 bg-white border border-slate-200 rounded shadow-sm flex items-center gap-3">
                    <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-xl">〰️</div>
                    <div><b>Filter 2:</b> Looks only for long whiskers.</div>
                </li>
                <li class="p-3 bg-white border border-slate-200 rounded shadow-sm flex items-center gap-3">
                    <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-xl">🌙</div>
                    <div><b>Filter 3:</b> Looks only for a swooping tail.</div>
                </li>
            </ul>
            <p class="mt-4 italic text-slate-600">If it finds all these shapes in the right places, it confidently says, "This is a Cat!"</p>
        `,
        renderVisual: (container) => {
            container.innerHTML = `
                <div class="flex flex-col items-center gap-6">
                    <div class="relative">
                        <div class="text-8xl">🐱</div>
                        <div class="absolute top-0 right-0 animate-bounce text-2xl">🔍</div>
                    </div>
                    <div class="flex gap-4">
                        <div class="w-16 h-16 bg-white rounded-lg shadow border-2 border-indigo-200 flex flex-col items-center justify-center">🔺<span class="text-[10px] font-bold text-slate-500">Score: 9</span></div>
                        <div class="w-16 h-16 bg-white rounded-lg shadow border-2 border-indigo-200 flex flex-col items-center justify-center">〰️<span class="text-[10px] font-bold text-slate-500">Score: 8</span></div>
                        <div class="w-16 h-16 bg-white rounded-lg shadow border-2 border-indigo-200 flex flex-col items-center justify-center">🌙<span class="text-[10px] font-bold text-slate-500">Score: 9</span></div>
                    </div>
                </div>
            `;
        }
    },
    {
        title: "The Math: 1s and 0s",
        text: `
            <h2 class="text-xl font-bold text-indigo-700 mb-4">Translating Shapes to Math</h2>
            <p class="mb-4">The numbers you see in a filter are the computer's mathematical way of drawing the window.</p>
            <ul class="list-disc pl-5 mb-4 space-y-2">
                <li>The <b>1s</b> are the parts of the shape it wants to find.</li>
                <li>The <b>0s</b> are the empty background space it ignores.</li>
            </ul>
            <p class="mb-4">For a diagonal line, the weight of $$w=1$$ is placed on the main diagonal of the matrix. This tells the network:</p>
            <blockquote class="border-l-4 border-indigo-500 pl-4 italic text-slate-600 bg-indigo-50 py-2 pr-2 rounded-r">
                "Only pay attention to the pixels in these two spots. Ignore everything else."
            </blockquote>
        `,
        renderVisual: (container) => {
            container.innerHTML = `
                <div class="text-center">
                    <p class="text-sm font-bold text-slate-500 mb-2 mt-4">Diagonal Filter (Kernel)</p>
                    <div id="math-kernel-1" class="text-3xl font-serif text-indigo-800 bg-white p-6 rounded-xl shadow-lg border border-indigo-100"></div>
                </div>
            `;
            // Delay render until element is actually in DOM
            setTimeout(() => {
                katex.render("\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}", document.getElementById('math-kernel-1'), { displayMode: true });
            }, 10);
        }
    },
    {
        title: "Different Detectives",
        text: `
            <h2 class="text-xl font-bold text-indigo-700 mb-4">How Weights Find Different Shapes</h2>
            <p class="mb-4">The beautiful thing about CNNs is that the matrix doesn't always have to look like a diagonal. The weights (1s and 0s) change based on what the detective is looking for!</p>

            <div class="space-y-4">
                <div class="bg-white p-3 rounded shadow-sm border border-slate-200 flex justify-between items-center">
                    <div><b>Vertical Line:</b> Weights stacked vertically on the left.</div>
                    <div id="math-vertical"></div>
                </div>
                <div class="bg-white p-3 rounded shadow-sm border border-slate-200 flex justify-between items-center">
                    <div><b>Horizontal Line:</b> Weights across the top row.</div>
                    <div id="math-horizontal"></div>
                </div>
            </div>
        `,
        renderVisual: (container) => {
            container.innerHTML = `
                <div class="flex flex-col gap-6 items-center w-full max-w-sm">
                    <div class="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow border-2 border-blue-200">
                        <div class="grid grid-cols-2 gap-1 w-16 h-16">
                            <div class="bg-blue-500 rounded-sm"></div><div class="bg-slate-100 rounded-sm"></div>
                            <div class="bg-blue-500 rounded-sm"></div><div class="bg-slate-100 rounded-sm"></div>
                        </div>
                        <span class="text-xl">➔</span>
                        <div class="text-sm font-bold text-slate-600">Finds Up & Down</div>
                    </div>

                    <div class="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow border-2 border-green-200">
                        <div class="grid grid-cols-2 gap-1 w-16 h-16">
                            <div class="bg-green-500 rounded-sm"></div><div class="bg-green-500 rounded-sm"></div>
                            <div class="bg-slate-100 rounded-sm"></div><div class="bg-slate-100 rounded-sm"></div>
                        </div>
                        <span class="text-xl">➔</span>
                        <div class="text-sm font-bold text-slate-600">Finds Side to Side</div>
                    </div>
                </div>
            `;
            setTimeout(() => {
                katex.render("\\begin{bmatrix} 1 & 0 \\\\ 1 & 0 \\end{bmatrix}", document.getElementById('math-vertical'), { displayMode: false });
                katex.render("\\begin{bmatrix} 1 & 1 \\\\ 0 & 0 \\end{bmatrix}", document.getElementById('math-horizontal'), { displayMode: false });
            }, 10);
        }
    },
    {
        title: "Learning The Shapes",
        text: `
            <h2 class="text-xl font-bold text-indigo-700 mb-4">Who decides the shapes? 🧠</h2>
            <p class="mb-4">Usually, we <b>don't</b> have to tell the computer where to put the 1s and 0s!</p>
            <p class="mb-4">Scientists give the computer a blank window and say, "Here are 10,000 pictures of bicycles. Practice until you recognize one."</p>
            <p class="mb-4">The computer uses calculus and statistics to guess. Through trial and error (a math process called <b>"Training"</b>), it learns which shapes help it most.</p>
            <p class="font-semibold text-indigo-600">It automatically moves the 1s around until it creates a Wheel Detective, Handlebar Detective, and Pedal Detective!</p>
        `,
        renderVisual: (container) => {
            container.innerHTML = `
                <div class="text-center flex flex-col items-center">
                    <h3 class="font-bold text-slate-500 mb-4 animate-pulse">Training in Progress...</h3>
                    <div class="grid grid-cols-3 gap-2 w-32 h-32" id="training-grid">
                        <!-- Generated by JS -->
                    </div>
                    <p class="mt-6 text-sm text-slate-500 bg-white px-3 py-1 rounded-full shadow border border-slate-200">Finding optimal weights...</p>
                </div>
            `;

            const grid = document.getElementById('training-grid');
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.className = 'bg-slate-200 rounded transition-colors duration-100 flex items-center justify-center text-xs font-mono text-slate-400';
                cell.innerText = '0';
                grid.appendChild(cell);
            }

            // Simulate training
            const cells = grid.children;
            const interval = setInterval(() => {
                if (!document.getElementById('training-grid')) {
                    clearInterval(interval);
                    return;
                }
                for (let cell of cells) {
                    const isOne = Math.random() > 0.5;
                    cell.className = isOne
                        ? 'bg-indigo-500 rounded transition-colors duration-100 flex items-center justify-center text-xs font-mono text-white'
                        : 'bg-slate-200 rounded transition-colors duration-100 flex items-center justify-center text-xs font-mono text-slate-400';
                    cell.innerText = isOne ? '1' : '0';
                }
            }, 200);

            // Stop and form a wheel (circle) after 2 seconds
            setTimeout(() => {
                clearInterval(interval);
                if (document.getElementById('training-grid')) {
                    const wheelPattern = [0, 1, 0, 1, 0, 1, 0, 1, 0];
                    for (let i = 0; i < 9; i++) {
                        const isOne = wheelPattern[i] === 1;
                        cells[i].className = isOne
                            ? 'bg-green-500 rounded transition-all duration-500 flex items-center justify-center font-bold font-mono text-white shadow-lg transform scale-105'
                            : 'bg-slate-100 rounded transition-all duration-500 flex items-center justify-center font-mono text-slate-300';
                        cells[i].innerText = isOne ? '1' : '0';
                    }
                    grid.parentElement.querySelector('h3').innerText = "Wheel Detective Found! ✅";
                    grid.parentElement.querySelector('h3').classList.remove('animate-pulse', 'text-slate-500');
                    grid.parentElement.querySelector('h3').classList.add('text-green-600');
                    grid.parentElement.querySelector('p').innerText = "Optimization Complete.";
                }
            }, 2500);
        }
    },
    {
        title: "Playground",
        text: `
            <h2 class="text-xl font-bold text-indigo-700 mb-4">Build Your Own Detective! 🛠️</h2>
            <p class="mb-4">To figure out what a detective is searching for, look at where the number 1s are sitting!</p>
            <p class="mb-4">Think of the grid like a tiny Lego baseplate. If you look down, the shape the bricks (1s) make is exactly the shape the Detective is looking for.</p>
            <div class="bg-indigo-600 text-white p-4 rounded-xl shadow-lg mt-6">
                <h3 class="font-bold mb-2">Instructions:</h3>
                <p class="text-sm opacity-90">Click the squares on the right to place your "1" blocks. See if you can build:</p>
                <ul class="list-disc pl-5 mt-2 text-sm opacity-90">
                    <li>A Vertical Line</li>
                    <li>A Horizontal Line</li>
                    <li>A Diagonal Line</li>
                </ul>
            </div>
        `,
        renderVisual: (container) => {
            container.innerHTML = `
                <div class="flex flex-col items-center w-full max-w-sm">
                    <h3 class="font-bold text-slate-700 mb-6 text-lg" id="detective-result">Custom Detective</h3>

                    <div class="grid grid-cols-3 gap-2 w-48 h-48 bg-white p-2 rounded-xl shadow-lg border-2 border-slate-200" id="interactive-grid">
                        <!-- Interactive Buttons -->
                    </div>

                    <button id="btn-reset" class="mt-6 text-sm text-slate-500 hover:text-indigo-600 underline">Reset Grid</button>
                </div>
            `;

            const grid = document.getElementById('interactive-grid');
            let state = [0, 0, 0, 0, 0, 0, 0, 0, 0];

            const checkPattern = () => {
                const s = state.join('');
                const resultTitle = document.getElementById('detective-result');

                // Patterns
                if (['100100100', '010010010', '001001001'].includes(s)) {
                    resultTitle.innerHTML = "📐 Vertical Line Detective!";
                    resultTitle.className = "font-bold text-blue-600 mb-6 text-xl scale-110 transition-all";
                } else if (['111000000', '000111000', '000000111'].includes(s)) {
                    resultTitle.innerHTML = "📏 Horizontal Line Detective!";
                    resultTitle.className = "font-bold text-green-600 mb-6 text-xl scale-110 transition-all";
                } else if (s === '100010001' || s === '001010100') {
                    resultTitle.innerHTML = "🪜 Diagonal Line Detective!";
                    resultTitle.className = "font-bold text-purple-600 mb-6 text-xl scale-110 transition-all";
                } else if (s === '010111010') {
                    resultTitle.innerHTML = "➕ Cross Detective!";
                    resultTitle.className = "font-bold text-orange-600 mb-6 text-xl scale-110 transition-all";
                } else if (s === '000000000') {
                    resultTitle.innerHTML = "Sleeping Detective... 💤";
                    resultTitle.className = "font-bold text-slate-400 mb-6 text-lg transition-all";
                } else {
                    resultTitle.innerHTML = "Custom Shape Detective! 🕵️";
                    resultTitle.className = "font-bold text-indigo-600 mb-6 text-lg transition-all";
                }
            };

            const renderButtons = () => {
                grid.innerHTML = '';
                state.forEach((val, i) => {
                    const btn = document.createElement('button');
                    btn.className = `lego-block w-full h-full rounded-lg text-2xl font-bold border-b-4 flex items-center justify-center outline-none focus:outline-none ${val === 1 ? 'active' : 'inactive'}`;
                    btn.innerText = val;
                    btn.onclick = () => {
                        state[i] = val === 1 ? 0 : 1;
                        checkPattern();
                        renderButtons();
                    };
                    grid.appendChild(btn);
                });
            };

            renderButtons();
            checkPattern();

            document.getElementById('btn-reset').onclick = () => {
                state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                checkPattern();
                renderButtons();
            };
        }
    }
];

// --- STATE & LOGIC ---
let currentStep = 0;

const textContainer = document.getElementById('text-container');
const visualContainer = document.getElementById('visual-container');
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const stepCounter = document.getElementById('step-counter');
const progressDots = document.getElementById('progress-dots');

function init() {
    // Setup dots
    steps.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full transition-colors ${i === 0 ? 'bg-indigo-600' : 'bg-slate-300'}`;
        dot.id = `dot-${i}`;
        progressDots.appendChild(dot);
    });

    // Event Listeners
    btnNext.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateView();
        }
    });

    btnBack.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateView();
        }
    });

    updateView();
}

function updateView() {
    const step = steps[currentStep];

    // Update Text Content
    textContainer.innerHTML = step.text;

    // Render Auto-Math for Text Content
    renderMathInElement(textContainer, {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
        ],
        throwOnError: false
    });

    // Update Visual Content (calls specific render function for dynamic stuff)
    visualContainer.innerHTML = ''; // Clear
    visualContainer.className = "w-full md:w-1/2 bg-slate-50 p-6 flex items-center justify-center relative overflow-hidden transition-opacity duration-300 opacity-0";

    setTimeout(() => {
        step.renderVisual(visualContainer);
        visualContainer.classList.remove('opacity-0');
    }, 50); // slight delay for fade effect

    // Update Controls
    stepCounter.innerText = `Step ${currentStep + 1} of ${steps.length}`;

    btnBack.disabled = currentStep === 0;

    if (currentStep === steps.length - 1) {
        btnNext.innerText = "Finish 🎉";
        btnNext.disabled = true;
        btnNext.classList.add('opacity-50');
    } else {
        btnNext.innerText = "Next Step \u2192";
        btnNext.disabled = false;
        btnNext.classList.remove('opacity-50');
    }

    // Update Dots
    steps.forEach((_, i) => {
        const dot = document.getElementById(`dot-${i}`);
        if (i === currentStep) {
            dot.className = 'w-3 h-2 rounded-full transition-all bg-indigo-600';
        } else if (i < currentStep) {
            dot.className = 'w-2 h-2 rounded-full transition-all bg-indigo-400';
        } else {
            dot.className = 'w-2 h-2 rounded-full transition-all bg-slate-300';
        }
    });
}

// Initialize App
document.addEventListener('DOMContentLoaded', init);