// Data for each step of the visualization
const stepsData = [
    {
        title: "The Problem: The Long Game of Telephone",
        content: `
            <p>Imagine you whisper a secret word (your input) to your first friend, and they whisper it to the next, and so on down a line of 150 kids.</p>
            <p>By the time the message reaches the very last kid, what usually happens? The word has completely changed or faded away into mumbles. The original message is lost!</p>
            <p class="font-semibold text-rose-600">In neural networks, this is called the "Vanishing Gradient Problem."</p>
            <p>When a brain-like computer program has too many steps or "layers," it forgets the original information by the time it reaches the end.</p>
        `,
        math: null,
        renderSVG: () => `
            <svg viewBox="0 0 600 200" class="w-full h-auto drop-shadow-sm">
                <defs>
                    <marker id="arrow-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#9CA3AF" />
                    </marker>
                </defs>

                <!-- Kids / Nodes -->
                <g stroke="#3B82F6" stroke-width="3" fill="white">
                    <circle cx="80" cy="100" r="25" />
                    <circle cx="190" cy="100" r="25" opacity="0.8" />
                    <circle cx="300" cy="100" r="25" opacity="0.5" />
                    <circle cx="410" cy="100" r="25" opacity="0.3" stroke="#9CA3AF" />
                    <circle cx="520" cy="100" r="25" opacity="0.1" stroke="#9CA3AF" />
                </g>

                <!-- Whispers / Arrows -->
                <g stroke="#9CA3AF" stroke-width="3" fill="none" marker-end="url(#arrow-gray)">
                    <path d="M 115 100 L 155 100" opacity="1" />
                    <path d="M 225 100 L 265 100" opacity="0.7" />
                    <path d="M 335 100 L 375 100" opacity="0.4" />
                    <path d="M 445 100 L 485 100" opacity="0.2" />
                </g>

                <!-- Text -->
                <text x="80" y="105" text-anchor="middle" font-weight="bold" font-size="16" fill="#1F2937">x</text>
                <text x="520" y="105" text-anchor="middle" font-weight="bold" font-size="20" fill="#9CA3AF">?</text>

                <text x="80" y="150" text-anchor="middle" font-size="14" fill="#6B7280">Original</text>
                <text x="80" y="168" text-anchor="middle" font-size="14" fill="#6B7280">Message</text>

                <text x="520" y="150" text-anchor="middle" font-size="14" fill="#EF4444">Lost</text>
                <text x="520" y="168" text-anchor="middle" font-size="14" fill="#EF4444">Message</text>
            </svg>
        `
    },
    {
        title: "Standard Neural Network Path",
        content: `
            <p>Before ResNet, data flowed through a network sequentially, just like the line of kids.</p>
            <ul class="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Input (x):</strong> Your original secret message.</li>
                <li><strong>The Boxes (Weight Layer & ReLU):</strong> These are the kids whispering to each other. As the message goes through them, it gets processed and changed.</li>
            </ul>
            <p class="mt-4">The final transformed message coming out of these standard layers is called <strong class="text-indigo-600">F(x)</strong>.</p>
        `,
        math: "\\text{Transformed Message} = \\mathcal{F}(x)",
        renderSVG: () => `
            <svg viewBox="0 0 600 300" class="w-full h-auto drop-shadow-sm">
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#4B5563" />
                    </marker>
                </defs>

                <!-- Base Path Arrows -->
                <g stroke="#4B5563" stroke-width="3" fill="none" marker-end="url(#arrow)">
                    <path d="M 50 150 L 130 150" />
                    <path d="M 230 150 L 270 150" />
                    <path d="M 350 150 L 390 150" />
                    <path d="M 490 150 L 550 150" />
                </g>

                <!-- Layers -->
                <rect x="130" y="110" width="100" height="80" class="svg-box" />
                <text x="180" y="145" text-anchor="middle" class="svg-box-text">Weight</text>
                <text x="180" y="165" text-anchor="middle" class="svg-box-text">Layer</text>

                <rect x="270" y="110" width="80" height="80" class="svg-box" fill="#E0E7FF" stroke="#6366F1" />
                <text x="310" y="155" text-anchor="middle" class="svg-box-text" fill="#4338CA">ReLU</text>

                <rect x="390" y="110" width="100" height="80" class="svg-box" />
                <text x="440" y="145" text-anchor="middle" class="svg-box-text">Weight</text>
                <text x="440" y="165" text-anchor="middle" class="svg-box-text">Layer</text>

                <!-- Labels -->
                <text x="30" y="155" font-weight="bold" font-size="20" fill="#1F2937">x</text>
                <text x="30" y="180" font-size="14" fill="#6B7280" text-anchor="middle">Input</text>

                <text x="575" y="155" font-weight="bold" font-size="20" fill="#4F46E5" text-anchor="middle">F(x)</text>
            </svg>
        `
    },
    {
        title: "The Solution: The 'Megaphone' Shortcut",
        content: `
            <p>In 2015, scientists figured out a simple but genius rule to fix the vanishing message.</p>
            <p>What if, while the message is being whispered down the line, you also got a megaphone and shouted the original word directly to the kid at the end, skipping the kids in between?</p>
            <p>The <strong>Long Curved Arrow</strong> is the megaphone! It takes your original message (<strong>x</strong>) and skips the whispering kids, sending it straight forward. This is called a <strong class="text-teal-600">Skip Connection</strong>.</p>
        `,
        math: "\\text{Identity Mapping} = x",
        renderSVG: () => `
            <svg viewBox="0 0 600 300" class="w-full h-auto drop-shadow-sm">
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#4B5563" />
                    </marker>
                    <marker id="arrow-teal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0D9488" />
                    </marker>
                </defs>

                <!-- Base Path (Faded slightly to emphasize skip) -->
                <g stroke="#9CA3AF" stroke-width="3" fill="none" marker-end="url(#arrow)">
                    <path d="M 50 150 L 130 150" />
                    <path d="M 230 150 L 270 150" />
                    <path d="M 350 150 L 390 150" />
                </g>

                <!-- Layers -->
                <rect x="130" y="110" width="100" height="80" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>
                <text x="180" y="145" text-anchor="middle" font-size="14" fill="#6B7280" font-weight="bold">Weight</text>
                <text x="180" y="165" text-anchor="middle" font-size="14" fill="#6B7280" font-weight="bold">Layer</text>

                <rect x="270" y="110" width="80" height="80" rx="8" fill="#EEF2FF" stroke="#A5B4FC" stroke-width="2" />
                <text x="310" y="155" text-anchor="middle" font-size="14" fill="#818CF8" font-weight="bold">ReLU</text>

                <rect x="390" y="110" width="100" height="80" rx="8" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="2"/>
                <text x="440" y="145" text-anchor="middle" font-size="14" fill="#6B7280" font-weight="bold">Weight</text>
                <text x="440" y="165" text-anchor="middle" font-size="14" fill="#6B7280" font-weight="bold">Layer</text>

                <!-- Skip Connection (The Megaphone) -->
                <path d="M 80 150 Q 80 40, 290 40 T 500 130" fill="none" stroke="#0D9488" stroke-width="4" marker-end="url(#arrow-teal)" stroke-dasharray="8,4" />

                <!-- Labels -->
                <text x="30" y="155" font-weight="bold" font-size="20" fill="#1F2937">x</text>
                <text x="290" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#0D9488">Skip Connection (Megaphone)</text>

                <text x="540" y="125" font-weight="bold" font-size="18" fill="#0D9488">x</text>
            </svg>
        `
    },
    {
        title: "Bringing it Together: The Plus Sign (+)",
        content: `
            <p>Now we have two things arriving at the end of the block:</p>
            <ol class="list-decimal pl-5 space-y-2 mt-2">
                <li>The whispered, processed message <strong class="text-indigo-600">F(x)</strong>.</li>
                <li>Your clear shout from the megaphone <strong class="text-teal-600">x</strong>.</li>
            </ol>
            <p class="mt-4"><strong>The Plus Sign (+):</strong> The kid at the end hears both. They add them together! This guarantees that even if the whispered message <em>F(x)</em> is complete garbage (zero), the original message <em>x</em> is still safely passed forward.</p>
        `,
        math: "\\text{Output} = \\mathcal{F}(x) + x",
        renderSVG: () => `
            <svg viewBox="0 0 600 300" class="w-full h-auto drop-shadow-sm">
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#4B5563" />
                    </marker>
                    <marker id="arrow-teal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0D9488" />
                    </marker>
                </defs>

                <!-- Base Path -->
                <g stroke="#4B5563" stroke-width="3" fill="none" marker-end="url(#arrow)">
                    <path d="M 50 150 L 130 150" />
                    <path d="M 230 150 L 270 150" />
                    <path d="M 350 150 L 390 150" />
                    <path d="M 490 150 L 510 150" />
                </g>

                <!-- Layers -->
                <rect x="130" y="110" width="100" height="80" class="svg-box" />
                <text x="180" y="145" text-anchor="middle" class="svg-box-text">Weight</text>

                <rect x="270" y="110" width="80" height="80" class="svg-box" fill="#E0E7FF" stroke="#6366F1" />
                <text x="310" y="155" text-anchor="middle" class="svg-box-text" fill="#4338CA">ReLU</text>

                <rect x="390" y="110" width="100" height="80" class="svg-box" />
                <text x="440" y="145" text-anchor="middle" class="svg-box-text">Weight</text>

                <!-- Skip Connection -->
                <path d="M 80 150 Q 80 40, 305 40 T 530 130" fill="none" stroke="#0D9488" stroke-width="4" marker-end="url(#arrow-teal)" />

                <!-- The Addition Node -->
                <circle cx="530" cy="150" r="20" fill="white" stroke="#EAB308" stroke-width="4" />
                <text x="530" y="158" text-anchor="middle" font-size="24" font-weight="bold" fill="#EAB308">+</text>

                <!-- Final Output Arrow -->
                <path d="M 550 150 L 590 150" stroke="#4B5563" stroke-width="3" fill="none" marker-end="url(#arrow)" />

                <!-- Labels -->
                <text x="30" y="155" font-weight="bold" font-size="20" fill="#1F2937">x</text>
                <text x="440" y="195" font-weight="bold" font-size="16" fill="#4F46E5" text-anchor="middle">F(x)</text>
                <text x="510" y="80" font-weight="bold" font-size="16" fill="#0D9488" text-anchor="middle">x</text>
                <text x="575" y="180" font-weight="bold" font-size="16" fill="#1F2937" text-anchor="middle">F(x) + x</text>
            </svg>
        `
    },
    {
        title: "Why is this so awesome?",
        content: `
            <p>This perfect, corrected message <strong>F(x) + x</strong> is now ready to be passed to the next group of friends.</p>
            <p>Before ResNet, computers could only have a few layers before getting totally confused.</p>
            <p class="font-bold text-indigo-700 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                With these skip connections, scientists could suddenly build computers with hundreds of layers that were incredibly smart and never forgot the original image.
            </p>
            <p>It allowed the creation of Ultra-Deep Networks, completely changing how computers look at pictures forever!</p>
        `,
        math: null,
        renderSVG: () => `
            <svg viewBox="0 0 600 250" class="w-full h-auto drop-shadow-sm">
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#4B5563" />
                    </marker>
                </defs>

                <g transform="scale(0.8) translate(50, 50)">
                    <!-- Block 1 -->
                    <rect x="0" y="50" width="80" height="60" class="svg-box" />
                    <path d="M -40 80 Q -40 -10, 50 -10 T 100 65" fill="none" stroke="#0D9488" stroke-width="3" />
                    <circle cx="100" cy="80" r="15" fill="white" stroke="#EAB308" stroke-width="3" />
                    <text x="100" y="86" text-anchor="middle" font-size="18" font-weight="bold" fill="#EAB308">+</text>
                    <path d="M 80 80 L 85 80" stroke="#4B5563" stroke-width="2" />

                    <path d="M 115 80 L 140 80" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow)" />

                    <!-- Block 2 -->
                    <g transform="translate(160, 0)">
                        <rect x="0" y="50" width="80" height="60" class="svg-box" />
                        <path d="M -40 80 Q -40 -10, 50 -10 T 100 65" fill="none" stroke="#0D9488" stroke-width="3" />
                        <circle cx="100" cy="80" r="15" fill="white" stroke="#EAB308" stroke-width="3" />
                        <text x="100" y="86" text-anchor="middle" font-size="18" font-weight="bold" fill="#EAB308">+</text>
                        <path d="M 80 80 L 85 80" stroke="#4B5563" stroke-width="2" />
                        <path d="M 115 80 L 140 80" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow)" />
                    </g>

                    <!-- Block 3 -->
                    <g transform="translate(320, 0)">
                        <rect x="0" y="50" width="80" height="60" class="svg-box" />
                        <path d="M -40 80 Q -40 -10, 50 -10 T 100 65" fill="none" stroke="#0D9488" stroke-width="3" />
                        <circle cx="100" cy="80" r="15" fill="white" stroke="#EAB308" stroke-width="3" />
                        <text x="100" y="86" text-anchor="middle" font-size="18" font-weight="bold" fill="#EAB308">+</text>
                        <path d="M 80 80 L 85 80" stroke="#4B5563" stroke-width="2" />
                        <path d="M 115 80 L 180 80" stroke="#4B5563" stroke-width="2" marker-end="url(#arrow)" />
                    </g>

                    <text x="-60" y="86" font-weight="bold" font-size="24" fill="#1F2937">x</text>
                    <text x="520" y="86" font-weight="bold" font-size="20" fill="#4F46E5">Deep Output</text>
                </g>

                <text x="300" y="230" text-anchor="middle" font-size="16" fill="#6B7280" font-style="italic">Many ResNet blocks stacked together to form a deep network.</text>
            </svg>
        `
    },
    {
        title: "Code Tutorial: Building ResNet in PyTorch",
        content: `
            <p>Let's translate our Telephone Game into actual Python code using <strong>PyTorch</strong>!</p>
            <p>In PyTorch, we build a ResNet block by defining our "whispering kids" (the layers) and the "megaphone" step.</p>
            <div class="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono mt-4 shadow-inner">
<pre><code><span class="text-pink-400">import</span> torch.nn <span class="text-pink-400">as</span> nn

<span class="text-pink-400">class</span> <span class="text-emerald-400">ResNetBlock</span>(nn.Module):
    <span class="text-pink-400">def</span> <span class="text-sky-400">__init__</span>(<span class="text-orange-400">self</span>):
        <span class="text-sky-400">super</span>().__init__()
        <span class="text-slate-400 italic"># The whispering kids: Standard CNN layers</span>
        <span class="text-orange-400">self</span>.whisper_layers = nn.Sequential(
            nn.Conv2d(<span class="text-purple-400">64</span>, <span class="text-purple-400">64</span>, kernel_size=<span class="text-purple-400">3</span>, padding=<span class="text-purple-400">1</span>),
            nn.ReLU(),
            nn.Conv2d(<span class="text-purple-400">64</span>, <span class="text-purple-400">64</span>, kernel_size=<span class="text-purple-400">3</span>, padding=<span class="text-purple-400">1</span>)
        )

    <span class="text-pink-400">def</span> <span class="text-sky-400">forward</span>(<span class="text-orange-400">self</span>, x):
        <span class="text-slate-400 italic"># 1. Kids pass the message: F(x)</span>
        F_x = <span class="text-orange-400">self</span>.whisper_layers(x)

        <span class="text-slate-400 italic"># 2. The Megaphone! Add original 'x' to 'F_x'</span>
        out = F_x + x

        <span class="text-slate-400 italic"># 3. Final activation, ready for the next block</span>
        <span class="text-pink-400">return</span> nn.ReLU()(out)
        </code></pre>
                </div>
                <p class="mt-4 text-sm text-slate-700 bg-teal-50 p-3 rounded-lg border border-teal-200">
                    Notice how the single line <strong><code class="text-teal-700 font-bold">out = F_x + x</code></strong> is all it takes to create our powerful skip connection!
                </p>
        `,
        math: null,
        renderSVG: () => `
            <svg viewBox="0 0 600 300" class="w-full h-auto drop-shadow-sm">
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#4B5563" />
                    </marker>
                    <marker id="arrow-teal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0D9488" />
                    </marker>
                </defs>

                <!-- Base Path -->
                <g stroke="#4B5563" stroke-width="3" fill="none" marker-end="url(#arrow)">
                    <path d="M 50 150 L 130 150" />
                    <path d="M 230 150 L 270 150" />
                    <path d="M 350 150 L 390 150" />
                    <path d="M 490 150 L 510 150" />
                </g>

                <!-- Layers -->
                <rect x="130" y="110" width="100" height="80" class="svg-box" />
                <text x="180" y="145" text-anchor="middle" class="svg-box-text">Conv2d</text>

                <rect x="270" y="110" width="80" height="80" class="svg-box" fill="#E0E7FF" stroke="#6366F1" />
                <text x="310" y="155" text-anchor="middle" class="svg-box-text" fill="#4338CA">ReLU</text>

                <rect x="390" y="110" width="100" height="80" class="svg-box" />
                <text x="440" y="145" text-anchor="middle" class="svg-box-text">Conv2d</text>

                <!-- Skip Connection -->
                <path d="M 80 150 Q 80 40, 305 40 T 530 130" fill="none" stroke="#0D9488" stroke-width="4" marker-end="url(#arrow-teal)" />

                <!-- The Addition Node -->
                <circle cx="530" cy="150" r="20" fill="white" stroke="#EAB308" stroke-width="4" />
                <text x="530" y="158" text-anchor="middle" font-size="24" font-weight="bold" fill="#EAB308">+</text>

                <!-- Final Output Arrow -->
                <path d="M 550 150 L 590 150" stroke="#4B5563" stroke-width="3" fill="none" marker-end="url(#arrow)" />

                <!-- PyTorch Code Mapping Labels -->
                <text x="30" y="155" font-weight="bold" font-size="20" fill="#1F2937">x</text>

                <text x="440" y="215" font-weight="bold" font-size="14" fill="#4F46E5" text-anchor="middle">F_x</text>
                <rect x="375" y="225" width="130" height="24" fill="#1E293B" rx="4" />
                <text x="440" y="241" font-family="monospace" font-size="11" fill="#10B981" text-anchor="middle">whisper_layers(x)</text>

                <rect x="475" y="185" width="110" height="24" fill="#1E293B" rx="4" />
                <text x="530" y="201" font-family="monospace" font-size="12" fill="#10B981" text-anchor="middle">out = F_x + x</text>

                <text x="510" y="80" font-weight="bold" font-size="16" fill="#0D9488" text-anchor="middle">x</text>
            </svg>
        `
    }
];

let currentStep = 0;

// DOM Elements
const titleEl = document.getElementById('step-title');
const contentEl = document.getElementById('step-content');
const mathContainer = document.getElementById('math-container');
const visualContainer = document.getElementById('visual-container');
const stepCounterEl = document.getElementById('step-counter');
const btnBack = document.getElementById('btn-back');
const btnNext = document.getElementById('btn-next');
const progressDots = document.getElementById('progress-dots');

// Initialize Application
function init() {
    // Create progress dots
    stepsData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-indigo-600' : 'bg-slate-300'}`;
        dot.id = `dot-${index}`;
        progressDots.appendChild(dot);
    });

    // Event Listeners
    btnBack.addEventListener('click', () => navigate(-1));
    btnNext.addEventListener('click', () => navigate(1));

    // Ensure KaTeX is loaded before first render
    if (typeof katex !== 'undefined') {
        updateUI();
    } else {
        // Fallback if CDN is slow
        setTimeout(updateUI, 500);
    }
}

// Navigation Logic
function navigate(direction) {
    const newStep = currentStep + direction;
    if (newStep >= 0 && newStep < stepsData.length) {

        // Remove fade-in class to re-trigger animation
        const elementsToAnimate = [titleEl, contentEl, mathContainer, visualContainer];
        elementsToAnimate.forEach(el => {
            el.classList.remove('fade-in');
            void el.offsetWidth; // Trigger reflow
        });

        currentStep = newStep;
        updateUI();

        // Add fade-in back
        elementsToAnimate.forEach(el => el.classList.add('fade-in'));
    }
}

// Update User Interface
function updateUI() {
    const step = stepsData[currentStep];

    // Update Text Data
    stepCounterEl.textContent = currentStep + 1;
    titleEl.textContent = step.title;
    contentEl.innerHTML = step.content;

    // Render Math Formula using KaTeX
    if (step.math) {
        mathContainer.classList.remove('hidden');
        try {
            katex.render(step.math, mathContainer, {
                throwOnError: false,
                displayMode: true
            });
        } catch (e) {
            mathContainer.innerHTML = step.math; // Fallback to raw text if KaTeX fails
        }
    } else {
        mathContainer.classList.add('hidden');
        mathContainer.innerHTML = '';
    }

    // Render SVG Visualization
    visualContainer.innerHTML = step.renderSVG();

    // Update Controls State
    btnBack.disabled = currentStep === 0;
    if (currentStep === stepsData.length - 1) {
        btnNext.disabled = true;
        btnNext.innerHTML = 'Finished <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
    } else {
        btnNext.disabled = false;
        btnNext.innerHTML = 'Next <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>';
    }

    // Update Progress Dots
    stepsData.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index === currentStep) {
            dot.className = 'w-2.5 h-2.5 rounded-full transition-colors duration-300 bg-indigo-600 scale-125';
        } else if (index < currentStep) {
            dot.className = 'w-2.5 h-2.5 rounded-full transition-colors duration-300 bg-indigo-300';
        } else {
            dot.className = 'w-2.5 h-2.5 rounded-full transition-colors duration-300 bg-slate-200';
        }
    });
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);