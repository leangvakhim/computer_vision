// --- STEP NAVIGATION LOGIC ---
const totalSteps = 7;
let currentStep = 1;

const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const stepIndicator = document.getElementById('step-indicator-current');
const progressBar = document.getElementById('progress-bar');

function updateUI() {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('active');
    });
    // Show current step
    const activeStep = document.getElementById(`step-${currentStep}`);
    activeStep.classList.add('active');

    // Render Math when Step 5 is visible
    if (currentStep === 5) {
        renderMathInElement(activeStep, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false }
            ],
            throwOnError: false
        });
    }

    // Fix canvas resize on Step 6
    if (currentStep === 6) {
        initCanvasSize();
    }

    // Highlight Python syntax on Step 7
    if (currentStep === 7 && window.Prism) {
        Prism.highlightAll();
    }

    // Update UI elements
    stepIndicator.textContent = currentStep;
    progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;

    // Button states
    btnBack.disabled = currentStep === 1;

    if (currentStep === totalSteps) {
        btnNext.innerHTML = 'Finish <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>';
        btnNext.classList.remove('bg-cyan-600', 'hover:bg-cyan-500', 'shadow-[0_4px_12px_rgba(8,145,178,0.3)]', 'hover:shadow-[0_6px_16px_rgba(8,145,178,0.4)]');
        btnNext.classList.add('bg-emerald-500', 'hover:bg-emerald-400', 'shadow-[0_4px_12px_rgba(16,185,129,0.3)]');
    } else {
        btnNext.innerHTML = 'Next <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
        btnNext.classList.add('bg-cyan-600', 'hover:bg-cyan-500', 'shadow-[0_4px_12px_rgba(8,145,178,0.3)]', 'hover:shadow-[0_6px_16px_rgba(8,145,178,0.4)]');
        btnNext.classList.remove('bg-emerald-500', 'hover:bg-emerald-400', 'shadow-[0_4px_12px_rgba(16,185,129,0.3)]');
    }
}

btnNext.addEventListener('click', () => {
    if (currentStep < totalSteps) {
        currentStep++;
        updateUI();
    } else {
        // Flash effect for finishing
        btnNext.innerHTML = "You're a CNN Pro!";
        setTimeout(() => { updateUI(); }, 2000);
    }
});

btnBack.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateUI();
    }
});

// --- STEP 2: GRID ANIMATION LOGIC ---
const gridContainer = document.querySelector('#step-2 .grid');
// Generate grid cells
for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    gridContainer.appendChild(cell);
}

// Animate magnifying glass
const cnnFilter = document.getElementById('cnn-filter');
let filterPos = { x: 0, y: 0 };
setInterval(() => {
    if (currentStep !== 2) return; // Only animate if visible
    filterPos.x += 10; // 10%
    if (filterPos.x > 70) {
        filterPos.x = 0;
        filterPos.y += 10;
        if (filterPos.y > 70) {
            filterPos.y = 0;
        }
    }
    cnnFilter.style.left = `${filterPos.x}%`;
    cnnFilter.style.top = `${filterPos.y}%`;
}, 300);

// --- STEP 6: SKELETAL POSE EDITOR LOGIC ---
const canvas = document.getElementById('pose-canvas');
const ctx = canvas.getContext('2d');
const jointsListDiv = document.getElementById('joints-list');

let cw, ch;

// Define standard pose joints
const initialJoints = [
    { id: 'nose', label: 'Nose', nx: 0.5, ny: 0.15, color: '#ef4444' }, // red
    { id: 'l_shoulder', label: 'L Shoulder', nx: 0.4, ny: 0.3, color: '#0ea5e9' }, // sky
    { id: 'r_shoulder', label: 'R Shoulder', nx: 0.6, ny: 0.3, color: '#0ea5e9' },
    { id: 'l_elbow', label: 'L Elbow', nx: 0.3, ny: 0.45, color: '#6366f1' }, // indigo
    { id: 'r_elbow', label: 'R Elbow', nx: 0.7, ny: 0.4, color: '#6366f1' },
    { id: 'l_wrist', label: 'L Wrist', nx: 0.2, ny: 0.6, color: '#8b5cf6' }, // violet
    { id: 'r_wrist', label: 'R Wrist', nx: 0.75, ny: 0.25, color: '#8b5cf6' },
    { id: 'l_hip', label: 'L Hip', nx: 0.45, ny: 0.6, color: '#10b981' }, // emerald
    { id: 'r_hip', label: 'R Hip', nx: 0.55, ny: 0.6, color: '#10b981' },
    { id: 'l_knee', label: 'L Knee', nx: 0.4, ny: 0.8, color: '#ec4899' }, // pink
    { id: 'r_knee', label: 'R Knee', nx: 0.6, ny: 0.75, color: '#ec4899' },
    { id: 'l_ankle', label: 'L Ankle', nx: 0.35, ny: 0.95, color: '#f97316' }, // orange
    { id: 'r_ankle', label: 'R Ankle', nx: 0.65, ny: 0.9, color: '#f97316' },
];

// Define bones connecting joints
const bones = [
    ['l_shoulder', 'r_shoulder'],
    ['l_shoulder', 'l_elbow'],
    ['r_shoulder', 'r_elbow'],
    ['l_elbow', 'l_wrist'],
    ['r_elbow', 'r_wrist'],
    ['l_shoulder', 'l_hip'],
    ['r_shoulder', 'r_hip'],
    ['l_hip', 'r_hip'],
    ['l_hip', 'l_knee'],
    ['r_hip', 'r_knee'],
    ['l_knee', 'l_ankle'],
    ['r_knee', 'r_ankle'],
];

// Actual runtime joints
let joints = [];
let draggedJoint = null;
let hoverJoint = null;

function initCanvasSize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    // Set high-dpi canvas for crispness
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    cw = rect.width;
    ch = rect.height;

    // Initialize physical coordinates from normalized
    if (joints.length === 0) {
        joints = initialJoints.map(j => ({
            ...j,
            x: j.nx * cw,
            y: j.ny * ch,
            radius: 12
        }));
    } else {
        // Reposition on resize
        joints.forEach(j => {
            j.x = j.nx * cw;
            j.y = j.ny * ch;
        });
    }
    updateDataPanel();
    drawPose();
}

window.addEventListener('resize', () => {
    if (currentStep === 6) initCanvasSize();
});

// Drawing Logic
function drawPose() {
    ctx.clearRect(0, 0, cw, ch);

    // Draw head connection (special case)
    const nose = joints.find(j => j.id === 'nose');
    const l_shoulder = joints.find(j => j.id === 'l_shoulder');
    const r_shoulder = joints.find(j => j.id === 'r_shoulder');
    if (nose && l_shoulder && r_shoulder) {
        const neckX = (l_shoulder.x + r_shoulder.x) / 2;
        const neckY = (l_shoulder.y + r_shoulder.y) / 2;
        ctx.beginPath();
        ctx.moveTo(nose.x, nose.y);
        ctx.lineTo(neckX, neckY);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'; // Darker for light mode
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    // Draw Bones
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    bones.forEach(bone => {
        const j1 = joints.find(j => j.id === bone[0]);
        const j2 = joints.find(j => j.id === bone[1]);
        if (j1 && j2) {
            ctx.beginPath();
            ctx.moveTo(j1.x, j1.y);
            ctx.lineTo(j2.x, j2.y);
            // Gradient bone
            const grad = ctx.createLinearGradient(j1.x, j1.y, j2.x, j2.y);
            grad.addColorStop(0, j1.color);
            grad.addColorStop(1, j2.color);
            ctx.strokeStyle = grad;
            ctx.stroke();
        }
    });

    // Draw Joints
    joints.forEach(j => {
        ctx.beginPath();
        ctx.arc(j.x, j.y, j.radius, 0, Math.PI * 2);
        ctx.fillStyle = j.color;
        ctx.fill();

        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#ffffff'; // White inner border
        ctx.stroke();

        // Highlight if hovered
        if (hoverJoint === j || draggedJoint === j) {
            ctx.beginPath();
            ctx.arc(j.x, j.y, j.radius + 6, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(14, 165, 233, 0.4)'; // Cyan ring highlight
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw text tag
            ctx.fillStyle = '#334155'; // Dark slate text for light mode
            ctx.font = 'bold 12px monospace';

            // Add a tiny white background to text for legibility
            const textWidth = ctx.measureText(j.label).width;
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.fillRect(j.x + 12, j.y - 25, textWidth + 6, 16);

            ctx.fillStyle = '#1e293b';
            ctx.fillText(j.label, j.x + 15, j.y - 13);
        }
    });
}

// Data Panel Update
function updateDataPanel() {
    jointsListDiv.innerHTML = '';
    joints.forEach(j => {
        const div = document.createElement('div');
        div.className = `flex justify-between items-center p-2 rounded border transition-colors ${(hoverJoint === j || draggedJoint === j)
                ? 'bg-cyan-50 border-cyan-300 shadow-sm'
                : 'bg-white border-slate-100 hover:bg-slate-50'
            }`;
        div.innerHTML = `
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full shadow-sm" style="background-color: ${j.color}"></div>
                <span class="text-slate-700 font-semibold">${j.label}</span>
            </div>
            <div class="text-cyan-700 bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">
                x:${Math.round(j.x).toString().padStart(3, '0')} y:${Math.round(j.y).toString().padStart(3, '0')}
            </div>
        `;
        // Add hover sync
        div.addEventListener('mouseenter', () => { hoverJoint = j; drawPose(); });
        div.addEventListener('mouseleave', () => { hoverJoint = null; drawPose(); });
        jointsListDiv.appendChild(div);
    });
}

// Interaction Logic
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;

    // Touch support
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }

    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function handleDown(e) {
    e.preventDefault();
    const pos = getMousePos(e);
    // Find clicked joint
    for (let i = joints.length - 1; i >= 0; i--) {
        const j = joints[i];
        const dx = pos.x - j.x;
        const dy = pos.y - j.y;
        if (dx * dx + dy * dy < (j.radius + 10) * (j.radius + 10)) {
            draggedJoint = j;
            canvas.style.cursor = 'grabbing';
            updateDataPanel();
            drawPose();
            break;
        }
    }
}

function handleMove(e) {
    e.preventDefault();
    const pos = getMousePos(e);

    if (draggedJoint) {
        // Keep inside canvas bounds
        draggedJoint.x = Math.max(0, Math.min(cw, pos.x));
        draggedJoint.y = Math.max(0, Math.min(ch, pos.y));
        // Update normalized coords
        draggedJoint.nx = draggedJoint.x / cw;
        draggedJoint.ny = draggedJoint.y / ch;
        updateDataPanel();
        drawPose();
    } else {
        // Hover detection
        let foundHover = null;
        for (let i = joints.length - 1; i >= 0; i--) {
            const j = joints[i];
            const dx = pos.x - j.x;
            const dy = pos.y - j.y;
            if (dx * dx + dy * dy < (j.radius + 10) * (j.radius + 10)) {
                foundHover = j;
                break;
            }
        }
        if (foundHover !== hoverJoint) {
            hoverJoint = foundHover;
            canvas.style.cursor = hoverJoint ? 'grab' : 'crosshair';
            updateDataPanel();
            drawPose();
        }
    }
}

function handleUp(e) {
    e.preventDefault();
    draggedJoint = null;
    canvas.style.cursor = hoverJoint ? 'grab' : 'crosshair';
    updateDataPanel();
    drawPose();
}

// Listeners for mouse
canvas.addEventListener('mousedown', handleDown);
canvas.addEventListener('mousemove', handleMove);
window.addEventListener('mouseup', handleUp);

// Listeners for touch
canvas.addEventListener('touchstart', handleDown, { passive: false });
canvas.addEventListener('touchmove', handleMove, { passive: false });
window.addEventListener('touchend', handleUp);

// Initialize UI on load
updateUI();