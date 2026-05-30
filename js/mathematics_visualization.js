// --- GAME LOGIC FOR STEP 11 ---
let gameW = 4; // Starting point on the slope
let gameHistory = [gameW];

function initGame() {
    const slider = document.getElementById('lr-slider');
    const display = document.getElementById('lr-value');
    if (slider && display) {
        slider.addEventListener('input', (e) => {
            display.innerText = parseFloat(e.target.value).toFixed(2);
        });
    }
    resetGame();
}

function resetGame() {
    gameW = 4;
    gameHistory = [gameW];
    drawGame();
}

function takeStep() {
    const lr = parseFloat(document.getElementById('lr-slider').value);
    // Gradient of w^2 is 2*w
    const gradient = 2 * gameW;
    gameW = gameW - (lr * gradient);

    // Cap to prevent infinite values from breaking canvas drawing
    if (gameW > 100) gameW = 100;
    if (gameW < -100) gameW = -100;

    gameHistory.push(gameW);
    drawGame();
}

function drawGame() {
    const canvas = document.getElementById('lossCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Mapping constraints for drawing (-5 to 5 on X axis, 0 to 25 on Y axis)
    const mapX = (w) => 20 + ((w + 5) / 10) * (width - 40);
    const mapY = (y) => height - 20 - (y / 25) * (height - 40);

    // Draw Parabola (The Valley/Loss Landscape)
    ctx.beginPath();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    for (let i = -5; i <= 5; i += 0.1) {
        const x = mapX(i);
        const y = mapY(i * i);
        if (i === -5) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw dashed lines mapping history
    ctx.beginPath();
    ctx.strokeStyle = '#7DBF4B';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    for (let i = 0; i < gameHistory.length - 1; i++) {
        ctx.moveTo(mapX(gameHistory[i]), mapY(gameHistory[i] * gameHistory[i]));
        ctx.lineTo(mapX(gameHistory[i + 1]), mapY(gameHistory[i + 1] * gameHistory[i + 1]));
    }
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // Draw points at each step
    for (let i = 0; i < gameHistory.length; i++) {
        const isLast = (i === gameHistory.length - 1);
        ctx.beginPath();
        ctx.arc(mapX(gameHistory[i]), mapY(gameHistory[i] * gameHistory[i]), isLast ? 7 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isLast ? '#ef4444' : '#cbd5e1';
        ctx.fill();

        if (isLast) {
            ctx.strokeStyle = '#991b1b';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
}
// ------------------------------

// Content Data
const steps = [
    {
        icon: "fa-solid fa-gem text-yellow-500",
        title: "1. The Weight Update Rule: The Blindfolded Treasure Hunter",
        content: `
            <p class="mb-4 text-lg">Imagine you are a treasure hunter looking for a magical chest of gold. The catch? The chest is at the very bottom of a deep, dark valley, and you are wearing a blindfold. You can only feel the ground with your feet to figure out which way is downhill.</p>
            <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-5 shadow-inner">
                <ul class="space-y-3">
                    <li><strong class="text-yellow-700">$W$ (Weight):</strong> Your current spot on the mountain.</li>
                    <li><strong class="text-yellow-700">$\\nabla L$ (Gradient):</strong> How steep the ground feels under your feet (the slope).</li>
                    <li><strong class="text-yellow-700">$\\alpha$ (Learning Rate):</strong> How big of a step you take.</li>
                </ul>
            </div>
        `
    },
    {
        icon: "fa-solid fa-calculator text-blue-500",
        title: "2. Math: The Treasure Hunter's Move",
        content: `
            <p class="mb-4 text-lg">The equation is your instruction manual for moving:</p>
            <div class="text-2xl text-center my-6 p-4 bg-white rounded-xl shadow border border-slate-200">
                $$W_{new} = W_{old} - \\alpha \\nabla L(W_{old})$$
            </div>
            <h3 class="font-bold text-lg mt-4 mb-2">Step-by-Step Example:</h3>
            <p class="mb-2">Let's pretend your map is on a giant number line.</p>
            <ul class="list-disc pl-6 mb-4 space-y-1">
                <li><strong>Your current spot ($W_{old}$):</strong> You are standing at position 10.</li>
                <li><strong>The steepness ($\\nabla L$):</strong> Your foot feels a slope of 2.</li>
                <li><strong>Your step size ($\\alpha$):</strong> You decide to take a careful step of size 1.</li>
            </ul>
            <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <p>$$W_{new} = 10 - (1 \\times 2)$$</p>
                <p>$$W_{new} = 10 - 2$$</p>
                <p>$$W_{new} = 8$$</p>
            </div>
            <p class="mt-4 font-semibold text-green-700"><i class="fa-solid fa-check-circle"></i> Result: You moved from position 10 down to position 8. You are getting closer to the treasure!</p>
        `
    },
    {
        icon: "fa-solid fa-robot text-teal-500",
        title: "3. Transfer Learning (Freezing): The Lego Robot",
        content: `
            <p class="mb-4 text-lg">Imagine you just bought a super cool, fully-built Lego robot body from the store. A master builder put it together perfectly. However, it didn't come with a head. You have to build the head yourself and attach it.</p>
            <div class="bg-teal-50 border border-teal-200 rounded-xl p-5 shadow-inner">
                <ul class="space-y-3">
                    <li><strong class="text-teal-700">$W_{base}$ (Base Layers):</strong> Is the perfect Lego body. You want to "freeze" it so you don't accidentally break it.</li>
                    <li><strong class="text-teal-700">$W_{head}$ (Head Layers):</strong> Is the new Lego head you are building from scratch.</li>
                </ul>
            </div>
        `
    },
    {
        icon: "fa-solid fa-snowflake text-sky-400",
        title: "4. Math: The Frozen Lego Body",
        content: `
            <p class="mb-4 text-lg">The equation says that for the frozen body, we force the steepness (gradient) to be zero so it never moves or changes:</p>
            <div class="text-2xl text-center my-6 p-4 bg-white rounded-xl shadow border border-slate-200">
                $$\\nabla L(W_{base}) = 0$$
            </div>
            <h3 class="font-bold text-lg mt-4 mb-2">Step-by-Step Example:</h3>
            <ul class="list-disc pl-6 mb-4 space-y-1">
                <li><strong>The Lego Body ($W_{base}$):</strong> Perfection score is 100.</li>
                <li><strong>The change ($\\nabla L$):</strong> Because it is frozen, we force it to be 0.</li>
                <li><strong>Step size ($\\alpha$):</strong> Still 1.</li>
            </ul>
            <div class="bg-sky-50 p-4 rounded-xl border border-sky-200">
                <p>$$W_{new\\_base} = 100 - (1 \\times 0)$$</p>
                <p>$$W_{new\\_base} = 100 - 0 = 100$$</p>
            </div>
            <p class="mt-4 font-semibold text-slate-700"><i class="fa-solid fa-lock"></i> It stays perfectly unchanged! Meanwhile, you update the head normally using the treasure hunter math so it gets better.</p>
        `
    },
    {
        icon: "fa-solid fa-paint-brush text-purple-500",
        title: "5. Fine-Tuning: Polishing vs. Painting",
        content: `
            <p class="mb-4 text-lg">Now, imagine the Lego robot body isn't 100% perfect. It just needs a tiny bit of dusting to look shiny. You wouldn't use a giant hammer to dust it; you would use a tiny, gentle feather duster. But for the head that you are building from scratch, you need regular Lego bricks.</p>
            <div class="bg-purple-50 border border-purple-200 rounded-xl p-5 shadow-inner mb-4">
                <ul class="space-y-3">
                    <li><strong class="text-purple-700">$\\alpha_{base}$ (Base Learning Rate):</strong> The tiny feather duster (a very small step).</li>
                    <li><strong class="text-purple-700">$\\alpha_{head}$ (Head Learning Rate):</strong> The normal Lego brick (a normal step).</li>
                </ul>
            </div>
            <p class="text-lg">The equation shows that the base steps are much, much smaller than the head steps:</p>
            <div class="text-2xl text-center my-4 p-4 bg-white rounded-xl shadow border border-slate-200">
                $$\\alpha_{base} \\ll \\alpha_{head}$$
            </div>
        `
    },
    {
        icon: "fa-solid fa-feather text-pink-500",
        title: "6. Math: The Feather Duster",
        content: `
            <p class="mb-4">Let's look at a math example where the steepness ($\\nabla L$) for both parts is 2.</p>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-pink-50 p-4 rounded-xl border border-pink-200">
                    <h4 class="font-bold text-pink-700 mb-2">Updating the Base (Feather Duster)</h4>
                    <p class="text-sm">$\\alpha_{base} = 10^{-5}$ (0.00001 - tiny!)</p>
                    <div class="mt-2 text-sm">
                        <p>$$W_{new} = 100 - (0.00001 \\times 2)$$</p>
                        <p>$$W_{new} = 100 - 0.00002$$</p>
                        <p>$$W_{new} = 99.99998$$</p>
                    </div>
                    <p class="mt-2 text-xs text-pink-800 font-semibold">Barely changed! Just a tiny polish.</p>
                </div>
                <div class="bg-orange-50 p-4 rounded-xl border border-orange-200">
                    <h4 class="font-bold text-orange-700 mb-2">Updating the Head (Normal Bricks)</h4>
                    <p class="text-sm">$\\alpha_{head} = 10^{-3}$ (0.001 - 100x bigger!)</p>
                    <div class="mt-2 text-sm">
                        <p>$$W_{new} = 10 - (0.001 \\times 2)$$</p>
                        <p>$$W_{new} = 10 - 0.002$$</p>
                        <p>$$W_{new} = 9.998$$</p>
                    </div>
                    <p class="mt-2 text-xs text-orange-800 font-semibold">Moved a lot faster to learn its new shape!</p>
                </div>
            </div>
        `
    },
    {
        icon: "fa-solid fa-user-tie text-emerald-500",
        title: "7. Q&A: Who defines the learning rate ($\\alpha$)?",
        content: `
            <h3 class="font-bold text-xl mb-3 text-emerald-800">Is it pre-trained, or does the developer define it?</h3>
            <p class="mb-4 text-lg"><strong>The short answer:</strong> The developer defines it! It is not pre-trained.</p>
            <div class="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-inner">
                <h4 class="font-bold mb-2">The 7-Year-Old Explanation:</h4>
                <p class="mb-3">Think of the Learning Rate ($\\alpha$) as the rules of the treasure hunt. Before the hunter even steps foot on the mountain, the game master (the developer) tells them: <em>"You are only allowed to take steps exactly this big."</em></p>
                <p class="mb-2">The AI cannot decide to take giant leaps on its own. It blindly follows the rule.</p>
                <ul class="list-disc pl-5">
                    <li><strong>Developer Action:</strong> Types in code: $\\alpha = 0.001$.</li>
                    <li><strong>Math Result:</strong> Every calculation multiplies the steepness by $0.001$. Only the developer changes this!</li>
                </ul>
            </div>
        `
    },
    {
        icon: "fa-solid fa-dice text-rose-500",
        title: "8. Q&A: How do weights start?",
        content: `
            <h3 class="font-bold text-xl mb-3 text-rose-800">Are weights ($W$) defined by default at the beginning?</h3>
            <p class="mb-4 text-lg"><strong>The short answer:</strong> Yes, exactly! They start completely random and get adjusted step-by-step.</p>
            <div class="bg-rose-50 p-5 rounded-xl border border-rose-200 shadow-inner">
                <h4 class="font-bold mb-2">The 7-Year-Old Explanation:</h4>
                <p class="mb-3">Imagine playing a video game where your character spawns randomly on the map. You have no idea where you are. That is exactly what happens with weights!</p>
                <ul class="space-y-3">
                    <li><strong>The Beginning:</strong> The treasure hunter is dropped from a helicopter onto a random spot. Let's say: $W_{start} = 42$.</li>
                    <li><strong>The Adjustments:</strong> The hunter feels the ground and takes a step:
                    <div class="text-center my-2 font-bold">$$W_{new} = 42 - \\text{Step}$$</div>
                    They keep taking steps (iterations) until they find the treasure.
                    </li>
                </ul>
            </div>
        `
    },
    {
        icon: "fa-solid fa-cogs text-gray-500",
        title: "9. Q&A: Updating the Head",
        content: `
            <h3 class="font-bold text-xl mb-3 text-gray-800">What does "update the head normally" mean?</h3>
            <p class="mb-4 text-lg"><strong>The short answer:</strong> The frozen Lego body stays perfectly still, but the new Lego head is actively learning.</p>
            <div class="bg-gray-100 p-5 rounded-xl border border-gray-300 shadow-inner">
                <h4 class="font-bold mb-2">The 7-Year-Old Explanation:</h4>
                <p class="mb-3">The beautiful pre-built body ($W_{base}$) is super-glued. It cannot change: $$\\nabla L(W_{base}) = 0$$</p>
                <p class="mb-3">But the head ($W_{head}$) is a brand new, random lump of clay. It uses the treasure hunter formula to slowly shape itself into the right form.</p>
                <div class="bg-white p-3 rounded shadow-sm">
                    <p class="text-sm">Random lump: $W_{head\\_old} = 10$.</p>
                    <p class="text-sm">It feels it is wrong (Steepness = 2) and fixes it (Learning Rate = 1).</p>
                    <p class="text-center mt-2">$$W_{head\\_new} = 10 - (1 \\times 2) = 8$$</p>
                </div>
            </div>
        `
    },
    {
        icon: "fa-solid fa-hammer text-red-500",
        title: "10. Q&A: Why is the base rate smaller?",
        content: `
            <h3 class="font-bold text-xl mb-3 text-red-800">Must $\\alpha_{base}$ be less than $\\alpha_{head}$?</h3>
            <p class="mb-3"><strong>The short answer:</strong> Yes! If it isn't, you ruin the AI (Catastrophic Forgetting)!</p>
            <div class="bg-red-50 p-4 rounded-xl border border-red-200 mb-4">
                <p class="mb-2"><strong>The Big Hammer (Big $\\alpha$):</strong> Fixes the dumb lump of clay (head) perfectly. But if you hit the perfect Lego body with it... SMASH! It forgets everything the master builder taught it.</p>
                <p><strong>The Feather Duster (Tiny $\\alpha$):</strong> We hide the hammer from the perfect body and only give it a tiny feather duster to keep it safe.</p>
            </div>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
                <div class="bg-white p-3 rounded shadow">
                    <p class="font-bold text-red-600">Big Step (Ruin the painting):</p>
                    <p>$\\alpha = 0.1$, steepness = 50</p>
                    <p>$$W_{new} = 100 - (0.1 \\times 50)$$</p>
                    <p>$$W_{new} = 95$$ (Lost 5 points!)</p>
                </div>
                <div class="bg-white p-3 rounded shadow">
                    <p class="font-bold text-green-600">Tiny Step (Dust off dirt):</p>
                    <p>$\\alpha = 0.00001$, steepness = 50</p>
                    <p>$$W_{new} = 100 - (0.00001 \\times 50)$$</p>
                    <p>$$W_{new} = 99.9995$$ (Safe!)</p>
                </div>
            </div>
        `
    },
    {
        icon: "fa-solid fa-gamepad text-indigo-500",
        title: "11. Interactive: The Loss Landscape Game",
        content: `
            <p class="mb-4 text-lg">To really see why a large learning rate ruins a model that is already close to the bottom, try playing with this interactive loss landscape. Notice how a large step size causes the point to bounce wildly out of control, while a small step size settles nicely into the lowest point!</p>
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-inner flex flex-col items-center">
                <canvas id="lossCanvas" width="500" height="250" class="w-full max-w-lg bg-slate-50 rounded-lg border border-slate-300 mb-6"></canvas>

                <div class="w-full max-w-lg space-y-4">
                    <div class="flex justify-between items-center">
                        <label for="lr-slider" class="font-bold text-slate-700">Learning Rate ($\\alpha$): <span id="lr-value" class="text-indigo-600 text-lg">0.10</span></label>
                    </div>
                    <input type="range" id="lr-slider" min="0.01" max="1.05" step="0.01" value="0.1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600">

                    <div class="flex gap-4 pt-2">
                        <button onclick="takeStep()" class="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow flex justify-center items-center gap-2">
                            <i class="fa-solid fa-shoe-prints"></i> Take Step
                        </button>
                        <button onclick="resetGame()" class="flex-1 bg-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-300 transition shadow flex justify-center items-center gap-2">
                            <i class="fa-solid fa-rotate-right"></i> Reset
                        </button>
                    </div>
                </div>
            </div>
        `
    }
];

let currentStep = 0;

function renderStep() {
    const container = document.getElementById('content-area');
    const stepData = steps[currentStep];

    // Generate Content HTML
    const html = `
        <div class="fade-in max-w-3xl mx-auto w-full">
            <h2 class="text-2xl md:text-3xl font-extrabold mb-6 flex items-center gap-4 text-slate-800">
                <i class="${stepData.icon} text-3xl md:text-4xl bg-white p-3 rounded-2xl shadow-sm border border-slate-100"></i>
                ${stepData.title}
            </h2>
            <div class="text-slate-700 leading-relaxed">
                ${stepData.content}
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Initialize game logic if on step 11
    if (currentStep === 10) {
        setTimeout(initGame, 50);
    }

    // Wait a tick for DOM to update, then render math formulas
    setTimeout(() => {
        renderMathInElement(container, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false }
            ],
            throwOnError: false
        });
    }, 10);

    // Update UI State
    document.getElementById('btn-back').disabled = currentStep === 0;

    const btnNext = document.getElementById('btn-next');
    if (currentStep === steps.length - 1) {
        btnNext.innerHTML = 'Finish <i class="fa-solid fa-check"></i>';
        btnNext.classList.replace('bg-indigo-600', 'bg-green-600');
        btnNext.classList.replace('hover:bg-indigo-700', 'hover:bg-green-700');
        btnNext.classList.replace('shadow-indigo-200', 'shadow-green-200');
    } else {
        btnNext.innerHTML = 'Next <i class="fa-solid fa-arrow-right"></i>';
        btnNext.classList.replace('bg-green-600', 'bg-indigo-600');
        btnNext.classList.replace('hover:bg-green-700', 'hover:bg-indigo-700');
        btnNext.classList.replace('shadow-green-200', 'shadow-indigo-200');
    }

    // Update Progress Bar
    const progress = ((currentStep + 1) / steps.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('step-indicator').innerText = `Step ${currentStep + 1} of ${steps.length}`;
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
    } else {
        // Celebration or reset on finish
        // alert("🎉 Congratulations! You've mastered the basics of CNN weight updates and Fine-tuning!");
        // currentStep = 0;
        // renderStep();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
}

// Initialize on page load
window.onload = () => {
    // Check if KaTeX is loaded, if not, wait a bit (usually fast because of defer)
    if (typeof renderMathInElement === 'function') {
        renderStep();
    } else {
        setTimeout(renderStep, 500);
    }
};