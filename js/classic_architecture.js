// <!-- Consolidated JavaScript -->
// Data for each step
const steps = [
    {
        title: "1. The Foundation: What is a CNN?",
        desc: "Convolutional Neural Networks (CNNs) are the backbone of Computer Vision. Instead of looking at an image pixel by pixel in isolation, CNNs slide 'filters' over the image to detect patterns like edges, textures, and eventually complex objects.",
        visual: `
            <div class="flex items-center text-center space-x-2 sm:space-x-4 w-full justify-center">
                <div class="flex flex-col items-center">
                    <div class="w-20 h-20 bg-emerald-100 border-2 border-emerald-300 rounded-lg shadow-sm flex items-center justify-center text-emerald-700 font-bold">Image</div>
                </div>
                <div class="conn-line"></div>
                <div class="flex flex-col items-center group">
                    <div class="w-24 h-24 bg-indigo-100 border-2 border-indigo-300 rounded-lg shadow-sm flex items-center justify-center text-indigo-700 font-bold p-2">Feature<br>Extraction<br>(Conv + Pool)</div>
                </div>
                <div class="conn-line"></div>
                <div class="flex flex-col items-center">
                    <div class="w-20 h-20 bg-rose-100 border-2 border-rose-300 rounded-lg shadow-sm flex items-center justify-center text-rose-700 font-bold p-2">Classify<br>(FC)</div>
                </div>
                <div class="conn-line"></div>
                <div class="flex flex-col items-center">
                    <div class="w-16 h-16 bg-slate-800 border-2 border-slate-900 rounded-full shadow-sm flex items-center justify-center text-white font-bold text-sm">Cat!</div>
                </div>
            </div>
        `,
        renderMath: false
        // No actionUrl for Step 1
    },
    {
        title: "2. LeNet-5 (1998)",
        desc: "Designed by Yann LeCun, LeNet-5 was the pioneering architecture. It was successfully used by banks to recognize handwritten numbers on checks. It established the standard pattern: Convolution ➔ Pooling ➔ Fully Connected.",
        visual: `
            <div class="flex items-center justify-center w-full space-x-1 sm:space-x-2 text-xs sm:text-sm font-semibold">
                <div class="px-3 py-8 bg-gray-200 text-gray-700 rounded-md border border-gray-300">Input<br>32x32</div>
                <div class="conn-line w-4 sm:w-8"></div>
                <div class="px-3 py-6 bg-blue-100 text-blue-700 rounded-md border border-blue-300">Conv1<br>5x5</div>
                <div class="px-3 py-4 bg-orange-100 text-orange-700 rounded-md border border-orange-300">AvgPool</div>
                <div class="conn-line w-4 sm:w-8"></div>
                <div class="px-3 py-6 bg-blue-100 text-blue-700 rounded-md border border-blue-300">Conv2<br>5x5</div>
                <div class="px-3 py-4 bg-orange-100 text-orange-700 rounded-md border border-orange-300">AvgPool</div>
                <div class="conn-line w-4 sm:w-8"></div>
                <div class="px-3 py-8 bg-purple-100 text-purple-700 rounded-md border border-purple-300">FC Layers</div>
            </div>
            <div class="absolute bottom-4 text-slate-400 text-sm font-medium">Key trait: Average Pooling and Tanh Activations</div>
        `,
        renderMath: false,
        actionUrl: "./lenet_5.html" // Target for Step 2
    },
    {
        title: "3. AlexNet (2012)",
        desc: "The breakthrough that sparked the Deep Learning boom. AlexNet won the ImageNet competition by a massive margin. It was deeper, utilized GPUs for training, and crucially, introduced the <strong>ReLU</strong> activation function to solve vanishing gradients.",
        visual: `
            <div class="flex items-center justify-center w-full space-x-2 text-sm font-semibold relative">
                <!-- Stream 1 -->
                <div class="flex flex-col space-y-2">
                    <div class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded border border-indigo-300">Conv1 + ReLU</div>
                    <div class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded border border-indigo-300">Conv2 + ReLU</div>
                </div>
                <div class="conn-line"></div>
                <div class="px-4 py-8 bg-indigo-200 text-indigo-800 rounded-lg border border-indigo-400 shadow-sm text-center">3x Conv<br>Layers<br>+ ReLU</div>
                <div class="conn-line"></div>
                <div class="px-4 py-8 bg-purple-100 text-purple-700 rounded-lg border border-purple-300 shadow-sm text-center">3x FC<br>Layers<br>+ Dropout</div>
            </div>
            <div class="absolute bottom-0 text-slate-400 text-sm font-medium">Key trait: ReLU Activation & Dropout for Regularization</div>
        `,
        renderMath: false,
        actionUrl: "./alexnet.html" // Target for Step 3
    },
    {
        title: "4. VGG-16 (2014)",
        desc: "VGG proved that 'Deeper is Better'. Instead of using large convolutional filters (like 11x11 in AlexNet), VGG used multiple stacked, very small 3x3 filters. This made the network architecture highly uniform and simple, but computationally heavy.",
        visual: `
            <div class="flex items-end justify-center w-full space-x-3 text-xs font-semibold">
                <div class="flex flex-col space-y-1 items-center">
                    <div class="w-12 h-6 bg-blue-100 border border-blue-300 rounded"></div>
                    <div class="w-12 h-6 bg-blue-100 border border-blue-300 rounded"></div>
                    <div class="w-12 h-4 bg-orange-100 border border-orange-300 rounded text-[10px] text-center">Pool</div>
                    <div class="mt-2 text-slate-500">Block 1</div>
                </div>
                <div class="flex flex-col space-y-1 items-center">
                    <div class="w-12 h-8 bg-blue-200 border border-blue-400 rounded"></div>
                    <div class="w-12 h-8 bg-blue-200 border border-blue-400 rounded"></div>
                    <div class="w-12 h-4 bg-orange-100 border border-orange-300 rounded text-[10px] text-center">Pool</div>
                    <div class="mt-2 text-slate-500">Block 2</div>
                </div>
                <div class="flex flex-col space-y-1 items-center">
                    <div class="w-12 h-10 bg-blue-300 border border-blue-500 rounded"></div>
                    <div class="w-12 h-10 bg-blue-300 border border-blue-500 rounded"></div>
                    <div class="w-12 h-10 bg-blue-300 border border-blue-500 rounded"></div>
                    <div class="w-12 h-4 bg-orange-100 border border-orange-300 rounded text-[10px] text-center">Pool</div>
                    <div class="mt-2 text-slate-500">Block 3</div>
                </div>
                <div class="flex flex-col space-y-1 items-center">
                    <div class="w-12 h-12 bg-blue-400 border border-blue-600 rounded"></div>
                    <div class="w-12 h-12 bg-blue-400 border border-blue-600 rounded"></div>
                    <div class="w-12 h-12 bg-blue-400 border border-blue-600 rounded"></div>
                    <div class="w-12 h-4 bg-orange-100 border border-orange-300 rounded text-[10px] text-center">Pool</div>
                    <div class="mt-2 text-slate-500">Block 4</div>
                </div>
            </div>
            <div class="absolute top-4 right-4 text-slate-400 text-sm font-medium">Uniform 3x3 Convolutions</div>
        `,
        renderMath: false,
        actionUrl: "./vgg_16.html" // Target for Step 4
    },
    {
        title: "5. ResNet (2015)",
        desc: "As networks grew extremely deep (e.g., 152 layers), they stopped learning due to the 'Vanishing Gradient Problem'. ResNet solved this brilliantly by introducing <strong>Residual Blocks (Skip Connections)</strong>, allowing information to bypass layers directly.",
        visual: `
            <div class="flex flex-col items-center justify-center w-full relative pl-12">
                <div class="text-slate-500 mb-2 font-medium">Input (x)</div>
                <div class="w-1 h-6 bg-slate-300"></div>

                <div class="relative">
                    <!-- Skip Connection Graphic -->
                    <div class="skip-connection">
                        <div class="skip-arrowhead"></div>
                    </div>

                    <div class="flex flex-col space-y-3 relative z-10">
                        <div class="w-40 py-3 bg-indigo-50 border-2 border-indigo-200 rounded-lg text-center font-semibold text-indigo-800 shadow-sm">Weight Layer<br><span class="text-xs font-normal">Conv + BatchNorm</span></div>
                        <div class="w-40 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-center text-emerald-700 text-sm">ReLU</div>
                        <div class="w-40 py-3 bg-indigo-50 border-2 border-indigo-200 rounded-lg text-center font-semibold text-indigo-800 shadow-sm">Weight Layer<br><span class="text-xs font-normal">Conv + BatchNorm</span></div>
                    </div>
                </div>

                <div class="w-1 h-6 bg-slate-300 relative z-10 mt-3"></div>
                <div class="w-12 h-12 rounded-full border-2 border-slate-300 flex items-center justify-center text-xl font-bold text-slate-600 bg-white relative z-10">+</div>
                <div class="w-1 h-6 bg-slate-300 relative z-10"></div>
                <div class="w-40 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-center text-emerald-700 text-sm relative z-10">ReLU</div>
                <div class="text-slate-500 mt-2 font-medium text-center">Output<br><span class="text-sm text-indigo-500">F(x) + x</span></div>
            </div>
        `,
        renderMath: false,
        actionUrl: "./resnet.html" // Target for Step 5
    },
    {
        title: "6. The Mathematical Core",
        desc: "Let's uncover the equations that power these classic architectures. These simple formulas are applied millions of times per second during training and inference.",
        visual: `
            <div class="flex flex-col space-y-6 w-full max-w-2xl">

                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center sm:space-x-6">
                    <div class="w-full sm:w-1/3 text-slate-700 font-semibold border-b sm:border-b-0 sm:border-r border-slate-200 pb-2 sm:pb-0 mb-3 sm:mb-0">
                        1. Convolution<br><span class="text-xs text-slate-400 font-normal">(LeNet & beyond)</span>
                    </div>
                    <div class="w-full sm:w-2/3 text-center overflow-x-auto" id="math-conv"></div>
                </div>

                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center sm:space-x-6">
                    <div class="w-full sm:w-1/3 text-slate-700 font-semibold border-b sm:border-b-0 sm:border-r border-slate-200 pb-2 sm:pb-0 mb-3 sm:mb-0">
                        2. ReLU Activation<br><span class="text-xs text-slate-400 font-normal">(AlexNet & beyond)</span>
                    </div>
                    <div class="w-full sm:w-2/3 text-center overflow-x-auto" id="math-relu"></div>
                </div>

                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center sm:space-x-6">
                    <div class="w-full sm:w-1/3 text-slate-700 font-semibold border-b sm:border-b-0 sm:border-r border-slate-200 pb-2 sm:pb-0 mb-3 sm:mb-0">
                        3. Residual Block<br><span class="text-xs text-slate-400 font-normal">(ResNet)</span>
                    </div>
                    <div class="w-full sm:w-2/3 text-center overflow-x-auto" id="math-res"></div>
                </div>

            </div>
        `,
        renderMath: true
        // No actionUrl for Step 6
    },
    {
        title: "7. Building with PyTorch",
        desc: "Let's translate these concepts into real code! Here is a simple CNN written using the <strong>PyTorch</strong> library. We define a class that inherits from PyTorch's module, map out our layers in the <code>__init__</code> function, and define how data flows through them in the <code>forward</code> function.",
        visual: `
            <div class="w-full max-w-2xl bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden border border-slate-700 text-left relative group">
                <!-- Mac-like Window Header -->
                <div class="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-slate-700 space-x-2">
                    <div class="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span class="ml-3 text-xs text-slate-400 font-mono tracking-wider">simple_cnn.py</span>
                </div>

                <!-- Code Body (Mock Syntax Highlighting) -->
                <div class="p-6 text-xs sm:text-sm font-mono text-slate-300 overflow-x-auto leading-relaxed">
                    <div class="mb-3"><span class="text-pink-400">import</span> torch.nn <span class="text-pink-400">as</span> nn</div>

                    <div class="text-blue-400 mb-1">class <span class="text-yellow-300">SimpleCNN</span><span class="text-slate-300">(nn.Module):</span></div>
                    <div class="pl-4 sm:pl-8">
                        <div class="text-blue-400">def <span class="text-yellow-300">__init__</span><span class="text-slate-300">(self):</span></div>
                        <div class="pl-4 sm:pl-8 text-slate-300">super().__init__()</div>

                        <div class="pl-4 sm:pl-8 mt-3 text-slate-500 italic"># 1. Convolution (Extract features like LeNet)</div>
                        <div class="pl-4 sm:pl-8 text-slate-300">self.conv = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3)</div>

                        <div class="pl-4 sm:pl-8 mt-3 text-slate-500 italic"># 2. Activation (Solve vanishing gradients like AlexNet)</div>
                        <div class="pl-4 sm:pl-8 text-slate-300">self.relu = nn.ReLU()</div>

                        <div class="pl-4 sm:pl-8 mt-3 text-slate-500 italic"># 3. Fully Connected (Make the final classification)</div>
                        <div class="pl-4 sm:pl-8 text-slate-300 mb-3">self.fc = nn.Linear(in_features=16*30*30, out_features=10)</div>
                    </div>

                    <div class="pl-4 sm:pl-8 text-blue-400">def <span class="text-yellow-300">forward</span><span class="text-slate-300">(self, x):</span></div>
                    <div class="pl-8 sm:pl-16 text-slate-500 italic"># Define the forward pass: how data flows</div>
                    <div class="pl-8 sm:pl-16 text-slate-300">x = self.conv(x)</div>
                    <div class="pl-8 sm:pl-16 text-slate-300">x = self.relu(x)</div>
                    <div class="pl-8 sm:pl-16 text-slate-300">x = x.view(x.size(0), -1) <span class="text-slate-500 italic"># Flatten for FC layer</span></div>
                    <div class="pl-8 sm:pl-16 text-purple-400">return <span class="text-slate-300">self.fc(x)</span></div>
                </div>
            </div>
        `,
        renderMath: false
        // No actionUrl for Step 7
    }
];

let currentStep = 0;

// DOM Elements
const titleEl = document.getElementById('step-title');
const descEl = document.getElementById('step-desc');
const visualEl = document.getElementById('step-visual');
const actionEl = document.getElementById('step-action');
const containerEl = document.getElementById('step-container');
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const stepCounter = document.getElementById('step-counter');
const progressDots = document.getElementById('progress-dots');

// Initialize App
function init() {
    // Create progress dots
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-indigo-600' : 'bg-slate-200'}`;
        dot.id = `dot-${index}`;
        progressDots.appendChild(dot);
    });

    updateUI();

    // Event Listeners
    btnNext.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            transitionStep(currentStep + 1);
        }
    });

    btnBack.addEventListener('click', () => {
        if (currentStep > 0) {
            transitionStep(currentStep - 1);
        }
    });
}

function transitionStep(newStep) {
    // Fade Out
    containerEl.classList.remove('fade-in');
    containerEl.classList.add('fade-out');

    setTimeout(() => {
        currentStep = newStep;
        updateUI();

        // Fade In
        containerEl.classList.remove('fade-out');
        containerEl.classList.add('fade-in');
    }, 300); // Wait for fade out duration
}

function updateUI() {
    const stepData = steps[currentStep];

    // Update Texts & Visuals
    titleEl.innerHTML = stepData.title;
    descEl.innerHTML = stepData.desc;
    visualEl.innerHTML = stepData.visual;

    // Handle the Dynamic Action Button (Steps 2 to 5)
    if (stepData.actionUrl) {
        actionEl.innerHTML = `
            <button onclick="window.open('${stepData.actionUrl}', '_blank')"
                    class="px-5 py-2.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm inline-flex items-center shadow-sm">
                Open Detailed View
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
            </button>
        `;
        actionEl.style.display = 'block';
    } else {
        actionEl.innerHTML = '';
        actionEl.style.display = 'none';
    }

    // Render Math if required for the current step
    if (stepData.renderMath) {
        // Ensure DOM is updated before rendering math
        setTimeout(() => {
            katex.render(String.raw`(I * K)(i, j) = \sum_m \sum_n I(i+m, j+n) K(m, n)`, document.getElementById('math-conv'), {
                throwOnError: false, displayMode: true
            });
            katex.render(String.raw`f(x) = \max(0, x)`, document.getElementById('math-relu'), {
                throwOnError: false, displayMode: true
            });
            katex.render(String.raw`y = \mathcal{F}(x, \{W_i\}) + x`, document.getElementById('math-res'), {
                throwOnError: false, displayMode: true
            });
        }, 10);
    }

    // Update Controls
    stepCounter.innerText = `Step ${currentStep + 1} of ${steps.length}`;
    btnBack.disabled = currentStep === 0;

    if (currentStep === steps.length - 1) {
        btnNext.disabled = true;
        btnNext.innerText = "Finish";
    } else {
        btnNext.disabled = false;
        btnNext.innerText = "Next Step →";
    }

    // Update Dots
    steps.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index === currentStep) {
            dot.classList.replace('bg-slate-200', 'bg-indigo-600');
            dot.classList.replace('bg-indigo-300', 'bg-indigo-600'); // in case it was a completed step
        } else if (index < currentStep) {
            dot.classList.replace('bg-slate-200', 'bg-indigo-300');
            dot.classList.replace('bg-indigo-600', 'bg-indigo-300');
        } else {
            dot.classList.replace('bg-indigo-600', 'bg-slate-200');
            dot.classList.replace('bg-indigo-300', 'bg-slate-200');
        }
    });
}

// Run on load
window.addEventListener('DOMContentLoaded', init);