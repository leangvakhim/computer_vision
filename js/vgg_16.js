const stepsData = [
    {
        title: "How Computers 'See'",
        text: [
            "Imagine you have a picture of a dog. You know it’s a dog instantly.",
            "But a computer doesn't have eyes. It just sees a giant grid of numbers, where each number represents a colored dot (a pixel).",
            "To figure out it's a dog, the computer has to process this massive grid of numbers."
        ],
        visual: `
            <div class="flex flex-col items-center">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-4"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <div class="text-2xl font-bold text-slate-400 my-2">⬇️ becomes ⬇️</div>
                <div class="grid grid-cols-4 gap-1 p-2 bg-slate-200 rounded">
                    <div class="w-8 h-8 bg-slate-800 text-white text-xs flex items-center justify-center">255</div>
                    <div class="w-8 h-8 bg-slate-700 text-white text-xs flex items-center justify-center">200</div>
                    <div class="w-8 h-8 bg-slate-300 text-slate-800 text-xs flex items-center justify-center">50</div>
                    <div class="w-8 h-8 bg-white text-slate-800 text-xs flex items-center justify-center">0</div>
                    <div class="w-8 h-8 bg-slate-600 text-white text-xs flex items-center justify-center">150</div>
                    <div class="w-8 h-8 bg-slate-800 text-white text-xs flex items-center justify-center">240</div>
                    <div class="w-8 h-8 bg-slate-200 text-slate-800 text-xs flex items-center justify-center">20</div>
                    <div class="w-8 h-8 bg-slate-100 text-slate-800 text-xs flex items-center justify-center">10</div>
                </div>
            </div>
        `,
        math: `\\text{Image as a Matrix: } I_{x,y} = \\begin{bmatrix} 255 & 200 & \\dots \\\\ 150 & 240 & \\dots \\\\ \\dots & \\dots & \\ddots \\end{bmatrix}`
    },
    {
        title: "The Assembly Line (CNN)",
        text: [
            "To process this image, the computer passes it down a long assembly line of 'workers'.",
            "This assembly line is called a <strong>Convolutional Neural Network (CNN)</strong>.",
            "Every worker looks at the picture to find shapes: first simple lines, then curves, then ears, and finally, a whole dog."
        ],
        visual: `
            <div class="flex items-center space-x-4 w-full justify-center">
                <div class="flex flex-col items-center"><div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-400"><span class="text-2xl">|</span></div><span class="text-xs font-bold mt-2 text-slate-600">Lines</span></div>
                <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                <div class="flex flex-col items-center"><div class="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center border-2 border-blue-500"><span class="text-2xl">)</span></div><span class="text-xs font-bold mt-2 text-slate-600">Curves</span></div>
                <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                <div class="flex flex-col items-center"><div class="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center border-2 border-blue-600"><span class="text-3xl">🐶</span></div><span class="text-xs font-bold mt-2 text-slate-600">Dog!</span></div>
            </div>
        `,
        math: null
    },
    {
        title: "The Old Way (Giant Magnifying Glasses)",
        text: [
            "Before VGG-16 came along, scientists thought the best way was to look at huge chunks of the picture all at once.",
            "They used giant 'magnifying glasses' (called filters).",
            "It was fast, but looking at too much at once makes it easy to miss the fine details."
        ],
        visual: `
            <div class="relative w-48 h-48 bg-slate-300 grid grid-cols-6 grid-rows-6 gap-1 p-1 rounded">
                ${Array(36).fill('<div class="bg-white rounded-sm"></div>').join('')}
                <div class="absolute w-[80%] h-[80%] bg-red-500/30 border-4 border-red-500 top-2 left-2 flex items-center justify-center shadow-lg rounded-md">
                    <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">11x11 Filter</span>
                </div>
            </div>
        `,
        math: `\\text{Large Filter Area: } 11 \\times 11 = 121 \\text{ pixels analyzed at once}`
    },
    {
        title: "VGG-16: Deeper is Better",
        text: [
            "VGG-16 changed the game with one big rule: <strong>'Deeper is Better.'</strong>",
            "Instead of one giant magnifying glass, it uses tiny ones ($3 \\times 3$), but it stacks a lot more of them one after another.",
            "This creates a 'deeper' network that learns much more complex patterns."
        ],
        visual: `
            <div class="flex items-center space-x-6">
                <div class="relative w-32 h-32 bg-slate-300 grid grid-cols-4 grid-rows-4 gap-1 p-1 rounded transform perspective-1000 rotateY-12 shadow-lg">
                        ${Array(16).fill('<div class="bg-white rounded-sm"></div>').join('')}
                        <div class="absolute w-[45%] h-[45%] bg-blue-500/40 border-4 border-blue-500 top-1 left-1 rounded-sm shadow-md"></div>
                </div>
                <svg class="w-8 h-8 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                <div class="relative w-32 h-32 bg-slate-300 grid grid-cols-4 grid-rows-4 gap-1 p-1 rounded transform perspective-1000 rotateY-12 shadow-lg">
                        ${Array(16).fill('<div class="bg-white rounded-sm"></div>').join('')}
                        <div class="absolute w-[45%] h-[45%] bg-indigo-500/40 border-4 border-indigo-500 top-4 left-4 rounded-sm shadow-md"></div>
                </div>
            </div>
        `,
        math: `\\text{Stacking two } 3 \\times 3 \\text{ filters gives the same view as one } 5 \\times 5 \\text{, but with less math!}`
    },
    {
        title: "Analogy: The Lego Sorting Team (Old Way)",
        text: [
            "Imagine searching a giant bin for Lego wheels.",
            "<strong>The Old Way:</strong> You grab giant handfuls of Legos to check.",
            "It’s fast, but your hands are too full. It's messy, pieces hide behind others, and you miss details."
        ],
        visual: `
            <div class="flex flex-col items-center">
                <div class="text-6xl mb-4">🤲</div>
                <div class="flex flex-wrap w-48 justify-center gap-2 bg-red-100 p-4 rounded-xl border-2 border-red-200">
                    <div class="w-6 h-6 bg-red-500 rounded-sm"></div>
                    <div class="w-4 h-8 bg-blue-500 rounded-sm"></div>
                    <div class="w-8 h-4 bg-yellow-400 rounded-sm"></div>
                    <div class="w-6 h-6 bg-slate-800 rounded-full border-2 border-slate-600"></div> <!-- Wheel -->
                    <div class="w-6 h-6 bg-green-500 rounded-sm"></div>
                    <div class="w-6 h-6 bg-red-500 rounded-sm"></div>
                    <div class="w-4 h-8 bg-blue-500 rounded-sm"></div>
                    <span class="text-xs font-bold text-red-600 w-full text-center mt-2">Too much at once!</span>
                </div>
            </div>
        `,
        math: null
    },
    {
        title: "Analogy: The Lego Team (VGG-16 Way)",
        text: [
            "<strong>The VGG-16 Way:</strong> You set up an assembly line with friends.",
            "Friend 1 uses tweezers to check a tiny $3 \\times 3$ group of Legos closely, then passes it down.",
            "Friend 2 looks closely at that same small group, understands it better, and passes it.",
            "Taking tiny, careful steps through a long line makes you incredibly accurate."
        ],
        visual: `
            <div class="flex items-center space-x-2">
                <div class="flex flex-col items-center">
                    <div class="text-4xl">🧑‍🔬</div>
                    <div class="grid grid-cols-3 gap-1 mt-2 p-1 bg-blue-100 rounded border border-blue-300">
                        ${Array(8).fill('<div class="w-4 h-4 bg-blue-400 rounded-sm"></div>').join('')}
                        <div class="w-4 h-4 bg-slate-800 rounded-full"></div>
                    </div>
                </div>
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                <div class="flex flex-col items-center">
                    <div class="text-4xl">🧑‍🔬</div>
                        <div class="w-10 h-10 mt-2 bg-indigo-100 rounded border border-indigo-300 flex items-center justify-center font-bold text-xs text-indigo-700">Wheel!</div>
                </div>
            </div>
        `,
        math: null
    },
    {
        title: "The Blue Boxes: Convolution",
        text: [
            "In VGG diagrams, you see <strong>Blue Boxes</strong>. These are Convolutional Layers.",
            "These are your friends with the tiny $3 \\times 3$ magnifying glasses.",
            "They slide this small grid over the image pixel by pixel, doing math to find features (like edges)."
        ],
        visual: `
            <div class="flex flex-col items-center w-full">
                <div class="conv-grid">
                    ${Array(25).fill('<div class="conv-cell"></div>').join('')}
                    <div class="filter-box flex items-center justify-center">
                        <span class="bg-blue-600 text-white text-[10px] font-bold px-1 rounded shadow">$3 \\times 3$</span>
                    </div>
                </div>
                <p class="text-sm font-medium text-slate-500 mt-4">Sliding the $3 \\times 3$ filter</p>
            </div>
        `,
        math: `\\text{Convolution: } (I * K)(x,y) = \\sum_{i=1}^{3}\\sum_{j=1}^{3} I(x+i, y+j) \\cdot K(i,j)`
    },
    {
        title: "The Orange Boxes: Pooling",
        text: [
            "You also see <strong>Orange Boxes</strong>. These are Pooling Layers.",
            "Think of this as stepping back to look at the whole Lego table.",
            "Every now and then, workers shrink the picture down (usually picking the brightest pixel in a $2 \\times 2$ grid). This keeps the math manageable as the network gets deeper."
        ],
        visual: `
            <div class="flex items-center space-x-6">
                <div class="pool-grid">
                    <div class="pool-cell">1</div><div class="pool-cell">5</div><div class="pool-cell">2</div><div class="pool-cell">1</div>
                    <div class="pool-cell">4</div><div class="pool-cell pool-highlight">9</div><div class="pool-cell">3</div><div class="pool-cell">0</div>
                    <div class="pool-cell">2</div><div class="pool-cell">1</div><div class="pool-cell">8</div><div class="pool-cell">4</div>
                    <div class="pool-cell">1</div><div class="pool-cell">2</div><div class="pool-cell">5</div><div class="pool-cell">2</div>
                </div>
                <div class="flex flex-col items-center space-y-2">
                        <span class="text-sm font-bold text-slate-500">Max Pool</span>
                        <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
                <div class="pool-result">9</div>
            </div>
        `,
        math: `\\text{Max Pooling: } f(X) = \\max \\left( \\begin{bmatrix} 1 & 5 \\\\ 4 & \\mathbf{9} \\end{bmatrix} \\right) = 9`
    },
    {
        title: "Coding VGG-16 in PyTorch",
        text: [
            "Now, let's see how our Lego assembly line looks in real Python code using a tool called <strong>PyTorch</strong>.",
            "<code>nn.Conv2d</code> are our friends with the $3 \\times 3$ tweezers (the blue boxes).",
            "<code>nn.MaxPool2d</code> is when they step back and shrink the picture by $2 \\times 2$ (the orange boxes).",
            "Finally, the <code>forward</code> function acts as the conveyor belt, automatically passing the image through each worker from start to finish!"
        ],
        visual: `
            <div class="bg-slate-900 rounded-lg p-5 w-full text-left overflow-x-auto text-sm font-mono shadow-xl border border-slate-700">
                <div class="flex space-x-2 mb-4 border-b border-slate-700 pb-3">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div class="text-slate-300 leading-relaxed whitespace-nowrap">
                    <span class="text-purple-400">import</span> torch.nn <span class="text-purple-400">as</span> nn<br><br>
                    <span class="text-purple-400">class</span> <span class="text-yellow-300">VGG16</span>(nn.Module):<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-purple-400">def</span> <span class="text-blue-400">__init__</span>(self):<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-purple-400">super</span>().__init__()<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-slate-500"># The friends with 3x3 tweezers</span><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.conv1 = nn.Conv2d(<span class="text-orange-400">3</span>, <span class="text-orange-400">64</span>, kernel_size=<span class="text-orange-400">3</span>, padding=<span class="text-orange-400">1</span>)<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-slate-500"># Stepping back: Shrinking the picture 2x2</span><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.pool1 = nn.MaxPool2d(kernel_size=<span class="text-orange-400">2</span>, stride=<span class="text-orange-400">2</span>)<br>
                    <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-purple-400">def</span> <span class="text-blue-400">forward</span>(self, x):<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-slate-500"># The conveyor belt moving!</span><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x = self.conv1(x)<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x = self.pool1(x)<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-purple-400">return</span> x
                </div>
            </div>
        `,
        math: null
    }
];

let currentStep = 0;

// DOM Elements
const titleEl = document.getElementById('step-title');
const descEl = document.getElementById('step-desc');
const visualEl = document.getElementById('visual-area');
const mathContainerEl = document.getElementById('math-container');
const mathFormulaEl = document.getElementById('math-formula');
const stepIndicatorEl = document.getElementById('step-indicator');
const totalStepsEl = document.getElementById('total-steps');
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const dotsContainer = document.getElementById('progress-dots');

// Helper to format inline math strings
const formatInlineMath = (text) => {
    return text.replace(/\$(.*?)\$/g, (match, math) => {
        return katex.renderToString(math, { throwOnError: false, displayMode: false });
    });
};

// Initialization
totalStepsEl.innerText = `/ ${stepsData.length}`;
setupDots();
renderStep();

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentStep < stepsData.length - 1) {
        currentStep++;
        renderStep();
    }
});

btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
});

function setupDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < stepsData.length; i++) {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-blue-600 w-4' : 'bg-slate-300'}`;
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
        if (i === currentStep) {
            dots[i].className = 'w-4 h-2 rounded-full bg-blue-600 transition-all duration-300';
        } else {
            dots[i].className = 'w-2 h-2 rounded-full bg-slate-300 transition-all duration-300';
        }
    }
}

function renderStep() {
    const step = stepsData[currentStep];

    // Trigger reflow to restart animations
    const textArea = document.getElementById('text-area');
    const visualArea = document.getElementById('visual-area');

    textArea.classList.remove('fade-in');
    visualArea.classList.remove('fade-in');
    void textArea.offsetWidth; // trigger reflow
    void visualArea.offsetWidth; // trigger reflow
    textArea.classList.add('fade-in');
    visualArea.classList.add('fade-in');

    // Update Content
    titleEl.innerHTML = step.title;

    // Format paragraphs with inline KaTeX rendering
    descEl.innerHTML = step.text.map(p => `<p>${formatInlineMath(p)}</p>`).join('');

    visualEl.innerHTML = formatInlineMath(step.visual);
    stepIndicatorEl.innerText = currentStep + 1;

    // Handle Math (KaTeX)
    if (step.math) {
        mathContainerEl.classList.remove('hidden');
        katex.render(step.math, mathFormulaEl, {
            throwOnError: false,
            displayMode: true
        });
    } else {
        mathContainerEl.classList.add('hidden');
    }

    // Update Buttons
    btnBack.disabled = currentStep === 0;
    btnNext.disabled = currentStep === stepsData.length - 1;

    updateDots();
}