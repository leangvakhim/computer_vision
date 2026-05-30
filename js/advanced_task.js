// <!-- Integrated JavaScript -->
// Define the scene elements to reuse in SVGs
const baseScene = `
    <!-- Background / Road -->
    <rect x="50" y="200" width="500" height="100" fill="#e2e8f0" />
    <line x1="50" y1="250" x2="550" y2="250" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="20,15" />
    <!-- Car 1 -->
    <g id="car1" transform="translate(100, 180)">
        <path d="M10 40 L30 15 L90 15 L120 40 L130 70 L5 70 Z" fill="#94a3b8" />
        <circle cx="35" cy="70" r="15" fill="#475569" />
        <circle cx="95" cy="70" r="15" fill="#475569" />
    </g>
    <!-- Car 2 -->
    <g id="car2" transform="translate(350, 150) scale(0.8)">
        <path d="M10 40 L30 15 L90 15 L120 40 L130 70 L5 70 Z" fill="#94a3b8" />
        <circle cx="35" cy="70" r="15" fill="#475569" />
        <circle cx="95" cy="70" r="15" fill="#475569" />
    </g>
`;

const stepsData = [
    {
        // Step 1: No button added here
        title: "1. Image Classification",
        desc: "The most basic task. The AI simply looks at the whole image and assigns a label to it. It answers: <strong>'What is in this image?'</strong> but doesn't tell us where it is.",
        visual: `
            <div class="relative w-full max-w-[500px]">
                <svg viewBox="0 0 600 350" class="w-full h-auto rounded-lg bg-white shadow-sm border border-slate-200">
                    ${baseScene}
                </svg>
                <div class="absolute -right-4 -top-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-lg animate-bounce">
                    Label: "Cars" (99%)
                </div>
            </div>
        `
    },
    {
        // Step 2: Added Button 1
        title: "2. Object Detection",
        desc: "A step further. The AI identifies what the objects are AND draws a <strong>Bounding Box</strong> around them. It answers: <strong>'What is it, and where is it roughly?'</strong>",
        visual: `
            <div class="w-full flex flex-col items-center">
                <div class="relative w-full max-w-[500px]">
                    <svg viewBox="0 0 600 350" class="w-full h-auto rounded-lg bg-white shadow-sm border border-slate-200">
                        ${baseScene}
                        <!-- Bounding Box 1 -->
                        <rect x="95" y="170" width="140" height="90" fill="none" stroke="#ef4444" stroke-width="4" class="dash-anim" />
                        <text x="95" y="160" fill="#ef4444" font-family="sans-serif" font-weight="bold" font-size="16">Car 0.98</text>

                        <!-- Bounding Box 2 -->
                        <rect x="345" y="145" width="115" height="75" fill="none" stroke="#ef4444" stroke-width="4" class="dash-anim" style="animation-delay: 0.5s;" />
                        <text x="345" y="135" fill="#ef4444" font-family="sans-serif" font-weight="bold" font-size="16">Car 0.95</text>
                    </svg>
                </div>
                <div class="mt-6">
                    <button onclick="window.open('./object_detection.html', '_blank')" class="px-5 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-2">
                        Object Detection Details
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </button>
                </div>
            </div>
        `
    },
    {
        // Step 3: Added Button 2
        title: "3. Semantic Segmentation",
        desc: "Here, the AI classifies <strong>every single pixel</strong> in the image into a category. Notice how both cars share the exact same color. It doesn't differentiate between individual objects of the same class.",
        visual: `
            <div class="w-full flex flex-col items-center">
                <div class="relative w-full max-w-[500px]">
                    <svg viewBox="0 0 600 350" class="w-full h-auto rounded-lg bg-slate-900 shadow-sm border border-slate-200">
                        <!-- Background (Class: Background) -->
                        <rect x="0" y="0" width="600" height="350" fill="#0f172a" />
                        <!-- Road (Class: Road) -->
                        <rect x="0" y="200" width="600" height="100" fill="#475569" opacity="0.8" />

                        <!-- Car 1 (Class: Car) -->
                        <g transform="translate(100, 180)">
                            <path d="M10 40 L30 15 L90 15 L120 40 L130 70 L5 70 Z" fill="#ef4444" opacity="0.9" />
                            <circle cx="35" cy="70" r="15" fill="#ef4444" opacity="0.9" />
                            <circle cx="95" cy="70" r="15" fill="#ef4444" opacity="0.9" />
                        </g>
                        <!-- Car 2 (Class: Car) - SAME COLOR -->
                        <g transform="translate(350, 150) scale(0.8)">
                            <path d="M10 40 L30 15 L90 15 L120 40 L130 70 L5 70 Z" fill="#ef4444" opacity="0.9" />
                            <circle cx="35" cy="70" r="15" fill="#ef4444" opacity="0.9" />
                            <circle cx="95" cy="70" r="15" fill="#ef4444" opacity="0.9" />
                        </g>
                    </svg>
                    <div class="flex gap-4 justify-center mt-4 text-sm font-medium">
                        <span class="flex items-center gap-1"><div class="w-3 h-3 bg-red-500"></div> Class: Car</span>
                        <span class="flex items-center gap-1"><div class="w-3 h-3 bg-slate-600"></div> Class: Road</span>
                    </div>
                </div>
                <div class="mt-6">
                    <button onclick="window.open('./semantic_segmentation.html', '_blank')" class="px-5 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-2">
                        Semantic Segmentation Details
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </button>
                </div>
            </div>
        `
    },
    {
        // Step 4: Added Button 3
        title: "4. Instance Segmentation",
        desc: "The ultimate detail. It classifies pixels <strong>AND</strong> separates individual objects. Notice how the two cars are now different colors, meaning the AI knows they are two distinct entities.",
        visual: `
            <div class="w-full flex flex-col items-center">
                <div class="relative w-full max-w-[500px]">
                    <svg viewBox="0 0 600 350" class="w-full h-auto rounded-lg bg-slate-900 shadow-sm border border-slate-200">
                            <rect x="0" y="0" width="600" height="350" fill="#0f172a" />
                            <rect x="0" y="200" width="600" height="100" fill="#475569" opacity="0.5" />

                        <!-- Car 1 (Instance 1) -->
                        <g transform="translate(100, 180)">
                            <path d="M10 40 L30 15 L90 15 L120 40 L130 70 L5 70 Z" fill="#3b82f6" opacity="0.9" />
                            <circle cx="35" cy="70" r="15" fill="#3b82f6" opacity="0.9" />
                            <circle cx="95" cy="70" r="15" fill="#3b82f6" opacity="0.9" />
                        </g>
                        <!-- Car 2 (Instance 2) - DIFFERENT COLOR -->
                        <g transform="translate(350, 150) scale(0.8)">
                            <path d="M10 40 L30 15 L90 15 L120 40 L130 70 L5 70 Z" fill="#10b981" opacity="0.9" />
                            <circle cx="35" cy="70" r="15" fill="#10b981" opacity="0.9" />
                            <circle cx="95" cy="70" r="15" fill="#10b981" opacity="0.9" />
                        </g>
                    </svg>
                    <div class="flex gap-4 justify-center mt-4 text-sm font-medium">
                        <span class="flex items-center gap-1"><div class="w-3 h-3 bg-blue-500"></div> Car 1</span>
                        <span class="flex items-center gap-1"><div class="w-3 h-3 bg-emerald-500"></div> Car 2</span>
                    </div>
                </div>
                <div class="mt-6">
                    <button onclick="window.open('./instance_segmentation.html', '_blank')" class="px-5 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-2">
                        Instance Segmentation Details
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </button>
                </div>
            </div>
        `
    },
    {
        // Step 5: Added Button 4
        title: "5. Pose Estimation",
        desc: "Instead of boxes or masks, the AI predicts specific <strong>keypoints</strong> on an object (like human joints) to understand posture, movement, or structure.",
        visual: `
            <div class="w-full flex flex-col items-center">
                <div class="relative w-full max-w-[500px] flex justify-center">
                    <svg viewBox="0 0 300 400" class="w-[250px] h-auto rounded-lg bg-white shadow-sm border border-slate-200">
                        <!-- Human silhouette -->
                        <path d="M150 50 C130 50, 130 80, 150 80 C170 80, 170 50, 150 50 Z M120 100 Q150 90 180 100 L200 180 L180 190 L160 130 L160 220 L130 350 L110 350 L140 220 L140 130 L120 190 L100 180 Z" fill="#e2e8f0" />

                        <!-- Connections -->
                        <line x1="150" y1="65" x2="150" y2="110" stroke="#3b82f6" stroke-width="4" />
                        <line x1="150" y1="110" x2="125" y2="115" stroke="#3b82f6" stroke-width="4" />
                        <line x1="150" y1="110" x2="175" y2="115" stroke="#3b82f6" stroke-width="4" />
                        <line x1="125" y1="115" x2="110" y2="160" stroke="#3b82f6" stroke-width="4" />
                        <line x1="175" y1="115" x2="190" y2="160" stroke="#3b82f6" stroke-width="4" />
                        <line x1="150" y1="110" x2="150" y2="210" stroke="#3b82f6" stroke-width="4" />
                        <line x1="150" y1="210" x2="135" y2="280" stroke="#3b82f6" stroke-width="4" />
                        <line x1="150" y1="210" x2="165" y2="280" stroke="#3b82f6" stroke-width="4" />

                        <!-- Keypoints -->
                        <circle cx="150" cy="65" r="6" fill="#ef4444" class="pulse" /> <!-- Head -->
                        <circle cx="150" cy="110" r="6" fill="#ef4444" class="pulse" style="animation-delay: 0.1s" /> <!-- Neck -->
                        <circle cx="125" cy="115" r="6" fill="#ef4444" class="pulse" style="animation-delay: 0.2s" /> <!-- L Shoulder -->
                        <circle cx="175" cy="115" r="6" fill="#ef4444" class="pulse" style="animation-delay: 0.3s" /> <!-- R Shoulder -->
                        <circle cx="110" cy="160" r="6" fill="#ef4444" class="pulse" style="animation-delay: 0.4s" /> <!-- L Elbow -->
                        <circle cx="190" cy="160" r="6" fill="#ef4444" class="pulse" style="animation-delay: 0.5s" /> <!-- R Elbow -->
                        <circle cx="150" cy="210" r="6" fill="#ef4444" class="pulse" style="animation-delay: 0.6s" /> <!-- Hip -->
                        <circle cx="135" cy="280" r="6" fill="#ef4444" class="pulse" style="animation-delay: 0.7s" /> <!-- L Knee -->
                        <circle cx="165" cy="280" r="6" fill="#ef4444" class="pulse" style="animation-delay: 0.8s" /> <!-- R Knee -->
                    </svg>
                </div>
                <div class="mt-6">
                    <button onclick="window.open('./pose_estimation.html', '_blank')" class="px-5 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-2">
                        Pose Estimation Details
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </button>
                </div>
            </div>
        `
    },
    {
        // Step 6: Added Button 5
        title: "6. The Math: Intersection over Union",
        desc: "How does the AI evaluate if its bounding box or segmentation mask is correct? It uses a metric called <strong>IoU (Intersection over Union)</strong>, which calculates the overlap between the prediction and the ground truth.",
        visual: `
            <div class="w-full flex flex-col items-center">
                <div class="relative w-full max-w-[400px] mb-6 flex justify-center h-[180px]">
                    <svg viewBox="0 0 400 200" class="w-full h-full">
                        <!-- Ground Truth (Union Base) -->
                        <rect x="80" y="40" width="160" height="100" fill="#bfdbfe" opacity="0.5" stroke="#3b82f6" stroke-width="2" />
                        <text x="90" y="60" fill="#2563eb" font-size="14" font-weight="bold">Ground Truth</text>

                        <!-- Prediction (Union Base) -->
                        <rect x="140" y="70" width="160" height="100" fill="#fecaca" opacity="0.5" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5" />
                        <text x="210" y="160" fill="#dc2626" font-size="14" font-weight="bold">Prediction</text>

                        <!-- Intersection -->
                        <rect x="140" y="70" width="100" height="70" fill="#c084fc" opacity="0.8" />
                        <text x="145" y="115" fill="#581c87" font-size="14" font-weight="bold">Intersection</text>
                    </svg>
                </div>

                <!-- Equation rendered by MathJax -->
                <div class="bg-white px-8 py-4 rounded-lg shadow-sm border border-slate-200 text-lg w-full text-center">
                    $$ \\text{IoU} = \\frac{\\text{Area of Overlap}}{\\text{Area of Union}} = \\frac{|A \\cap B|}{|A \\cup B|} $$
                </div>
                <p class="text-sm text-slate-500 mt-4 text-center max-w-md">An IoU score of 1.0 means perfect overlap, while 0 means no overlap. An IoU > 0.5 is generally considered a "good" prediction.</p>

                <div class="mt-6">
                    <button onclick="window.open('./intersection_over_union.html', '_blank')" class="px-5 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-2">
                        Intersection over Union Details
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </button>
                </div>
            </div>
        `
    },
    {
        // Step 7: Added PyTorch CNN Tutorial
        title: "7. Building a CNN in PyTorch",
        desc: "At the heart of all these tasks is the <strong>Convolutional Neural Network (CNN)</strong>. Think of a CNN as a tiny magnifying glass scanning over an image to find patterns like edges, textures, and eventually shapes. Here is how you build a basic one using PyTorch in Python!",
        visual: `
            <div class="w-full flex flex-col items-center">
                <div class="w-full max-w-2xl bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden text-left font-mono text-sm sm:text-base border border-slate-700">
                    <!-- Mac-like window header -->
                    <div class="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-black/20">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        <span class="ml-2 text-slate-400 text-xs font-sans">cnn_tutorial.py</span>
                    </div>
                    <!-- Code with basic syntax highlighting -->
                    <div class="p-5 text-slate-300 overflow-x-auto leading-relaxed">
<pre><code><span class="text-pink-400">import</span> torch
<span class="text-pink-400">import</span> torch.nn <span class="text-pink-400">as</span> nn

<span class="text-slate-500 italic"># Think of this as the blueprint for our AI brain</span>
<span class="text-pink-400">class</span> <span class="text-blue-400">SimpleCNN</span>(nn.Module):
<span class="text-pink-400">def</span> <span class="text-yellow-200">__init__</span>(self):
<span class="text-blue-300">super</span>(SimpleCNN, self).__init__()

<span class="text-slate-500 italic"># 1. The 'Magnifying Glass' (Convolution)</span>
<span class="text-slate-500 italic"># Scans image looking for basic patterns (like edges)</span>
self.scan = nn.Conv2d(in_channels=<span class="text-orange-400">3</span>, out_channels=<span class="text-orange-400">16</span>, kernel_size=<span class="text-orange-400">3</span>)

<span class="text-slate-500 italic"># 2. The 'Summarizer' (Pooling)</span>
<span class="text-slate-500 italic"># Shrinks image to keep only the most important parts</span>
self.shrink = nn.MaxPool2d(kernel_size=<span class="text-orange-400">2</span>, stride=<span class="text-orange-400">2</span>)

<span class="text-slate-500 italic"># 3. The 'Decision Maker' (Linear Layer)</span>
<span class="text-slate-500 italic"># Looks at patterns and guesses (e.g., Car vs Background)</span>
self.decide = nn.Linear(<span class="text-orange-400">16</span> * <span class="text-orange-400">13</span> * <span class="text-orange-400">13</span>, <span class="text-orange-400">2</span>)

<span class="text-pink-400">def</span> <span class="text-yellow-200">forward</span>(self, x):
<span class="text-slate-500 italic"># How data flows through the brain</span>
x = torch.relu(self.scan(x)) <span class="text-slate-500 italic"># Scan & activate!</span>
x = self.shrink(x)           <span class="text-slate-500 italic"># Summarize!</span>
x = torch.flatten(x, <span class="text-orange-400">1</span>)      <span class="text-slate-500 italic"># Flatten to 1D list</span>
x = self.decide(x)           <span class="text-slate-500 italic"># Make a decision!</span>
<span class="text-pink-400">return</span> x</code></pre>
                    </div>
                </div>
            </div>
        `
    }
];

let currentStep = 0;

// DOM Elements
const titleEl = document.getElementById('step-title');
const descEl = document.getElementById('step-desc');
const visualEl = document.getElementById('step-visual');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const stepCounter = document.getElementById('step-counter');
const progressBar = document.getElementById('progress-bar');
const dotContainer = document.getElementById('dot-indicators');
const contentContainer = document.getElementById('content-container');

// Initialize dots
function initDots() {
    stepsData.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${idx === 0 ? 'bg-blue-600' : 'bg-slate-300'}`;
        dot.id = `dot-${idx}`;
        dotContainer.appendChild(dot);
    });
}

function updateDots() {
    stepsData.forEach((_, idx) => {
        const dot = document.getElementById(`dot-${idx}`);
        if (idx === currentStep) {
            dot.className = 'w-2.5 h-2.5 rounded-full transition-colors duration-300 bg-blue-600';
        } else {
            dot.className = 'w-2.5 h-2.5 rounded-full transition-colors duration-300 bg-slate-300';
        }
    });
}

// Render function
function renderStep(index) {
    // Start fade out
    contentContainer.classList.remove('fade-in');
    contentContainer.classList.add('fade-out');

    setTimeout(() => {
        // Update content
        titleEl.innerHTML = stepsData[index].title;
        descEl.innerHTML = stepsData[index].desc;
        visualEl.innerHTML = stepsData[index].visual;

        // Trigger MathJax parsing if it's the math step
        if (window.MathJax && index === 5) {
            MathJax.typesetPromise([visualEl]).then(() => {
                console.log('Equation rendered');
            });
        }

        // Update UI state
        stepCounter.innerText = `Step ${index + 1} of ${stepsData.length}`;
        progressBar.style.width = `${(index / (stepsData.length - 1)) * 100}%`;

        btnPrev.disabled = index === 0;

        if (index === stepsData.length - 1) {
            btnNext.innerHTML = 'Finish';
            btnNext.disabled = true;
            btnNext.classList.replace('bg-blue-600', 'bg-emerald-500');
            btnNext.classList.replace('hover:bg-blue-700', 'hover:bg-emerald-600');
        } else {
            btnNext.innerHTML = 'Next Step &rarr;';
            btnNext.disabled = false;
            btnNext.classList.replace('bg-emerald-500', 'bg-blue-600');
            btnNext.classList.replace('hover:bg-emerald-600', 'hover:bg-blue-700');
        }

        updateDots();

        // Fade back in
        contentContainer.classList.remove('fade-out');
        contentContainer.classList.add('fade-in');
    }, 400); // Matches CSS transition time
}

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentStep < stepsData.length - 1) {
        currentStep++;
        renderStep(currentStep);
    }
});

btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep(currentStep);
    }
});

// Start
window.addEventListener('DOMContentLoaded', () => {
    initDots();
    renderStep(currentStep);

    // Initial MathJax trigger just in case
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
});