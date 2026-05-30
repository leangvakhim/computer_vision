// Data structure containing all steps
const steps = [
    {
        title: "1. The AI Toy Box",
        text: `
            <p class="text-lg leading-relaxed mb-4">Imagine you have a giant, messy toy box, and your mom asks you to find your two favorite toy cars. You look inside, spot the cars, and point right at them.</p>
            <p class="text-lg leading-relaxed mb-4">For you, this is super easy! But for a computer, a picture is just a giant jumble of colors. Object Detection is how we teach the computer to play "I Spy," find the toys, and draw a little box around them so we know exactly where they are.</p>
            <p class="text-lg leading-relaxed">Let's look at how the "brain" of the AI (called a <strong>Convolutional Neural Network, or CNN</strong>) does it, step-by-step.</p>
        `,
        visualHtml: `
            <div class="relative w-full aspect-video bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-wrap content-start p-4 gap-4 justify-center items-center text-5xl">
                <div class="p-4 hover:-translate-y-2 transition-transform">🧸</div>
                <div class="p-4 hover:-translate-y-2 transition-transform">📚</div>
                <div class="p-4 hover:-translate-y-2 transition-transform relative group">
                    🚗
                    <div class="absolute inset-0 border-4 border-red-500 rounded opacity-0 group-hover:opacity-100 ai-box transition-opacity"></div>
                </div>
                <div class="p-4 hover:-translate-y-2 transition-transform">⚽</div>
                <div class="p-4 hover:-translate-y-2 transition-transform">🧩</div>
                <div class="p-4 hover:-translate-y-2 transition-transform relative group">
                    🚓
                    <div class="absolute inset-0 border-4 border-red-500 rounded opacity-0 group-hover:opacity-100 ai-box transition-opacity"></div>
                </div>
                <div class="p-4 hover:-translate-y-2 transition-transform">🎸</div>
                <div class="absolute bottom-4 text-sm text-slate-400 font-medium tracking-wider uppercase w-full text-center">Hover over the cars!</div>
            </div>
        `,
        initVisual: null
    },
    {
        title: "2. Seeing the World in Legos (Pixels)",
        text: `
            <p class="text-lg leading-relaxed mb-4">When you look at a picture, you immediately see "cars". The computer doesn't have eyes like ours.</p>
            <p class="text-lg leading-relaxed mb-4">Instead, it sees the picture as thousands of tiny, colored squares, almost like Lego bricks pressed together. These are called <strong>pixels</strong>.</p>
            <p class="text-lg leading-relaxed">To the computer, your picture is just a massive grid of numbers, where each number represents a specific color.</p>
        `,
        visualHtml: `
            <div class="flex flex-col items-center w-full">
                <div class="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">How the AI sees an image</div>
                <div id="pixel-grid" class="grid gap-0 border-2 border-slate-800" style="grid-template-columns: repeat(16, minmax(0, 1fr)); width: 80%; aspect-ratio: 1;">
                    <!-- Pixels generated via JS -->
                </div>
            </div>
        `,
        initVisual: (container) => {
            const grid = container.querySelector('#pixel-grid');
            grid.innerHTML = '';
            // Create a simple pixel art of a car
            const carPattern = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 1, 2, 2, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0,
                0, 0, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 0, 0,
                0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                1, 3, 3, 1, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 1, 1,
                1, 3, 3, 1, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1,
                1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1,
                1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
                0, 1, 1, 4, 4, 1, 1, 1, 1, 1, 4, 4, 1, 1, 0, 0,
                0, 0, 1, 4, 4, 1, 0, 0, 0, 1, 4, 4, 1, 0, 0, 0,
                0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            const colors = ['#f8fafc', '#1e293b', '#60a5fa', '#ef4444', '#334155']; // bg, border, window, body, tire

            carPattern.forEach((val, i) => {
                const div = document.createElement('div');
                // Add some noise to colors to make it look like raw pixels
                if (val === 0) {
                    div.style.backgroundColor = Math.random() > 0.5 ? '#f1f5f9' : '#e2e8f0';
                } else {
                    div.style.backgroundColor = colors[val];
                }
                grid.appendChild(div);
            });
        }
    },
    {
        title: "3. The Magic Magnifying Glass (CNN)",
        text: `
            <p class="text-lg leading-relaxed mb-4">To figure out what these Lego bricks make, the computer uses a "magic magnifying glass" called a <strong>Convolutional Filter</strong>.</p>
            <p class="text-lg leading-relaxed mb-4">This magnifying glass is tiny it only looks at a few pixels at a time and it slides across the whole picture, top to bottom, left to right.</p>
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-blue-900 mt-4">
                <p class="font-bold mb-2">As it slides, it looks for tiny clues:</p>
                <ul class="list-disc pl-5 space-y-1">
                    <li><strong>Clue 1:</strong> "Oh, here is a straight line!"</li>
                    <li><strong>Clue 2:</strong> "Look, here is a curved edge!"</li>
                    <li><strong>Clue 3:</strong> "This part looks like a dark circle!"</li>
                </ul>
            </div>
        `,
        visualHtml: `
            <div class="relative w-full max-w-[280px] aspect-square bg-slate-200 border-2 border-slate-300 rounded overflow-hidden">
                <!-- Grid Background -->
                <div class="absolute inset-0 grid" style="grid-template-columns: repeat(10, 1fr); grid-template-rows: repeat(10, 1fr);">
                    ${Array.from({ length: 100 }).map(() => `<div class="border border-slate-300/50 bg-slate-300"></div>`).join('')}
                </div>

                <!-- Shape to detect (A circle and line) -->
                <div class="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-[12px] border-slate-700 rounded-full"></div>
                <div class="absolute top-1/2 left-0 w-full h-[12px] bg-slate-700"></div>

                <!-- Sliding Window -->
                <div class="absolute top-0 left-0 w-[84px] h-[84px] border-4 border-yellow-400 bg-yellow-400/30 animate-sliding-window shadow-[0_0_15px_rgba(250,204,21,0.5)] z-10 flex items-center justify-center">
                    <i class="ph ph-magnifying-glass text-yellow-600 text-3xl font-bold opacity-70"></i>
                </div>
            </div>
        `,
        initVisual: null
    },
    {
        title: "4. Putting the Puzzle Together",
        text: `
            <p class="text-lg leading-relaxed mb-4">Once the computer finds all the little clues with its magnifying glass, it passes them deeper into its brain to put the puzzle together.</p>
            <p class="text-lg leading-relaxed mb-4">It combines simple shapes into complex objects:</p>
            <div class="space-y-4 font-mono text-sm bg-slate-800 text-green-400 p-5 rounded-lg shadow-inner">
                <div class="flex items-center gap-3">
                    <span class="text-slate-300">Curved edges + Dark circles =</span>
                    <span class="font-bold text-white bg-slate-700 px-2 py-1 rounded">Wheels!</span>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-slate-300">Straight lines + Glass colors =</span>
                    <span class="font-bold text-white bg-slate-700 px-2 py-1 rounded">Windows!</span>
                </div>
                <div class="flex items-center gap-3 border-t border-slate-600 pt-4 mt-2">
                    <span class="text-yellow-400">Wheels + Windows + Metal shape =</span>
                    <span class="font-bold text-white bg-blue-600 px-3 py-1 rounded">A Car! 🚗</span>
                </div>
            </div>
        `,
        visualHtml: `
            <div class="flex flex-col gap-6 w-full max-w-sm">
                <div class="flex justify-between items-center bg-white p-4 rounded-xl shadow border border-slate-200">
                    <div class="flex gap-2">
                        <div class="w-10 h-10 border-4 border-slate-800 rounded-full"></div>
                        <div class="w-10 h-10 bg-slate-800 rounded-full"></div>
                    </div>
                    <i class="ph ph-arrow-right text-2xl text-slate-400"></i>
                    <div class="w-12 h-12 bg-slate-800 rounded-full border-4 border-slate-400 relative">
                        <div class="absolute inset-[4px] border-2 border-slate-600 rounded-full"></div>
                    </div>
                </div>
                <div class="flex justify-between items-center bg-white p-4 rounded-xl shadow border border-slate-200">
                    <div class="flex gap-2">
                        <div class="w-10 h-10 border-t-4 border-l-4 border-slate-800 rounded-tl-lg"></div>
                        <div class="w-10 h-10 bg-blue-200 border-2 border-slate-800"></div>
                    </div>
                    <i class="ph ph-arrow-right text-2xl text-slate-400"></i>
                    <div class="w-16 h-12 bg-blue-200 border-4 border-slate-800 rounded-tl-xl rounded-tr-md"></div>
                </div>
                <div class="flex justify-center mt-2">
                    <i class="ph ph-arrow-down text-3xl text-blue-500 font-bold"></i>
                </div>
                <div class="flex justify-center items-center bg-blue-100 p-6 rounded-xl shadow-md border-2 border-blue-300 text-6xl">
                    🚗
                </div>
            </div>
        `,
        initVisual: null
    },
    {
        title: "5. Drawing the Box (Geometry)",
        text: `
            <p class="text-lg leading-relaxed mb-4">Once the AI thinks it found a car, it spits out four simple numbers to draw a red box around it:</p>
            <ul class="list-disc pl-5 mb-4 text-slate-700 space-y-2">
                <li><strong>$x_c, y_c$</strong>: The center coordinates of the car.</li>
                <li><strong>$w$</strong>: The width of the car.</li>
                <li><strong>$h$</strong>: The height of the car.</li>
            </ul>
            <p class="text-lg leading-relaxed mb-4">To draw the box on screen, we calculate the corners. We cut the width and height in half and add/subtract them from the center point:</p>

            <div class="bg-white p-5 rounded-lg border border-slate-200 shadow-sm mb-4">
                <p class="font-bold text-slate-600 mb-2">Top-Left Corner $(x_{min}, y_{min})$:</p>
                <div class="overflow-x-auto text-center">
                    $ x_{min} = x_c - \\frac{w}{2} \\quad \\text{and} \\quad y_{min} = y_c - \\frac{h}{2} $
                </div>
            </div>

            <div class="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <p class="font-bold text-slate-600 mb-2">Bottom-Right Corner $(x_{max}, y_{max})$:</p>
                <div class="overflow-x-auto text-center">
                    $ x_{max} = x_c + \\frac{w}{2} \\quad \\text{and} \\quad y_{max} = y_c + \\frac{h}{2} $
                </div>
            </div>
        `,
        visualHtml: `
            <div class="relative w-full max-w-[350px] aspect-square bg-white border border-slate-300 rounded-lg shadow-sm">
                <!-- Grid -->
                <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <!-- Bounding Box -->
                <div class="absolute border-2 border-red-500 bg-red-50" style="top: 25%; left: 20%; width: 60%; height: 50%;">
                    <!-- Dimensions -->
                    <div class="absolute -top-6 left-0 w-full text-center text-sm font-bold text-red-600">w (width)</div>
                    <div class="absolute top-0 -right-6 h-full flex items-center text-sm font-bold text-red-600"><span>h</span></div>

                    <!-- Center Point -->
                    <div class="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2 shadow"></div>
                    <div class="absolute top-1/2 left-1/2 translate-x-3 -translate-y-6 text-sm font-bold text-blue-700 bg-white/80 px-1 rounded">(x_c, y_c)</div>

                    <!-- Top Left -->
                    <div class="absolute -top-1.5 -left-1.5 w-3 h-3 bg-red-600 rounded-full"></div>
                    <div class="absolute -top-6 -left-10 text-xs font-bold text-red-700 bg-white/80 px-1 rounded whitespace-nowrap">(x_{min}, y_{min})</div>

                    <!-- Bottom Right -->
                    <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-red-600 rounded-full"></div>
                    <div class="absolute -bottom-6 -right-12 text-xs font-bold text-red-700 bg-white/80 px-1 rounded whitespace-nowrap">(x_{max}, y_{max})</div>
                </div>
            </div>
        `,
        initVisual: (container) => {
            // KaTeX rendering for the text in the visual
            renderMathInElement(container, {
                delimiters: [{ left: '$$', right: '$$', display: false }, { left: '$', right: '$', display: false }, { left: '(', right: ')', display: false }],
                throwOnError: false
            });
        }
    },
    {
        title: "6. The Probability (Sigmoid)",
        text: `
            <p class="text-lg leading-relaxed mb-4">When you see <strong>Car 0.98</strong> above a box, that is the AI's math grade for its own guess! It means the AI is 98% sure.</p>
            <p class="text-lg leading-relaxed mb-4">Inside the neural network, the AI calculates a raw, messy number (let's call it $z$), like 2.34 or -1.5. To turn that messy number into a clean percentage between 0 and 1, it uses the <strong>Sigmoid Function</strong>:</p>

            <div class="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mb-6 text-center text-xl overflow-x-auto">
                $$ S(z) = \\frac{1}{1 + e^{-z}} $$
            </div>

            <p class="text-lg leading-relaxed text-slate-600 italic">Try moving the slider on the right to see how any raw number $z$ gets squished into a beautiful percentage!</p>
        `,
        visualHtml: `
            <div class="w-full max-w-sm flex flex-col gap-6">
                <!-- Graph Container -->
                <div class="relative w-full aspect-[4/3] bg-white border border-slate-300 rounded-lg shadow-sm p-4 flex items-end overflow-hidden">
                    <!-- Axes -->
                    <div class="absolute bottom-4 left-4 right-4 h-0.5 bg-slate-400"></div>
                    <div class="absolute bottom-4 left-1/2 w-0.5 top-4 bg-slate-400"></div>

                    <!-- Sigmoid SVG Curve -->
                    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path id="sigmoid-path" fill="none" stroke="#3b82f6" stroke-width="3" d="M0,90 Q25,90 50,50 T100,10"></path>
                    </svg>

                    <!-- Interactive Point -->
                    <div id="sig-point" class="absolute w-4 h-4 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg transition-all duration-100 ease-out" style="left: 70%; top: 20%;"></div>

                    <!-- Labels -->
                    <div class="absolute top-2 left-4 text-xs font-bold text-slate-500">1.0 (100%)</div>
                    <div class="absolute bottom-0 left-4 text-xs font-bold text-slate-500">0.0 (0%)</div>
                </div>

                <!-- Controls -->
                <div class="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                    <label class="block text-sm font-semibold text-slate-600 mb-2">Raw AI Guess ($$z$$): <span id="z-val" class="text-blue-600">2.0</span></label>
                    <input type="range" id="z-slider" min="-6" max="6" step="0.1" value="2.0" class="w-full mb-4">

                    <div class="flex items-center justify-between border-t border-slate-100 pt-3">
                        <span class="font-medium text-slate-600">Confidence:</span>
                        <span id="s-val" class="font-bold text-xl text-emerald-600 bg-emerald-50 px-3 py-1 rounded">88%</span>
                    </div>
                </div>
            </div>
        `,
        initVisual: (container) => {
            const slider = container.querySelector('#z-slider');
            const zVal = container.querySelector('#z-val');
            const sVal = container.querySelector('#s-val');
            const point = container.querySelector('#sig-point');

            const updateSigmoid = () => {
                const z = parseFloat(slider.value);
                // Math.E
                const s = 1 / (1 + Math.exp(-z));

                zVal.textContent = z.toFixed(1);
                sVal.textContent = (s * 100).toFixed(0) + '%';

                // Map z (-6 to 6) to left % (0 to 100)
                const leftPercent = ((z + 6) / 12) * 100;
                // Map s (0 to 1) to top % (bottom-4 to top-4)
                // In viewBox, Y goes down. 90 is bottom, 10 is top.
                // So topPercent = 90 - (s * 80) roughly mapped to CSS percentages
                const topPercent = 90 - (s * 80);

                point.style.left = `${leftPercent}%`;
                point.style.top = `${topPercent}%`;
            };

            slider.addEventListener('input', updateSigmoid);
            updateSigmoid();

            renderMathInElement(container, {
                delimiters: [{ left: '$$', right: '$$', display: false }], throwOnError: false
            });
        }
    },
    {
        title: "7. Intersection over Union (IoU)",
        text: `
            <p class="text-lg leading-relaxed mb-4">During training, the AI learns to draw the tightest box possible. To grade how well it drew its box compared to the perfect "true" box, it uses <strong>Intersection over Union (IoU)</strong>.</p>

            <div class="bg-white p-5 rounded-lg border border-slate-200 shadow-sm mb-6 text-center overflow-x-auto text-lg">
                $$ \\text{IoU} = \\frac{\\text{Area of Overlap (Intersection)}}{\\text{Total Area (Union)}} $$
            </div>

            <div class="space-y-3">
                <div class="flex items-center gap-3">
                    <div class="w-4 h-4 bg-yellow-400 border border-yellow-600 rounded-sm"></div>
                    <span class="text-slate-700"><strong>Intersection:</strong> The pixels where both boxes overlap.</span>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-4 h-4 bg-slate-200 border border-slate-400 border-dashed rounded-sm"></div>
                    <span class="text-slate-700"><strong>Union:</strong> The total area covered by BOTH boxes combined.</span>
                </div>
                <div class="bg-emerald-50 text-emerald-800 p-3 rounded mt-4 text-sm font-medium border border-emerald-200">
                    An IoU of 1.0 means a perfect match! Anything above 0.5 is usually considered a "good" detection.
                </div>
            </div>
        `,
        visualHtml: `
            <div class="w-full flex flex-col items-center">
                <div class="relative w-64 h-64 bg-white border border-slate-200 rounded shadow-inner mb-6">
                    <!-- Ground Truth (Green) -->
                    <div class="absolute border-4 border-green-500 bg-green-100/50" style="top: 20%; left: 20%; width: 50%; height: 50%;">
                        <span class="absolute -top-6 text-xs font-bold text-green-600 bg-white px-1">True Box</span>
                    </div>

                    <!-- Prediction (Red) -->
                    <div class="absolute border-4 border-red-500 bg-red-100/50" style="top: 35%; left: 30%; width: 55%; height: 45%;">
                        <span class="absolute -bottom-6 right-0 text-xs font-bold text-red-600 bg-white px-1">Predicted</span>
                    </div>

                    <!-- Intersection (Yellow Hash) -->
                    <div class="absolute bg-yellow-400" style="top: 35%; left: 30%; width: 40%; height: 35%; background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px);"></div>
                </div>
                <div class="text-center font-bold text-lg text-slate-700">
                    IoU &approx; <span class="text-blue-600">0.45</span>
                </div>
            </div>
        `,
        initVisual: null
    },
    {
        title: "8. Interactive Geometry Sandbox",
        text: `
            <p class="text-lg leading-relaxed mb-4">Let's put it all together! Here is the actual math happening in real-time.</p>
            <p class="text-lg leading-relaxed mb-4">Adjust the sliders to move the <span class="text-red-600 font-bold">Predicted Box (Red)</span> to match the <span class="text-green-600 font-bold">True Box (Green)</span>.</p>

            <div class="bg-slate-800 text-slate-100 p-5 rounded-lg font-mono text-sm shadow-inner space-y-2">
                <div class="text-green-400 mb-2">/* Real-time Math Output */</div>
                <div>True Box Area: <span id="sb-true-area">20000</span> px²</div>
                <div>Pred Box Area: <span id="sb-pred-area">...</span> px²</div>
                <div class="border-t border-slate-600 my-2 pt-2"></div>
                <div>Intersection: <span id="sb-inter" class="text-yellow-400">...</span> px²</div>
                <div>Union Area: <span id="sb-union">...</span> px²</div>
                <div class="border-t border-slate-600 my-2 pt-2"></div>
                <div class="text-lg">IoU = <span id="sb-iou" class="font-bold text-blue-400">...</span></div>
            </div>
        `,
        visualHtml: `
            <div class="w-full flex flex-col gap-4">
                <!-- Canvas Area -->
                <div id="sandbox-container" class="relative w-full aspect-square bg-slate-50 border-2 border-slate-300 rounded-lg overflow-hidden max-w-[400px] mx-auto shadow-inner">
                    <!-- Background Grid -->
                    <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>

                    <!-- True Box -->
                    <div id="box-true" class="absolute border-[3px] border-green-500 bg-green-500/10 pointer-events-none" style="top: 100px; left: 100px; width: 150px; height: 100px;"></div>

                    <!-- Overlap Box -->
                    <div id="box-overlap" class="absolute bg-yellow-400/60 pointer-events-none z-10 transition-all duration-75"></div>

                    <!-- Predicted Box -->
                    <div id="box-pred" class="absolute border-[3px] border-dashed border-red-500 bg-red-500/20 pointer-events-none z-20 transition-all duration-75 flex items-center justify-center">
                        <div class="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                </div>

                <!-- Controls -->
                <div class="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                    <div>
                        <label class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Center X: <span id="val-x">200</span></label>
                        <input type="range" id="in-x" min="0" max="400" value="250" class="w-full">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Center Y: <span id="val-y">200</span></label>
                        <input type="range" id="in-y" min="0" max="400" value="220" class="w-full">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Width: <span id="val-w">100</span></label>
                        <input type="range" id="in-w" min="20" max="300" value="120" class="w-full">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Height: <span id="val-h">100</span></label>
                        <input type="range" id="in-h" min="20" max="300" value="140" class="w-full">
                    </div>
                </div>
            </div>
        `,
        initVisual: (container) => {
            const canvasSize = 400; // Assuming a 400x400 logical coordinate system

            // True Box constants
            const tX = 100, tY = 100, tW = 150, tH = 100;
            const tRight = tX + tW;
            const tBottom = tY + tH;
            const tArea = tW * tH;

            // Elements
            const boxPred = container.querySelector('#box-pred');
            const boxOverlap = container.querySelector('#box-overlap');

            const inX = container.querySelector('#in-x');
            const inY = container.querySelector('#in-y');
            const inW = container.querySelector('#in-w');
            const inH = container.querySelector('#in-h');

            const valX = container.querySelector('#val-x');
            const valY = container.querySelector('#val-y');
            const valW = container.querySelector('#val-w');
            const valH = container.querySelector('#val-h');

            // Output DOM elements (in text panel)
            // Note: Since text panel is rendered separately, we need to search document
            const getEl = (id) => document.getElementById(id);

            const updateSandbox = () => {
                const xc = parseInt(inX.value);
                const yc = parseInt(inY.value);
                const w = parseInt(inW.value);
                const h = parseInt(inH.value);

                // Update Labels
                valX.textContent = xc; valY.textContent = yc;
                valW.textContent = w; valH.textContent = h;

                // Calculate Pred Top Left
                const pX = xc - w / 2;
                const pY = yc - h / 2;
                const pRight = pX + w;
                const pBottom = pY + h;
                const pArea = w * h;

                // Visual Update Pred Box (using % for responsive scaling)
                boxPred.style.left = `${(pX / canvasSize) * 100}%`;
                boxPred.style.top = `${(pY / canvasSize) * 100}%`;
                boxPred.style.width = `${(w / canvasSize) * 100}%`;
                boxPred.style.height = `${(h / canvasSize) * 100}%`;

                // Calculate Overlap
                const oLeft = Math.max(tX, pX);
                const oRight = Math.min(tRight, pRight);
                const oTop = Math.max(tY, pY);
                const oBottom = Math.min(tBottom, pBottom);

                let interArea = 0;

                if (oRight > oLeft && oBottom > oTop) {
                    const oW = oRight - oLeft;
                    const oH = oBottom - oTop;
                    interArea = oW * oH;

                    boxOverlap.style.display = 'block';
                    boxOverlap.style.left = `${(oLeft / canvasSize) * 100}%`;
                    boxOverlap.style.top = `${(oTop / canvasSize) * 100}%`;
                    boxOverlap.style.width = `${(oW / canvasSize) * 100}%`;
                    boxOverlap.style.height = `${(oH / canvasSize) * 100}%`;
                } else {
                    boxOverlap.style.display = 'none';
                }

                // Math
                const unionArea = tArea + pArea - interArea;
                const iou = unionArea === 0 ? 0 : interArea / unionArea;

                // Update Text Outputs safely
                const elTrue = getEl('sb-true-area');
                const elPred = getEl('sb-pred-area');
                const elInter = getEl('sb-inter');
                const elUnion = getEl('sb-union');
                const elIou = getEl('sb-iou');

                if (elTrue) elTrue.textContent = tArea;
                if (elPred) elPred.textContent = pArea;
                if (elInter) elInter.textContent = interArea;
                if (elUnion) elUnion.textContent = unionArea;

                if (elIou) {
                    elIou.textContent = iou.toFixed(3);
                    // Color code IoU
                    elIou.className = `font-bold text-lg ${iou > 0.8 ? 'text-green-400' : iou > 0.4 ? 'text-yellow-400' : 'text-red-400'}`;
                }
            };

            [inX, inY, inW, inH].forEach(input => input.addEventListener('input', updateSandbox));

            // Initial Call (wait a tick for DOM rendering of text panel)
            setTimeout(updateSandbox, 50);
        }
    }
];

let currentStep = 0;

// DOM Elements
const textContent = document.getElementById('text-content');
const visualContent = document.getElementById('visual-content');
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const stepCounter = document.getElementById('step-counter');
const progressDots = document.getElementById('progress-dots');

// Initialize Progress Dots
steps.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-blue-600' : 'bg-slate-200'}`;
    dot.id = `dot-${index}`;
    progressDots.appendChild(dot);
});

function updateUI() {
    const step = steps[currentStep];

    // 1. Trigger fade transition
    textContent.classList.add('opacity-0', '-translate-y-2');
    visualContent.classList.add('opacity-0', 'translate-y-2');

    setTimeout(() => {
        // 2. Update Content
        textContent.innerHTML = `
            <h2 class="text-3xl font-extrabold text-slate-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                ${step.title}
            </h2>
            <div class="prose prose-slate max-w-none">
                ${step.text}
            </div>
        `;

        visualContent.innerHTML = step.visualHtml;

        // 3. Render Math using KaTeX
        renderMathInElement(textContent, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true }
            ],
            throwOnError: false
        });

        // 4. Initialize Interactive visual (if any)
        if (step.initVisual) {
            step.initVisual(visualContent);
        }

        // 5. Update Navigation State
        btnBack.disabled = currentStep === 0;

        if (currentStep === steps.length - 1) {
            btnNext.innerHTML = 'Finish <i class="ph ph-check-circle font-bold"></i>';
            btnNext.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            btnNext.classList.add('bg-emerald-600', 'hover:bg-emerald-700', 'shadow-emerald-200');
        } else {
            btnNext.innerHTML = 'Next <i class="ph ph-arrow-right font-bold"></i>';
            btnNext.classList.add('bg-blue-600', 'hover:bg-blue-700');
            btnNext.classList.remove('bg-emerald-600', 'hover:bg-emerald-700', 'shadow-emerald-200');
        }

        stepCounter.textContent = `STEP ${currentStep + 1} OF ${steps.length}`;

        // 6. Update Progress Dots
        steps.forEach((_, index) => {
            const dot = document.getElementById(`dot-${index}`);
            if (index === currentStep) {
                dot.className = 'w-3 h-3 rounded-full bg-blue-600 shadow ring-2 ring-blue-200 transition-all duration-300';
            } else if (index < currentStep) {
                dot.className = 'w-2.5 h-2.5 rounded-full bg-blue-400 transition-all duration-300';
            } else {
                dot.className = 'w-2.5 h-2.5 rounded-full bg-slate-200 transition-all duration-300';
            }
        });

        // 7. Fade In
        textContent.classList.remove('opacity-0', '-translate-y-2');
        visualContent.classList.remove('opacity-0', 'translate-y-2');
        textContent.classList.add('fade-transition');
        visualContent.classList.add('fade-transition');

    }, 200); // Wait for fade out
}

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    } else {
        // If finish is clicked, just reset or show a message
        // alert("You've completed the Object Detection explainer! Great job learning about AI.");
        // currentStep = 0;
        // updateUI();
    }
});

btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

// Initialize First Step
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});