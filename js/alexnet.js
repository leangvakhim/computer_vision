// --- DATA: The steps of the visualization ---
const slides = [
    {
        title: "Introduction: The Detective Factory",
        text: "AlexNet was a massive deal in 2012 because it proved computers could become incredibly good at recognizing pictures if we built their 'brains' a certain way.<br><br>To understand how AlexNet works, let's imagine the computer is a giant <strong>Detective Factory</strong> trying to figure out if a picture is a 'Dog' or a 'Car'. Let's walk through how this factory operates step-by-step.",
        formula: null,
        visual: `
            <svg viewBox="0 0 400 200">
                <rect x="50" y="50" width="100" height="100" rx="8" fill="#ffffff" stroke="#3b82f6" stroke-width="4"/>
                <circle cx="100" cy="100" r="25" fill="#3b82f6" opacity="0.8" />
                <path d="M115,115 L135,135" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/>
                <rect x="250" y="50" width="100" height="100" rx="8" fill="#ffffff" stroke="#10b981" stroke-width="4"/>
                <text x="300" y="105" font-family="sans-serif" font-size="30" font-weight="bold" fill="#10b981" text-anchor="middle">?</text>
                <path d="M165,100 L235,100" stroke="#64748b" stroke-width="4" stroke-dasharray="8,4"/>
                <polygon points="235,95 245,100 235,105" fill="#64748b"/>
            </svg>
        `
    },
    {
        title: "1. The 'Conv' Layers: The Magnifying Glasses",
        text: "<strong>'Conv' stands for Convolutional.</strong><br><br>Imagine a group of tiny detectives standing right up against a giant painting with magnifying glasses. They are standing so close they can't see the whole picture, only tiny pixel grids at a time. They slide their magnifying glasses across the entire image to scan it.",
        formula: "S(i,j) = (I * K)(i,j) = \\sum_{m}\\sum_{n} I(i+m, j+n)K(m, n)",
        visual: `
            <svg viewBox="0 0 400 200">
                <!-- Image Grid -->
                <g transform="translate(80, 40)">
                    <rect width="120" height="120" fill="none" stroke="#cbd5e1" stroke-width="2"/>
                    <!-- Grid lines -->
                    <line x1="40" y1="0" x2="40" y2="120" stroke="#cbd5e1"/>
                    <line x1="80" y1="0" x2="80" y2="120" stroke="#cbd5e1"/>
                    <line x1="0" y1="40" x2="120" y2="40" stroke="#cbd5e1"/>
                    <line x1="0" y1="80" x2="120" y2="80" stroke="#cbd5e1"/>
                    <!-- Sliding window -->
                    <rect x="40" y="40" width="40" height="40" fill="#3b82f6" opacity="0.4" stroke="#60a5fa" stroke-width="3"/>
                </g>
                <!-- Result -->
                <g transform="translate(260, 60)">
                    <rect width="80" height="80" fill="none" stroke="#cbd5e1" stroke-width="2"/>
                    <line x1="40" y1="0" x2="40" y2="80" stroke="#cbd5e1"/>
                    <line x1="0" y1="40" x2="80" y2="40" stroke="#cbd5e1"/>
                    <!-- Extracted feature -->
                    <rect x="40" y="40" width="40" height="40" fill="#3b82f6"/>
                </g>
                <path d="M210,100 L245,100" stroke="#64748b" stroke-width="3" />
                <polygon points="245,95 255,100 245,105" fill="#64748b"/>
            </svg>
        `
    },
    {
        title: "Conv1 & Conv2: Looking for Simple Clues",
        text: "The first set of detectives (Conv1 & Conv2) only look for super simple things. Because their view is so limited, they can't understand complex objects yet.<br><br>One detective shouts, <em>'I see a brown fuzzy patch!'</em> Another shouts, <em>'I see a curved line!'</em> They record these basic building blocks of the image.",
        formula: "\\text{Feature Map}_k = \\sigma(W_k * X + b_k)",
        visual: `
            <svg viewBox="0 0 400 200">
                <!-- Horizontal Edge Detector -->
                <g transform="translate(100, 50)">
                    <rect width="60" height="60" fill="none" stroke="#cbd5e1" stroke-width="2"/>
                    <rect x="0" y="0" width="60" height="30" fill="#fff" stroke="#cbd5e1" stroke-width="1"/>
                    <rect x="0" y="30" width="60" height="30" fill="#000" opacity="0.8"/>
                    <text x="30" y="85" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">Horizontal Edge</text>
                </g>
                <!-- Vertical Edge Detector -->
                <g transform="translate(240, 50)">
                    <rect width="60" height="60" fill="none" stroke="#cbd5e1" stroke-width="2"/>
                    <rect x="0" y="0" width="30" height="60" fill="#fff" stroke="#cbd5e1" stroke-width="1"/>
                    <rect x="30" y="0" width="30" height="60" fill="#000" opacity="0.8"/>
                    <text x="30" y="85" font-family="sans-serif" font-size="14" fill="#475569" text-anchor="middle">Vertical Edge</text>
                </g>
            </svg>
        `
    },
    {
        title: "Deeper Layers (3x Conv): Putting Clues Together",
        text: "The next group of detectives stands a little further back. They don't look at the raw picture; they listen to the first group's reports and put the clues together.<br><br><em>'Ah, a brown fuzzy patch plus a curved line... I think I see a floppy ear!'</em> As we go deeper into the 3x Conv Layers, the factory recognizes more complex shapes like noses, wheels, or eyes.",
        formula: "\\text{Deep Feature} = \\text{Conv}_{L}(\\text{Conv}_{L-1}(\\dots \\text{Conv}_1(X)))",
        visual: `
            <svg viewBox="0 0 400 200">
                <circle cx="80" cy="60" r="15" fill="#3b82f6" />
                <text x="80" y="95" font-size="12" fill="#475569" text-anchor="middle">Fuzzy</text>

                <circle cx="80" cy="140" r="15" fill="#3b82f6" />
                <text x="80" y="175" font-size="12" fill="#475569" text-anchor="middle">Curve</text>

                <path d="M100,60 L180,100" stroke="#60a5fa" stroke-width="2"/>
                <path d="M100,140 L180,100" stroke="#60a5fa" stroke-width="2"/>

                <circle cx="200" cy="100" r="20" fill="#8b5cf6" />
                <text x="200" y="140" font-size="14" font-weight="bold" fill="#6d28d9" text-anchor="middle">Floppy Ear!</text>

                <path d="M225,100 L285,100" stroke="#8b5cf6" stroke-width="3" stroke-dasharray="5,5"/>
                <circle cx="310" cy="100" r="25" fill="#10b981" />
                <text x="310" y="145" font-size="14" font-weight="bold" fill="#059669" text-anchor="middle">Dog Head</text>
            </svg>
        `
    },
    {
        title: "2. The ReLU Activation: The 'Telephone Game'",
        text: "To solve 'vanishing gradients', they introduced <strong>ReLU</strong>. <br><br>Imagine playing 'Telephone' where you whisper down a line. Usually, the whisper gets quieter until the last person hears nothing (this is the vanishing gradient problem, where old networks lost information). ReLU is a new communication rule for the factory workers.",
        formula: "\\text{Old Rule (Sigmoid)}: f(x) = \\frac{1}{1 + e^{-x}} \\quad (\\text{Signal fades!})",
        visual: `
            <svg viewBox="0 0 400 200">
                <!-- Fading Signal -->
                <text x="200" y="40" font-size="14" fill="#ef4444" text-anchor="middle">Old Way: The Fading Whisper</text>
                <circle cx="50" cy="100" r="20" fill="#ef4444" opacity="1"/>
                <circle cx="125" cy="100" r="16" fill="#ef4444" opacity="0.8"/>
                <circle cx="200" cy="100" r="12" fill="#ef4444" opacity="0.6"/>
                <circle cx="275" cy="100" r="8" fill="#ef4444" opacity="0.4"/>
                <circle cx="350" cy="100" r="4" fill="#ef4444" opacity="0.2"/>

                <path d="M75,100 L105,100" stroke="#cbd5e1" stroke-width="2"/>
                <path d="M145,100 L180,100" stroke="#cbd5e1" stroke-width="2"/>
                <path d="M215,100 L260,100" stroke="#cbd5e1" stroke-width="2"/>
                <path d="M285,100 L340,100" stroke="#cbd5e1" stroke-width="2"/>
            </svg>
        `
    },
    {
        title: "The ReLU Rule: 'Loud and Clear'",
        text: "The ReLU rule says: <em>'If the clue is useless or negative, just say zero and move on. But if the clue is good, DO NOT whisper! Shout it exactly as loud as you heard it!'</em><br><br>This magic rule stops the messages from fading away, allowing the factory to have a much longer line of workers (making the artificial brain 'deeper' and smarter).",
        formula: "f(x) = \\max(0, x) = \\begin{cases} x & \\text{if } x > 0 \\\\ 0 & \\text{otherwise} \\end{cases}",
        visual: `
            <svg viewBox="0 0 400 200">
                <!-- Graph Axes -->
                <line x1="50" y1="150" x2="350" y2="150" stroke="#cbd5e1" stroke-width="2"/>
                <line x1="200" y1="20" x2="200" y2="180" stroke="#cbd5e1" stroke-width="2"/>
                <!-- ReLU Line -->
                <path d="M50,150 L200,150 L320,30" stroke="#10b981" stroke-width="4" fill="none" stroke-linejoin="round"/>
                <!-- Labels -->
                <text x="120" y="130" font-size="14" fill="#ef4444" text-anchor="middle">"Say Zero!"</text>
                <text x="280" y="100" font-size="14" fill="#10b981" text-anchor="middle">"Shout Loud!"</text>
                <text x="360" y="155" font-size="14" fill="#475569">Input</text>
                <text x="180" y="15" font-size="14" fill="#475569">Output</text>
            </svg>
        `
    },
    {
        title: "3. The 'FC' Layers: The Big Bosses",
        text: "At the end are the 3x 'FC' (Fully Connected) Layers. These are the <strong>big bosses</strong> sitting in the boardroom at the end of the factory.<br><br>They don't look at the picture at all. Instead, they take all the reports from the detectives ('We found a floppy ear', 'We found a wet nose') and have a big vote. Because they are connected to *all* the clues, they confidently shout the final answer: <em>'It's a Dog!'</em>",
        formula: "y = Wx + b \\quad (\\text{Weighted Voting System})",
        visual: `
            <svg viewBox="0 0 400 200">
                <!-- Clues (Inputs to FC) -->
                <circle cx="80" cy="50" r="15" fill="#8b5cf6" />
                <text x="80" y="55" font-size="12" fill="#fff" text-anchor="middle">Ear</text>
                <circle cx="80" cy="100" r="15" fill="#8b5cf6" />
                <text x="80" y="105" font-size="12" fill="#fff" text-anchor="middle">Nose</text>
                <circle cx="80" cy="150" r="15" fill="#8b5cf6" />
                <text x="80" y="155" font-size="12" fill="#fff" text-anchor="middle">Tail</text>

                <!-- Big Bosses (Hidden FC layer) -->
                <circle cx="220" cy="75" r="20" fill="#f59e0b" />
                <circle cx="220" cy="125" r="20" fill="#f59e0b" />

                <!-- Fully Connected Lines -->
                <path d="M95,50 L200,75" stroke="#94a3b8" stroke-width="2"/>
                <path d="M95,50 L200,125" stroke="#94a3b8" stroke-width="2"/>
                <path d="M95,100 L200,75" stroke="#94a3b8" stroke-width="2"/>
                <path d="M95,100 L200,125" stroke="#94a3b8" stroke-width="2"/>
                <path d="M95,150 L200,75" stroke="#94a3b8" stroke-width="2"/>
                <path d="M95,150 L200,125" stroke="#94a3b8" stroke-width="2"/>

                <!-- Final Output Vote -->
                <circle cx="340" cy="100" r="25" fill="#10b981" />
                <text x="340" y="105" font-size="16" font-weight="bold" fill="#fff" text-anchor="middle">DOG!</text>

                <path d="M240,75 L315,100" stroke="#10b981" stroke-width="3"/>
                <path d="M240,125 L315,100" stroke="#10b981" stroke-width="3"/>
            </svg>
        `
    },
    {
        title: "4. Dropout: The Classroom Trick",
        text: "Dropout is used for 'Regularization'. Imagine kids working on a group project. Sometimes, one smart kid does all the work, and the rest get lazy. If that kid is sick, the whole group fails!<br><br>Dropout is like the teacher randomly telling different kids to put their heads down and take a nap. Because different workers are 'dropped out' every time, <em>every</em> worker is forced to step up and learn. It stops the brain from just memorizing.",
        formula: "y_i = m_i * x_i \\quad \\text{where } m_i \\sim \\text{Bernoulli}(p)",
        visual: `
            <svg viewBox="0 0 400 200">
                <text x="200" y="30" font-size="14" fill="#475569" text-anchor="middle">Some 'bosses' are forced to sleep!</text>

                <circle cx="100" cy="70" r="20" fill="#f59e0b" />
                <!-- Dropped out node -->
                <circle cx="100" cy="130" r="20" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
                <line x1="85" y1="115" x2="115" y2="145" stroke="#94a3b8" stroke-width="2"/>
                <line x1="115" y1="115" x2="85" y2="145" stroke="#94a3b8" stroke-width="2"/>

                <circle cx="200" cy="70" r="20" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
                <line x1="185" y1="55" x2="215" y2="85" stroke="#94a3b8" stroke-width="2"/>
                <line x1="215" y1="55" x2="185" y2="85" stroke="#94a3b8" stroke-width="2"/>
                <circle cx="200" cy="130" r="20" fill="#f59e0b" />

                <circle cx="300" cy="100" r="20" fill="#10b981" />

                <!-- Active Paths -->
                <path d="M120,70 L280,100" stroke="#f59e0b" stroke-width="3"/>
                <path d="M220,130 L280,100" stroke="#f59e0b" stroke-width="3"/>

                <!-- Dropped Paths -->
                <path d="M120,130 L180,70" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" opacity="0.4"/>
                <path d="M120,130 L180,130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" opacity="0.4"/>
                <path d="M120,70 L180,130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" opacity="0.4"/>
                <path d="M220,70 L280,100" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" opacity="0.4"/>
            </svg>
        `
    },
    {
        title: "5. GPUs: The Super Speed Team",
        text: "Finally, AlexNet used GPUs. <br><br>If one person tries to build a giant 10,000-piece Lego set, it takes months. But if you invite 1,000 friends over and everyone builds a tiny section at the <em>exact same time</em>, you finish in an hour! A GPU is like bringing in those 1,000 friends. It allowed AlexNet to process millions of pictures super fast via parallel processing.",
        formula: "\\text{Parallel Math}: \\mathbf{A} \\times \\mathbf{B} = \\mathbf{C} \\quad \\text{(Thousands of ops at once!)}",
        visual: `
            <svg viewBox="0 0 400 200">
                <rect x="50" y="40" width="300" height="120" rx="10" fill="#f0f9ff" stroke="#0891b2" stroke-width="4"/>
                <text x="200" y="70" font-size="16" font-weight="bold" fill="#0891b2" text-anchor="middle">Graphics Processing Unit (GPU)</text>

                <!-- Matrix of cores -->
                <g fill="#0ea5e9" opacity="0.8">
                    <rect x="70" y="90" width="15" height="15" rx="2"/>
                    <rect x="95" y="90" width="15" height="15" rx="2"/>
                    <rect x="120" y="90" width="15" height="15" rx="2"/>
                    <rect x="145" y="90" width="15" height="15" rx="2"/>
                    <rect x="170" y="90" width="15" height="15" rx="2"/>
                    <rect x="195" y="90" width="15" height="15" rx="2"/>
                    <rect x="220" y="90" width="15" height="15" rx="2"/>
                    <rect x="245" y="90" width="15" height="15" rx="2"/>
                    <rect x="270" y="90" width="15" height="15" rx="2"/>
                    <rect x="295" y="90" width="15" height="15" rx="2"/>
                    <rect x="320" y="90" width="15" height="15" rx="2"/>

                    <rect x="70" y="115" width="15" height="15" rx="2"/>
                    <rect x="95" y="115" width="15" height="15" rx="2"/>
                    <rect x="120" y="115" width="15" height="15" rx="2"/>
                    <rect x="145" y="115" width="15" height="15" rx="2"/>
                    <rect x="170" y="115" width="15" height="15" rx="2"/>
                    <rect x="195" y="115" width="15" height="15" rx="2"/>
                    <rect x="220" y="115" width="15" height="15" rx="2"/>
                    <rect x="245" y="115" width="15" height="15" rx="2"/>
                    <rect x="270" y="115" width="15" height="15" rx="2"/>
                    <rect x="295" y="115" width="15" height="15" rx="2"/>
                    <rect x="320" y="115" width="15" height="15" rx="2"/>
                </g>

                <!-- Lightning bolts -->
                <path d="M60,105 L40,105 L45,115 L30,115" stroke="#f59e0b" stroke-width="2" fill="none"/>
                <path d="M340,105 L360,105 L355,115 L370,115" stroke="#f59e0b" stroke-width="2" fill="none"/>
            </svg>
        `
    },
    {
        title: "6. Code Tutorial: Building AlexNet in PyTorch",
        text: "Let's translate our 'Detective Factory' into real Python code using PyTorch! <br><br>We define a class called <code>AlexNet</code>. Inside the <code>__init__</code> setup phase:<br> <strong><code>self.features</code></strong>: Contains the Convolutional layers (detectives with magnifying glasses) and ReLU (the 'Loud and Clear' rule).<br> <strong><code>self.classifier</code></strong>: Contains the Fully Connected layers (Big Bosses voting) and Dropout (the classroom nap trick).<br><br>In the <strong><code>forward()</code></strong> function, the image (<code>x</code>) goes through the detectives, the clues are flattened into a single list, and finally handed to the bosses for the final vote!",
        formula: null,
        visual: `
            <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden flex flex-col font-mono text-left text-xs sm:text-sm shadow-xl border border-slate-700">
                <!-- Code Window Header -->
                <div class="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    <span class="text-slate-400 ml-2 text-xs font-semibold">alexnet.py</span>
                </div>
                <!-- Code Content -->
                <div class="p-4 overflow-y-auto text-slate-300 whitespace-pre leading-relaxed custom-scrollbar">
<span class="text-pink-400">import</span> torch.nn <span class="text-pink-400">as</span> nn

<span class="text-pink-400">class</span> <span class="text-emerald-400">AlexNet</span>(nn.Module):
    <span class="text-pink-400">def</span> <span class="text-blue-400">__init__</span>(self, num_classes=1000):
        <span class="text-pink-400">super</span>().__init__()
        <span class="text-slate-500"># The Detectives (Magnifying Glasses & ReLU)</span>
        self.features = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=11, stride=4, padding=2),
            nn.ReLU(inplace=<span class="text-orange-400">True</span>),
            nn.MaxPool2d(kernel_size=3, stride=2),
            <span class="text-slate-500"># ... (more conv layers in the real AlexNet) ...</span>
        )

        <span class="text-slate-500"># The Big Bosses (Dropout & Voting)</span>
        self.classifier = nn.Sequential(
            nn.Dropout(p=0.5), <span class="text-slate-500"># The Nap Trick</span>
            nn.Linear(256 * 6 * 6, 4096),
            nn.ReLU(inplace=<span class="text-orange-400">True</span>),
            nn.Linear(4096, num_classes),
        )

    <span class="text-pink-400">def</span> <span class="text-blue-400">forward</span>(self, x):
        x = self.features(x)   <span class="text-slate-500"># Detectives extract clues</span>
        x = torch.flatten(x, 1) <span class="text-slate-500"># Organize the reports</span>
        x = self.classifier(x) <span class="text-slate-500"># Bosses take the final vote</span>
        <span class="text-pink-400">return</span> x
                </div>
            </div>
        `
    }
];

let currentStep = 0;

// DOM Elements
const titleEl = document.getElementById('slide-title');
const textEl = document.getElementById('slide-text');
const visualEl = document.getElementById('visual-container');
const formulaBox = document.getElementById('formula-box');
const formulaContainer = document.getElementById('formula-container');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const slideContent = document.getElementById('slide-content');
const progressBar = document.getElementById('progress-bar');
const stepIndicator = document.getElementById('step-indicator');

function renderSlide() {
    const slide = slides[currentStep];

    // Re-trigger fade animation
    slideContent.classList.remove('fade-in');
    void slideContent.offsetWidth; // Trigger reflow
    slideContent.classList.add('fade-in');

    // Update Text & Visuals
    titleEl.innerHTML = slide.title;
    textEl.innerHTML = slide.text;
    visualEl.innerHTML = slide.visual;

    // Handle Formula using KaTeX
    if (slide.formula) {
        formulaBox.classList.remove('hidden');
        katex.render(slide.formula, formulaContainer, {
            displayMode: true,
            throwOnError: false
        });
    } else {
        formulaBox.classList.add('hidden');
    }

    // Update Progress & Buttons
    const progressPct = ((currentStep + 1) / slides.length) * 100;
    progressBar.style.width = `${progressPct}%`;
    stepIndicator.textContent = `Step ${currentStep + 1} of ${slides.length}`;

    btnPrev.disabled = currentStep === 0;

    if (currentStep === slides.length - 1) {
        btnNext.innerHTML = 'Finish <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>';
        btnNext.classList.replace('bg-blue-600', 'bg-emerald-600');
        btnNext.classList.replace('hover:bg-blue-500', 'hover:bg-emerald-500');
        btnNext.classList.replace('shadow-blue-500/20', 'shadow-emerald-500/20');
    } else {
        btnNext.innerHTML = 'Next <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
        btnNext.classList.replace('bg-emerald-600', 'bg-blue-600');
        btnNext.classList.replace('hover:bg-emerald-500', 'hover:bg-blue-500');
        btnNext.classList.replace('shadow-emerald-500/20', 'shadow-blue-500/20');
    }
}

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentStep < slides.length - 1) {
        currentStep++;
        renderSlide();
    }
});

btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderSlide();
    }
});

// Initialize first slide when the window loads to ensure KaTeX is ready
window.onload = renderSlide;