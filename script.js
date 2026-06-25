// Collapse / Expand
let headers = document.querySelectorAll('.personal-info');
headers.forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const arrow = header.querySelector("#arrow");

    content.classList.toggle("hide");
    arrow.classList.toggle("rotate");
  })
})

// Personal Infomrmation...

// Image Preview
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
});

// Remove Image
function removeImage() {
  preview.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  imageInput.value = "";
}

// Mobile View Tab Switcher
function switchMobileTab(target) {
  const editor = document.getElementById('left-part');
  const preview = document.getElementById('right-part');
  const tabEdit = document.getElementById('tabEditor');
  const tabPrev = document.getElementById('tabPreview');

  if (target === 'editor') {
    editor.style.display = 'block';
    preview.style.display = 'none';
    tabEdit.classList.add('active');
    tabPrev.classList.remove('active');
  } else {
    editor.style.display = 'none';
    preview.style.display = 'flex';
    tabEdit.classList.remove('active');
    tabPrev.classList.add('active');
    adjustPreviewScale();
  }
}

// Auto adjust scale of the preview page inside the frame for responsive screens
function adjustPreviewScale() {
  const wrapper = document.getElementById('resumeWrapper');
  const panel = document.getElementById('right-part');
  const paper = document.getElementById('resumePreview');
  if (!wrapper || !panel || !paper) return;

  const padding = 40; // Horizontal margin buffer inside the panel
  const availableWidth = panel.clientWidth - padding;

  // Standard representation of A4 210mm in pixels at standard 96 DPI
  const targetWidth = 794;

  // Calculate perfect scale factor
  let scaleVal = availableWidth / targetWidth;

  // Cap scale on desktop viewports so it remains standard sized
  if (window.innerWidth > 1024) {
    scaleVal = Math.min(scaleVal, 1.0);
  } else {
    scaleVal = Math.min(scaleVal, 0.85); // Ensure margins on mobile screens
  }

  // Safe bounds to prevent layout vanishing
  if (scaleVal < 0.1) scaleVal = 0.1;

  // Apply transform scale
  wrapper.style.transform = `scale(${scaleVal})`;
  wrapper.style.transformOrigin = 'top center';

  // Match outer wrapper container's physical width and height to the scaled dimensions
  const outer = wrapper.parentElement;
  if (outer) {
    outer.style.width = `${targetWidth * scaleVal}px`;
    const actualPaperHeight = paper.offsetHeight || 1123;
    outer.style.height = `${actualPaperHeight * scaleVal}px`;
  }
}

window.addEventListener('resize', adjustPreviewScale);

// Initial Dynamic counters for dynamically added elements
let expCount = 0;
let eduCount = 0;
let projCount = 0;

// Work Experience...
function addExperienceField(data = {}) {
  expCount++;
  const list = document.getElementById('experienceContainer');
  const div = document.createElement('div');
  div.className = 'dynamic-item';
  div.id = `exp-${expCount}`;
  div.innerHTML = `
        <div class="top">
            <h3>Experience</h3>
            <button class="remove" onclick="removeDynamicItem('exp-${expCount}')">✖ Remove</button>
        </div>

        <label>Company Name</label>
        <input type="text" placeholder="e.g. Google" id="cName" class="cName" value="${data.company || ''}" oninput="renderResume()">

        <label>Designation / Role</label>
        <input type="text" placeholder="e.g. Frontend Developer" id="Role" class="Role" value="${data.role || ''}" oninput="renderResume()">

        <div class="row">

            <div>
                <label>Start Date</label>
                <input type="text" placeholder="Jan 2022" id="jDate" class="jDate" value="${data.start || ''}" oninput="renderResume()">
            </div>

            <div>
                <label>End Date</label>
                <input type="text" placeholder="Present" id="eDate" class="eDate" value="${data.end || ''}" oninput="renderResume()">
            </div>

        </div>

        <label>Responsibilities & Accomplishments</label>

        <textarea placeholder="Describe your key milestones, impact and duties..." id = "jDescription" class="jDescription" oninput="renderResume()"></textarea>
      `;
  list.appendChild(div);
  let render = renderResume();
}

addExperience.addEventListener('click', () => {
  addExperienceField();
});


// Education Experience....
function addEducationField(data = {}) {
  eduCount++;
  const list = document.getElementById('educationContainer');
  const div = document.createElement('div');
  div.className = 'dynamic-item';
  div.id = `edu-${eduCount}`;
  div.innerHTML = `
        <div class="top">
            <h3>Education</h3>
            <button class="remove" onclick="removeDynamicItem('edu-${eduCount}')">✖ Remove</button>
        </div>

        <label>School / Collage / University</label>
        <input type="text" placeholder="e.g. Stanford University" id = "scu" class="scu" oninput="renderResume()">

        <label>Degree / Certificate Course</label>
        <input type="text" placeholder="e.g. B.S. in Computer Science" id = "course" class="course" oninput="renderResume()">

        <div class="row">

            <div>
                <label>Graduation Year</label>
                <input type="text" placeholder="2021" id = "gYear" class="gYear" oninput="renderResume()">
            </div>

            <div>
                <label>Grade / GPA (Optional)</label>
                <input type="text" placeholder="3.8 / 4.0" id = "GPA" class="GPA" oninput="renderResume()">
            </div>
        </div>
      `;
  list.appendChild(div);
  renderResume();
}

addEducation.addEventListener('click', () => {
  addEducationField();
});


// Projects....
function addProjectField(data = {}) {
  projCount++;
  const list = document.getElementById('projectContainer');
  const div = document.createElement('div');
  div.className = 'dynamic-item';
  div.id = `proj-${projCount}`;
  div.innerHTML = `
        <div class="top">
            <h3>Projects</h3>
            <button class="remove"  onclick="removeDynamicItem('proj-${projCount}')">✖ Remove</button>
        </div>

        <label>Project Title</label>
        <input type="text" placeholder="e.g. SwiftStore E-Commerce" class="E-commerce" oninput="renderResume()">

        <div class="row">

            <div>
                <label>GitHub / Code URL (Optional)</label>
                <input type="text" placeholder="github.com/username/project" id = "github" class="github" oninput="renderResume()">
            </div>

            <div>
                <label>Live Demo URL (Optional)</label>
                <input type="text" placeholder="e.g. swiftstore-demo.vercel.app" id = "demo" class="demo" oninput="renderResume()">
            </div>

        </div>
        <label>Project Description</label>
        <textarea placeholder="Details of the stack used, problems solved and outcomes..." id = "pDescription" class="pDescription" oninput="renderResume()"></textarea>
      `;
  list.appendChild(div);
  renderResume();
}

addProject.addEventListener('click', () => {
  addProjectField();
});

// Dynamic Item Remover Helper
function removeDynamicItem(id) {
  const item = document.getElementById(id);
  if (item) {
    item.remove();
    renderResume();
  }
}

// Dropdown and Preview Selectors
let dropdown = document.querySelector('#templateSelect');
let resumePreview = document.getElementById("resumePreview");

// Input Fields Selectors
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');
let emailInput = document.querySelector('#email');
let numberInput = document.querySelector('#number');
let pLocation = document.querySelector('#location');
let website = document.querySelector('#linkedin');
let pDescription = document.querySelector('#pSummary');
let imgURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

// Helper function to clean links
function formatLink(url) {
  if (!url) return '';
  return url.trim().startsWith('http') ? url.trim() : 'https://' + url.trim();
}

function renderResume() {
  const currentLayout = dropdown.value;

  // Syncing layout classes to the parent preview wrapper
  resumePreview.className = "";
  if (currentLayout === "modern") resumePreview.classList.add("layout-modern");
  else if (currentLayout === "professional") resumePreview.classList.add("layout-professional");
  else if (currentLayout === "creative") resumePreview.classList.add("layout-creative");

  // Arrays extraction logic for Dynamic items
  const experiences = [];
  document.querySelectorAll('#experienceContainer .dynamic-item').forEach(item => {
    experiences.push({
      company: item.querySelector('.cName').value,
      role: item.querySelector('.Role').value,
      start: item.querySelector('.jDate').value,
      end: item.querySelector('.eDate').value,
      desc: item.querySelector('.jDescription').value
    });
  });

  const educations = [];
  document.querySelectorAll('#educationContainer .dynamic-item').forEach(item => {
    educations.push({
      school: item.querySelector('.scu').value,
      degree: item.querySelector('.course').value,
      year: item.querySelector('.gYear').value,
      grade: item.querySelector('.GPA').value
    });
  });

  const projects = [];
  document.querySelectorAll('#projectContainer .dynamic-item').forEach(item => {
    projects.push({
      title: item.querySelector('.E-commerce').value,
      link: item.querySelector('.github').value,
      demo: item.querySelector('.demo').value,
      desc: item.querySelector('.pDescription').value
    });
  });

  const rawSkills = document.getElementById('pSkills')?.value;
  const skills = rawSkills ? rawSkills.split(',').map(s => s.trim()).filter(Boolean) : ['HTML', 'CSS', 'JavaScript', 'Problem Solving'];

  const rawLanguages = document.getElementById('pLanguages')?.value;
  const languages = rawLanguages ? rawLanguages.split(',').map(l => l.trim()).filter(Boolean) : ['English', 'Spanish'];

  // --- Sub-Templates Injection ---

  // 1. Personal Header Snippet
  const headerHTML = `
    <div class="resume-header">
      <div class="name-job">
        <div class="name">${nameInput?.value || "John Doe"}</div>
        <div class="job">${jobInput?.value || "YOUR PROFESSIONAL TITLE"}</div>
      </div>
      <div class="section-info">
        <span><i class="fa-solid fa-envelope"></i> ${emailInput?.value || "johndoe@example.com"}</span>
        <span><i class="fa-solid fa-phone"></i> ${numberInput?.value || "+1 (555) 019-2834"}</span>
        <span><i class="fa-solid fa-location-dot"></i> ${pLocation?.value || "City, Country"}</span>
        <span><i class="fa-solid fa-globe"></i> ${website?.value || "linkedin.com/in/yourusername"}</span>
      </div>
    </div>`;

  // 2. Summary Snippet
  const summaryHTML = `
    <div class="Experience">
      <div class="summary-title"><i class="fa-solid fa-user-tie"></i> <h3>SUMMARY</h3></div>
      <div class="summary-description">${pDescription?.value || "Brief summary of your professional journey and specialized areas of focus."}</div>
    </div>`;

  // 3. Work Experience Snippet
  const experienceHTML = `
    <div class="Experience">
      <div class="summary-title"><i class="fa-solid fa-briefcase"></i> <h3>WORK EXPERIENCE</h3></div>
      ${experiences.map(exp => `
        <div class="p-experience-item">
          <div class="p-item-header">
            <div><span class="p-item-title">${exp.company || 'Company Name'}</span> - <span class="p-item-subtitle">${exp.role || 'Job Role'}</span></div>
            <div class="p-item-date">${exp.start || 'Start'} To ${exp.end || 'End'}</div>
          </div>
          <div class="p-item-desc">${exp.desc || 'Responsibilities...'}</div>
        </div>`).join('')}
    </div>`;

  // 4. Education Snippet
  const educationHTML = `
    <div class="Experience">
      <div class="summary-title"><i class="fa-solid fa-graduation-cap"></i> <h3>EDUCATION</h3></div>
      ${educations.map(edu => `
        <div class="p-education-item">
          <div class="p-item-header e-header">
            <div><span class="p-item-title e-txt">${edu.school || 'College/School'}</span> - <span class="p-item-subtitle e-dergree">${edu.degree || 'Degree/Course'}</span></div>
            <div class="p-item-date e-data">${edu.year || 'Year'}</div>
          </div>
          ${edu.grade ? `<div class="p-item-desc e-edu" style="font-style: italic;">Grade: ${edu.grade}</div>` : ''}
        </div>`).join('')}
    </div>`;

  // 5. Projects Snippet
  const projectsHTML = `
    <div class="Experience">
      <div class="summary-title"><i class="fa-solid fa-diagram-project"></i> <h3>PROJECTS</h3></div>
      ${projects.map(proj => `
        <div class="p-project-item">
          <div class="p-item-header">
            <span class="p-item-title">${proj.title || 'Project Title'}</span>
            <div class="project-links-container">
              ${proj.link ? `<a class="project-link-pill source-btn" href="${formatLink(proj.link)}" target="_blank">Source</a>` : ''}
              ${proj.demo ? `<a class="project-link-pill demo-btn" href="${formatLink(proj.demo)}" target="_blank">Live Demo</a>` : ''}
            </div>
          </div>
          <div class="p-item-desc">${proj.desc || 'Project details...'}</div>
        </div>`).join('')}
    </div>`;

  // 6. Skills & Languages Badge list
  const skillsHTML = `
    <div class="Experience">
      <div class="summary-title"><i class="fa-solid fa-gears"></i> <h3>SKILLS</h3></div>
      <div class="p-skills-list">${skills.map(skill => `<span class="p-skill-badge">${skill}</span>`).join('')}</div>
    </div>`;

  const languagesHTML = `
    <div class="Experience">
      <div class="summary-title"><i class="fa-solid fa-language"></i> <h3>LANGUAGES</h3></div>
      <div class="p-skills-list">${languages.map(lang => `<span class="p-skill-badge">${lang}</span>`).join('')}</div>
    </div>`;


  // --- Layout Selection & Assembling Boilerplate ---
  if (currentLayout === "professional") {
    // Two Column Layout Scheme
    resumePreview.innerHTML = `
      <div class="main-panel">
        <div class="name-job">
          <div class="name">${nameInput?.value || "John Doe"}</div>
          <div class="job">${jobInput?.value || "YOUR PROFESSIONAL TITLE"}</div>
        </div>
        ${summaryHTML}
        ${experienceHTML}
        ${projectsHTML}
      </div>
      <div class="side-panel">
        <div class="imgBorder">
           <img src="${imgURL}" class="profile-img">
        </div>
        <div class="side-group">
          <div class="side-title">CONTACT INFO</div>
          <p><i class="fa-solid fa-envelope"></i> ${emailInput?.value || "johndoe@example.com"}</p>
          <p><i class="fa-solid fa-phone"></i> ${numberInput?.value || "+1 (555) 019-2834"}</p>
          <p><i class="fa-solid fa-location-dot"></i> ${pLocation?.value || "City, Country"}</p>
          <p><i class="fa-solid fa-globe"></i> ${website?.value || "linkedin.com/in/username"}</p>
        </div>
        ${educationHTML}
        ${skillsHTML}
        ${languagesHTML}
      </div>
    `;
  } else if (currentLayout === "creative") {
    // Creative Header Scheme
    resumePreview.innerHTML = `
      <div class="creative-banner-header">
         <div class="creative-meta">
            <div class="img-Header">
              <div class="imgBorder">
                <img src="${imgURL}" class="profile-img">
              </div>
              <div class=name-job>
                <h1 class="c-name">${nameInput?.value || "John Doe"}</h1>
                <p class="c-title">${jobInput?.value || "YOUR PROFESSIONAL TITLE"}</p>
              </div>
            </div>
             <div class="section-info ">
                <span style ="color:white;"><i class="fa-solid fa-envelope"></i> ${emailInput?.value || "johndoe@example.com"}</span>
                <span style ="color:white;"><i class="fa-solid fa-phone"></i> ${numberInput?.value || "+1 (555) 019-2834"}</span>
                <span style ="color:white;"><i class="fa-solid fa-location-dot"></i> ${pLocation?.value || "City, Country"}</span>
                <span style ="color:white;"><i class="fa-solid fa-globe"></i> ${website?.value || "linkedin.com/in/yourusername"}</span>
             </div>
         </div>
      </div>
      <div class="creative-body-grid">
         <div class="left-col-creative">
            <div class="Summary">
               <div class="summary-title"><h3><i class="fa-solid fa-user"></i> About Me</h3></div>
               <div class="summary-description">${pDescription?.value || "Brief summary description goes here..."}</div>
            </div>
            ${experienceHTML}
            ${educationHTML}
         </div>
         <div class="right-col-creative">
            ${projectsHTML}
            ${skillsHTML}
            ${languagesHTML}
         </div>
      </div>
    `;
  } else {
    // Modern Minimalist Structure (Default)
    resumePreview.innerHTML = `
    <div class="resume-header">
      <div class="imgBorder">
        <img src="${imgURL}" class="profile-img">
      </div>
      <div class="name-job">
          <div class="name">${nameInput?.value || "John Doe"}</div>
          <div class="job">${jobInput?.value || "YOUR PROFESSIONAL TITLE"}</div>
      </div>
      <div class="section-info">
        <span><i class="fa-solid fa-envelope"></i> ${emailInput?.value || "johndoe@example.com"}</span>
        <span><i class="fa-solid fa-phone"></i> ${numberInput?.value || "+1 (555) 019-2834"}</span>
        <span><i class="fa-solid fa-location-dot"></i> ${pLocation?.value || "City, Country"}</span>
        <span><i class="fa-solid fa-globe"></i> ${website?.value || "linkedin.com/in/yourusername"}</span>
      </div>
    </div>
      ${summaryHTML}
      ${experienceHTML}
      ${educationHTML}
      ${projectsHTML}
      ${skillsHTML}
      ${languagesHTML}`;
  }
}

// Bind dropdown layout alterations to render triggers
dropdown.addEventListener("change", renderResume);

imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgURL = e.target.result;
      renderResume();
    }
    reader.readAsDataURL(file);
  }
});

document.querySelectorAll("#name,#job,#email,#number,#location,#linkedin,#pSummary")
  .forEach(input => {
    input.addEventListener("input", renderResume);
  });

// FIXED DIRECT PDF DOWNLOAD FUNCTION
// function downloadResumePDF() {
//   const element = document.getElementById('resumePreview');
//   const pName = document.getElementById('name').value || 'My';
//   // Create a clean filename
//   const filename = pName.trim().replace(/\s+/g, '_') + '_Resume.pdf';

//   // Visual feedback: Change button state to loading
//   const downloadBtn = document.querySelector('.btn-primary');
//   const originalContent = downloadBtn.innerHTML;
//   downloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF...';
//   downloadBtn.style.opacity = '0.7';
//   downloadBtn.disabled = true;

//   // Configuration for high-quality A4 PDF generation
//   const opt = {
//     margin: 15,
//     filename: filename,
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: {
//       scale: 2.5,          // Higher scale for crisp, premium text resolution
//       useCORS: true,       // Enable cross-origin resource sharing for loaded assets
//       letterRendering: true
//     },
//     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//   };

//   // Generate PDF directly from client-side DOM and trigger file-save
//   html2pdf().from(element).set(opt).save().then(() => {
//     // Restore button state
//     downloadBtn.innerHTML = originalContent;
//     downloadBtn.style.opacity = '1';
//     downloadBtn.disabled = false;
//   }).catch(err => {
//     console.error("Direct PDF download failed, trying print fallback: ", err);
//     // Fallback to window print if client generation fails
//     window.print();
//     downloadBtn.innerHTML = originalContent;
//     downloadBtn.style.opacity = '1';
//     downloadBtn.disabled = false;
//   });

//   const pageWidth = 210;
//   const pageHeight = 297;

//   const imgWidth = pageWidth;
//   const imgHeight = (opt.height * imgWidth) / opt.width;

//   const resumeRect = element.getBoundingClientRect();
//   const scaleX = pageWidth / resumeRect.width;
//   const scaleY = imgHeight / resumeRect.height;

//   // Source Buttons
//   document.querySelectorAll(".source-btn").forEach(btn => {

//     const rect = btn.getBoundingClientRect();

//     const x = (rect.left - resumeRect.left) * scaleX;
//     const y = (rect.top - resumeRect.top) * scaleY;
//     const w = rect.width * scaleX;
//     const h = rect.height * scaleY;

//     const pageNo = Math.floor(y / pageHeight) + 1;
//     const pageY = y - ((pageNo - 1) * pageHeight);

//     if (pageNo <= pdf.getNumberOfPages()) {

//       pdf.setPage(pageNo);

//       pdf.link(x, pageY, w, h, {
//         url: btn.href
//       });

//     }

//   });

//   // Live Demo Buttons
//   document.querySelectorAll(".demo-btn").forEach(btn => {

//     const rect = btn.getBoundingClientRect();

//     const x = (rect.left - resumeRect.left) * scaleX;
//     const y = (rect.top - resumeRect.top) * scaleY;
//     const w = rect.width * scaleX;
//     const h = rect.height * scaleY;

//     const pageNo = Math.floor(y / pageHeight) + 1;
//     const pageY = y - ((pageNo - 1) * pageHeight);

//     if (pageNo <= pdf.getNumberOfPages()) {

//       pdf.setPage(pageNo);

//       pdf.link(x, pageY, w, h, {
//         url: btn.href
//       });

//     }

//   });
// }



// FIXED DIRECT PDF DOWNLOAD FUNCTION WITH WORKING MOBILE LINKS

function downloadResumePDF() {
  const element = document.getElementById('resumePreview');
  const pName = document.getElementById('name').value || 'My';
  const filename = pName.trim().replace(/\s+/g, '_') + '_Resume.pdf';

  // Visual feedback: Change button state to loading
  const downloadBtn = document.querySelector('.btn-primary');
  const originalContent = downloadBtn.innerHTML;
  downloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF...';
  downloadBtn.style.opacity = '0.7';
  downloadBtn.disabled = true;

  // Configuration for high-quality A4 PDF generation
  const opt = {
    margin: 15,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2.5,          // Higher scale for crisp, premium text resolution
      useCORS: true,       // Enable cross-origin resource sharing for loaded assets
      letterRendering: true
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Dimensions of an A4 page in millimeters (as defined in jsPDF opt)
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = opt.margin;

  // Target width/height available for content inside the margins
  const printableWidth = pageWidth - (margin * 2);

  // We capture the DOM bounding rect BEFORE entering the worker
  const resumeRect = element.getBoundingClientRect();

  // Initialize html2pdf worker chain
  html2pdf().from(element).set(opt).toPdf().get('pdf').then((pdf) => {

    // Calculate scaling factor from DOM pixels to PDF millimeters
    const scaleX = printableWidth / resumeRect.width;

    // Select both source and demo buttons together
    let buttons = document.querySelectorAll(".source-btn");

    buttons.forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const url = btn.href || btn.getAttribute('href');

      if (!url) return;

      // 1. Find position relative to the main resume element container
      const relativeX = rect.left - resumeRect.left;
      const relativeY = rect.top - resumeRect.top;

      // 2. Convert pixel positions to PDF millimeters (accounting for top/left margins)
      const pdfX = (relativeX * scaleX) + margin;
      const pdfYGlobal = (relativeY * scaleX) + margin; // Using scaleX keeps aspect ratio square

      // 3. Determine which page the button landed on
      // We deduct the margins per page mathematically
      const pageNo = Math.floor(pdfYGlobal / pageHeight) + 1;
      const pdfYOnPage = pdfYGlobal - ((pageNo - 1) * pageHeight);

      // 4. Convert button dimensions to PDF millimeters
      const pdfW = rect.width * scaleX;
      const pdfH = rect.height * scaleX;

      // 5. Inject the link into the specific page if it exists
      if (pageNo <= pdf.getNumberOfPages()) {
        pdf.setPage(pageNo);
        pdf.link(pdfX, pdfYOnPage, pdfW, pdfH, { url: url });
      }
    });

  }).save().then(() => {
    // Restore button state
    downloadBtn.innerHTML = originalContent;
    downloadBtn.style.opacity = '1';
    downloadBtn.disabled = false;
  }).catch(err => {
    console.error("Direct PDF download failed, trying print fallback: ", err);
    window.print();
    downloadBtn.innerHTML = originalContent;
    downloadBtn.style.opacity = '1';
    downloadBtn.disabled = false;
  });
}
document.querySelector('.download-data').addEventListener('click', () => {
  downloadResumePDF();
})

// Initialize application with a clean start on window load
window.onload = function () {
  renderResume();
}