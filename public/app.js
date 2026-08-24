// ===== SYE ACADEMY - CORE APPLICATION LOGIC (v2.3) =====
// Features: Default English, Bilingual Engine (EN/TH), Diagrams, Akkharasaran S. Lead Authority, 2025+ Timeline

// ===== CONSTANTS & CONFIG =====
const APP_VERSION = '2.3.0';
const LAST_UPDATED = new Date().toISOString().split('T')[0];

const ROLES = ['PM', 'BA', 'Developer', 'QA', 'SRE'];
const SECTIONS = ['API & Integration Platform', 'Customer Experience Systems', 'Omnichannel Customer Service'];
const CATEGORIES = ['General', 'PM', 'BA', 'Developer', 'QA', 'SRE', 'Section'];
const TRAINING_METHODS = ['Classroom', 'Online', 'Self-study', 'OJT'];
const RECORD_STATUSES = ['Completed', 'In Progress', 'Scheduled', 'Failed'];

let currentCharts = [];

// ===== BILINGUAL TRANSLATION ENGINE (I18N) =====
const I18N = {
    current: localStorage.getItem('sye_lang') || 'en', // Default English
    
    dict: {
        en: {
            app_title: 'SYE Academy',
            app_subtitle: 'Engineering Onboarding & Technical Training Portal',
            division_name: 'System Enabler (SYE) • System Development Department',
            division_full: 'System Enabler (SYE) Division • AEON System Development Department',
            start_training: 'Start Training',
            start_training_sub: 'New Employee Onboarding & Registration',
            admin_panel: 'Admin Panel',
            admin_panel_sub: 'Compliance Records & System Management',
            returning_learner: 'Returning Learner?',
            select_learner: 'Select your name to continue...',
            continue_btn: 'Continue →',
            back_to_home: '← Back to Home',
            back_to_roadmap: '← Back to My Training Roadmap',
            log_out: 'Log out',
            welcome: 'Welcome',
            onboarding_progress: 'Onboarding Progress',
            courses_completed: 'courses completed',
            review_course: '📖 Review Course',
            view_assessment: '📝 View Assessment',
            locked: '🔒 Locked',
            step1_title: 'Step 1: Division & General Engineering Orientation',
            step1_desc: 'Division mission, 3 sections, cross-role collaboration, architecture landscape, and security policies',
            step2_title: 'Step 2: Role-Specific Technical Training',
            step2_desc: 'Technical and domain competencies required for your specific engineering role',
            step3_title: 'Step 3: Section Platform Architecture',
            step3_desc: 'Platform architectures, standards, and workflows specific to your assigned section',
            learning_objectives: 'Learning Objectives',
            end_of_content: '── End of Course Content ──',
            confirm_read: 'I confirm that I have read and understood all the technical material above',
            take_assessment: 'Take Knowledge Assessment →',
            retake_assessment: 'Retake Assessment →',
            confirm_completion: 'Confirm Completion ✓',
            course_completed_msg: 'Course Completed',
            review_answers_btn: 'Review Submitted Answers',
            submit_answers: 'Submit Answers',
            congrats_pass: '🎉 Congratulations! You Passed',
            not_passed: '❌ Assessment Not Passed',
            score_label: 'Score',
            min_pass: 'Passing required',
            reg_title: 'New Employee Registration',
            reg_desc: 'Register to start your System Enabler (SYE) onboarding journey',
            staff_id: 'Staff ID',
            first_name: 'First Name',
            last_name: 'Last Name',
            email: 'Corporate Email',
            role: 'Engineering Role',
            section: 'Assigned Section',
            reg_submit: 'Register & Start Onboarding →',
            assessment_review_title: 'Assessment Submission Review',
            correct_ans: '✓ Correct Answer',
            your_choice: '✗ Your Choice'
        },
        th: {
            app_title: 'SYE Academy',
            app_subtitle: 'ระบบฝึกอบรมและปฐมนิเทศวิศวกรรมระบบ (SYE Division)',
            division_name: 'ฝ่าย System Enabler (SYE) • ฝ่ายพัฒนาระบบ AEON',
            division_full: 'ฝ่าย System Enabler (SYE) • ฝ่ายพัฒนาระบบ บริษัท อิออน ธนสินทรัพย์ (ไทยแลนด์) จำกัด (มหาชน)',
            start_training: 'เข้าสู่การฝึกอบรม (Start Training)',
            start_training_sub: 'ลงทะเบียนพนักงานใหม่ และเริ่มแผนการเรียนรู้',
            admin_panel: 'ผู้ดูแลระบบ (Admin Panel)',
            admin_panel_sub: 'บันทึกการอบรม ทะเบียนพนักงาน และเอกสาร Audit',
            returning_learner: 'พนักงานเดิมที่เคยลงทะเบียนแล้ว',
            select_learner: 'เลือกชื่อของคุณเพื่อเข้าสู่ระบบ...',
            continue_btn: 'เข้าสู่ระบบอบรม →',
            back_to_home: '← กลับหน้าหลัก',
            back_to_roadmap: '← กลับสู่แผนผังการอบรมของฉัน',
            log_out: 'ออกจากระบบ',
            welcome: 'ยินดีต้อนรับ',
            onboarding_progress: 'ความคืบหน้าการฝึกอบรม',
            courses_completed: 'หลักสูตรที่ผ่านแล้ว',
            review_course: '📖 ทบทวนบทเรียน',
            view_assessment: '📝 ดูผลการสอบ',
            step1_title: 'ขั้นตอนที่ 1: การปฐมนิเทศฝ่าย SYE และมาตรฐานวิศวกรรมทั่วไป',
            step1_desc: 'โครงสร้างผู้นำ 3 ส่วนงาน, มาตรฐาน ISO 4 ด้าน, SDLC แบบยืดหยุ่น, ระบบ On-Premise และแผน BCP/DR Site',
            step2_title: 'ขั้นตอนที่ 2: การฝึกอบรมเฉพาะตำแหน่ง (Role-Specific)',
            step2_desc: 'ทักษะและมาตรฐานการทำงานเฉพาะของตำแหน่งงานของคุณ',
            step3_title: 'ขั้นตอนที่ 3: สถาปัตยกรรมแพลตฟอร์มประจำ Section',
            step3_desc: 'โครงสร้างระบบและมาตรฐานการปฏิบัติงานของแต่ละส่วนงาน',
            learning_objectives: 'วัตถุประสงค์การเรียนรู้ (Learning Objectives)',
            end_of_content: '── สิ้นสุดเนื้อหาบทเรียน ──',
            confirm_read: 'ข้าพเจ้ายืนยันว่าได้อ่านและทำความเข้าใจเนื้อหาทางเทคนิคข้างต้นครบถ้วนแล้ว',
            take_assessment: 'ทำแบบทดสอบประเมินความรู้ →',
            retake_assessment: 'ทำแบบทดสอบใหม่ →',
            confirm_completion: 'ยืนยันจบการอบรม ✓',
            course_completed_msg: 'ผ่านการอบรมหลักสูตรนี้เรียบร้อยแล้ว',
            review_answers_btn: 'ดูเฉลยและคำตอบที่คุณทำ',
            submit_answers: 'ส่งคำตอบแบบทดสอบ',
            congrats_pass: '🎉 ยินดีด้วย! คุณผ่านการทดสอบ',
            not_passed: '❌ ไม่ผ่านเกณฑ์การทดสอบ',
            score_label: 'คะแนนที่ได้',
            min_pass: 'เกณฑ์คะแนนขั้นต่ำ',
            reg_title: 'ลงทะเบียนพนักงานใหม่',
            reg_desc: 'เข้ารับการฝึกอบรมและเตรียมความพร้อมฝ่าย System Enabler',
            staff_id: 'รหัสพนักงาน (Staff ID)',
            first_name: 'ชื่อ (First Name)',
            last_name: 'นามสกุล (Last Name)',
            email: 'อีเมล (Email)',
            role: 'ตำแหน่ง (Role)',
            section: 'ส่วนงาน (Section)',
            reg_submit: 'ลงทะเบียนและเริ่มการอบรม →',
            assessment_review_title: 'รายละเอียดผลการทดสอบประเมินผล',
            correct_ans: '✓ คำตอบที่ถูกต้อง',
            your_choice: '✗ คำตอบที่คุณเลือก'
        }
    },
    
    t: (key) => {
        const lang = I18N.current;
        return (I18N.dict[lang] && I18N.dict[lang][key]) || (I18N.dict['en'] && I18N.dict['en'][key]) || key;
    }
};

window.toggleLanguage = () => {
    I18N.current = I18N.current === 'en' ? 'th' : 'en';
    localStorage.setItem('sye_lang', I18N.current);
    updateLangButtonLabels();
    handleRoute();
};

function updateLangButtonLabels() {
    const label = I18N.current === 'en' ? '🇬🇧 English' : '🇹🇭 ภาษาไทย';
    const shortLabel = I18N.current === 'en' ? 'EN' : 'TH';
    
    const btnLearner = document.getElementById('lang-label-learner');
    if (btnLearner) btnLearner.textContent = shortLabel;
    
    const btnAdmin = document.getElementById('lang-label-admin');
    if (btnAdmin) btnAdmin.textContent = shortLabel;
}

// ===== DATA LAYER (localStorage helpers) =====
const DB = {
    get: (key) => JSON.parse(localStorage.getItem(key) || '[]'),
    set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
    logActivity: (type, description, relatedId = null) => {
        const logs = DB.get('sye_activity_log');
        const now = new Date();
        logs.unshift({
            id: 'LOG-' + Date.now(),
            date: now.toISOString().split('T')[0],
            timestamp: now.toISOString(),
            type,
            description,
            relatedId
        });
        if (logs.length > 500) logs.length = 500;
        DB.set('sye_activity_log', logs);
    },
    getCurrentLearner: () => localStorage.getItem('sye_current_learner'),
    setCurrentLearner: (id) => {
        if(id) localStorage.setItem('sye_current_learner', id);
        else localStorage.removeItem('sye_current_learner');
    }
};

// Initialize Data
function initData() {
    if (!localStorage.getItem('sye_employees')) {
        console.log("Loading initial sample data...");
        loadSampleData();
    } else if (window.SYE_SAMPLE_DATA) {
        // Sync course contents & quizzes while preserving custom records
        const currentCourses = DB.get('sye_courses');
        if (currentCourses.length > 0 && window.SYE_SAMPLE_DATA.courses) {
            const sampleCoursesMap = new Map(window.SYE_SAMPLE_DATA.courses.map(c => [c.id, c]));
            const updatedCourses = currentCourses.map(c => {
                const sample = sampleCoursesMap.get(c.id);
                if (sample) {
                    return {
                        ...c,
                        name: sample.name,
                        name_th: sample.name_th,
                        description: sample.description,
                        description_th: sample.description_th,
                        learningObjectives: sample.learningObjectives,
                        learningObjectives_th: sample.learningObjectives_th,
                        content: sample.content,
                        content_th: sample.content_th
                    };
                }
                return c;
            });
            DB.set('sye_courses', updatedCourses);
        }
        if (window.SYE_SAMPLE_DATA.quizzes) {
            DB.set('sye_quizzes', window.SYE_SAMPLE_DATA.quizzes);
        }
    }
}

function loadSampleData() {
    if (window.SYE_SAMPLE_DATA) {
        const keyMap = {
            employees: 'sye_employees',
            courses: 'sye_courses',
            trainingRecords: 'sye_training_records',
            workInstructions: 'sye_work_instructions',
            quizzes: 'sye_quizzes',
            quizResults: 'sye_quiz_results',
            activityLog: 'sye_activity_log'
        };
        Object.keys(window.SYE_SAMPLE_DATA).forEach(key => {
            const storageKey = keyMap[key] || key;
            DB.set(storageKey, window.SYE_SAMPLE_DATA[key]);
        });
        console.log("Sample data initialized.");
    } else {
        ['sye_employees', 'sye_courses', 'sye_training_records', 'sye_work_instructions', 'sye_quizzes', 'sye_quiz_results', 'sye_activity_log'].forEach(key => {
            if(!localStorage.getItem(key)) DB.set(key, []);
        });
    }
}

// Data Getters & Calculations
const DataAPI = {
    getEmployees: () => DB.get('sye_employees'),
    getCourses: () => DB.get('sye_courses'),
    getRecords: () => DB.get('sye_training_records'),
    getWIs: () => DB.get('sye_work_instructions'),
    getQuizzes: () => DB.get('sye_quizzes'),
    getQuizResults: () => DB.get('sye_quiz_results'),
    getLogs: () => DB.get('sye_activity_log'),
    
    getEmployeeStats: (empId) => {
        const records = DataAPI.getRecords().filter(r => r.employeeId === empId && r.status === 'Completed');
        const emp = DataAPI.getEmployees().find(e => e.id === empId);
        if(!emp) return { required: 0, completed: 0, percent: 0, requiredCourses: [] };
        
        const allCourses = DataAPI.getCourses();
        const requiredCourses = allCourses.filter(c => {
            if (c.targetSection) {
                if (c.targetSection !== emp.section) return false;
                return c.targetRoles.includes('All') || c.targetRoles.includes(emp.role);
            }
            return c.targetRoles.includes('All') || c.targetRoles.includes(emp.role);
        });
        
        const completedCourseIds = new Set(records.map(r => r.courseId));
        const completedCount = requiredCourses.filter(c => completedCourseIds.has(c.id)).length;
        const percent = requiredCourses.length ? Math.round((completedCount / requiredCourses.length) * 100) : 0;
        
        return {
            required: requiredCourses.length,
            completed: completedCount,
            percent: percent > 100 ? 100 : percent,
            requiredCourses
        };
    }
};

// ===== SHARED UI HELPERS =====
const UI = {
    renderBadge: (status) => {
        const config = {
            'Completed': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
            'Active': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
            'In Progress': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
            'Scheduled': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
            'Failed': { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' },
            'Inactive': { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' }
        };
        const c = config[status] || config['Inactive'];
        return `<span class="inline-flex items-center rounded-full ${c.bg} px-2.5 py-0.5 text-xs font-semibold ${c.text}">
            <span class="mr-1.5 h-1.5 w-1.5 rounded-full ${c.dot}"></span>${status}
        </span>`;
    },
    
    renderProgressBar: (percent) => {
        const p = Math.min(Math.max(percent, 0), 100);
        let color = 'bg-blue-600';
        if(p === 100) color = 'bg-emerald-500';
        else if(p < 50) color = 'bg-amber-500';
        
        return `
            <div class="flex items-center w-full">
                <div class="w-full bg-slate-100 rounded-full h-2.5 mr-2 overflow-hidden">
                    <div class="${color} h-2.5 rounded-full transition-all duration-500" style="width: ${p}%"></div>
                </div>
                <span class="text-xs font-bold text-slate-700 w-10 text-right">${p}%</span>
            </div>
        `;
    },

    destroyCharts: () => {
        currentCharts.forEach(chart => { if(chart && typeof chart.destroy === 'function') chart.destroy(); });
        currentCharts = [];
    },

    showModal: (title, bodyHtml, onSave, saveText = 'Save', showFooter = true) => {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-body').innerHTML = bodyHtml;
        
        const footer = document.getElementById('modal-footer');
        if (showFooter) {
            footer.classList.remove('hidden');
            const saveBtn = document.getElementById('modal-save');
            saveBtn.textContent = saveText;
            saveBtn.onclick = () => {
                if(onSave && onSave()) {
                    UI.closeModal();
                }
            };
        } else {
            footer.classList.add('hidden');
        }
        
        document.getElementById('modal-container').classList.remove('hidden');
    },

    closeModal: () => {
        document.getElementById('modal-container').classList.add('hidden');
        document.getElementById('modal-body').innerHTML = '';
    }
};

document.getElementById('modal-close').addEventListener('click', UI.closeModal);
document.getElementById('modal-cancel').addEventListener('click', UI.closeModal);
document.getElementById('modal-container').addEventListener('click', (e) => {
    if(e.target.id === 'modal-container') UI.closeModal();
});

// Update Date in Header
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', dateOptions);

// ===== ROUTER =====
const learnerRoutes = ['landing', 'register', 'my-training'];
const adminRoutes = ['dashboard', 'catalog', 'work-instructions', 'employees', 'records', 'assessments', 'reports', 'settings'];

function handleRoute() {
    UI.destroyCharts();
    updateLangButtonLabels();
    
    let hash = window.location.hash.substring(1) || 'landing';
    
    // Dynamic course route
    let courseMatch = hash.match(/^course-(.+)$/);
    let isCourseRoute = false;
    let courseId = null;
    if (courseMatch) {
        isCourseRoute = true;
        courseId = courseMatch[1];
    }

    const isLearner = learnerRoutes.includes(hash) || isCourseRoute;
    
    if (isLearner) {
        document.getElementById('admin-layout').classList.add('hidden');
        document.getElementById('admin-layout').classList.remove('flex');
        document.getElementById('learner-layout').classList.remove('hidden');
        document.getElementById('learner-layout').classList.add('flex');
        
        const container = document.getElementById('learner-content');
        container.innerHTML = '';
        
        if (hash === 'landing') renderLanding(container);
        else if (hash === 'register') renderRegister(container);
        else if (hash === 'my-training') renderMyTraining(container);
        else if (isCourseRoute) renderCourse(container, courseId);
    } else {
        if (!adminRoutes.includes(hash)) hash = 'dashboard';
        
        document.getElementById('learner-layout').classList.add('hidden');
        document.getElementById('learner-layout').classList.remove('flex');
        document.getElementById('admin-layout').classList.remove('hidden');
        document.getElementById('admin-layout').classList.add('flex');
        
        // Keep sidebar in English as requested
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
            if(el.getAttribute('href') === '#' + hash) {
                el.classList.add('active');
                const titleText = el.textContent.replace(/[^\x00-\x7F]/g, "").trim();
                document.getElementById('page-title').textContent = titleText || 'Dashboard';
            }
        });
        
        const container = document.getElementById('admin-content');
        container.innerHTML = '';
        
        if (hash === 'dashboard') renderDashboard(container);
        else if (hash === 'catalog') renderCatalog(container);
        else if (hash === 'work-instructions') renderWorkInstructions(container);
        else if (hash === 'employees') renderEmployees(container);
        else if (hash === 'records') renderRecords(container);
        else if (hash === 'assessments') renderAssessments(container);
        else if (hash === 'reports') renderReports(container);
        else if (hash === 'settings') renderSettings(container);
    }
}

window.addEventListener('hashchange', handleRoute);

// ===== LEARNER PORTAL SCREENS =====

// 1. Landing Screen
function renderLanding(container) {
    const employees = DataAPI.getEmployees();
    
    container.innerHTML = `
        <div class="max-w-2xl w-full my-auto py-8">
            <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 text-center">
                <div class="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-6 shadow-sm">🎓</div>
                <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">${I18N.t('app_title')}</h1>
                <p class="text-slate-500 text-sm max-w-md mx-auto mb-10 leading-relaxed font-medium">
                    ${I18N.t('app_subtitle')}<br>
                    <span class="text-xs text-slate-400">${I18N.t('division_name')}</span>
                </p>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    <a href="#register" class="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-blue-50/30 border-2 border-slate-200 rounded-2xl hover:border-blue-600 hover:shadow-md transition duration-200 group text-center">
                        <span class="text-3xl mb-3 group-hover:scale-110 transition-transform">📚</span>
                        <span class="font-bold text-slate-800 group-hover:text-blue-700 text-base mb-1">${I18N.t('start_training')}</span>
                        <span class="text-xs text-slate-400">${I18N.t('start_training_sub')}</span>
                    </a>
                    <a href="#dashboard" class="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-slate-50 border-2 border-slate-200 rounded-2xl hover:border-slate-800 hover:shadow-md transition duration-200 group text-center">
                        <span class="text-3xl mb-3 group-hover:scale-110 transition-transform">🔧</span>
                        <span class="font-bold text-slate-800 group-hover:text-slate-900 text-base mb-1">${I18N.t('admin_panel')}</span>
                        <span class="text-xs text-slate-400">${I18N.t('admin_panel_sub')}</span>
                    </a>
                </div>
                
                <!-- Returning Learner Form -->
                <div class="border-t border-slate-100 pt-8 max-w-md mx-auto w-full">
                    <p class="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider text-center">${I18N.t('returning_learner')}</p>
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full">
                        <select id="learner-select" class="flex-1 w-full min-w-0 rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50">
                            <option value="">${I18N.t('select_learner')}</option>
                            ${employees.sort((a,b)=>a.name.localeCompare(b.name)).map(e => `<option value="${e.id}">${e.name} (${e.role} - ${e.id})</option>`).join('')}
                        </select>
                        <button id="continue-btn" class="shrink-0 rounded-xl px-5 py-2.5 bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 transition disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shadow-sm text-center" disabled>
                            ${I18N.t('continue_btn')}
                        </button>
                    </div>
                </div>
            </div>
            <p class="text-center text-xs text-slate-400 mt-6 font-medium">${I18N.t('division_full')}</p>
        </div>
    `;

    const select = document.getElementById('learner-select');
    const btn = document.getElementById('continue-btn');
    
    select.addEventListener('change', (e) => {
        btn.disabled = !e.target.value;
    });
    
    btn.addEventListener('click', () => {
        if(select.value) {
            DB.setCurrentLearner(select.value);
            window.location.hash = 'my-training';
        }
    });
}

// 2. Registration Screen
function renderRegister(container) {
    container.innerHTML = `
        <div class="max-w-lg w-full my-auto py-6">
            <div class="mb-4">
                <a href="#landing" class="text-xs font-semibold text-blue-600 hover:text-blue-800 transition flex items-center gap-1">
                    ${I18N.t('back_to_home')}
                </a>
            </div>
            <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                <div class="flex items-center space-x-3 mb-6">
                    <div class="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold text-xl">📝</div>
                    <div>
                        <h2 class="text-xl font-bold text-slate-800">${I18N.t('reg_title')}</h2>
                        <p class="text-xs text-slate-500">${I18N.t('reg_desc')}</p>
                    </div>
                </div>
                
                <form id="reg-form" class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">${I18N.t('staff_id')}</label>
                        <input type="text" id="reg-id" required placeholder="e.g., SYE-0023" class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">${I18N.t('first_name')}</label>
                            <input type="text" id="reg-fn" required class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">${I18N.t('last_name')}</label>
                            <input type="text" id="reg-ln" required class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">${I18N.t('email')}</label>
                        <input type="email" id="reg-email" required placeholder="name@aeon.co.th" class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">${I18N.t('role')}</label>
                        <select id="reg-role" required class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50">
                            <option value="">Select Role...</option>
                            ${ROLES.map(r => `<option value="${r}">${r}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 mb-1">${I18N.t('section')}</label>
                        <select id="reg-section" required class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50">
                            <option value="">Select Section...</option>
                            ${SECTIONS.map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div id="reg-error" class="text-xs text-rose-500 font-medium hidden p-2 bg-rose-50 rounded-lg"></div>
                    
                    <div class="pt-2">
                        <button type="submit" class="w-full rounded-xl px-6 py-3 bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition shadow-sm">${I18N.t('reg_submit')}</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.getElementById('reg-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const staffId = document.getElementById('reg-id').value.trim();
        
        const emps = DataAPI.getEmployees();
        if(emps.find(emp => emp.id === staffId)) {
            const err = document.getElementById('reg-error');
            err.textContent = `Error: Staff ID "${staffId}" is already registered. Please select your name on the landing page or use a new ID.`;
            err.classList.remove('hidden');
            return;
        }

        const fn = document.getElementById('reg-fn').value.trim();
        const ln = document.getElementById('reg-ln').value.trim();
        const role = document.getElementById('reg-role').value;
        const section = document.getElementById('reg-section').value;
        const email = document.getElementById('reg-email').value.trim();
        const name = `${fn} ${ln}`;

        const newEmp = {
            id: staffId,
            name,
            role,
            section,
            joinDate: new Date().toISOString().split('T')[0],
            status: 'Active',
            email
        };

        emps.push(newEmp);
        DB.set('sye_employees', emps);
        DB.logActivity('employee_added', `New employee ${name} (${role}) registered for training in ${section}`, staffId);
        DB.setCurrentLearner(staffId);
        window.location.hash = 'my-training';
    });
}

// 3. My Training Roadmap Screen
function renderMyTraining(container) {
    const learnerId = DB.getCurrentLearner();
    if(!learnerId) {
        window.location.hash = 'landing';
        return;
    }

    const emp = DataAPI.getEmployees().find(e => e.id === learnerId);
    if(!emp) {
        DB.setCurrentLearner(null);
        window.location.hash = 'landing';
        return;
    }

    const allCourses = DataAPI.getCourses();
    const records = DataAPI.getRecords().filter(r => r.employeeId === learnerId && r.status === 'Completed');
    const allLearnerRecords = DataAPI.getRecords().filter(r => r.employeeId === learnerId);
    const completedCourseIds = new Set(records.map(r => r.courseId));

    // Grouping
    const generalCourses = allCourses.filter(c => c.targetRoles.includes('All') && !c.targetSection);
    const roleCourses = allCourses.filter(c => c.targetRoles.includes(emp.role) && !c.targetSection && !c.targetRoles.includes('All'));
    const sectionCourses = allCourses.filter(c => c.targetSection === emp.section && (c.targetRoles.includes('All') || c.targetRoles.includes(emp.role)));

    const stats = DataAPI.getEmployeeStats(learnerId);

    container.innerHTML = `
        <div class="max-w-4xl w-full py-4">
            <div class="flex justify-between items-center mb-6">
                <a href="#landing" class="text-xs font-semibold text-slate-500 hover:text-slate-800 transition flex items-center gap-1">
                    ${I18N.t('back_to_home')}
                </a>
                <button onclick="logoutLearner()" class="text-xs font-semibold text-rose-500 hover:text-rose-700 transition">
                    ${I18N.t('log_out')}
                </button>
            </div>
            
            <!-- Learner Header Card -->
            <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                        ${emp.name.charAt(0)}
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h2 class="text-2xl font-bold text-slate-800">${I18N.t('welcome')}, ${emp.name}</h2>
                        </div>
                        <p class="text-xs font-mono text-slate-400 mt-0.5">${emp.id} • ${emp.email}</p>
                        <div class="flex flex-wrap gap-2 mt-2.5">
                            <span class="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold">${emp.role}</span>
                            <span class="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold">${emp.section}</span>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-72 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-xs font-bold text-slate-600 uppercase">${I18N.t('onboarding_progress')}</span>
                        <span class="text-xs font-bold text-blue-600">${stats.completed}/${stats.required}</span>
                    </div>
                    ${UI.renderProgressBar(stats.percent)}
                    <p class="text-[11px] text-slate-400 mt-2 text-right">${stats.completed} ${I18N.t('courses_completed')}</p>
                </div>
            </div>

            <!-- Roadmaps Container -->
            <div class="space-y-10" id="training-roadmap"></div>
        </div>
    `;

    const roadmap = document.getElementById('training-roadmap');
    
    const isGroupComplete = (courses) => courses.every(c => completedCourseIds.has(c.id));

    let genUnlocked = true;
    let roleUnlocked = isGroupComplete(generalCourses);
    let secUnlocked = roleUnlocked && isGroupComplete(roleCourses);

    const renderGroup = (stepNum, title, desc, courses, isGroupUnlocked) => {
        if(!courses.length) return '';
        
        let html = `
            <div>
                <div class="flex items-center justify-between mb-2">
                    <div>
                        <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                            ${title} 
                            ${!isGroupUnlocked ? `<span class="px-2.5 py-0.5 bg-slate-100 text-slate-500 rounded-full text-xs font-normal">${I18N.t('locked')}</span>` : ''}
                        </h3>
                        <p class="text-xs text-slate-400">${desc}</p>
                    </div>
                </div>
                <div class="space-y-3 mt-4">
        `;

        let previousCompleted = true;

        courses.forEach((course, index) => {
            const isCompleted = completedCourseIds.has(course.id);
            const canStart = isCompleted || (isGroupUnlocked && previousCompleted);
            const rec = allLearnerRecords.find(r => r.courseId === course.id && r.status === 'Completed');
            
            let actionButtons = '';
            let borderColor = 'border-slate-200';
            let bgStyle = 'bg-white';
            
            if (isCompleted) {
                borderColor = 'border-emerald-400';
                bgStyle = 'bg-emerald-50/20';
                const scoreText = rec && rec.score !== null ? ` • ${I18N.t('score_label')}: ${rec.score}%` : '';
                
                actionButtons = `
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold flex items-center gap-1">
                            <span>✅</span> ${scoreText ? scoreText.substring(3) : 'Completed'}
                        </span>
                        <a href="#course-${course.id}" class="rounded-lg px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition shadow-sm">
                            ${I18N.t('review_course')}
                        </a>
                        ${course.hasAssessment ? `
                            <button onclick="viewLearnerQuizReview('${learnerId}', '${course.id}')" class="rounded-lg px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition">
                                ${I18N.t('view_assessment')}
                            </button>
                        ` : ''}
                    </div>
                `;
            } else if (canStart) {
                borderColor = 'border-blue-500';
                actionButtons = `
                    <a href="#course-${course.id}" class="inline-flex items-center rounded-xl px-4 py-2 bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-sm gap-1">
                        ${I18N.current === 'th' ? 'เข้าสู่บทเรียน →' : 'Start Course →'}
                    </a>
                `;
            } else {
                borderColor = 'border-slate-200';
                bgStyle = 'bg-slate-50/60 opacity-75';
                actionButtons = `
                    <span class="text-xs font-medium text-slate-400 flex items-center gap-1">
                        ${I18N.t('locked')}
                    </span>
                `;
            }

            const courseName = (I18N.current === 'th' && course.name_th) ? course.name_th : course.name;
            html += `
                <div class="${bgStyle} rounded-2xl shadow-sm border border-slate-200 border-l-4 ${borderColor} p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:shadow">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2.5 mb-1.5">
                            <span class="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] flex items-center justify-center font-bold">${index + 1}</span>
                            <span class="text-xs font-mono font-bold text-slate-500">${course.id}</span>
                            ${course.hasAssessment ? `<span class="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] uppercase font-bold rounded">📝 Assessment</span>` : ''}
                        </div>
                        <h4 class="text-base font-bold text-slate-800 mb-1 cursor-pointer hover:text-blue-600" onclick="window.location.hash='course-${course.id}'">${courseName}</h4>
                        <p class="text-xs text-slate-500">⏱ ${course.duration}</p>
                    </div>
                    <div class="shrink-0 flex items-center">
                        ${actionButtons}
                    </div>
                </div>
            `;

            if(!isCompleted) previousCompleted = false;
        });

        html += `</div></div>`;
        return html;
    };

    roadmap.innerHTML += renderGroup(1, I18N.t('step1_title'), I18N.t('step1_desc'), generalCourses, genUnlocked);
    roadmap.innerHTML += renderGroup(2, I18N.t('step2_title'), I18N.t('step2_desc'), roleCourses, roleUnlocked);
    roadmap.innerHTML += renderGroup(3, I18N.t('step3_title'), I18N.t('step3_desc'), sectionCourses, secUnlocked);
}

window.logoutLearner = () => {
    DB.setCurrentLearner(null);
    window.location.hash = 'landing';
};

// Rich Markdown to HTML Parser
function formatRichContent(rawText) {
    if (!rawText) return '';

    let text = rawText.replace(/\r\n/g, '\n');
    const tokens = [];

    // Helper for inline formatting
    function formatInline(str) {
        if (!str) return '';
        return str
            .replace(/\$\\ge\s*(\d+)%?\\?\$/g, '&ge; $1%')
            .replace(/\\ge/g, '&ge;')
            .replace(/\\le/g, '&le;')
            .replace(/\$([^\$]+)\$/g, '$1')
            .replace(/`([^`]+)`/g, (m, code) => {
                const esc = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return `<code class="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-md font-mono text-xs border border-blue-100 font-semibold">${esc}</code>`;
            })
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>');
    }

    // 1. Preserve HTML blocks (like image containers)
    text = text.replace(/<div[\s\S]*?<\/div>/gi, (match) => {
        const id = `@@HTML_BLOCK_${tokens.length}@@`;
        tokens.push({ id, html: match });
        return `\n\n${id}\n\n`;
    });

    // 2. Fenced Code Blocks (```lang ... ```)
    text = text.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
        const id = `@@CODE_BLOCK_${tokens.length}@@`;
        const escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        const blockHtml = `
            <div class="my-4 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-md">
                ${lang ? `<div class="bg-slate-800/90 px-4 py-2 text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700/60 flex items-center justify-between"><span>${lang}</span><span class="text-[10px] text-slate-500 font-normal">Syntax Format</span></div>` : ''}
                <pre class="p-4 text-xs md:text-sm font-mono text-emerald-400 overflow-x-auto leading-relaxed whitespace-pre font-medium"><code>${escaped.trim()}</code></pre>
            </div>
        `;
        tokens.push({ id, html: blockHtml });
        return `\n\n${id}\n\n`;
    });

    // 3. Markdown Tables (| Col 1 | Col 2 | ... |)
    text = text.replace(/((?:\|[^\n]+\|\n)+)/g, (match) => {
        const lines = match.trim().split('\n').filter(l => l.trim().startsWith('|'));
        if (lines.length >= 2) {
            const id = `@@TABLE_BLOCK_${tokens.length}@@`;
            const headerCols = lines[0].split('|').slice(1, -1).map(c => c.trim());
            const hasSeparator = lines[1].includes('---');
            const dataRows = lines.slice(hasSeparator ? 2 : 1);

            let tableHtml = `
                <div class="my-5 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                    <table class="w-full text-xs text-left">
                        <thead class="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                            <tr>
                                ${headerCols.map(c => `<th class="p-3.5">${formatInline(c)}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-slate-700">
                            ${dataRows.map(row => {
                                const cols = row.split('|').slice(1, -1).map(c => c.trim());
                                return `
                                    <tr class="hover:bg-slate-50/80 transition">
                                        ${cols.map(c => `<td class="p-3.5">${formatInline(c)}</td>`).join('')}
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            tokens.push({ id, html: tableHtml });
            return `\n\n${id}\n\n`;
        }
        return match;
    });

    // 4. Line-by-line block processing for Headings, Lists, and Paragraphs
    const lines = text.split('\n');
    let outHtml = '';
    let inOl = false;
    let inNestedUl = false;
    let inUl = false;

    function closeLists() {
        let closing = '';
        if (inNestedUl) {
            closing += '</ul></li>\n';
            inNestedUl = false;
        } else if (inOl) {
            closing += '</li>\n';
        }
        if (inOl) {
            closing += '</ol>\n';
            inOl = false;
        }
        if (inUl) {
            closing += '</ul>\n';
            inUl = false;
        }
        return closing;
    }

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        if (!line) {
            if (inNestedUl) {
                outHtml += '</ul></li>\n';
                inNestedUl = false;
            }
            if (inUl) {
                outHtml += '</ul>\n';
                inUl = false;
            }
            continue;
        }

        // Token placeholder
        if (line.startsWith('@@') && line.endsWith('@@')) {
            outHtml += closeLists();
            outHtml += line + '\n';
            continue;
        }

        // Headings
        if (line.startsWith('### ')) {
            outHtml += closeLists();
            outHtml += `<h4 class="text-base font-bold text-slate-800 mt-6 mb-2.5">${formatInline(line.substring(4))}</h4>\n`;
            continue;
        }
        if (line.startsWith('## ')) {
            outHtml += closeLists();
            outHtml += `<h3 class="text-lg font-bold text-slate-800 mt-7 mb-3">${formatInline(line.substring(3))}</h3>\n`;
            continue;
        }

        // Ordered list: 1. item, 2. item
        const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
            if (inUl) {
                outHtml += '</ul>\n';
                inUl = false;
            }
            if (inNestedUl) {
                outHtml += '</ul></li>\n';
                inNestedUl = false;
            } else if (inOl) {
                outHtml += '</li>\n';
            }
            if (!inOl) {
                outHtml += '<ol class="list-decimal pl-5 my-2.5 space-y-2 text-sm md:text-base text-slate-800 font-medium">\n';
                inOl = true;
            }
            outHtml += `  <li value="${numMatch[1]}">${formatInline(numMatch[2])}\n`;
            continue;
        }

        // Unordered list: - item or * item
        if (line.startsWith('- ') || line.startsWith('* ')) {
            const itemText = line.substring(2);
            if (inOl) {
                if (!inNestedUl) {
                    outHtml += '<ul class="list-disc pl-5 my-1.5 space-y-1 text-sm font-normal text-slate-600">\n';
                    inNestedUl = true;
                }
                outHtml += `    <li>${formatInline(itemText)}</li>\n`;
            } else {
                if (!inUl) {
                    outHtml += '<ul class="list-disc pl-5 my-2.5 space-y-1.5 text-sm text-slate-700">\n';
                    inUl = true;
                }
                outHtml += `  <li>${formatInline(itemText)}</li>\n`;
            }
            continue;
        }

        // Standard text line / paragraph
        outHtml += closeLists();
        outHtml += `<p class="mb-3.5 leading-relaxed text-slate-700 text-sm md:text-base">${formatInline(line)}</p>\n`;
    }

    outHtml += closeLists();

    // 5. Restore Tokens
    tokens.forEach(tok => {
        outHtml = outHtml.replace(tok.id, tok.html);
    });

    return outHtml;
}

// 4. Course Content & Assessment Screen
function renderCourse(container, courseId) {
    const learnerId = DB.getCurrentLearner();
    if(!learnerId) {
        window.location.hash = 'landing';
        return;
    }

    const course = DataAPI.getCourses().find(c => c.id === courseId);
    if(!course) {
        container.innerHTML = `<div class="p-8 text-center text-slate-500 bg-white rounded-2xl mt-8">Course not found.</div>`;
        return;
    }

    const isThai = I18N.current === 'th';
    const courseName = (isThai && course.name_th) ? course.name_th : course.name;
    const courseDesc = (isThai && course.description_th) ? course.description_th : course.description;
    const learningObjs = (isThai && course.learningObjectives_th) ? course.learningObjectives_th : (course.learningObjectives || []);
    const contentSecs = (isThai && course.content_th) ? course.content_th : (course.content || []);

    const records = DataAPI.getRecords().filter(r => r.employeeId === learnerId && r.courseId === courseId && r.status === 'Completed');
    const isCompleted = records.length > 0;
    const completedRecord = isCompleted ? records[records.length - 1] : null;

    const quiz = DataAPI.getQuizzes().find(q => q.courseId === courseId);
    
    let contentHtml = '';
    if (contentSecs && contentSecs.length > 0) {
        if(learningObjs && learningObjs.length > 0) {
            contentHtml += `
                <div class="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-8">
                    <h3 class="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <span>🎯</span> ${I18N.t('learning_objectives')}
                    </h3>
                    <ul class="list-disc pl-5 text-slate-700 text-sm space-y-1.5">
                        ${learningObjs.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        contentSecs.forEach((sec, idx) => {
            const cleanTitle = (sec.title || '').replace(/^\d+[\.:\s]\s*/, '');
            const formattedBody = formatRichContent(sec.body || '');
            
            contentHtml += `
                <div class="mb-10">
                    <h3 class="text-lg font-bold text-slate-800 mb-3 pb-2 border-b border-slate-100">${isThai ? 'หัวข้อที่' : 'Section'} ${idx+1}: ${cleanTitle}</h3>
                    <div>${formattedBody}</div>
                </div>
            `;
        });
    } else {
        contentHtml += `
            <div class="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                <h3 class="text-base font-bold text-slate-800 mb-2">${isThai ? 'ภาพรวมหลักสูตร' : 'Course Overview'}</h3>
                <p class="text-slate-700 text-sm leading-relaxed">${courseDesc}</p>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="max-w-5xl w-full py-4">
            <div class="mb-4">
                <a href="#my-training" class="text-xs font-semibold text-blue-600 hover:text-blue-800 transition flex items-center gap-1">
                    ${I18N.t('back_to_roadmap')}
                </a>
            </div>
            
            ${isCompleted ? `
                <!-- Completed Notice Banner -->
                <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold text-xl">✓</div>
                        <div>
                            <h4 class="font-bold text-emerald-900 text-sm">${I18N.t('course_completed_msg')}</h4>
                            <p class="text-xs text-emerald-700 mt-0.5">Date: ${completedRecord.trainingDate} ${completedRecord.score !== null ? `• ${I18N.t('score_label')}: ${completedRecord.score}%` : ''}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        ${course.hasAssessment ? `
                            <button onclick="viewLearnerQuizReview('${learnerId}', '${course.id}')" class="rounded-xl px-4 py-2 bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-sm">
                                ${I18N.t('review_answers_btn')}
                            </button>
                        ` : ''}
                    </div>
                </div>
            ` : ''}

            <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 mb-8">
                <div class="mb-8 border-b border-slate-100 pb-6">
                    <div class="flex flex-wrap gap-2 mb-3">
                        <span class="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-mono font-bold">${course.id}</span>
                        <span class="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold">${course.category}</span>
                        ${course.hasAssessment ? `<span class="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold">📝 Assessment</span>` : ''}
                    </div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">${courseName}</h1>
                    <p class="text-xs text-slate-500">⏱ Duration: ${course.duration}</p>
                </div>
                
                <div class="course-body">
                    ${contentHtml}
                    
                    <div class="mt-12 pt-8 border-t border-slate-200">
                        <p class="text-center text-slate-400 text-xs font-medium mb-8">${I18N.t('end_of_content')}</p>
                        
                        <div id="completion-area" class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <label class="flex items-start space-x-3 mb-6 cursor-pointer">
                                <input type="checkbox" id="understand-check" ${isCompleted ? 'checked' : ''} class="w-5 h-5 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                                <span class="text-slate-700 font-medium text-sm leading-snug">${I18N.t('confirm_read')}</span>
                            </label>
                            
                            ${course.hasAssessment && quiz ? `
                                <button id="take-assessment-btn" ${!isCompleted ? 'disabled' : ''} class="w-full rounded-xl px-6 py-3.5 bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">
                                    ${isCompleted ? I18N.t('retake_assessment') : I18N.t('take_assessment')}
                                </button>
                            ` : `
                                <button id="complete-course-btn" ${!isCompleted ? 'disabled' : ''} class="w-full rounded-xl px-6 py-3.5 bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">
                                    ${I18N.t('confirm_completion')}
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="quiz-area" class="hidden bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 mb-8">
                <!-- Quiz dynamically injected -->
            </div>
        </div>
    `;

    const check = document.getElementById('understand-check');
    const takeAssBtn = document.getElementById('take-assessment-btn');
    const compBtn = document.getElementById('complete-course-btn');
    const quizArea = document.getElementById('quiz-area');
    
    check.addEventListener('change', (e) => {
        if(takeAssBtn) takeAssBtn.disabled = !e.target.checked;
        if(compBtn) compBtn.disabled = !e.target.checked;
    });

    if(compBtn) {
        compBtn.addEventListener('click', () => {
            saveTrainingRecord(learnerId, courseId, 'Completed', null, null, 'Self-study', 'Akkharasaran S.');
            window.location.hash = 'my-training';
        });
    }

    if(takeAssBtn) {
        takeAssBtn.addEventListener('click', () => {
            document.getElementById('completion-area').classList.add('hidden');
            quizArea.classList.remove('hidden');
            renderQuiz(quizArea, quiz, learnerId, courseId);
            quizArea.scrollIntoView({behavior: 'smooth'});
        });
    }
}

// 5. Assessment Flow
function renderQuiz(container, quiz, learnerId, courseId) {
    let html = `
        <div class="mb-8 border-b border-slate-100 pb-5">
            <span class="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold mb-2 inline-block">ASSESSMENT</span>
            <h2 class="text-2xl font-bold text-slate-800">${quiz.title}</h2>
            <p class="text-xs text-slate-500 mt-1">Passing Score: ${quiz.passingScore}% • ${quiz.questions.length} questions</p>
        </div>
        <form id="quiz-form" class="space-y-6">
    `;

    quiz.questions.forEach((q, idx) => {
        html += `
            <div class="quiz-q bg-slate-50/50 p-5 rounded-2xl border border-slate-100" data-id="${q.id}">
                <p class="font-bold text-slate-800 text-sm mb-3">${idx + 1}. ${q.question}</p>
                <div class="space-y-2">
                    ${q.options.map((opt, oIdx) => `
                        <label class="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-blue-50/30 hover:border-blue-300 cursor-pointer transition">
                            <input type="radio" name="q_${q.id}" value="${oIdx}" required class="mt-0.5 text-blue-600 focus:ring-blue-500">
                            <span class="text-slate-700 text-xs md:text-sm leading-snug">${opt}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });

    html += `
            <div id="quiz-result" class="hidden p-6 rounded-2xl text-center"></div>
            <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button type="submit" id="quiz-submit-btn" class="flex-1 rounded-xl px-6 py-3.5 bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition shadow-sm">${I18N.t('submit_answers')}</button>
                <a href="#my-training" id="quiz-back-btn" class="hidden flex-1 text-center rounded-xl px-6 py-3.5 bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition">${I18N.t('back_to_roadmap')}</a>
            </div>
        </form>
    `;
    container.innerHTML = html;

    document.getElementById('quiz-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        let score = 0;
        let submittedAnswers = [];
        quiz.questions.forEach(q => {
            const selected = document.querySelector(`input[name="q_${q.id}"]:checked`);
            const val = selected ? parseInt(selected.value) : -1;
            submittedAnswers.push(val);
            if(val === q.correctAnswer) {
                score++;
            }
        });

        const percent = Math.round((score / quiz.questions.length) * 100);
        const passed = percent >= quiz.passingScore;
        const resId = 'QR-' + Date.now();
        
        // Save quiz result with submitted answers array
        const results = DataAPI.getQuizResults();
        results.push({
            id: resId,
            quizId: quiz.id,
            employeeId: learnerId,
            score: percent,
            totalQuestions: quiz.questions.length,
            correctAnswers: score,
            passed: passed,
            answers: submittedAnswers,
            date: new Date().toISOString().split('T')[0]
        });
        DB.set('sye_quiz_results', results);

        // Save training record
        saveTrainingRecord(learnerId, courseId, passed ? 'Completed' : 'Failed', percent, passed, 'Online', 'Akkharasaran S.');

        // Show result UI
        const resDiv = document.getElementById('quiz-result');
        resDiv.classList.remove('hidden');
        if(passed) {
            resDiv.className = 'p-6 rounded-2xl text-center bg-emerald-50 border border-emerald-200 mb-6';
            resDiv.innerHTML = `
                <h3 class="text-xl font-bold text-emerald-800 mb-2">${I18N.t('congrats_pass')}</h3>
                <p class="text-emerald-700 font-semibold text-sm mb-4">${I18N.t('score_label')}: ${percent}% (${score}/${quiz.questions.length} correct)</p>
                <button type="button" onclick="viewQuizBreakdownModal('${resId}')" class="rounded-xl px-4 py-2 bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-sm">
                    ${I18N.t('review_answers_btn')}
                </button>
            `;
            document.getElementById('quiz-submit-btn').classList.add('hidden');
            document.getElementById('quiz-back-btn').classList.remove('hidden');
        } else {
            resDiv.className = 'p-6 rounded-2xl text-center bg-rose-50 border border-rose-200 mb-6';
            resDiv.innerHTML = `
                <h3 class="text-xl font-bold text-rose-800 mb-2">${I18N.t('not_passed')}</h3>
                <p class="text-rose-700 font-medium text-sm mb-4">${I18N.t('score_label')}: ${percent}% (${I18N.t('min_pass')}: ${quiz.passingScore}%)</p>
                <div class="flex justify-center gap-3">
                    <button type="button" onclick="renderCourse(document.getElementById('learner-content'), '${courseId}')" class="rounded-xl px-4 py-2 bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition shadow-sm">
                        ${I18N.t('retake_assessment')}
                    </button>
                    <button type="button" onclick="viewQuizBreakdownModal('${resId}')" class="rounded-xl px-4 py-2 bg-white border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50 transition">
                        ${I18N.t('review_answers_btn')}
                    </button>
                </div>
            `;
            document.getElementById('quiz-submit-btn').classList.add('hidden');
            document.getElementById('quiz-back-btn').classList.remove('hidden');
        }
        resDiv.scrollIntoView({behavior: 'smooth'});
    });
}

function saveTrainingRecord(empId, courseId, status, score, passed, method, trainer = 'Akkharasaran S.') {
    const records = DataAPI.getRecords();
    const course = DataAPI.getCourses().find(c => c.id === courseId);
    
    records.push({
        id: 'TR-' + Date.now(),
        employeeId: empId,
        courseId: courseId,
        trainingDate: new Date().toISOString().split('T')[0],
        completionDate: status === 'Completed' ? new Date().toISOString().split('T')[0] : null,
        trainer: trainer,
        method: method,
        status: status,
        score: score,
        passed: passed,
        remarks: ''
    });
    DB.set('sye_training_records', records);
    
    const emp = DataAPI.getEmployees().find(e => e.id === empId);
    DB.logActivity('training_completed', `${emp ? emp.name : empId} completed ${course ? course.name : courseId} (${status})${score !== null ? ` with score ${score}%` : ''}`, courseId);
}

// 6. Detailed Quiz Breakdown & Answer Review Modal
window.viewLearnerQuizReview = (empId, courseId) => {
    const quiz = DataAPI.getQuizzes().find(q => q.courseId === courseId);
    if (!quiz) {
        alert('Quiz not found for this course.');
        return;
    }
    const results = DataAPI.getQuizResults().filter(r => r.employeeId === empId && r.quizId === quiz.id);
    if (!results.length) {
        viewQuizPreview(quiz.id);
        return;
    }
    const latestResult = results[results.length - 1];
    viewQuizBreakdownModal(latestResult.id);
};

window.viewQuizBreakdownModal = (resId) => {
    const result = DataAPI.getQuizResults().find(r => r.id === resId);
    if (!result) return;
    
    const quiz = DataAPI.getQuizzes().find(q => q.id === result.quizId);
    if (!quiz) return;
    
    const emp = DataAPI.getEmployees().find(e => e.id === result.employeeId) || { name: result.employeeId, role: '-', section: '-' };
    
    let html = `
        <div class="space-y-6">
            <!-- Header Result Summary -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
                <div>
                    <h3 class="font-bold text-slate-800 text-base">${quiz.title}</h3>
                    <p class="text-xs text-slate-500 mt-1">${emp.name} (${emp.id}) • Date: ${result.date}</p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <span class="text-2xl font-extrabold ${result.passed ? 'text-emerald-600' : 'text-rose-600'}">${result.score}%</span>
                        <p class="text-[10px] text-slate-400">Passing: ${quiz.passingScore}%</p>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-bold ${result.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                        ${result.passed ? 'PASS' : 'FAIL'}
                    </span>
                </div>
            </div>

            <!-- Questions Breakdown -->
            <div class="space-y-4">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">Questions Breakdown & Explanations</h4>
                ${quiz.questions.map((q, idx) => {
                    const chosen = (result.answers && result.answers[idx] !== undefined) ? result.answers[idx] : -1;
                    const isCorrect = chosen === q.correctAnswer;
                    
                    return `
                        <div class="p-4 rounded-2xl border ${isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'}">
                            <p class="text-sm font-bold text-slate-800 mb-2.5">
                                ${idx + 1}. ${q.question}
                                ${isCorrect ? `<span class="ml-2 text-xs font-bold text-emerald-600">✓ Correct</span>` : `<span class="ml-2 text-xs font-bold text-rose-600">✗ Incorrect</span>`}
                            </p>
                            <div class="space-y-1.5">
                                ${q.options.map((opt, oIdx) => {
                                    let itemStyle = 'border-slate-200 bg-white text-slate-600';
                                    let badge = '';
                                    
                                    if (oIdx === q.correctAnswer) {
                                        itemStyle = 'border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold';
                                        badge = `<span class="ml-auto text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded">${I18N.t('correct_ans')}</span>`;
                                    } else if (oIdx === chosen && !isCorrect) {
                                        itemStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-semibold';
                                        badge = `<span class="ml-auto text-[10px] bg-rose-600 text-white font-bold px-2 py-0.5 rounded">${I18N.t('your_choice')}</span>`;
                                    }
                                    
                                    return `
                                        <div class="flex items-center p-2.5 rounded-xl border text-xs ${itemStyle}">
                                            <span class="w-5 font-bold">${String.fromCharCode(65 + oIdx)}.</span>
                                            <span class="flex-1">${opt}</span>
                                            ${badge}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    
    UI.showModal(I18N.t('assessment_review_title'), html, null, '', false);
};

// Preview empty quiz questions
window.viewQuizPreview = (quizId) => {
    const quiz = DataAPI.getQuizzes().find(q => q.id === quizId);
    if (!quiz) return;
    
    let html = `
        <div class="space-y-6">
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 class="font-bold text-slate-800 text-base">${quiz.title}</h3>
                <p class="text-xs text-slate-500 mt-1">Passing Score: ${quiz.passingScore}% • ${quiz.questions.length} total questions</p>
            </div>
            <div class="space-y-4">
                ${quiz.questions.map((q, idx) => `
                    <div class="p-4 rounded-2xl border border-slate-200 bg-white">
                        <p class="text-sm font-bold text-slate-800 mb-2">${idx + 1}. ${q.question}</p>
                        <div class="space-y-1.5">
                            ${q.options.map((opt, oIdx) => `
                                <div class="flex items-center p-2 rounded-xl text-xs ${oIdx === q.correctAnswer ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-medium' : 'bg-slate-50 text-slate-600'}">
                                    <span class="w-5 font-bold">${String.fromCharCode(65 + oIdx)}.</span>
                                    <span>${opt}</span>
                                    ${oIdx === q.correctAnswer ? '<span class="ml-auto text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">Answer Key</span>' : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    UI.showModal('Quiz Question Bank Preview', html, null, '', false);
};

// ===== ADMIN PORTAL SCREENS =====

// 1. Dashboard
function renderDashboard(container) {
    const employees = DataAPI.getEmployees();
    const courses = DataAPI.getCourses();
    const logs = DataAPI.getLogs();

    let totalEmps = employees.length;
    let compl = 0, inprog = 0;
    
    employees.forEach(emp => {
        const stats = DataAPI.getEmployeeStats(emp.id);
        if(stats.percent === 100) compl++;
        else if(stats.percent > 0) inprog++;
    });

    const overallCompRate = totalEmps ? Math.round((compl / totalEmps) * 100) : 0;
    const sortedLogs = [...logs].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));

    container.innerHTML = `
        <!-- Stats Summary Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 border-l-4 border-l-blue-500">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Engineers</p>
                        <p class="text-3xl font-extrabold text-slate-800 mt-1">${totalEmps}</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl">👥</div>
                </div>
            </div>
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 border-l-4 border-l-emerald-500">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Fully Onboarded (100%)</p>
                        <p class="text-3xl font-extrabold text-slate-800 mt-1">${compl}</p>
                    </div>
                    <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl">✅</div>
                </div>
            </div>
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 border-l-4 border-l-amber-500">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">In Progress</p>
                        <p class="text-3xl font-extrabold text-slate-800 mt-1">${inprog}</p>
                    </div>
                    <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-2xl">🔄</div>
                </div>
            </div>
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 border-l-4 border-l-indigo-500">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Completion</p>
                        <p class="text-3xl font-extrabold text-slate-800 mt-1">${overallCompRate}%</p>
                    </div>
                    <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-2xl">📈</div>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Training Completion by Section</h3>
                <div class="relative h-64"><canvas id="sectionChart"></canvas></div>
            </div>
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Progress by Role</h3>
                <div class="relative h-64"><canvas id="roleChart"></canvas></div>
            </div>
        </div>

        <!-- Statistics & Activity Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">SYE Knowledge Base Metrics</h3>
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <div class="text-3xl font-extrabold text-blue-600">${courses.length}</div>
                        <div class="text-xs font-bold text-slate-500 mt-1 uppercase">Total Courses</div>
                    </div>
                    <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <div class="text-3xl font-extrabold text-indigo-600">${DataAPI.getWIs().length}</div>
                        <div class="text-xs font-bold text-slate-500 mt-1 uppercase">Work Instructions</div>
                    </div>
                    <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <div class="text-3xl font-extrabold text-amber-600">${DataAPI.getQuizzes().length}</div>
                        <div class="text-xs font-bold text-slate-500 mt-1 uppercase">Assessments</div>
                    </div>
                </div>
                <div class="mt-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                    <div>
                        <h4 class="font-bold text-blue-900 text-xs">System Enabler (SYE) Division</h4>
                        <p class="text-xs text-blue-700 mt-0.5">Engineering Onboarding & System Development Department</p>
                    </div>
                    <a href="#landing" class="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition">Learner Portal</a>
                </div>
            </div>
            
            <div class="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider">Recent Activity</h3>
                    <span class="text-[10px] font-bold text-slate-400">${sortedLogs.length} logs</span>
                </div>
                <div class="flex-1 overflow-y-auto max-h-60 pr-2">
                    <div class="space-y-3.5">
                        ${sortedLogs.slice(0, 15).map(log => `
                            <div class="flex items-start">
                                <div class="w-2 h-2 mt-1.5 rounded-full bg-blue-500 mr-2.5 shrink-0"></div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-xs text-slate-700 leading-snug break-words">${log.description}</p>
                                    <p class="text-[10px] text-slate-400 mt-0.5">${new Date(log.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                        `).join('')}
                        ${sortedLogs.length === 0 ? '<p class="text-xs text-slate-400 italic">No activity recorded.</p>' : ''}
                    </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const secData = SECTIONS.map(sec => {
            const emps = employees.filter(e => e.section === sec);
            if(!emps.length) return 0;
            const fullyTrained = emps.filter(e => DataAPI.getEmployeeStats(e.id).percent === 100).length;
            return fullyTrained;
        });

        const ctx1 = document.getElementById('sectionChart');
        if(ctx1) {
            const chart1 = new Chart(ctx1, {
                type: 'doughnut',
                data: {
                    labels: SECTIONS,
                    datasets: [{
                        data: secData,
                        backgroundColor: ['#3b82f6', '#10b981', '#6366f1']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } }
                }
            });
            currentCharts.push(chart1);
        }

        const roleLabels = ROLES;
        const roleAverages = roleLabels.map(role => {
            const emps = employees.filter(e => e.role === role);
            if(!emps.length) return 0;
            const total = emps.reduce((acc, curr) => acc + DataAPI.getEmployeeStats(curr.id).percent, 0);
            return Math.round(total / emps.length);
        });

        const ctx2 = document.getElementById('roleChart');
        if(ctx2) {
            const chart2 = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: roleLabels,
                    datasets: [{
                        label: 'Average Progress %',
                        data: roleAverages,
                        backgroundColor: '#8b5cf6',
                        borderRadius: 6
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { x: { max: 100, min: 0 } },
                    plugins: { legend: { display: false } }
                }
            });
            currentCharts.push(chart2);
        }
    }, 50);
}

// 2. Training Catalog
function renderCatalog(container) {
    const courses = DataAPI.getCourses();
    
    container.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 class="font-bold text-slate-800 text-lg">Training Catalog (${courses.length} Courses)</h3>
            <button onclick="openCourseModal()" class="rounded-xl px-4 py-2.5 bg-blue-600 text-white text-xs font-bold shadow-sm hover:bg-blue-700 transition flex items-center gap-1.5 shrink-0">
                <span>+</span> Add Course
            </button>
        </div>
        
        <!-- Category Filters -->
        <div class="flex flex-wrap gap-2 mb-6" id="catalog-filters">
            <button class="cat-filter-btn active px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-white transition" data-cat="All">All</button>
            ${CATEGORIES.map(c => `
                <button class="cat-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition" data-cat="${c}">${c}</button>
            `).join('')}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="catalog-grid"></div>
    `;

    const renderGrid = (category = 'All') => {
        const filtered = category === 'All' ? courses : courses.filter(c => c.category === category);
        const grid = document.getElementById('catalog-grid');
        
        grid.innerHTML = filtered.map(c => `
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition">
                <div>
                    <div class="flex justify-between items-start mb-2">
                        <span class="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">${c.id}</span>
                        <span class="text-[11px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md">${c.category}</span>
                    </div>
                    <h4 class="font-bold text-slate-800 text-base mb-2">${c.name}</h4>
                    <p class="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">${c.description}</p>
                </div>
                <div>
                    <div class="flex flex-wrap gap-2 text-xs text-slate-500 border-t border-slate-100 pt-3 mb-4">
                        <span>⏱ ${c.duration}</span>
                        <span>👥 ${c.targetRoles.join(', ')}</span>
                        ${c.hasAssessment ? `<span class="text-amber-600 font-bold">📝 Assessment</span>` : ''}
                    </div>
                    <div class="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                        <button onclick="previewCourseContent('${c.id}')" class="text-xs font-bold text-slate-600 hover:text-slate-900 px-2 py-1 rounded">Read Material</button>
                        <button onclick="openCourseModal('${c.id}')" class="text-xs font-bold text-blue-600 hover:text-blue-800 px-2 py-1 rounded">Edit</button>
                        <button onclick="deleteCourse('${c.id}')" class="text-xs font-bold text-rose-500 hover:text-rose-700 px-2 py-1 rounded">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    };

    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.cat-filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-slate-800', 'text-white');
                b.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
            });
            e.target.classList.add('active', 'bg-slate-800', 'text-white');
            e.target.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');
            renderGrid(e.target.dataset.cat);
        });
    });

    renderGrid('All');
}

window.previewCourseContent = (courseId) => {
    const course = DataAPI.getCourses().find(c => c.id === courseId);
    if (!course) return;
    
    let contentHtml = '';
    if (course.content && course.content.length > 0) {
        if(course.learningObjectives) {
            contentHtml += `
                <div class="bg-blue-50/50 p-4 rounded-xl mb-4 text-xs">
                    <h4 class="font-bold text-blue-900 mb-2">Learning Objectives</h4>
                    <ul class="list-disc pl-4 space-y-1">${course.learningObjectives.map(o=>`<li>${o}</li>`).join('')}</ul>
                </div>
            `;
        }
        course.content.forEach((sec, idx) => {
            contentHtml += `
                <div class="mb-4">
                    <h4 class="font-bold text-slate-800 text-sm mb-1">${idx+1}. ${sec.title}</h4>
                    <div class="text-xs text-slate-600 leading-relaxed">${sec.body}</div>
                </div>
            `;
        });
    } else {
        contentHtml += `<p class="text-xs text-slate-600">${course.description}</p>`;
    }
    
    UI.showModal(`Course Material: ${course.name}`, `<div class="space-y-4 max-h-[70vh] overflow-y-auto">${contentHtml}</div>`, null, '', false);
};

window.openCourseModal = (id = null) => {
    const isEdit = !!id;
    const course = isEdit ? DataAPI.getCourses().find(c => c.id === id) : { category: 'General', duration: '2 hours', targetRoles: ['All'] };
    
    let html = `
        <form id="course-form" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Course ID</label>
                    <input type="text" id="c-id" value="${course.id || ''}" ${isEdit ? 'disabled' : 'required'} class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                    <select id="c-cat" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                        ${CATEGORIES.map(cat => `<option value="${cat}" ${course.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Course Name</label>
                <input type="text" id="c-name" value="${course.name || ''}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea id="c-desc" rows="3" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">${course.description || ''}</textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
                    <input type="text" id="c-dur" value="${course.duration || '2 hours'}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Target Section (Optional)</label>
                    <select id="c-sec" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                        <option value="">None (All Sections)</option>
                        ${SECTIONS.map(s => `<option value="${s}" ${course.targetSection === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="flex items-center space-x-2 pt-2">
                <input type="checkbox" id="c-ass" ${course.hasAssessment ? 'checked' : ''} class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                <label for="c-ass" class="text-xs font-semibold text-slate-700">Has Knowledge Assessment Quiz</label>
            </div>
        </form>
    `;
    
    UI.showModal(isEdit ? 'Edit Course' : 'Add New Course', html, () => {
        const cid = document.getElementById('c-id').value.trim();
        const cname = document.getElementById('c-name').value.trim();
        if(!cid || !cname) { alert('Course ID and Name are required'); return false; }
        
        const newCourse = {
            id: cid,
            name: cname,
            category: document.getElementById('c-cat').value,
            description: document.getElementById('c-desc').value,
            duration: document.getElementById('c-dur').value,
            targetRoles: course.targetRoles || ['All'],
            targetSection: document.getElementById('c-sec').value || null,
            prerequisites: course.prerequisites || [],
            hasAssessment: document.getElementById('c-ass').checked,
            createdDate: course.createdDate || '2025-01-05',
            learningObjectives: course.learningObjectives || [],
            content: course.content || []
        };

        let courses = DataAPI.getCourses();
        if(isEdit) {
            courses = courses.map(c => c.id === cid ? newCourse : c);
            DB.logActivity('course_updated', `Course ${cid} updated`);
        } else {
            if(courses.find(c => c.id === cid)) { alert('Course ID already exists'); return false; }
            courses.push(newCourse);
            DB.logActivity('course_added', `Course ${cid} added`);
        }
        DB.set('sye_courses', courses);
        renderCatalog(document.getElementById('admin-content'));
        return true;
    });
};

window.deleteCourse = (id) => {
    if(confirm(`Are you sure you want to delete course ${id}?`)) {
        let courses = DataAPI.getCourses().filter(c => c.id !== id);
        DB.set('sye_courses', courses);
        DB.logActivity('course_deleted', `Course ${id} deleted`);
        renderCatalog(document.getElementById('admin-content'));
    }
};

// 3. Employees Management
function renderEmployees(container) {
    const emps = DataAPI.getEmployees();
    
    container.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 class="font-bold text-slate-800 text-lg">Employees Directory (${emps.length} Total)</h3>
            <button onclick="openEmpModal()" class="rounded-xl px-4 py-2.5 bg-blue-600 text-white text-xs font-bold shadow-sm hover:bg-blue-700 transition flex items-center gap-1.5 shrink-0">
                <span>+</span> Add Employee
            </button>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div class="p-4 border-b border-slate-100 flex flex-wrap gap-3 bg-slate-50/50">
                <select id="emp-section-filter" class="rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none bg-white font-medium">
                    <option value="All">All Sections</option>
                    ${SECTIONS.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
                <select id="emp-role-filter" class="rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none bg-white font-medium">
                    <option value="All">All Roles</option>
                    ${ROLES.map(r => `<option value="${r}">${r}</option>`).join('')}
                </select>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-slate-600">
                    <thead class="bg-white text-[11px] uppercase text-slate-400 border-b border-slate-100 sticky top-0 z-10 font-bold tracking-wider">
                        <tr>
                            <th class="px-5 py-3.5">ID</th>
                            <th class="px-5 py-3.5">Name</th>
                            <th class="px-5 py-3.5">Role</th>
                            <th class="px-5 py-3.5">Section</th>
                            <th class="px-5 py-3.5 w-48">Onboarding Progress</th>
                            <th class="px-5 py-3.5">Status</th>
                            <th class="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="emp-tbody" class="divide-y divide-slate-100"></tbody>
                </table>
            </div>
        </div>
    `;
    
    const renderTable = () => {
        const sf = document.getElementById('emp-section-filter').value;
        const rf = document.getElementById('emp-role-filter').value;
        
        let filtered = emps;
        if(sf !== 'All') filtered = filtered.filter(e => e.section === sf);
        if(rf !== 'All') filtered = filtered.filter(e => e.role === rf);
        
        const tbody = document.getElementById('emp-tbody');
        tbody.innerHTML = filtered.map(emp => {
            const stats = DataAPI.getEmployeeStats(emp.id);
            return `
                <tr class="hover:bg-slate-50 transition">
                    <td class="px-5 py-3.5 font-mono text-xs cursor-pointer text-blue-600 font-bold" onclick="viewEmployeeDetail('${emp.id}')">${emp.id}</td>
                    <td class="px-5 py-3.5 font-bold text-slate-800 cursor-pointer" onclick="viewEmployeeDetail('${emp.id}')">${emp.name}</td>
                    <td class="px-5 py-3.5 font-medium">${emp.role}</td>
                    <td class="px-5 py-3.5 text-slate-500">${emp.section}</td>
                    <td class="px-5 py-3.5">${UI.renderProgressBar(stats.percent)}</td>
                    <td class="px-5 py-3.5">${UI.renderBadge(emp.status)}</td>
                    <td class="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                        <button onclick="viewEmployeeDetail('${emp.id}')" class="text-slate-600 hover:text-slate-900 text-xs font-bold">Profile</button>
                        <button onclick="openEmpModal('${emp.id}')" class="text-blue-600 hover:text-blue-800 text-xs font-bold">Edit</button>
                        <button onclick="deleteEmp('${emp.id}')" class="text-rose-500 hover:text-rose-700 text-xs font-bold">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
    };
    
    document.getElementById('emp-section-filter').addEventListener('change', renderTable);
    document.getElementById('emp-role-filter').addEventListener('change', renderTable);
    renderTable();
}

window.openEmpModal = (id = null) => {
    const isEdit = !!id;
    const emp = isEdit ? DataAPI.getEmployees().find(e => e.id === id) : { status: 'Active' };
    
    let html = `
        <form id="emp-form" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Employee ID</label>
                    <input type="text" id="e-id" value="${emp.id || ''}" ${isEdit ? 'disabled' : 'required'} class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                    <select id="e-status" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                        <option value="Active" ${emp.status === 'Active' ? 'selected' : ''}>Active</option>
                        <option value="Inactive" ${emp.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                    </select>
                </div>
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input type="text" id="e-name" value="${emp.name || ''}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input type="email" id="e-email" value="${emp.email || ''}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                    <select id="e-role" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                        ${ROLES.map(r => `<option value="${r}" ${emp.role === r ? 'selected' : ''}>${r}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Section</label>
                    <select id="e-section" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                        ${SECTIONS.map(s => `<option value="${s}" ${emp.section === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Join Date (2025+)</label>
                <input type="date" id="e-date" value="${emp.joinDate || new Date().toISOString().split('T')[0]}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
            </div>
        </form>
    `;
    
    UI.showModal(isEdit ? 'Edit Employee Record' : 'Add New Employee', html, () => {
        const eid = document.getElementById('e-id').value.trim();
        const ename = document.getElementById('e-name').value.trim();
        if(!eid || !ename) { alert('ID and Name are required'); return false; }
        
        const newEmp = {
            id: eid,
            name: ename,
            email: document.getElementById('e-email').value,
            role: document.getElementById('e-role').value,
            section: document.getElementById('e-section').value,
            joinDate: document.getElementById('e-date').value,
            status: document.getElementById('e-status').value
        };

        let emps = DataAPI.getEmployees();
        if(isEdit) {
            emps = emps.map(e => e.id === eid ? newEmp : e);
            DB.logActivity('employee_updated', `Employee ${eid} (${ename}) updated`);
        } else {
            if(emps.find(e => e.id === eid)) { alert('Employee ID already exists'); return false; }
            emps.push(newEmp);
            DB.logActivity('employee_added', `Employee ${eid} (${ename}) added`);
        }
        DB.set('sye_employees', emps);
        renderEmployees(document.getElementById('admin-content'));
        return true;
    });
};

window.deleteEmp = (id) => {
    if(confirm(`Are you sure you want to delete employee record ${id}?`)) {
        let emps = DataAPI.getEmployees().filter(e => e.id !== id);
        DB.set('sye_employees', emps);
        DB.logActivity('employee_deleted', `Employee ${id} deleted`);
        renderEmployees(document.getElementById('admin-content'));
    }
};

window.viewEmployeeDetail = (id) => {
    const emp = DataAPI.getEmployees().find(e => e.id === id);
    if(!emp) return;
    
    const stats = DataAPI.getEmployeeStats(id);
    const records = DataAPI.getRecords().filter(r => r.employeeId === id);
    const courses = DataAPI.getCourses();
    records.sort((a,b) => new Date(b.trainingDate) - new Date(a.trainingDate));
    
    let html = `
        <div class="space-y-6">
            <div class="flex justify-between items-start">
                <div class="flex items-center space-x-4">
                    <div class="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">${emp.name.charAt(0)}</div>
                    <div>
                        <h2 class="text-xl font-bold text-slate-800">${emp.name} <span class="text-xs font-mono text-slate-400 ml-2">(${emp.id})</span></h2>
                        <p class="text-xs text-slate-500 mt-1">${emp.role} • ${emp.section} • Joined ${emp.joinDate}</p>
                    </div>
                </div>
                ${UI.renderBadge(emp.status)}
            </div>
            
            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div class="flex justify-between items-center mb-2">
                    <h4 class="text-xs font-bold text-slate-700 uppercase">Onboarding Curriculum Completion</h4>
                    <span class="text-xs font-bold text-blue-600">${stats.completed} / ${stats.required} Required</span>
                </div>
                ${UI.renderProgressBar(stats.percent)}
            </div>
            
            <div>
                <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Training & Assessment History (${records.length})</h4>
                ${records.length ? `
                <div class="border border-slate-200 rounded-2xl overflow-hidden">
                    <table class="w-full text-left text-xs text-slate-600">
                        <thead class="bg-slate-50 font-bold text-slate-500">
                            <tr>
                                <th class="px-4 py-2.5">Date</th>
                                <th class="px-4 py-2.5">Course</th>
                                <th class="px-4 py-2.5">Trainer</th>
                                <th class="px-4 py-2.5">Score</th>
                                <th class="px-4 py-2.5">Status</th>
                                <th class="px-4 py-2.5 text-right">Assessment</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${records.map(r => {
                                const c = courses.find(c => c.id === r.courseId);
                                return `
                                    <tr class="hover:bg-slate-50">
                                        <td class="px-4 py-2.5 whitespace-nowrap">${r.trainingDate}</td>
                                        <td class="px-4 py-2.5 font-semibold text-slate-800">${c ? c.name : r.courseId}</td>
                                        <td class="px-4 py-2.5 text-slate-500">${r.trainer || 'Akkharasaran S.'}</td>
                                        <td class="px-4 py-2.5 font-bold">${r.score !== null ? `${r.score}%` : '-'}</td>
                                        <td class="px-4 py-2.5">${UI.renderBadge(r.status)}</td>
                                        <td class="px-4 py-2.5 text-right">
                                            ${(c && c.hasAssessment) ? `
                                                <button onclick="viewLearnerQuizReview('${emp.id}', '${r.courseId}')" class="text-blue-600 hover:text-blue-800 font-bold">
                                                    Review Answers
                                                </button>
                                            ` : '<span class="text-slate-300">-</span>'}
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>` : `<p class="text-xs text-slate-400 italic">No training records found for this employee.</p>`}
            </div>
        </div>
    `;
    UI.showModal('Employee Training Profile', html, null, '', false);
};

// 4. Training Records CRUD
function renderRecords(container) {
    const records = DataAPI.getRecords();
    const emps = DataAPI.getEmployees();
    const courses = DataAPI.getCourses();
    records.sort((a,b) => new Date(b.trainingDate) - new Date(a.trainingDate));

    container.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 class="font-bold text-slate-800 text-lg">Training Records Log (${records.length} Records)</h3>
            <button onclick="openRecordModal()" class="rounded-xl px-4 py-2.5 bg-blue-600 text-white text-xs font-bold shadow-sm hover:bg-blue-700 transition flex items-center gap-1.5 shrink-0">
                <span>+</span> Add Training Record
            </button>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-slate-600">
                    <thead class="bg-white text-[11px] uppercase text-slate-400 border-b border-slate-100 font-bold tracking-wider">
                        <tr>
                            <th class="px-5 py-3.5">Date</th>
                            <th class="px-5 py-3.5">Employee</th>
                            <th class="px-5 py-3.5">Course</th>
                            <th class="px-5 py-3.5">Trainer</th>
                            <th class="px-5 py-3.5">Score</th>
                            <th class="px-5 py-3.5">Status</th>
                            <th class="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${records.map(r => {
                            const emp = emps.find(e => e.id === r.employeeId) || {name: r.employeeId};
                            const c = courses.find(c => c.id === r.courseId) || {name: r.courseId};
                            return `
                                <tr class="hover:bg-slate-50 transition">
                                    <td class="px-5 py-3.5 whitespace-nowrap">${r.trainingDate}</td>
                                    <td class="px-5 py-3.5 font-bold text-slate-800">${emp.name}</td>
                                    <td class="px-5 py-3.5 line-clamp-1 max-w-xs" title="${c.name}">${c.name}</td>
                                    <td class="px-5 py-3.5 text-slate-500">${r.trainer || 'Akkharasaran S.'}</td>
                                    <td class="px-5 py-3.5 font-bold">${r.score !== null ? `${r.score}%` : '-'}</td>
                                    <td class="px-5 py-3.5">${UI.renderBadge(r.status)}</td>
                                    <td class="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                                        ${(c && c.hasAssessment) ? `
                                            <button onclick="viewLearnerQuizReview('${r.employeeId}', '${r.courseId}')" class="text-indigo-600 hover:text-indigo-800 text-xs font-bold">Quiz</button>
                                        ` : ''}
                                        <button onclick="openRecordModal('${r.id}')" class="text-blue-600 hover:text-blue-800 text-xs font-bold">Edit</button>
                                        <button onclick="deleteRecord('${r.id}')" class="text-rose-500 hover:text-rose-700 text-xs font-bold">Delete</button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

window.openRecordModal = (id = null) => {
    const isEdit = !!id;
    const rec = isEdit ? DataAPI.getRecords().find(r => r.id === id) : { trainingDate: new Date().toISOString().split('T')[0], status: 'Completed', method: 'Online', trainer: 'Akkharasaran S.' };
    const emps = DataAPI.getEmployees();
    const courses = DataAPI.getCourses();
    
    let html = `
        <form id="rec-form" class="space-y-4">
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Employee</label>
                <select id="r-emp" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Employee...</option>
                    ${emps.map(e => `<option value="${e.id}" ${rec.employeeId === e.id ? 'selected' : ''}>${e.name} (${e.id})</option>`).join('')}
                </select>
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Course</label>
                <select id="r-course" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Course...</option>
                    ${courses.map(c => `<option value="${c.id}" ${rec.courseId === c.id ? 'selected' : ''}>${c.id} - ${c.name}</option>`).join('')}
                </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Training Date</label>
                    <input type="date" id="r-date" value="${rec.trainingDate}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Trainer / Lead</label>
                    <input type="text" id="r-trainer" value="${rec.trainer || 'Akkharasaran S.'}" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Method</label>
                    <select id="r-method" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                        ${TRAINING_METHODS.map(m => `<option value="${m}" ${rec.method === m ? 'selected' : ''}>${m}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                    <select id="r-status" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                        ${RECORD_STATUSES.map(s => `<option value="${s}" ${rec.status === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Score (0-100)</label>
                    <input type="number" id="r-score" value="${rec.score !== null && rec.score !== undefined ? rec.score : ''}" min="0" max="100" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="flex items-center pt-5">
                    <label class="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                        <input type="checkbox" id="r-passed" ${rec.passed ? 'checked' : ''} class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                        <span>Passed Assessment</span>
                    </label>
                </div>
            </div>
        </form>
    `;
    
    UI.showModal(isEdit ? 'Edit Training Record' : 'Add Training Record', html, () => {
        const scoreVal = document.getElementById('r-score').value;
        const newRec = {
            id: isEdit ? rec.id : 'TR-' + Date.now(),
            employeeId: document.getElementById('r-emp').value,
            courseId: document.getElementById('r-course').value,
            trainingDate: document.getElementById('r-date').value,
            completionDate: document.getElementById('r-status').value === 'Completed' ? document.getElementById('r-date').value : null,
            trainer: document.getElementById('r-trainer').value || 'Akkharasaran S.',
            method: document.getElementById('r-method').value,
            status: document.getElementById('r-status').value,
            score: scoreVal !== '' ? parseInt(scoreVal) : null,
            passed: document.getElementById('r-passed').checked,
            remarks: ''
        };

        let records = DataAPI.getRecords();
        if(isEdit) {
            records = records.map(r => r.id === rec.id ? newRec : r);
            DB.logActivity('record_updated', `Record ${rec.id} updated for ${newRec.employeeId}`);
        } else {
            records.push(newRec);
            DB.logActivity('record_added', `Record added for ${newRec.employeeId}`);
        }
        DB.set('sye_training_records', records);
        renderRecords(document.getElementById('admin-content'));
        return true;
    });
};

window.deleteRecord = (id) => {
    if(confirm(`Are you sure you want to delete record ${id}?`)) {
        let records = DataAPI.getRecords().filter(r => r.id !== id);
        DB.set('sye_training_records', records);
        DB.logActivity('record_deleted', `Record ${id} deleted`);
        renderRecords(document.getElementById('admin-content'));
    }
};

// 5. Work Instructions CRUD
function renderWorkInstructions(container) {
    const wis = DataAPI.getWIs();
    
    container.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 class="font-bold text-slate-800 text-lg">Standard Work Instructions (${wis.length} Documents)</h3>
            <button onclick="openWIModal()" class="rounded-xl px-4 py-2.5 bg-blue-600 text-white text-xs font-bold shadow-sm hover:bg-blue-700 transition flex items-center gap-1.5 shrink-0">
                <span>+</span> Add Work Instruction
            </button>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-slate-600">
                    <thead class="bg-white text-[11px] uppercase text-slate-400 border-b border-slate-100 font-bold tracking-wider">
                        <tr>
                            <th class="px-5 py-3.5">Doc No.</th>
                            <th class="px-5 py-3.5">Title</th>
                            <th class="px-5 py-3.5">Section</th>
                            <th class="px-5 py-3.5">Version</th>
                            <th class="px-5 py-3.5">Author / Prepared By</th>
                            <th class="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${wis.map(wi => `
                            <tr class="hover:bg-slate-50 transition">
                                <td class="px-5 py-3.5 font-mono font-bold text-blue-600 cursor-pointer" onclick="viewWI('${wi.id}')">${wi.id}</td>
                                <td class="px-5 py-3.5 font-bold text-slate-800 cursor-pointer" onclick="viewWI('${wi.id}')">${wi.title}</td>
                                <td class="px-5 py-3.5 text-slate-500">${wi.section}</td>
                                <td class="px-5 py-3.5"><span class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-bold font-mono">v${wi.version}</span></td>
                                <td class="px-5 py-3.5 font-semibold text-slate-700">${wi.preparedBy || 'Akkharasaran S.'}</td>
                                <td class="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                                    <button onclick="viewWI('${wi.id}')" class="text-slate-600 hover:text-slate-900 text-xs font-bold">View</button>
                                    <button onclick="openWIModal('${wi.id}')" class="text-blue-600 hover:text-blue-800 text-xs font-bold">Edit</button>
                                    <button onclick="deleteWI('${wi.id}')" class="text-rose-500 hover:text-rose-700 text-xs font-bold">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

window.openWIModal = (id = null) => {
    const isEdit = !!id;
    const wi = isEdit ? DataAPI.getWIs().find(w => w.id === id) : { version: '1.0', effectiveDate: '2025-02-01', preparedBy: 'Akkharasaran S.', reviewedBy: 'Akkharasaran S.', approvedBy: 'Akkharasaran S. (Lead System Enabler)' };
    
    let html = `
        <form id="wi-form" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Document No.</label>
                    <input type="text" id="w-id" value="${wi.id || ''}" ${isEdit ? 'disabled' : 'required'} class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Version</label>
                    <input type="text" id="w-ver" value="${wi.version}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                <input type="text" id="w-title" value="${wi.title || ''}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Section</label>
                    <select id="w-section" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                        <option value="All Sections" ${wi.section === 'All Sections' ? 'selected' : ''}>All Sections</option>
                        ${SECTIONS.map(s => `<option value="${s}" ${wi.section === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Effective Date</label>
                    <input type="date" id="w-date" value="${wi.effectiveDate}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Objective</label>
                <textarea id="w-obj" rows="2" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">${wi.objective || ''}</textarea>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Prepared By</label>
                    <input type="text" id="w-prep" value="${wi.preparedBy || 'Akkharasaran S.'}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Reviewed By</label>
                    <input type="text" id="w-rev" value="${wi.reviewedBy || 'Akkharasaran S.'}" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Approved By</label>
                    <input type="text" id="w-app" value="${wi.approvedBy || 'Akkharasaran S. (Lead System Enabler)'}" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
        </form>
    `;
    
    UI.showModal(isEdit ? 'Edit Work Instruction' : 'Add Work Instruction', html, () => {
        const wid = document.getElementById('w-id').value.trim();
        const wtitle = document.getElementById('w-title').value.trim();
        if(!wid || !wtitle) { alert('Doc No. and Title are required'); return false; }
        
        const newWI = {
            id: wid,
            title: wtitle,
            version: document.getElementById('w-ver').value,
            section: document.getElementById('w-section').value,
            effectiveDate: document.getElementById('w-date').value,
            objective: document.getElementById('w-obj').value,
            preparedBy: document.getElementById('w-prep').value,
            reviewedBy: document.getElementById('w-rev').value,
            approvedBy: document.getElementById('w-app').value,
            scope: wi.scope || 'General Scope',
            procedure: wi.procedure || [],
            revisionHistory: wi.revisionHistory || []
        };

        let wis = DataAPI.getWIs();
        if(isEdit) {
            wis = wis.map(w => w.id === wid ? newWI : w);
            DB.logActivity('wi_updated', `WI ${wid} updated`);
        } else {
            if(wis.find(w => w.id === wid)) { alert('Doc No exists'); return false; }
            wis.push(newWI);
            DB.logActivity('wi_added', `WI ${wid} added`);
        }
        DB.set('sye_work_instructions', wis);
        renderWorkInstructions(document.getElementById('admin-content'));
        return true;
    });
};

window.deleteWI = (id) => {
    if(confirm(`Are you sure you want to delete WI ${id}?`)) {
        let wis = DataAPI.getWIs().filter(w => w.id !== id);
        DB.set('sye_work_instructions', wis);
        DB.logActivity('wi_deleted', `WI ${id} deleted`);
        renderWorkInstructions(document.getElementById('admin-content'));
    }
};

window.viewWI = (id) => {
    const wi = DataAPI.getWIs().find(w => w.id === id);
    if(!wi) return;
    
    let html = `
        <div class="space-y-6">
            <div class="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                    <h2 class="text-xl font-bold text-slate-800">${wi.title}</h2>
                    <p class="text-xs text-slate-500 mt-1">Section: ${wi.section}</p>
                </div>
                <div class="text-right">
                    <span class="inline-block px-2.5 py-1 bg-slate-800 text-white rounded-lg text-xs font-mono font-bold">${wi.id}</span>
                    <p class="text-xs text-slate-500 mt-1.5">Effective: ${wi.effectiveDate}</p>
                    <p class="text-xs text-slate-500">Version: v${wi.version}</p>
                </div>
            </div>
            <div>
                <h4 class="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2">1. Objective</h4>
                <p class="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">${wi.objective}</p>
            </div>
            <div>
                <h4 class="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2">2. Operating Procedures</h4>
                <div class="space-y-2.5">
                    ${(wi.procedure || []).map(p => `
                        <div class="flex items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 mr-3">${p.step}</div>
                            <div>
                                <h5 class="font-bold text-xs text-slate-800">${p.title}</h5>
                                <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">${p.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ${wi.revisionHistory && wi.revisionHistory.length ? `
                <div>
                    <h4 class="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2">3. Revision History</h4>
                    <div class="border border-slate-100 rounded-xl overflow-hidden text-xs">
                        <table class="w-full text-left">
                            <thead class="bg-slate-50 text-slate-500 font-bold">
                                <tr><th class="p-2">Version</th><th class="p-2">Date</th><th class="p-2">Changes</th><th class="p-2">Author</th></tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                ${wi.revisionHistory.map(r => `<tr><td class="p-2 font-mono font-bold">${r.version}</td><td class="p-2">${r.date}</td><td class="p-2">${r.changes}</td><td class="p-2">${r.author}</td></tr>`).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            ` : ''}
            <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs text-center">
                <div>
                    <p class="text-slate-400 uppercase font-bold text-[10px]">Prepared By</p>
                    <p class="font-bold text-slate-700 mt-1">${wi.preparedBy || 'Akkharasaran S.'}</p>
                </div>
                <div>
                    <p class="text-slate-400 uppercase font-bold text-[10px]">Reviewed By</p>
                    <p class="font-bold text-slate-700 mt-1">${wi.reviewedBy || 'Akkharasaran S.'}</p>
                </div>
                <div>
                    <p class="text-slate-400 uppercase font-bold text-[10px]">Approved By</p>
                    <p class="font-bold text-slate-700 mt-1">${wi.approvedBy || 'Akkharasaran S. (Lead System Enabler)'}</p>
                </div>
            </div>
        </div>
    `;
    UI.showModal('Work Instruction Details', html, null, '', false);
};

// 6. Assessments Management & Submission Review
function renderAssessments(container) {
    const quizzes = DataAPI.getQuizzes();
    const results = DataAPI.getQuizResults();
    const emps = DataAPI.getEmployees();
    results.sort((a,b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 class="font-bold text-slate-800 text-lg">Assessments & Submissions Log</h3>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            ${quizzes.map(q => `
                <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <span class="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">${q.id}</span>
                            <span class="text-xs font-bold text-slate-500">Pass: ${q.passingScore}%</span>
                        </div>
                        <h4 class="font-bold text-slate-800 text-base mb-1">${q.title}</h4>
                        <p class="text-xs text-slate-400 mb-4">${q.questions.length} questions in question bank</p>
                    </div>
                    <button onclick="viewQuizPreview('${q.id}')" class="w-full rounded-xl py-2 bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 hover:bg-slate-100 transition">
                        Preview Questions
                    </button>
                </div>
            `).join('')}
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h4 class="font-bold text-xs uppercase tracking-wider text-slate-700">Recent Quiz Submissions (${results.length})</h4>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-slate-600">
                    <thead class="bg-white text-[11px] uppercase text-slate-400 border-b border-slate-100 font-bold tracking-wider">
                        <tr>
                            <th class="px-5 py-3.5">Date</th>
                            <th class="px-5 py-3.5">Employee</th>
                            <th class="px-5 py-3.5">Quiz</th>
                            <th class="px-5 py-3.5">Score</th>
                            <th class="px-5 py-3.5">Status</th>
                            <th class="px-5 py-3.5 text-right">Inspect Submission</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${results.map(r => {
                            const emp = emps.find(e => e.id === r.employeeId) || { name: r.employeeId };
                            const quiz = quizzes.find(q => q.id === r.quizId) || { title: r.quizId };
                            return `
                                <tr class="hover:bg-slate-50 transition">
                                    <td class="px-5 py-3.5 whitespace-nowrap">${r.date}</td>
                                    <td class="px-5 py-3.5 font-bold text-slate-800">${emp.name}</td>
                                    <td class="px-5 py-3.5 font-medium">${quiz.title}</td>
                                    <td class="px-5 py-3.5 font-extrabold text-sm ${r.passed ? 'text-emerald-600' : 'text-rose-600'}">${r.score}%</td>
                                    <td class="px-5 py-3.5">
                                        <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${r.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}">
                                            ${r.passed ? 'Passed' : 'Failed'}
                                        </span>
                                    </td>
                                    <td class="px-5 py-3.5 text-right">
                                        <button onclick="viewQuizBreakdownModal('${r.id}')" class="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 transition">
                                            View Answers
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 7. Reports Module
function renderReports(container) {
    const emps = DataAPI.getEmployees();
    const courses = DataAPI.getCourses();

    container.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 class="font-bold text-slate-800 text-lg">Training Compliance & Audit Reports</h3>
            <button onclick="window.print()" class="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition flex items-center gap-1.5 shadow-sm">
                <span>🖨</span> Print / PDF Report
            </button>
        </div>

        <div class="space-y-8">
            <!-- Summary Table Card -->
            <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h4 class="font-bold text-sm text-slate-800 uppercase tracking-wider mb-4">1. Training Compliance by Section</h4>
                <table class="w-full text-left text-xs">
                    <thead class="bg-slate-50 font-bold text-slate-600">
                        <tr>
                            <th class="p-3">Section</th>
                            <th class="p-3">Headcount</th>
                            <th class="p-3">Fully Trained (100%)</th>
                            <th class="p-3">In Progress</th>
                            <th class="p-3">Compliance Rate</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${SECTIONS.map(sec => {
                            const sectionEmps = emps.filter(e => e.section === sec);
                            const fullyTrained = sectionEmps.filter(e => DataAPI.getEmployeeStats(e.id).percent === 100).length;
                            const inProg = sectionEmps.length - fullyTrained;
                            const rate = sectionEmps.length ? Math.round((fullyTrained / sectionEmps.length) * 100) : 0;
                            return `
                                <tr>
                                    <td class="p-3 font-bold text-slate-800">${sec}</td>
                                    <td class="p-3">${sectionEmps.length}</td>
                                    <td class="p-3 text-emerald-600 font-bold">${fullyTrained}</td>
                                    <td class="p-3 text-amber-600 font-bold">${inProg}</td>
                                    <td class="p-3">${UI.renderProgressBar(rate)}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>

            <!-- Certificate Generator Card -->
            <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm no-print">
                <h4 class="font-bold text-sm text-slate-800 uppercase tracking-wider mb-4">2. Generate Training Certificate</h4>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <select id="cert-emp" class="rounded-xl border border-slate-200 px-3 py-2 text-xs">
                        <option value="">Select Employee...</option>
                        ${emps.map(e => `<option value="${e.id}">${e.name} (${e.id})</option>`).join('')}
                    </select>
                    <select id="cert-course" class="rounded-xl border border-slate-200 px-3 py-2 text-xs">
                        <option value="">Select Completed Course...</option>
                        ${courses.map(c => `<option value="${c.id}">${c.id} - ${c.name}</option>`).join('')}
                    </select>
                    <button onclick="generateCertificate()" class="rounded-xl px-4 py-2 bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition">
                        Generate & Print Certificate
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.generateCertificate = () => {
    const empId = document.getElementById('cert-emp').value;
    const courseId = document.getElementById('cert-course').value;
    if(!empId || !courseId) { alert('Please select both an employee and a course.'); return; }

    const emp = DataAPI.getEmployees().find(e => e.id === empId);
    const course = DataAPI.getCourses().find(c => c.id === courseId);
    const rec = DataAPI.getRecords().find(r => r.employeeId === empId && r.courseId === courseId) || { trainingDate: new Date().toISOString().split('T')[0], score: 95 };

    const pc = document.getElementById('print-container');
    pc.innerHTML = `
        <div style="width: 800px; margin: 40px auto; padding: 50px; border: 12px double #1e293b; text-align: center; font-family: 'Inter', sans-serif; background: #fff; border-radius: 8px;">
            <div style="font-size: 30px; font-weight: 800; color: #1e293b; margin-bottom: 8px;">AEON SYSTEM ENABLER (SYE)</div>
            <div style="font-size: 15px; font-weight: 600; color: #64748b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 40px;">Certificate of Technical Training & Onboarding</div>
            
            <p style="font-size: 14px; color: #64748b; margin-bottom: 12px;">This is to certify that</p>
            <div style="font-size: 28px; font-weight: 800; color: #2563eb; margin-bottom: 8px;">${emp.name}</div>
            <p style="font-size: 14px; color: #64748b; margin-bottom: 30px;">(${emp.role} • ${emp.section})</p>
            
            <p style="font-size: 14px; color: #64748b; margin-bottom: 12px;">has successfully completed and demonstrated proficiency in</p>
            <div style="font-size: 22px; font-weight: 700; color: #1e293b; margin-bottom: 30px;">${course.name}</div>
            
            <div style="display: flex; justify-content: space-around; margin-top: 50px; padding-top: 30px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">
                <div>
                    <strong>Completion Date:</strong><br>${rec.trainingDate}
                </div>
                <div>
                    <strong>Evaluation:</strong><br>${rec.score !== null ? `${rec.score}% (PASSED)` : 'COMPLETED'}
                </div>
                <div>
                    <strong>Authorized Signatory:</strong><br>Akkharasaran S.<br><span style="font-size: 11px;">Lead System Enabler</span>
                </div>
            </div>
        </div>
    `;
    pc.classList.remove('hidden');
    window.print();
    pc.classList.add('hidden');
};

// 8. Settings & Data Portability
function renderSettings(container) {
    container.innerHTML = `
        <div class="max-w-2xl bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-6 md:p-8">
            <div class="mb-6">
                <h3 class="text-xl font-bold text-slate-800 mb-1">System Data Management & Portability</h3>
                <p class="text-xs text-slate-500 leading-relaxed">
                    Data is stored locally in your browser's persistent storage. Use the backup tools below to transfer records between computers.
                </p>
            </div>

            <div class="space-y-4">
                <!-- 1. Export JSON -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
                    <div class="flex-1 min-w-0 pr-2">
                        <h4 class="font-bold text-sm text-slate-800">1. Export Full Backup (JSON)</h4>
                        <p class="text-xs text-slate-500 mt-1">Download complete database snapshot (employees, courses, logs, quizzes, records).</p>
                    </div>
                    <button onclick="exportDataJSON()" class="shrink-0 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition shadow-sm whitespace-nowrap">
                        Download JSON
                    </button>
                </div>

                <!-- 2. Import JSON -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
                    <div class="flex-1 min-w-0 pr-2">
                        <h4 class="font-bold text-sm text-slate-800">2. Import Backup (JSON)</h4>
                        <p class="text-xs text-slate-500 mt-1">Restore system data from a previously exported JSON backup file.</p>
                    </div>
                    <div class="shrink-0">
                        <input type="file" id="import-json-file" accept=".json" class="hidden" onchange="importDataJSON(event)">
                        <button onclick="document.getElementById('import-json-file').click()" class="px-4 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition whitespace-nowrap">
                            Upload File
                        </button>
                    </div>
                </div>

                <!-- 3. Export as sample-data.js -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-blue-50/60 rounded-2xl border border-blue-200 gap-4">
                    <div class="flex-1 min-w-0 pr-2">
                        <h4 class="font-bold text-sm text-blue-950">3. Download Updated "sample-data.js"</h4>
                        <p class="text-xs text-blue-800 mt-1">Download current data as a fresh sample-data.js to replace the file in your project folder.</p>
                    </div>
                    <button onclick="exportSampleDataJS()" class="shrink-0 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition shadow-sm whitespace-nowrap">
                        Export JS File
                    </button>
                </div>

                <!-- 4. Reset Data -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-rose-50/60 rounded-2xl border border-rose-200 gap-4">
                    <div class="flex-1 min-w-0 pr-2">
                        <h4 class="font-bold text-sm text-rose-900">4. Reset to Initial Sample Data</h4>
                        <p class="text-xs text-rose-700 mt-1">Clears custom local storage modifications and reloads default dataset.</p>
                    </div>
                    <button onclick="resetSystemData()" class="shrink-0 px-4 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition whitespace-nowrap">
                        Reset All Data
                    </button>
                </div>
            </div>

            <div class="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 flex justify-between font-medium">
                <span>SYE Academy v${APP_VERSION}</span>
                <span>Active Period: 2025 - 2026</span>
            </div>
        </div>
    `;
}

window.exportDataJSON = () => {
    const data = {
        sye_employees: DataAPI.getEmployees(),
        sye_courses: DataAPI.getCourses(),
        sye_training_records: DataAPI.getRecords(),
        sye_work_instructions: DataAPI.getWIs(),
        sye_quizzes: DataAPI.getQuizzes(),
        sye_quiz_results: DataAPI.getQuizResults(),
        sye_activity_log: DataAPI.getLogs()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sye_academy_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

window.importDataJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            Object.keys(data).forEach(key => {
                localStorage.setItem(key, JSON.stringify(data[key]));
            });
            alert('System data restored successfully!');
            window.location.reload();
        } catch (err) {
            alert('Error parsing JSON backup file: ' + err.message);
        }
    };
    reader.readAsText(file);
};

window.exportSampleDataJS = () => {
    try {
        const data = {
            employees: DataAPI.getEmployees(),
            courses: DataAPI.getCourses(),
            trainingRecords: DataAPI.getRecords(),
            workInstructions: DataAPI.getWIs(),
            quizzes: DataAPI.getQuizzes(),
            quizResults: DataAPI.getQuizResults(),
            activityLog: DataAPI.getLogs()
        };
        const jsContent = `// SYE Academy Sample Data - Updated ${new Date().toISOString().split('T')[0]}\nwindow.SYE_SAMPLE_DATA = ${JSON.stringify(data, null, 2)};\n`;
        const blob = new Blob([jsContent], {type: 'text/javascript;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sample-data.js`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (err) {
        alert('Failed to export JS file: ' + err.message);
    }
};

window.resetSystemData = () => {
    if(confirm('Are you sure you want to reset all data back to the default state?')) {
        localStorage.clear();
        loadSampleData();
        window.location.reload();
    }
};

// ===== INITIALIZATION =====
initData();
handleRoute();
