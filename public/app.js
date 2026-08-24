// ===== SYE ACADEMY - CORE APPLICATION LOGIC (v2.4.0) =====
// System Enabler (SYE) Division • AEON System Development Department
// Head of SYE: Akkharasaran S. (sye@aeon.co.th)
// ISO 27001 (ISMS), ISO 9001 (QMS), ISO 14001 (EMS), ISO 22301 (BCMS) Certified
// On-Premise VMware Tanzu Kubernetes (TKG) & RedHat Enterprise Linux VM Infrastructure

// ===== CONSTANTS & CONFIG =====
const APP_VERSION = '2.4.0';
const LAST_UPDATED = new Date().toISOString().split('T')[0];

const ROLES = ['PM', 'BA', 'Developer', 'QA', 'SRE'];
const SECTIONS = [
    'API & Integration Platform',
    'Customer Experience Systems',
    'User Application Systems',
    'Technology Standards & Quality'
];
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
            start_training_sub: 'New Staff & Outsource Engineer Registration',
            admin_panel: 'Admin Panel',
            admin_panel_sub: 'Compliance Records, Audits & System Management',
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
            step1_desc: 'Division mission, organizational sections, ISO governance, on-premise architecture landscape, and security policies',
            step2_title: 'Step 2: Role-Specific Technical Training',
            step2_desc: 'Technical and domain competencies required for your specific engineering role',
            step3_title: 'Step 3: Section Platform Architecture',
            step3_desc: 'Platform architectures, standards, and workflows specific to your assigned section',
            learning_objectives: 'Learning Objectives',
            end_of_content: '── End of Course Content ──',
            confirm_read: 'I confirm that I have read and understood all the technical material and standards above',
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
            reg_title: 'Engineer Registration',
            reg_desc: 'Register to start your System Enabler (SYE) onboarding journey',
            staff_id: 'Staff ID / Contractor ID',
            first_name: 'First Name',
            last_name: 'Last Name',
            email: 'Corporate Email',
            role: 'Engineering Role',
            section: 'Assigned Section',
            employment_type: 'Employment Type',
            vendor_name: 'Vendor / Entity Name',
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
            start_training_sub: 'ลงทะเบียนพนักงานประจำและ Outsource เพื่อเริ่มการอบรม',
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
            locked: '🔒 ล็อกตามลำดับ',
            step1_title: 'ขั้นตอนที่ 1: การปฐมนิเทศฝ่าย SYE และมาตรฐานวิศวกรรมทั่วไป',
            step1_desc: 'โครงสร้างผู้นำ 4 ส่วนงาน, มาตรฐาน ISO 4 ด้าน, ระบบ On-Premise (Tanzu/RHEL) และแผน BCP/DR Site',
            step2_title: 'ขั้นตอนที่ 2: การฝึกอบรมเฉพาะตำแหน่ง (Role-Specific)',
            step2_desc: 'ทักษะและมาตรฐานการทำงานเฉพาะของตำแหน่งงานของคุณ',
            step3_title: 'ขั้นตอนที่ 3: สถาปัตยกรรมแพลตฟอร์มประจำ Section',
            step3_desc: 'โครงสร้างระบบและมาตรฐานการปฏิบัติงานของแต่ละส่วนงาน',
            learning_objectives: 'วัตถุประสงค์การเรียนรู้ (Learning Objectives)',
            end_of_content: '── สิ้นสุดเนื้อหาบทเรียน ──',
            confirm_read: 'ข้าพเจ้ายืนยันว่าได้อ่านและทำความเข้าใจเนื้อหาทางเทคนิคและมาตรฐานข้างต้นครบถ้วนแล้ว',
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
            reg_title: 'ลงทะเบียนพนักงาน / วิศวกรใหม่',
            reg_desc: 'เข้ารับการฝึกอบรมและเตรียมความพร้อมฝ่าย System Enabler',
            staff_id: 'รหัสพนักงาน / รหัสสัญญา (Staff ID)',
            first_name: 'ชื่อ (First Name)',
            last_name: 'นามสกุล (Last Name)',
            email: 'อีเมล (Email)',
            role: 'ตำแหน่ง (Role)',
            section: 'ส่วนงาน (Section)',
            employment_type: 'ประเภทการจ้างงาน',
            vendor_name: 'สังกัดบริษัท / Outsource Vendor',
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
    const shortLabel = I18N.current === 'en' ? 'EN' : 'TH';
    const btnLearner = document.getElementById('lang-label-learner');
    if (btnLearner) btnLearner.textContent = shortLabel;
    const btnAdmin = document.getElementById('lang-label-admin');
    if (btnAdmin) btnAdmin.textContent = shortLabel;
}

// ===== DATA LAYER (localStorage helpers & Seed Synchronizer) =====
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

// Initialize Data (Always sync authentic personnel and master curriculum)
function initData() {
    if (!localStorage.getItem('sye_employees') || (window.SYE_SAMPLE_DATA && DB.get('sye_employees').length !== window.SYE_SAMPLE_DATA.employees.length)) {
        console.log("Loading authentic master data...");
        loadSampleData();
    } else if (window.SYE_SAMPLE_DATA) {
        // Sync course contents & quizzes while preserving custom records
        DB.set('sye_courses', window.SYE_SAMPLE_DATA.courses);
        DB.set('sye_work_instructions', window.SYE_SAMPLE_DATA.workInstructions);
        DB.set('sye_quizzes', window.SYE_SAMPLE_DATA.quizzes);
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
        console.log("Authentic sample data initialized.");
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
    resetScroll: () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        const learnerEl = document.getElementById('learner-content');
        if (learnerEl) learnerEl.scrollTop = 0;
        const adminEl = document.getElementById('admin-content');
        if (adminEl) adminEl.scrollTop = 0;
    },

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

    renderEmploymentBadge: (emp) => {
        if (emp.employmentType === 'Permanent' || !emp.employmentType) {
            return `<span class="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100">Permanent (${emp.vendor || 'AEON'})</span>`;
        }
        return `<span class="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-100">Outsource (${emp.vendor || 'OS-SYE'})</span>`;
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
    UI.resetScroll();
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
        
        // Sidebar active status
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
                        <select id="learner-select" class="flex-1 w-full min-w-0 rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium">
                            <option value="">${I18N.t('select_learner')}</option>
                            ${employees.sort((a,b)=>a.name.localeCompare(b.name)).map(e => `<option value="${e.id}">${e.name} (${e.role} - ${e.id} ${e.employmentType === 'Outsource' ? '[OS]' : ''})</option>`).join('')}
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
                        <input type="text" id="reg-id" required placeholder="e.g., SYE-0019" class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
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
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">${I18N.t('role')}</label>
                            <select id="reg-role" required class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50">
                                <option value="">Select Role...</option>
                                ${ROLES.map(r => `<option value="${r}">${r}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-700 mb-1">${I18N.t('employment_type')}</label>
                            <select id="reg-type" required class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50">
                                <option value="Permanent">Permanent (AEON Staff)</option>
                                <option value="Outsource">Outsource (Contractor)</option>
                            </select>
                        </div>
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
        const employmentType = document.getElementById('reg-type').value;
        const email = document.getElementById('reg-email').value.trim();
        const name = `${fn} ${ln}`;

        const newEmp = {
            id: staffId,
            name,
            role,
            section,
            employmentType,
            vendor: employmentType === 'Permanent' ? 'AEON' : 'OS-SYE',
            joinDate: new Date().toISOString().split('T')[0],
            status: 'Active',
            email
        };

        emps.push(newEmp);
        DB.set('sye_employees', emps);
        DB.logActivity('employee_added', `New engineer ${name} (${role} - ${employmentType}) registered in ${section}`, staffId);
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
                        <div class="flex flex-wrap items-center gap-2 mt-2.5">
                            <span class="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold">${emp.role}</span>
                            <span class="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold">${emp.section}</span>
                            ${UI.renderEmploymentBadge(emp)}
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
                        <button onclick="viewLearnerQuizReview('${learnerId}', '${course.id}')" class="rounded-lg px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition">
                            ${I18N.t('view_assessment')}
                        </button>
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
                            <span class="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] uppercase font-bold rounded">📝 Assessment</span>
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

// Rich Markdown Parser
function formatRichContent(rawText) {
    if (!rawText) return '';

    let text = rawText.replace(/\r\n/g, '\n');
    const tokens = [];

    function formatInline(str) {
        if (!str) return '';
        return str
            .replace(/\$\ge\s*(\d+)%?\?\$/g, '&ge; $1%')
            .replace(/\ge/g, '&ge;')
            .replace(/\le/g, '&le;')
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

    // 2. Fenced Code Blocks
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

    // 3. Tables
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

    // 4. Line by line
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
            if (inNestedUl) { outHtml += '</ul></li>\n'; inNestedUl = false; }
            if (inUl) { outHtml += '</ul>\n'; inUl = false; }
            continue;
        }

        if (line.startsWith('@@') && line.endsWith('@@')) {
            outHtml += closeLists();
            outHtml += line + '\n';
            continue;
        }

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

        const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
            if (inUl) { outHtml += '</ul>\n'; inUl = false; }
            if (inNestedUl) { outHtml += '</ul></li>\n'; inNestedUl = false; }
            else if (inOl) { outHtml += '</li>\n'; }
            if (!inOl) {
                outHtml += '<ol class="list-decimal pl-5 my-2.5 space-y-2 text-sm md:text-base text-slate-800 font-medium">\n';
                inOl = true;
            }
            outHtml += `  <li value="${numMatch[1]}">${formatInline(numMatch[2])}\n`;
            continue;
        }

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

        outHtml += closeLists();
        outHtml += `<p class="mb-3.5 leading-relaxed text-slate-700 text-sm md:text-base">${formatInline(line)}</p>\n`;
    }

    outHtml += closeLists();

    tokens.forEach(tok => {
        outHtml = outHtml.replace(tok.id, tok.html);
    });

    return outHtml;
}

// 4. Course Content & Assessment Screen
function renderCourse(container, courseId) {
    UI.resetScroll();
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

    const quiz = DataAPI.getQuizzes().find(q => q.courseId === courseId) || DataAPI.getQuizzes()[0];
    
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
                        <button onclick="viewLearnerQuizReview('${learnerId}', '${course.id}')" class="rounded-xl px-4 py-2 bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-sm">
                            ${I18N.t('review_answers_btn')}
                        </button>
                    </div>
                </div>
            ` : ''}

            <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 mb-8">
                <div class="mb-8 border-b border-slate-100 pb-6">
                    <div class="flex flex-wrap gap-2 mb-3">
                        <span class="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-mono font-bold">${course.id}</span>
                        <span class="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold">${course.category}</span>
                        <span class="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold">📝 Assessment Required</span>
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
                            
                            <button id="take-assessment-btn" ${!isCompleted ? 'disabled' : ''} class="w-full rounded-xl px-6 py-3.5 bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">
                                ${isCompleted ? I18N.t('retake_assessment') : I18N.t('take_assessment')}
                            </button>
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
    const quizArea = document.getElementById('quiz-area');
    
    check.addEventListener('change', (e) => {
        if(takeAssBtn) takeAssBtn.disabled = !e.target.checked;
    });

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
            <span class="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold mb-2 inline-block">TECHNICAL KNOWLEDGE ASSESSMENT</span>
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
        
        // Save quiz result
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
        remarks: status === 'Completed' ? 'Passed with certification' : 'Assessment attempt'
    });
    DB.set('sye_training_records', records);
    
    const emp = DataAPI.getEmployees().find(e => e.id === empId);
    DB.logActivity('training_completed', `${emp ? emp.name : empId} (${emp ? emp.role : ''}) ${status === 'Completed' ? 'completed' : status.toLowerCase()} ${course ? course.name : courseId}${score !== null ? ` (Score: ${score}%)` : ''}`, courseId);
}

// 6. Detailed Quiz Breakdown & Answer Review Modal
window.viewLearnerQuizReview = (empId, courseId) => {
    const quiz = DataAPI.getQuizzes().find(q => q.courseId === courseId) || DataAPI.getQuizzes()[0];
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

// 1. Dashboard (With Enhanced Animations, Number Labels & Multi-Color Role Bars)
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
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Engineers (SYE)</p>
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
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider">Training Completion by Section</h3>
                    <span class="text-xs font-semibold text-blue-600">4 Core Sections</span>
                </div>
                <div class="relative h-64"><canvas id="sectionChart"></canvas></div>
            </div>
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider">Progress by Role</h3>
                    <span class="text-xs font-semibold text-slate-400">Average % Completed</span>
                </div>
                <div class="relative h-64"><canvas id="roleChart"></canvas></div>
            </div>
        </div>

        <!-- Statistics & Activity Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">SYE Engineering Knowledge Base</h3>
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
                        <div class="text-xs font-bold text-slate-500 mt-1 uppercase">Technical Quizzes</div>
                    </div>
                </div>
                <div class="mt-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                    <div>
                        <h4 class="font-bold text-blue-900 text-xs">System Enabler (SYE) Division</h4>
                        <p class="text-xs text-blue-700 mt-0.5">Head of SYE: Akkharasaran S. • Sermmit Tower 14th Floor</p>
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
        // Doughnut Chart (With Employee Numbers in Labels)
        const sectionLabels = SECTIONS.map(sec => {
            const emps = employees.filter(e => e.section === sec);
            const fullyTrained = emps.filter(e => DataAPI.getEmployeeStats(e.id).percent === 100).length;
            const shortName = sec.replace('Platform', '').replace('Systems', '').trim();
            return `${shortName} (${fullyTrained}/${emps.length})`;
        });

        const secData = SECTIONS.map(sec => {
            const emps = employees.filter(e => e.section === sec);
            if(!emps.length) return 0;
            return emps.filter(e => DataAPI.getEmployeeStats(e.id).percent === 100).length;
        });

        const ctx1 = document.getElementById('sectionChart');
        if(ctx1) {
            const chart1 = new Chart(ctx1, {
                type: 'doughnut',
                data: {
                    labels: sectionLabels,
                    datasets: [{
                        data: secData,
                        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 1200,
                        easing: 'easeOutQuart'
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { boxWidth: 12, font: { size: 11, weight: '600' } }
                        }
                    }
                }
            });
            currentCharts.push(chart1);
        }

        // Horizontal Bar Chart (With Multi-Colored Role Bars)
        const roleLabels = ROLES;
        const roleColors = {
            'Developer': '#3b82f6', // Blue
            'BA': '#10b981',        // Emerald
            'PM': '#f59e0b',        // Amber
            'SRE': '#f43f5e',       // Rose
            'QA': '#8b5cf6'         // Purple
        };

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
                        backgroundColor: roleLabels.map(r => roleColors[r] || '#3b82f6'),
                        borderRadius: 8
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1200,
                        easing: 'easeOutQuart'
                    },
                    scales: {
                        x: {
                            max: 100,
                            min: 0,
                            ticks: { callback: (v) => v + '%' }
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    }
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
                        <span class="text-amber-600 font-bold">📝 Assessment</span>
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
                    <div class="text-xs text-slate-600 leading-relaxed">${formatRichContent(sec.body)}</div>
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
            hasAssessment: true,
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

// 3. Work Instructions (Enterprise SOP Viewer)
function renderWorkInstructions(container) {
    const wis = DataAPI.getWIs();
    
    container.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h3 class="font-bold text-slate-800 text-lg">Standard Work Instructions (${wis.length} SOP Documents)</h3>
                <p class="text-xs text-slate-400 mt-0.5">ISO 27001, ISO 9001, ISO 14001, ISO 22301 Certified Operational Procedures</p>
            </div>
            <button onclick="openWIModal()" class="rounded-xl px-4 py-2.5 bg-blue-600 text-white text-xs font-bold shadow-sm hover:bg-blue-700 transition flex items-center gap-1.5 shrink-0">
                <span>+</span> Add Work Instruction
            </button>
        </div>
        
        <div class="space-y-4">
            ${wis.map(wi => `
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                        <div class="flex items-center space-x-3">
                            <span class="font-mono text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">${wi.id}</span>
                            <div>
                                <h4 class="font-bold text-slate-800 text-base hover:text-blue-600 cursor-pointer" onclick="viewWIDetail('${wi.id}')">${wi.title}</h4>
                                <p class="text-xs text-slate-400 mt-0.5">${wi.section} • Ver: ${wi.version} • Effective: ${wi.effectiveDate}</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">Effective</span>
                            <button onclick="viewWIDetail('${wi.id}')" class="rounded-xl px-3.5 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 transition">View SOP</button>
                            <button onclick="openWIModal('${wi.id}')" class="text-xs font-bold text-slate-600 hover:text-slate-900 px-2 py-1">Edit</button>
                        </div>
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed mb-4">${wi.objective}</p>
                    <div class="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 bg-slate-50 p-3 rounded-xl">
                        <span>Prepared: ${wi.preparedBy}</span>
                        <span>Reviewed: ${wi.reviewedBy}</span>
                        <span class="font-semibold text-slate-600">Approved: ${wi.approvedBy}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

window.viewWIDetail = (id) => {
    const wi = DataAPI.getWIs().find(w => w.id === id);
    if (!wi) return;
    
    let html = `
        <div class="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
            <!-- Header Metadata Card -->
            <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span class="font-mono text-xs font-bold px-3 py-1 bg-blue-600 text-white rounded-lg">${wi.id}</span>
                    <span class="text-xs font-semibold px-2.5 py-0.5 bg-slate-200 text-slate-700 rounded">Version ${wi.version}</span>
                </div>
                <h3 class="font-extrabold text-slate-800 text-lg mb-2">${wi.title}</h3>
                <p class="text-xs text-slate-500 mb-4">${wi.section}</p>
                
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-t border-slate-200 pt-3">
                    <div><span class="text-slate-400 block text-[10px] uppercase">Effective Date</span><span class="font-bold text-slate-700">${wi.effectiveDate}</span></div>
                    <div><span class="text-slate-400 block text-[10px] uppercase">Prepared By</span><span class="font-bold text-slate-700">${wi.preparedBy}</span></div>
                    <div><span class="text-slate-400 block text-[10px] uppercase">Reviewed By</span><span class="font-bold text-slate-700">${wi.reviewedBy}</span></div>
                    <div><span class="text-slate-400 block text-[10px] uppercase">Approved By</span><span class="font-bold text-blue-700">${wi.approvedBy}</span></div>
                </div>
            </div>

            <!-- Objective & Scope -->
            <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">1. Objective & Scope</h4>
                <div class="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
                    <p><strong>Objective:</strong> ${wi.objective}</p>
                    <p><strong>Scope:</strong> ${wi.scope || 'All System Enabler (SYE) engineering environments and services.'}</p>
                </div>
            </div>

            <!-- Prerequisites -->
            ${wi.prerequisites && wi.prerequisites.length ? `
                <div>
                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">2. Prerequisites & Compliance Controls</h4>
                    <div class="bg-amber-50/40 p-4 rounded-xl border border-amber-200/60 text-xs text-slate-700">
                        <ul class="list-disc pl-4 space-y-1">
                            ${wi.prerequisites.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            ` : ''}

            <!-- Step by step procedure -->
            <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">3. Standard Operating Procedure Steps</h4>
                <div class="space-y-3">
                    ${wi.procedure.map((step, idx) => `
                        <div class="p-4 rounded-xl border border-slate-200 bg-white">
                            <div class="flex items-center space-x-2 mb-1.5">
                                <span class="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">${step.step || idx+1}</span>
                                <h5 class="font-bold text-slate-800 text-xs">${step.title}</h5>
                            </div>
                            <div class="text-xs text-slate-600 pl-7 leading-relaxed">${formatRichContent(step.description)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Rollback Procedure -->
            ${wi.rollbackProcedure ? `
                <div>
                    <h4 class="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">4. Contingency & Rollback Protocol</h4>
                    <div class="bg-rose-50/40 p-4 rounded-xl border border-rose-200 text-xs text-slate-700 leading-relaxed">
                        ${formatRichContent(wi.rollbackProcedure)}
                    </div>
                </div>
            ` : ''}

            <!-- Revision History Timeline -->
            ${wi.revisionHistory && wi.revisionHistory.length ? `
                <div>
                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">5. Revision History & Approvals</h4>
                    <div class="border border-slate-200 rounded-xl overflow-hidden">
                        <table class="w-full text-left text-xs text-slate-600">
                            <thead class="bg-slate-50 font-bold text-slate-500">
                                <tr>
                                    <th class="p-2.5">Version</th>
                                    <th class="p-2.5">Date</th>
                                    <th class="p-2.5">Author</th>
                                    <th class="p-2.5">Approver</th>
                                    <th class="p-2.5">Summary of Changes</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                ${wi.revisionHistory.map(r => `
                                    <tr class="hover:bg-slate-50">
                                        <td class="p-2.5 font-bold">${r.version}</td>
                                        <td class="p-2.5">${r.date}</td>
                                        <td class="p-2.5">${r.author}</td>
                                        <td class="p-2.5 font-semibold text-blue-700">${r.approver || 'Akkharasaran S.'}</td>
                                        <td class="p-2.5">${r.changes}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    UI.showModal(`Work Instruction: ${wi.id}`, html, null, '', false);
};

window.openWIModal = (id = null) => {
    const isEdit = !!id;
    const wi = isEdit ? DataAPI.getWIs().find(w => w.id === id) : { section: SECTIONS[0], version: '1.0' };
    
    let html = `
        <form id="wi-form" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Doc Number</label>
                    <input type="text" id="wi-id" value="${wi.id || ''}" ${isEdit ? 'disabled' : 'required'} placeholder="WI-SYE-009" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Section</label>
                    <select id="wi-sec" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                        ${SECTIONS.map(s => `<option value="${s}" ${wi.section === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Document Title</label>
                <input type="text" id="wi-title" value="${wi.title || ''}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Objective</label>
                <textarea id="wi-obj" rows="2" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">${wi.objective || ''}</textarea>
            </div>
            <div class="grid grid-cols-3 gap-3">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Prepared By</label>
                    <input type="text" id="wi-prep" value="${wi.preparedBy || 'Pongsatorn N.'}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Reviewed By</label>
                    <input type="text" id="wi-rev" value="${wi.reviewedBy || 'Rattanapakorn K.'}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Approved By</label>
                    <input type="text" id="wi-appr" value="${wi.approvedBy || 'Akkharasaran S.'}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
        </form>
    `;
    
    UI.showModal(isEdit ? 'Edit Work Instruction' : 'Add New Work Instruction', html, () => {
        const wid = document.getElementById('wi-id').value.trim();
        const wtitle = document.getElementById('wi-title').value.trim();
        if(!wid || !wtitle) { alert('Doc Number and Title are required'); return false; }
        
        const newWI = {
            ...wi,
            id: wid,
            title: wtitle,
            section: document.getElementById('wi-sec').value,
            objective: document.getElementById('wi-obj').value,
            preparedBy: document.getElementById('wi-prep').value,
            reviewedBy: document.getElementById('wi-rev').value,
            approvedBy: document.getElementById('wi-appr').value,
            version: wi.version || '1.0',
            effectiveDate: wi.effectiveDate || new Date().toISOString().split('T')[0],
            procedure: wi.procedure || [{ step: 1, title: 'Execution', description: 'Follow standard engineering steps.' }]
        };

        let wis = DataAPI.getWIs();
        if(isEdit) {
            wis = wis.map(w => w.id === wid ? newWI : w);
            DB.logActivity('wi_updated', `Work Instruction ${wid} updated`);
        } else {
            if(wis.find(w => w.id === wid)) { alert('Doc Number already exists'); return false; }
            wis.push(newWI);
            DB.logActivity('wi_added', `Work Instruction ${wid} created`);
        }
        DB.set('sye_work_instructions', wis);
        renderWorkInstructions(document.getElementById('admin-content'));
        return true;
    });
};

// 4. Employees Management
function renderEmployees(container) {
    const emps = DataAPI.getEmployees();
    
    container.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h3 class="font-bold text-slate-800 text-lg">SYE Engineering Roster (${emps.length} Total Engineers)</h3>
                <p class="text-xs text-slate-400 mt-0.5">Permanent Staff & Outsource Engineers (OS-SYE / OS-ECM / OS-NRT)</p>
            </div>
            <button onclick="openEmpModal()" class="rounded-xl px-4 py-2.5 bg-blue-600 text-white text-xs font-bold shadow-sm hover:bg-blue-700 transition flex items-center gap-1.5 shrink-0">
                <span>+</span> Add Engineer
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
                <select id="emp-type-filter" class="rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none bg-white font-medium">
                    <option value="All">All Employment Types</option>
                    <option value="Permanent">Permanent (Staff)</option>
                    <option value="Outsource">Outsource (Contractor)</option>
                </select>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-slate-600">
                    <thead class="bg-white text-[11px] uppercase text-slate-400 border-b border-slate-100 sticky top-0 z-10 font-bold tracking-wider">
                        <tr>
                            <th class="px-5 py-3.5">ID</th>
                            <th class="px-5 py-3.5">Name</th>
                            <th class="px-5 py-3.5">Role</th>
                            <th class="px-5 py-3.5">Section / Unit</th>
                            <th class="px-5 py-3.5">Type</th>
                            <th class="px-5 py-3.5 w-44">Progress</th>
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
        const tf = document.getElementById('emp-type-filter').value;
        
        let filtered = emps;
        if(sf !== 'All') filtered = filtered.filter(e => e.section === sf);
        if(rf !== 'All') filtered = filtered.filter(e => e.role === rf);
        if(tf !== 'All') filtered = filtered.filter(e => (e.employmentType || 'Permanent') === tf);
        
        const tbody = document.getElementById('emp-tbody');
        tbody.innerHTML = filtered.map(emp => {
            const stats = DataAPI.getEmployeeStats(emp.id);
            return `
                <tr class="hover:bg-slate-50 transition">
                    <td class="px-5 py-3.5 font-mono text-xs cursor-pointer text-blue-600 font-bold" onclick="viewEmployeeDetail('${emp.id}')">${emp.id}</td>
                    <td class="px-5 py-3.5 font-bold text-slate-800 cursor-pointer" onclick="viewEmployeeDetail('${emp.id}')">${emp.name}</td>
                    <td class="px-5 py-3.5 font-medium">${emp.role}</td>
                    <td class="px-5 py-3.5 text-slate-500">${emp.section}</td>
                    <td class="px-5 py-3.5">${UI.renderEmploymentBadge(emp)}</td>
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
    document.getElementById('emp-type-filter').addEventListener('change', renderTable);
    renderTable();
}

window.openEmpModal = (id = null) => {
    const isEdit = !!id;
    const emp = isEdit ? DataAPI.getEmployees().find(e => e.id === id) : { status: 'Active', employmentType: 'Permanent', vendor: 'AEON' };
    
    let html = `
        <form id="emp-form" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Employee ID / Code</label>
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
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
                    <select id="e-type" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                        <option value="Permanent" ${emp.employmentType === 'Permanent' ? 'selected' : ''}>Permanent (AEON Staff)</option>
                        <option value="Outsource" ${emp.employmentType === 'Outsource' ? 'selected' : ''}>Outsource (Contractor)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Vendor / Entity</label>
                    <input type="text" id="e-vendor" value="${emp.vendor || 'OS-SYE'}" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Join Date</label>
                <input type="date" id="e-date" value="${emp.joinDate || new Date().toISOString().split('T')[0]}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
            </div>
        </form>
    `;
    
    UI.showModal(isEdit ? 'Edit Engineer Record' : 'Add New Engineer', html, () => {
        const eid = document.getElementById('e-id').value.trim();
        const ename = document.getElementById('e-name').value.trim();
        if(!eid || !ename) { alert('ID and Name are required'); return false; }
        
        const newEmp = {
            id: eid,
            name: ename,
            email: document.getElementById('e-email').value,
            role: document.getElementById('e-role').value,
            section: document.getElementById('e-section').value,
            employmentType: document.getElementById('e-type').value,
            vendor: document.getElementById('e-vendor').value,
            joinDate: document.getElementById('e-date').value,
            status: document.getElementById('e-status').value
        };

        let emps = DataAPI.getEmployees();
        if(isEdit) {
            emps = emps.map(e => e.id === eid ? newEmp : e);
            DB.logActivity('employee_updated', `Engineer ${eid} (${ename}) updated`);
        } else {
            if(emps.find(e => e.id === eid)) { alert('Employee ID already exists'); return false; }
            emps.push(newEmp);
            DB.logActivity('employee_added', `Engineer ${eid} (${ename}) added to roster`);
        }
        DB.set('sye_employees', emps);
        renderEmployees(document.getElementById('admin-content'));
        return true;
    });
};

window.deleteEmp = (id) => {
    if(confirm(`Are you sure you want to delete engineer record ${id}?`)) {
        let emps = DataAPI.getEmployees().filter(e => e.id !== id);
        DB.set('sye_employees', emps);
        DB.logActivity('employee_deleted', `Engineer ${id} deleted`);
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
                        <div class="mt-1.5">${UI.renderEmploymentBadge(emp)}</div>
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
                                            <button onclick="viewLearnerQuizReview('${emp.id}', '${r.courseId}')" class="text-blue-600 hover:text-blue-800 font-bold">
                                                Review Answers
                                            </button>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>` : `<p class="text-xs text-slate-400 italic">No training records found for this engineer.</p>`}
            </div>
        </div>
    `;
    UI.showModal('Engineer Training Profile', html, null, '', false);
};

// 5. Training Records
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
                            <th class="px-5 py-3.5">Engineer</th>
                            <th class="px-5 py-3.5">Course</th>
                            <th class="px-5 py-3.5">Trainer</th>
                            <th class="px-5 py-3.5">Method</th>
                            <th class="px-5 py-3.5">Score</th>
                            <th class="px-5 py-3.5">Status</th>
                            <th class="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${records.slice(0, 50).map(r => {
                            const emp = emps.find(e => e.id === r.employeeId) || { name: r.employeeId, role: '' };
                            const course = courses.find(c => c.id === r.courseId) || { name: r.courseId };
                            return `
                                <tr class="hover:bg-slate-50 transition">
                                    <td class="px-5 py-3.5 whitespace-nowrap">${r.trainingDate}</td>
                                    <td class="px-5 py-3.5 font-bold text-slate-800 cursor-pointer text-blue-600" onclick="viewEmployeeDetail('${r.employeeId}')">${emp.name}</td>
                                    <td class="px-5 py-3.5 text-slate-700">${course.name}</td>
                                    <td class="px-5 py-3.5 text-slate-500">${r.trainer || 'Akkharasaran S.'}</td>
                                    <td class="px-5 py-3.5">${r.method}</td>
                                    <td class="px-5 py-3.5 font-bold">${r.score !== null ? `${r.score}%` : '-'}</td>
                                    <td class="px-5 py-3.5">${UI.renderBadge(r.status)}</td>
                                    <td class="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                                        <button onclick="viewLearnerQuizReview('${r.employeeId}', '${r.courseId}')" class="text-blue-600 hover:text-blue-800 text-xs font-bold">Review</button>
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

window.openRecordModal = () => {
    const emps = DataAPI.getEmployees();
    const courses = DataAPI.getCourses();
    
    let html = `
        <form id="rec-form" class="space-y-4">
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Engineer</label>
                <select id="r-emp" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                    ${emps.map(e => `<option value="${e.id}">${e.name} (${e.role} - ${e.id})</option>`).join('')}
                </select>
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Course</label>
                <select id="r-course" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                    ${courses.map(c => `<option value="${c.id}">[${c.id}] ${c.name}</option>`).join('')}
                </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Training Date</label>
                    <input type="date" id="r-date" value="${new Date().toISOString().split('T')[0]}" required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Trainer</label>
                    <input type="text" id="r-trainer" value="Akkharasaran S." required class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
            <div class="grid grid-cols-3 gap-3">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Method</label>
                    <select id="r-method" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                        ${TRAINING_METHODS.map(m => `<option value="${m}">${m}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                    <select id="r-status" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                        ${RECORD_STATUSES.map(s => `<option value="${s}">${s}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Score % (Optional)</label>
                    <input type="number" id="r-score" min="0" max="100" placeholder="e.g. 90" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
        </form>
    `;
    
    UI.showModal('Add Training Record', html, () => {
        const empId = document.getElementById('r-emp').value;
        const courseId = document.getElementById('r-course').value;
        const date = document.getElementById('r-date').value;
        const trainer = document.getElementById('r-trainer').value;
        const method = document.getElementById('r-method').value;
        const status = document.getElementById('r-status').value;
        const scoreVal = document.getElementById('r-score').value;
        const score = scoreVal !== '' ? parseInt(scoreVal) : null;
        
        saveTrainingRecord(empId, courseId, status, score, status === 'Completed', method, trainer);
        renderRecords(document.getElementById('admin-content'));
        return true;
    });
};

window.deleteRecord = (id) => {
    if(confirm('Are you sure you want to delete this record?')) {
        let records = DataAPI.getRecords().filter(r => r.id !== id);
        DB.set('sye_training_records', records);
        renderRecords(document.getElementById('admin-content'));
    }
};

// 6. Assessments Management (37 Quizzes & Audit Submissions Log)
function renderAssessments(container) {
    const quizzes = DataAPI.getQuizzes();
    const results = DataAPI.getQuizResults();
    const emps = DataAPI.getEmployees();
    const courses = DataAPI.getCourses();
    results.sort((a,b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h3 class="font-bold text-slate-800 text-lg">Technical Assessments & Submissions</h3>
                <p class="text-xs text-slate-400 mt-0.5">${quizzes.length} Master Quizzes • ${results.length} Submissions Logged</p>
            </div>
            <div class="flex gap-2">
                <button id="tab-quizzes-btn" class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white transition">Quiz Bank (${quizzes.length})</button>
                <button id="tab-results-btn" class="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition">Submissions Log (${results.length})</button>
            </div>
        </div>
        
        <div id="quiz-tab-content"></div>
    `;

    const renderQuizBank = () => {
        const content = document.getElementById('quiz-tab-content');
        content.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                ${quizzes.map(q => {
                    const c = courses.find(course => course.id === q.courseId) || { name: q.title };
                    return `
                        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition">
                            <div>
                                <div class="flex justify-between items-start mb-2">
                                    <span class="font-mono text-xs font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md">${q.id}</span>
                                    <span class="text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">${q.courseId}</span>
                                </div>
                                <h4 class="font-bold text-slate-800 text-base mb-2">${q.title}</h4>
                                <p class="text-xs text-slate-500 mb-4">Passing Score: <strong class="text-emerald-600">${q.passingScore}%</strong> • ${q.questions.length} questions</p>
                            </div>
                            <div class="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                                <button onclick="viewQuizPreview('${q.id}')" class="text-xs font-bold text-blue-600 hover:text-blue-800 px-2 py-1 rounded">View Questions</button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    };

    const renderResultsLog = () => {
        const content = document.getElementById('quiz-tab-content');
        content.innerHTML = `
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs text-slate-600">
                        <thead class="bg-white text-[11px] uppercase text-slate-400 border-b border-slate-100 font-bold tracking-wider">
                            <tr>
                                <th class="px-5 py-3.5">Date</th>
                                <th class="px-5 py-3.5">Engineer</th>
                                <th class="px-5 py-3.5">Quiz / Course</th>
                                <th class="px-5 py-3.5">Score</th>
                                <th class="px-5 py-3.5">Result</th>
                                <th class="px-5 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${results.slice(0, 50).map(res => {
                                const emp = emps.find(e => e.id === res.employeeId) || { name: res.employeeId };
                                const quiz = quizzes.find(q => q.id === res.quizId) || { title: res.quizId };
                                return `
                                    <tr class="hover:bg-slate-50 transition">
                                        <td class="px-5 py-3.5 whitespace-nowrap">${res.date}</td>
                                        <td class="px-5 py-3.5 font-bold text-slate-800 cursor-pointer text-blue-600" onclick="viewEmployeeDetail('${res.employeeId}')">${emp.name}</td>
                                        <td class="px-5 py-3.5 font-medium text-slate-700">${quiz.title}</td>
                                        <td class="px-5 py-3.5 font-extrabold ${res.passed ? 'text-emerald-600' : 'text-rose-600'}">${res.score}%</td>
                                        <td class="px-5 py-3.5">
                                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${res.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                                                ${res.passed ? 'PASS' : 'FAIL'}
                                            </span>
                                        </td>
                                        <td class="px-5 py-3.5 text-right">
                                            <button onclick="viewQuizBreakdownModal('${res.id}')" class="text-blue-600 hover:text-blue-800 text-xs font-bold">Review Answers</button>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    };

    const btnQ = document.getElementById('tab-quizzes-btn');
    const btnR = document.getElementById('tab-results-btn');
    
    btnQ.addEventListener('click', () => {
        btnQ.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white transition';
        btnR.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition';
        renderQuizBank();
    });

    btnR.addEventListener('click', () => {
        btnR.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white transition';
        btnQ.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition';
        renderResultsLog();
    });

    renderQuizBank();
}

// 7. Reports & Excel Export Engine
function renderReports(container) {
    const emps = DataAPI.getEmployees();
    const courses = DataAPI.getCourses();
    const records = DataAPI.getRecords();
    const wis = DataAPI.getWIs();
    const results = DataAPI.getQuizResults();

    container.innerHTML = `
        <div class="mb-6">
            <h3 class="font-bold text-slate-800 text-lg">Audit & Compliance Reports</h3>
            <p class="text-xs text-slate-400 mt-0.5">Export certified training records for ISO 9001, ISO 27001, and Management Audit</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <!-- Report Card 1 -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition">
                <div>
                    <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-3">📊</div>
                    <h4 class="font-bold text-slate-800 text-base mb-1">Overall Training Summary</h4>
                    <p class="text-xs text-slate-500 leading-relaxed mb-4">Complete section-by-section breakdown of training completion rates and employee headcount.</p>
                </div>
                <button onclick="exportTrainingSummaryExcel()" class="w-full rounded-xl px-4 py-2.5 bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-sm flex items-center justify-center gap-1.5">
                    <span>📥</span> Export Excel (.csv / .xlsx)
                </button>
            </div>

            <!-- Report Card 2 -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition">
                <div>
                    <div class="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl mb-3">📋</div>
                    <h4 class="font-bold text-slate-800 text-base mb-1">Full Training Matrix</h4>
                    <p class="text-xs text-slate-500 leading-relaxed mb-4">Cross-reference matrix of all 18 engineers against all 37 curriculum courses with status indicators.</p>
                </div>
                <button onclick="exportTrainingMatrixExcel()" class="w-full rounded-xl px-4 py-2.5 bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-sm flex items-center justify-center gap-1.5">
                    <span>📥</span> Export Excel (.csv / .xlsx)
                </button>
            </div>

            <!-- Report Card 3 -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition">
                <div>
                    <div class="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-3">📝</div>
                    <h4 class="font-bold text-slate-800 text-base mb-1">Assessment Audit Results</h4>
                    <p class="text-xs text-slate-500 leading-relaxed mb-4">Detailed quiz scores, passing status, and submission timestamps for compliance auditors.</p>
                </div>
                <button onclick="exportAssessmentAuditExcel()" class="w-full rounded-xl px-4 py-2.5 bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-sm flex items-center justify-center gap-1.5">
                    <span>📥</span> Export Excel (.csv / .xlsx)
                </button>
            </div>

            <!-- Report Card 4 -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition">
                <div>
                    <div class="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-3">📑</div>
                    <h4 class="font-bold text-slate-800 text-base mb-1">Work Instructions Index</h4>
                    <p class="text-xs text-slate-500 leading-relaxed mb-4">ISO document control register, version history, effective dates, and lead approvers.</p>
                </div>
                <button onclick="exportWIIndexExcel()" class="w-full rounded-xl px-4 py-2.5 bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-sm flex items-center justify-center gap-1.5">
                    <span>📥</span> Export Excel (.csv / .xlsx)
                </button>
            </div>

            <!-- Report Card 5: Certificate Generator -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition">
                <div>
                    <div class="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl mb-3">🎓</div>
                    <h4 class="font-bold text-slate-800 text-base mb-1">Training Certificate</h4>
                    <p class="text-xs text-slate-500 leading-relaxed mb-4">Generate and print an official ISO training completion certificate for an engineer.</p>
                </div>
                <button onclick="openCertificateModal()" class="w-full rounded-xl px-4 py-2.5 bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-sm flex items-center justify-center gap-1.5">
                    <span>🖨️</span> Issue Certificate
                </button>
            </div>
        </div>
    `;
}

// Universal Excel Exporter (With UTF-8 Byte Order Mark for Flawless Thai & English Display)
function exportToExcelCSV(filename, headers, rows) {
    const BOM = '\uFEFF';
    let csvContent = headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\n';
    
    rows.forEach(row => {
        const formattedRow = row.map(cell => {
            if (cell === null || cell === undefined) return '""';
            const str = String(cell).replace(/"/g, '""');
            return `"${str}"`;
        }).join(',');
        csvContent += formattedRow + '\n';
    });

    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

window.exportTrainingSummaryExcel = () => {
    const emps = DataAPI.getEmployees();
    const headers = ['Section', 'Total Engineers', 'Permanent Staff', 'Outsource Contractors', '100% Fully Onboarded', 'In Progress', 'Section Avg Progress %'];
    
    const rows = SECTIONS.map(sec => {
        const sectionEmps = emps.filter(e => e.section === sec);
        const permCount = sectionEmps.filter(e => e.employmentType === 'Permanent').length;
        const osCount = sectionEmps.filter(e => e.employmentType === 'Outsource').length;
        const fullyTrained = sectionEmps.filter(e => DataAPI.getEmployeeStats(e.id).percent === 100).length;
        const inProgress = sectionEmps.filter(e => {
            const p = DataAPI.getEmployeeStats(e.id).percent;
            return p > 0 && p < 100;
        }).length;
        const avg = sectionEmps.length ? Math.round(sectionEmps.reduce((a,c) => a + DataAPI.getEmployeeStats(c.id).percent, 0) / sectionEmps.length) : 0;
        
        return [sec, sectionEmps.length, permCount, osCount, fullyTrained, inProgress, `${avg}%`];
    });

    exportToExcelCSV(`SYE_Training_Summary_${LAST_UPDATED}.csv`, headers, rows);
};

window.exportTrainingMatrixExcel = () => {
    const emps = DataAPI.getEmployees();
    const courses = DataAPI.getCourses();
    const records = DataAPI.getRecords();

    const headers = ['Staff ID', 'Engineer Name', 'Role', 'Section', 'Employment Type', ...courses.map(c => `[${c.id}] ${c.name}`)];
    
    const rows = emps.map(emp => {
        const empRecords = records.filter(r => r.employeeId === emp.id);
        const recordMap = new Map(empRecords.map(r => [r.courseId, r]));

        const courseStatuses = courses.map(c => {
            const rec = recordMap.get(c.id);
            if (!rec) return 'Not Required';
            return rec.status === 'Completed' ? `Completed (${rec.score}%)` : rec.status;
        });

        return [
            emp.id,
            emp.name,
            emp.role,
            emp.section,
            `${emp.employmentType || 'Permanent'} (${emp.vendor || 'AEON'})`,
            ...courseStatuses
        ];
    });

    exportToExcelCSV(`SYE_Training_Matrix_Compliance_${LAST_UPDATED}.csv`, headers, rows);
};

window.exportAssessmentAuditExcel = () => {
    const results = DataAPI.getQuizResults();
    const emps = DataAPI.getEmployees();
    const quizzes = DataAPI.getQuizzes();
    
    const headers = ['Result ID', 'Submission Date', 'Staff ID', 'Engineer Name', 'Role', 'Section', 'Quiz Title', 'Score %', 'Result', 'Correct / Total'];
    
    const rows = results.map(res => {
        const emp = emps.find(e => e.id === res.employeeId) || { name: res.employeeId, role: '-', section: '-' };
        const quiz = quizzes.find(q => q.id === res.quizId) || { title: res.quizId };
        
        return [
            res.id,
            res.date,
            res.employeeId,
            emp.name,
            emp.role,
            emp.section,
            quiz.title,
            `${res.score}%`,
            res.passed ? 'PASSED' : 'FAILED',
            `${res.correctAnswers} / ${res.totalQuestions}`
        ];
    });

    exportToExcelCSV(`SYE_Assessment_Audit_Log_${LAST_UPDATED}.csv`, headers, rows);
};

window.exportWIIndexExcel = () => {
    const wis = DataAPI.getWIs();
    const headers = ['Doc Number', 'Document Title', 'Section', 'Version', 'Effective Date', 'Prepared By', 'Reviewed By', 'Approved By'];
    
    const rows = wis.map(w => [
        w.id,
        w.title,
        w.section,
        w.version,
        w.effectiveDate,
        w.preparedBy,
        w.reviewedBy,
        w.approvedBy
    ]);

    exportToExcelCSV(`SYE_Work_Instructions_Register_${LAST_UPDATED}.csv`, headers, rows);
};

window.openCertificateModal = () => {
    const emps = DataAPI.getEmployees();
    const courses = DataAPI.getCourses();
    
    let html = `
        <form id="cert-form" class="space-y-4">
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Select Engineer</label>
                <select id="cert-emp" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                    ${emps.map(e => `<option value="${e.id}">${e.name} (${e.role} - ${e.id})</option>`).join('')}
                </select>
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Select Completed Course / Curriculum</label>
                <select id="cert-course" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                    <option value="FULL_ONBOARDING">Full SYE Engineering Onboarding Curriculum</option>
                    ${courses.map(c => `<option value="${c.id}">[${c.id}] ${c.name}</option>`).join('')}
                </select>
            </div>
        </form>
    `;
    
    UI.showModal('Issue Training Certificate', html, () => {
        const empId = document.getElementById('cert-emp').value;
        const courseId = document.getElementById('cert-course').value;
        printCertificate(empId, courseId);
        return true;
    }, 'Generate & Print');
};

function printCertificate(empId, courseId) {
    const emp = DataAPI.getEmployees().find(e => e.id === empId);
    if (!emp) return;
    
    const courseTitle = courseId === 'FULL_ONBOARDING' ? 'Full System Enabler (SYE) Engineering Onboarding Curriculum' : ((DataAPI.getCourses().find(c => c.id === courseId) || {}).name || courseId);
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const printContainer = document.getElementById('print-container');
    printContainer.innerHTML = `
        <div class="p-12 border-8 border-slate-800 bg-white text-center max-w-4xl mx-auto my-8 rounded-3xl relative">
            <div class="border-2 border-blue-600 p-8 rounded-2xl">
                <div class="w-16 h-16 bg-blue-600 text-white rounded-2xl mx-auto flex items-center justify-center font-bold text-3xl mb-4">S</div>
                <h1 class="text-3xl font-extrabold text-slate-900 tracking-wider uppercase mb-1">Certificate of Completion</h1>
                <p class="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-8">System Enabler (SYE) Division • AEON System Development</p>
                
                <p class="text-sm text-slate-500 mb-2">This is officially certified that</p>
                <h2 class="text-3xl font-bold text-slate-800 border-b border-slate-300 pb-2 inline-block px-8 mb-4">${emp.name}</h2>
                <p class="text-xs text-slate-400 font-mono mb-6">Staff ID: ${emp.id} • Role: ${emp.role} • ${emp.section}</p>
                
                <p class="text-sm text-slate-600 max-w-lg mx-auto mb-6">
                    Has successfully completed the mandatory technical curriculum and ISO governance knowledge assessments for:
                </p>
                
                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 max-w-xl mx-auto mb-10">
                    <p class="font-extrabold text-slate-800 text-base">${courseTitle}</p>
                </div>
                
                <div class="flex justify-between items-end max-w-xl mx-auto pt-8 border-t border-slate-200 text-left">
                    <div>
                        <p class="text-xs text-slate-400">Date Issued:</p>
                        <p class="text-xs font-bold text-slate-700">${dateStr}</p>
                        <p class="text-[10px] text-slate-400 mt-1">ISO 27001 / ISO 9001 / ISO 22301</p>
                    </div>
                    <div class="text-right">
                        <div class="w-36 border-b border-slate-400 pb-1 mb-1 text-center font-mono font-bold text-xs text-blue-700">Akkharasaran S.</div>
                        <p class="text-xs font-bold text-slate-800">Akkharasaran S.</p>
                        <p class="text-[10px] text-slate-500">Head of System Enabler Division</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    printContainer.classList.remove('hidden');
    window.print();
    setTimeout(() => {
        printContainer.classList.add('hidden');
    }, 1000);
}

// 8. Settings Page (Enterprise Environment, Architecture & Approvers)
function renderSettings(container) {
    container.innerHTML = `
        <div class="max-w-4xl space-y-6">
            <div>
                <h3 class="font-bold text-slate-800 text-lg">System Configuration & Governance</h3>
                <p class="text-xs text-slate-400 mt-0.5">SYE Academy Enterprise Platform • Version ${APP_VERSION}</p>
            </div>
            
            <!-- Environment Card -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h4 class="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span>🏢</span> On-Premise Infrastructure & Environment
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span class="text-slate-400 block text-[10px] uppercase font-bold">Kubernetes Orchestrator</span>
                        <span class="font-bold text-slate-800 text-sm">VMware Tanzu (TKG) Multi-Pod</span>
                        <p class="text-slate-500 mt-1">Ingress Port: <strong>8080</strong> • Cluster Zone: Sermmit DC & DR Site</p>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span class="text-slate-400 block text-[10px] uppercase font-bold">Database & VM Tier</span>
                        <span class="font-bold text-slate-800 text-sm">PostgreSQL 16 & RedHat Enterprise Linux 9</span>
                        <p class="text-slate-500 mt-1">Host: <strong>10.254.97.141</strong> • Patroni HA Replication</p>
                    </div>
                </div>
            </div>

            <!-- Leadership & Approvers Card -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h4 class="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span>👑</span> Division Leadership & Architectural Authorities
                </h4>
                <div class="space-y-3 text-xs">
                    <div class="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                            <span class="font-bold text-slate-800">Akkharasaran S.</span>
                            <p class="text-slate-500 text-[11px]">Head of System Enabler Division • CES Lead • TSQ Lead</p>
                        </div>
                        <span class="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg text-[10px]">Division Head (sye@aeon.co.th)</span>
                    </div>
                    <div class="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                            <span class="font-bold text-slate-800">Rattanapakorn K.</span>
                            <p class="text-slate-500 text-[11px]">API & Integration Platform Lead</p>
                        </div>
                        <span class="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-[10px]">Section Lead (sye_api@aeon.co.th)</span>
                    </div>
                    <div class="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                            <span class="font-bold text-slate-800">Waranya T.</span>
                            <p class="text-slate-500 text-[11px]">User Application Systems Lead</p>
                        </div>
                        <span class="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-[10px]">Section Lead (sye_uas@aeon.co.th)</span>
                    </div>
                </div>
            </div>

            <!-- ISO Governance Standards Card -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h4 class="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span>🛡️</span> Certified ISO Governance Framework
                </h4>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div class="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 text-center">
                        <span class="font-extrabold text-blue-900 block text-sm">ISO 27001</span>
                        <span class="text-[10px] text-blue-700">Information Security (ISMS)</span>
                    </div>
                    <div class="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 text-center">
                        <span class="font-extrabold text-emerald-900 block text-sm">ISO 9001</span>
                        <span class="text-[10px] text-emerald-700">Quality Management (QMS)</span>
                    </div>
                    <div class="p-3.5 bg-amber-50/50 rounded-xl border border-amber-100 text-center">
                        <span class="font-extrabold text-amber-900 block text-sm">ISO 22301</span>
                        <span class="text-[10px] text-amber-700">Business Continuity (BCMS/DR)</span>
                    </div>
                    <div class="p-3.5 bg-purple-50/50 rounded-xl border border-purple-100 text-center">
                        <span class="font-extrabold text-purple-900 block text-sm">ISO 14001</span>
                        <span class="text-[10px] text-purple-700">Environmental Management</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize on Load
window.addEventListener('load', () => {
    initData();
    handleRoute();
});

// Run once immediately if ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initData();
    handleRoute();
}
