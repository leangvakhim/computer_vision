// Data for each step based on the provided story
const steps = [
    {
        title: "Introduction: The 1998 Mystery",
        icon: "🏦",
        content: `
            <p>Imagine you have a robot friend that was built a long time ago, back in 1998, named <strong>LeNet-5</strong>.</p>
            <p>Back then, banks had a big problem: they had thousands of paper checks every day, and they needed to read the handwritten numbers on them. As you might know, people can write numbers in very messy ways!</p>
            <p>A smart scientist named Yann LeCun created LeNet-5 to be a super-detective that could look at those messy numbers and automatically know what they were.</p>
            <p class="font-medium text-indigo-600 mt-4">Let's break down how this robot's brain works like a detective solving a mystery!</p>
        `,
        formula: "",
        visual: `
            <div class="text-center space-y-6">
                <div class="text-8xl">🤖</div>
                <div class="flex justify-center gap-4 text-4xl">
                    <span class="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-300 transform -rotate-6 shadow-sm">🏦</span>
                    <span class="bg-white p-4 rounded-lg border-2 border-slate-300 shadow-sm">✍️</span>
                </div>
                <p class="text-lg font-semibold text-slate-700 mt-4">Hello! I am LeNet-5.</p>
            </div>
        `
    },
    {
        title: "1. The Input (32×32)",
        icon: "🔲",
        content: `
            <p><strong>What it is:</strong> This is the starting point. The robot gets a small square picture of a single handwritten number (like a 3 or an 8). The image is 32 pixels wide and 32 pixels tall.</p>
            <div class="bg-slate-100 p-4 rounded-lg border-l-4 border-emerald-400 mt-4">
                <p class="text-sm"><strong>🌍 Real-World Example:</strong> Imagine someone slides a mysterious, messy drawing of a number under your door on a tiny piece of square paper. Your job is to figure out what number it is.</p>
            </div>
        `,
        formula: "$$ Input\\ Image:\\ X \\in \\mathbb{R}^{32 \\times 32} $$",
        visual: `
            <div class="flex flex-col items-center">
                <p class="text-sm font-semibold text-slate-500 mb-2">Simulated 32x32 Grid (Showing an '8')</p>
                <div class="grid grid-cols-8 gap-0.5 bg-slate-300 p-1 rounded">
                    <!-- A simple 8x8 representation of an 8 for visual clarity -->
                    ${[...Array(64)].map((_, i) => {
            // Draw an 8 roughly
            const darkPixels = [11, 12, 18, 21, 27, 28, 34, 37, 42, 45, 51, 52];
            return `<div class="w-6 h-6 rounded-sm ${darkPixels.includes(i) ? 'grid-cell-dark' : 'grid-cell-light'}"></div>`;
        }).join('')}
                </div>
                <p class="mt-4 text-xs text-slate-400">Each tiny box is a pixel representing a shade of gray.</p>
            </div>
        `
    },
    {
        title: "2. Convolution (Conv1 & Conv2)",
        icon: "🔍",
        content: `
            <p><strong>What it is:</strong> The word "Convolution" sounds like a big, scary science word, but it just means using a <em>magnifying glass</em>.</p>
            <p>The network slides small filters (e.g., 5×5 pixels) over the image to detect patterns like edges, lines, and corners.</p>
            <div class="bg-slate-100 p-4 rounded-lg border-l-4 border-emerald-400 mt-4">
                <p class="text-sm"><strong>🌍 Real-World Example:</strong> Instead of trying to guess the whole number at once, you take a little magnifying glass (5×5) and slowly slide it across the paper. You are looking for tiny clues. "Ah, I see a straight line here!" or "Oh, there's a little curve over there!"</p>
            </div>
        `,
        formula: "$$ (I * K)(i, j) = \\sum_{m} \\sum_{n} I(i+m, j+n) K(m, n) $$",
        visual: `
            <div class="flex flex-col items-center w-full">
                <p class="text-sm font-semibold text-slate-500 mb-2">Sliding the 5x5 Magnifying Glass</p>
                <div class="relative bg-slate-200 p-2 rounded shadow-inner" style="width: 200px; height: 200px;">
                    <!-- Input grid background -->
                    <div class="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-1 p-2">
                            ${[...Array(25)].map(() => `<div class="bg-white rounded-sm opacity-50"></div>`).join('')}
                    </div>
                    <!-- Sliding Magnifier -->
                    <div class="absolute w-[38%] h-[38%] border-4 border-indigo-500 bg-indigo-200 bg-opacity-40 rounded shadow-[0_0_15px_rgba(99,102,241,0.5)] magnifier z-10 flex items-center justify-center">
                        <span class="text-2xl opacity-70">🔍</span>
                    </div>
                </div>
                <p class="mt-4 text-xs text-slate-400 text-center">The filter multiplies and adds up pixels to find "clues".</p>
            </div>
        `
    },
    {
        title: "3. Average Pooling (AvgPool)",
        icon: "📉",
        content: `
            <p><strong>What it is:</strong> "Pooling" is the robot's way of shrinking the picture so it doesn't get overwhelmed by too much information. It takes the average of small blocks of clues.</p>
            <p>It does this twice in LeNet-5 to keep making the clues simpler, smaller, and easier to handle.</p>
            <div class="bg-slate-100 p-4 rounded-lg border-l-4 border-emerald-400 mt-4">
                <p class="text-sm"><strong>🌍 Real-World Example:</strong> Imagine you take a few steps back from the drawing and squint your eyes. The picture gets a little blurrier and smaller, but you can still easily tell what shape it is. By shrinking the clues down, the robot's brain works much faster!</p>
            </div>
        `,
        formula: "$$ f(X) = \\frac{1}{N} \\sum_{i=1}^{N} x_i $$",
        visual: `
            <div class="flex items-center justify-center gap-6 w-full">
                <!-- 4x4 Grid -->
                <div class="grid grid-cols-2 gap-1 pool-anim">
                    <div class="grid grid-cols-2 gap-1 p-1 bg-blue-100 rounded border border-blue-300">
                        <div class="w-6 h-6 bg-blue-200 text-xs flex items-center justify-center">2</div>
                        <div class="w-6 h-6 bg-blue-300 text-xs flex items-center justify-center">4</div>
                        <div class="w-6 h-6 bg-blue-400 text-xs flex items-center justify-center">6</div>
                        <div class="w-6 h-6 bg-blue-200 text-xs flex items-center justify-center">0</div>
                    </div>
                </div>

                <div class="text-2xl text-slate-400">➔</div>

                <!-- 2x2 Grid (Averaged) -->
                <div class="p-1 bg-indigo-100 rounded border border-indigo-300">
                    <div class="w-10 h-10 bg-indigo-400 text-white font-bold flex items-center justify-center rounded shadow-sm">
                        3
                    </div>
                </div>
            </div>
            <p class="mt-6 text-xs text-slate-400 text-center w-full">Taking 4 squares and finding their average (shrinking).</p>
        `
    },
    {
        title: "4. Fully Connected (FC Layers)",
        icon: "🧠",
        content: `
            <p><strong>What it is:</strong> This is the robot's main "brain." It flattens out all the remaining 2D maps into a single 1D list and connects every clue to the final outputs.</p>
            <p>It takes all the tiny clues that survived the shrinking process and puts them together to make a final guess.</p>
            <div class="bg-slate-100 p-4 rounded-lg border-l-4 border-emerald-400 mt-4">
                <p class="text-sm"><strong>🌍 Real-World Example:</strong> You are the detective sitting at your desk. You look at all your clues: "Okay, I found a round loop at the top, and another round loop at the bottom." Your brain connects all those clues together and you shout, "Aha! The number is an 8!"</p>
            </div>
        `,
        formula: "$$ y = \\text{Softmax}(W x + b) $$",
        visual: `
            <div class="flex flex-col items-center w-full h-full justify-center">
                <div class="flex items-center gap-8 w-full justify-center h-48">
                    <!-- Flattened Array (Clues) -->
                    <div class="flex flex-col gap-2">
                        ${[...Array(5)].map(() => `<div class="w-3 h-3 rounded-full bg-blue-400"></div>`).join('')}
                    </div>

                    <!-- Connecting Lines (SVG) -->
                    <svg width="100" height="150" class="text-indigo-200">
                        ${[0, 30, 60, 90, 120].map((y1, i) =>
            [40, 80].map(y2 =>
                `<line x1="0" y1="${y1 + 10}" x2="100" y2="${y2 + 10}" stroke="currentColor" stroke-width="1.5" class="connection-line" style="animation-delay: ${Math.random()}s" />`
            ).join('')
        ).join('')}
                    </svg>

                    <!-- Output Guesses -->
                    <div class="flex flex-col gap-4">
                        <div class="px-3 py-1 bg-slate-200 text-xs rounded-full font-mono">0: 1%</div>
                        <div class="px-3 py-1 bg-emerald-500 text-white font-bold text-sm rounded-full font-mono shadow-md transform scale-110">8: 98%</div>
                        <div class="px-3 py-1 bg-slate-200 text-xs rounded-full font-mono">9: 1%</div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "5. PyTorch Code Tutorial",
        icon: "🧑‍💻",
        content: `
            <p>Now, let's see how modern programmers build this exact robot brain using a popular tool called <strong>PyTorch</strong>.</p>
            <p>Even though it looks like complex computer code, it matches our detective story perfectly!</p>
            <ul class="list-disc pl-5 space-y-2 text-sm text-slate-700 mt-4">
                <li><code>nn.Conv2d</code> is our <strong>magnifying glass</strong> (Convolution).</li>
                <li><code>nn.AvgPool2d</code> is our <strong>shrinking tool</strong> (Pooling).</li>
                <li><code>nn.Linear</code> is our <strong>brain connecting the clues</strong> (Fully Connected).</li>
            </ul>
        `,
        formula: "",
        visual: `
            <div class="w-full h-full max-h-[350px] overflow-y-auto text-left bg-slate-900 rounded-xl p-4 shadow-inner text-[10px] md:text-xs font-mono text-slate-300 whitespace-pre"><span class="text-pink-400">import</span> torch
<span class="text-pink-400">import</span> torch.nn <span class="text-pink-400">as</span> nn

<span class="text-blue-400">class</span> <span class="text-yellow-300">LeNet5</span>(nn.Module):
    <span class="text-blue-400">def</span> <span class="text-green-300">__init__</span>(self):
        <span class="text-cyan-300">super</span>().__init__()
        <span class="text-slate-500"># 1. Magnifying Glass (Conv)</span>
        self.conv1 = nn.Conv2d(1, 6, kernel_size=5)
        <span class="text-slate-500"># 2. Shrink it down (Pool)</span>
        self.pool = nn.AvgPool2d(kernel_size=2, stride=2)
        <span class="text-slate-500"># 3. Another Magnifying Glass</span>
        self.conv2 = nn.Conv2d(6, 16, kernel_size=5)

        <span class="text-slate-500"># 4. The Main Brain (Fully Connected)</span>
        self.fc1 = nn.Linear(16 * 5 * 5, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10) <span class="text-slate-500"># 10 outputs (0-9)</span>

    <span class="text-blue-400">def</span> <span class="text-green-300">forward</span>(self, x):
        <span class="text-slate-500"># Slide the glass, then shrink!</span>
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))

        <span class="text-slate-500"># Flatten out the clues</span>
        x = torch.flatten(x, 1)

        <span class="text-slate-500"># Connect clues to make a guess</span>
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x) <span class="text-slate-500"># Final guess!</span>

        <span class="text-pink-400">return</span> x</div>
        `
    },
    {
        title: "🌟 The Big Takeaway",
        icon: "🏆",
        content: `
            <p>LeNet-5 was famous because it was one of the very first computer brains to use this specific, highly successful pattern:</p>
            <ol class="list-decimal pl-5 space-y-2 font-medium text-slate-700 mt-4 mb-4">
                <li>Look for tiny clues <strong>(Convolution)</strong></li>
                <li>Shrink the picture down <strong>(Pooling)</strong></li>
                <li>Make a smart guess <strong>(Fully Connected)</strong></li>
            </ol>
            <p>Even though it was built in 1998, almost all the amazing picture-recognizing AI we have today (like the filters on phone cameras, medical image scanners, or cars that can drive themselves) are basically just bigger, faster great-grandchildren of LeNet-5!</p>
        `,
        formula: "",
        visual: `
            <div class="text-center space-y-4">
                <div class="text-6xl animate-bounce">🏆</div>
                <h3 class="text-xl font-bold text-indigo-600">The Grandfather of Modern AI Vision</h3>
                <div class="flex justify-center items-center gap-2 mt-6">
                    <span class="text-3xl">💻</span>
                    <span class="text-slate-400">➔</span>
                    <span class="text-3xl">📱</span>
                    <span class="text-slate-400">➔</span>
                    <span class="text-3xl">🚗</span>
                </div>
                <p class="text-xs text-slate-500 mt-2">From bank checks to self-driving cars!</p>
            </div>
        `
    }
];

let currentStep = 0;

// DOM Elements
const stepTitle = document.getElementById('step-title');
const stepContent = document.getElementById('step-content');
const visualContainer = document.getElementById('visual-container');
const formulaContainer = document.getElementById('formula-container');
const stepFormula = document.getElementById('step-formula');
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const progressDots = document.getElementById('progress-dots');

// Initialize Progress Dots
function initDots() {
    progressDots.innerHTML = steps.map((_, index) => `
        <div class="w-3 h-3 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-indigo-600 scale-110' : 'bg-slate-200'}" id="dot-${index}"></div>
    `).join('');
}

// Update the UI based on current step
function updateUI() {
    const step = steps[currentStep];

    // Update Text Data
    stepTitle.innerHTML = `<span class="text-3xl mr-2">${step.icon}</span> ${step.title}`;
    stepContent.innerHTML = step.content;
    visualContainer.innerHTML = step.visual;

    // Update Formula
    if (step.formula) {
        stepFormula.innerHTML = step.formula;
        formulaContainer.classList.remove('hidden');
    } else {
        formulaContainer.classList.add('hidden');
        stepFormula.innerHTML = "";
    }

    // Update Dots
    steps.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index === currentStep) {
            dot.className = "w-3 h-3 rounded-full transition-colors duration-300 bg-indigo-600 transform scale-110";
        } else if (index < currentStep) {
            dot.className = "w-3 h-3 rounded-full transition-colors duration-300 bg-indigo-300";
        } else {
            dot.className = "w-3 h-3 rounded-full transition-colors duration-300 bg-slate-200";
        }
    });

    // Update Buttons
    btnBack.disabled = currentStep === 0;

    if (currentStep === steps.length - 1) {
        btnNext.disabled = true;
        btnNext.innerHTML = "Finish 🌟";
    } else {
        btnNext.disabled = false;
        btnNext.innerHTML = "Next Step &rarr;";
    }

    // Trigger KaTeX to render any math equations in the newly injected HTML
    renderMath();
}

function renderMath() {
    // KaTeX Auto-render
    if (window.renderMathInElement) {
        renderMathInElement(document.body, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true }
            ],
            throwOnError: false
        });
    }
}

// Event Listeners
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

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    initDots();
    updateUI();
});