// Data for each step
const steps = [
    {
        title: "1. The Pre-trained Model (The Expert)",
        description: "Imagine a massive Convolutional Neural Network (like ResNet) trained on millions of images (like ImageNet). It has already learned how to 'see'. The early layers detect basic edges, middle layers detect shapes, and final layers detect complex objects.",
        visual: `
            <div class="flex flex-col items-center mt-8 w-full">
                <div class="text-sm font-bold text-gray-500 mb-4 tracking-widest uppercase">Trained on 1.2 Million Images</div>
                <div class="flex flex-row flex-wrap items-center gap-2 md:gap-4 w-full justify-center">
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center text-2xl">🖼️</div>
                        <span class="text-xs mt-2 font-medium">Input Image</span>
                    </div>
                    <span class="text-gray-400 font-bold hidden sm:block">→</span>

                    <!-- Base Model Layers -->
                    <div class="layer-box original-layer border-2 rounded-lg p-3 text-center w-24 shadow-sm flex flex-col justify-center">
                        <div class="font-bold text-sm mb-1">Block 1</div>
                        <div class="text-[10px]">(Edges)</div>
                    </div>
                    <div class="layer-box original-layer border-2 rounded-lg p-3 text-center w-24 shadow-sm h-20 flex flex-col justify-center">
                        <div class="font-bold text-sm mb-1">Block 2</div>
                        <div class="text-[10px]">(Textures)</div>
                    </div>
                    <div class="layer-box original-layer border-2 rounded-lg p-3 text-center w-24 shadow-sm h-24 flex flex-col justify-center">
                        <div class="font-bold text-sm mb-1">Block 3</div>
                        <div class="text-[10px]">(Shapes)</div>
                    </div>

                    <span class="text-gray-400 font-bold hidden sm:block">→</span>
                    <!-- Original Head -->
                    <div class="layer-box bg-red-100 border-red-400 border-2 text-red-800 rounded-lg p-3 text-center w-28 shadow-sm h-32 flex flex-col justify-center">
                        <div class="font-bold text-sm mb-1">Original Head</div>
                        <div class="text-[10px]">1000 Classes<br>(Dog, Car, etc.)</div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "2. The New Problem (Small Data)",
        description: "Now, you want to build a model to detect rare bird species or analyze Medical X-Rays. You only have a few hundred images. If you train a massive model from scratch on small data, it will <strong>overfit</strong> (memorize the data) and fail in the real world.",
        visual: `
            <div class="flex flex-col items-center mt-8 w-full">
                <div class="flex flex-col sm:flex-row items-center gap-8 md:gap-12 w-full justify-center">

                    <div class="flex flex-col items-center bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300">
                        <div class="text-sm font-bold text-gray-500 mb-4 uppercase">Your New Task</div>
                        <div class="flex space-x-2 mb-2">
                            <div class="w-12 h-12 bg-white border border-gray-200 rounded flex items-center justify-center text-xl">🦅</div>
                            <div class="w-12 h-12 bg-white border border-gray-200 rounded flex items-center justify-center text-xl">🦜</div>
                        </div>
                        <span class="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded">Only 500 Images!</span>
                    </div>

                    <div class="flex flex-col items-center text-red-500 max-w-xs text-center bg-red-50 p-4 rounded-xl border border-red-100">
                        <svg class="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        <span class="font-bold">Training from scratch = Overfitting!</span>
                        <span class="text-xs text-red-700 mt-2">Millions of parameters vs. hundreds of images. The model will just memorize your birds and fail on new ones.</span>
                    </div>

                </div>
            </div>
        `
    },
    {
        title: "3. Transfer Learning (Feature Extraction)",
        description: "Instead of starting from scratch, we reuse the 'Expert' model. We <strong>freeze</strong> its convolutional layers (the feature extractors) so their weights don't change. We chop off the original head and add a <strong>new, untrained head</strong> matching our new classes. We only train this new head!",
        visual: `
            <div class="flex flex-col items-center mt-8 w-full">
                <div class="text-sm font-bold text-blue-600 mb-4 tracking-widest uppercase">Feature Extraction Mode</div>
                <div class="flex flex-row flex-wrap items-center gap-2 md:gap-4 w-full justify-center">

                    <!-- Frozen Layers -->
                    <div class="relative group">
                        <div class="absolute -top-3 -right-3 bg-gray-600 text-white rounded-full p-1 z-10 shadow">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <div class="flex flex-row flex-wrap gap-2 justify-center">
                            <div class="layer-box frozen border-2 rounded-lg p-3 text-center w-24 shadow-sm flex flex-col justify-center">
                                <div class="font-bold text-sm mb-1">Block 1</div><div class="text-[10px]">Frozen</div>
                            </div>
                            <div class="layer-box frozen border-2 rounded-lg p-3 text-center w-24 shadow-sm h-20 flex flex-col justify-center">
                                <div class="font-bold text-sm mb-1">Block 2</div><div class="text-[10px]">Frozen</div>
                            </div>
                            <div class="layer-box frozen border-2 rounded-lg p-3 text-center w-24 shadow-sm h-24 flex flex-col justify-center">
                                <div class="font-bold text-sm mb-1">Block 3</div><div class="text-[10px]">Frozen</div>
                            </div>
                        </div>
                    </div>

                    <span class="text-gray-400 font-bold hidden sm:block">→</span>
                    <!-- New Head -->
                    <div class="relative mt-2 sm:mt-0">
                        <div class="absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-1 z-10 shadow animate-pulse">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </div>
                        <div class="layer-box new-layer border-2 rounded-lg p-3 text-center w-28 shadow-sm h-32 flex flex-col justify-center">
                            <div class="font-bold text-sm mb-1">New Head</div>
                            <div class="text-[10px]">2 Classes<br>(Bird A vs B)<br><strong>Training!</strong></div>
                        </div>
                    </div>
                </div>
                <p class="text-xs text-gray-500 mt-6 max-w-lg text-center bg-gray-100 p-3 rounded-lg border border-gray-200">
                    The base model looks at the bird and outputs a list of features ("has feathers", "has beak"). The new head simply learns to map those pre-calculated features to your specific bird species.
                </p>
            </div>
        `
    },
    {
        title: "4. Fine-Tuning (Polishing)",
        description: "Once the new head is trained, we can 'unfreeze' the top few layers of the base model. We continue training everything, but with a <strong>very small learning rate</strong>. This allows the model to subtly adapt its high-level shape detectors specifically to birds, without forgetting its basic vision.",
        visual: `
            <div class="flex flex-col items-center mt-8 w-full">
                <div class="text-sm font-bold text-yellow-600 mb-4 tracking-widest uppercase">Fine-Tuning Mode</div>
                <div class="flex flex-row flex-wrap items-center gap-2 md:gap-4 w-full justify-center">

                    <!-- Frozen Base -->
                    <div class="relative group">
                        <div class="absolute -top-3 -left-3 bg-gray-600 text-white rounded-full p-1 z-10 shadow">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <div class="flex flex-row flex-wrap gap-2 justify-center">
                            <div class="layer-box frozen border-2 rounded-lg p-3 text-center w-24 shadow-sm flex flex-col justify-center">
                                <div class="font-bold text-sm mb-1">Block 1</div><div class="text-[10px]">Frozen</div>
                            </div>
                            <div class="layer-box frozen border-2 rounded-lg p-3 text-center w-24 shadow-sm h-20 flex flex-col justify-center">
                                <div class="font-bold text-sm mb-1">Block 2</div><div class="text-[10px]">Frozen</div>
                            </div>
                        </div>
                    </div>

                    <!-- Unfrozen Base (Fine-tuning) -->
                    <div class="relative group mt-2 sm:mt-0">
                        <div class="absolute -top-3 -right-3 bg-yellow-500 text-white rounded-full p-1 z-10 shadow animate-pulse">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div class="layer-box unfrozen-base border-2 rounded-lg p-3 text-center w-24 shadow-sm h-24 flex flex-col justify-center">
                            <div class="font-bold text-sm mb-1">Block 3</div>
                            <div class="text-[10px]">Unfrozen<br>Tiny LR</div>
                        </div>
                    </div>

                    <span class="text-gray-400 font-bold hidden sm:block">→</span>
                    <!-- New Head -->
                    <div class="relative mt-2 sm:mt-0">
                        <div class="layer-box new-layer border-2 rounded-lg p-3 text-center w-28 shadow-sm h-32 flex flex-col justify-center">
                            <div class="font-bold text-sm mb-1">New Head</div>
                            <div class="text-[10px]">Fine-tuning</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "5. The Mathematics & Equations",
        description: "Let's look at how the weights are updated using Gradient Descent. The key lies in manipulating the Gradients ($\\nabla L$) and the Learning Rate ($\\alpha$).",
        visual: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full">

                <!-- Standard Equation -->
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                    <h3 class="font-bold text-gray-700 mb-2 border-b pb-2">1. Weight Update Rule</h3>
                    <p class="text-sm text-gray-600 mb-3">During training, weights ($W$) are updated by subtracting the gradient of the Loss ($L$) multiplied by the Learning Rate ($\\alpha$).</p>
                    <div class="text-center bg-white p-3 rounded border border-gray-100 shadow-inner overflow-x-auto">
                        $$W_{new} = W_{old} - \\alpha \\nabla L(W_{old})$$
                    </div>
                </div>

                <!-- Transfer Learning Equation -->
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                    <h3 class="font-bold text-blue-700 mb-2 border-b pb-2">2. Transfer Learning (Freezing)</h3>
                    <p class="text-sm text-gray-600 mb-3">For frozen base layers ($W_{base}$), we intentionally set the gradients to zero (or don't compute them). Only the head weights ($W_{head}$) update.</p>
                    <div class="text-center bg-white p-3 rounded border border-gray-100 shadow-inner overflow-x-auto text-sm">
                        $$\\nabla L(W_{base}) = 0 \\implies W_{base} \\text{ unchanged}$$
                        $$W_{head} = W_{head} - \\alpha \\nabla L(W_{head})$$
                    </div>
                </div>

                <!-- Fine-Tuning Equation -->
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm md:col-span-2">
                    <h3 class="font-bold text-yellow-700 mb-2 border-b pb-2">3. Fine-Tuning (Differential Learning Rates)</h3>
                    <p class="text-sm text-gray-600 mb-3">When unfreezing top layers, we don't want to destroy the pre-trained weights. We use a <strong>very small</strong> learning rate for the base layers ($\\alpha_{base}$), and a normal learning rate for the head ($\\alpha_{head}$).</p>
                    <div class="text-center bg-white p-3 rounded border border-gray-100 shadow-inner overflow-x-auto">
                        $$\\alpha_{base} \\ll \\alpha_{head}$$
                        <br>
                        <span class="text-sm text-gray-600 font-medium">Example: $\\alpha_{base} = 10^{-5}$ while $\\alpha_{head} = 10^{-3}$</span>
                    </div>
                </div>

            </div>
        `
    }
];

let currentStep = 0;

// DOM Elements
const titleEl = document.getElementById('step-content');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const stepCounter = document.getElementById('step-counter');
const progressFill = document.getElementById('progress-fill');
const progressDotsContainer = document.getElementById('progress-dots');

// Initialize Progress Dots
function initDots() {
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-4 h-4 rounded-full border-2 border-white z-10 transition-colors duration-300 ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`;
        dot.id = `dot-${index}`;
        progressDotsContainer.appendChild(dot);
    });
}

// Render Step
function renderStep() {
    const step = steps[currentStep];

    // Build content HTML
    const contentHTML = `
        <div class="max-w-3xl mx-auto w-full flex-1 flex flex-col">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">${step.title}</h2>
            <p class="text-gray-600 text-lg leading-relaxed">${step.description}</p>
            <div class="flex-1 flex items-center justify-center min-h-[300px]">
                ${step.visual}
            </div>
        </div>
    `;

    // Apply fade-in effect
    titleEl.classList.remove('fade-in');
    void titleEl.offsetWidth; // Trigger reflow
    titleEl.innerHTML = contentHTML;
    titleEl.classList.add('fade-in');

    // Tell MathJax to typeset the newly injected HTML.
    // Added a check to make sure MathJax has fully loaded and its API is available before calling typesetPromise.
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        MathJax.typesetPromise([titleEl]).catch((err) => console.log('MathJax error:', err));
    }

    // Update Controls
    stepCounter.innerText = `Step ${currentStep + 1} of ${steps.length}`;
    btnPrev.disabled = currentStep === 0;
    btnNext.disabled = currentStep === steps.length - 1;

    // Update Progress Bar
    const progressPercentage = (currentStep / (steps.length - 1)) * 100;
    progressFill.style.width = `${progressPercentage}%`;

    // Update Dots
    steps.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index <= currentStep) {
            dot.classList.remove('bg-gray-300');
            dot.classList.add('bg-blue-600');
        } else {
            dot.classList.remove('bg-blue-600');
            dot.classList.add('bg-gray-300');
        }
    });
}

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
    }
});

btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
});

// Init
initDots();
renderStep();