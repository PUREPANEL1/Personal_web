const projects = {
  d2mamba: {
    title: 'Seeing the Small: Deformable Duality Mamba for Retinal Lesion Segmentation',
    status: 'IEEE ISBI’27 · MANUSCRIPT UNDER REVIEW',
    authorship: 'Chang Yu · First author · Author 1 of 6',
    sections: [
      ['The question', 'Retinal lesions can be tiny and irregular. How can a segmentation network preserve those details while still understanding the global spatial organization of the retina?'],
      ['The approach', 'D²Mamba couples non-causal state space duality (NC-SSD) with a deformation-aware multi-scan mechanism (DMSM). Global context and shape-adaptive scanning support segmentation of microaneurysms, hemorrhages, hard exudates, and soft exudates.'],
      ['Reported in the submitted manuscript', 'Five-fold cross-validation on DDR yielded 33.87% mIoU, 2.99 percentage points above the strongest evaluated baseline. Microaneurysm Dice improved by 10.06 percentage points. These are manuscript results, not independent clinical validation.'],
      ['Authors, in order', 'Chang Yu; Siqing Li; Yuanchen Liu; Zhenyu Bu; Luming Yang (corresponding author); Alper Yilmaz.']
    ]
  },
  echope: {
    title: 'Adapting Echocardiographic Foundation Models for Detecting Pulmonary Embolism-Related Right-Heart Strain',
    status: 'IEEE JBHI · MANUSCRIPT UNDER REVIEW',
    authorship: 'Chang Yu · Co-author · Author 5 of 11',
    sections: [
      ['The question', 'Can pretrained echocardiographic models be adapted to identify pulmonary embolism–associated right-heart strain in real-world emergency cardiac ultrasound videos?'],
      ['The approach', 'EchoPE builds on EchoPrime-pretrained representations and combines view recognition, task-specific adaptation, and attention-based interpretation. The study compares frozen-feature training, LoRA, partial fine-tuning, and full fine-tuning, and investigates knowledge distillation to preserve pretrained semantics.'],
      ['Reported in the submitted manuscript', 'The study describes the HOPE cohort of 4,069 patients with suspected pulmonary embolism. EchoPE achieved a reported AUROC of 95.2 ± 0.3%, compared with 87.6 ± 1.0% for EchoPrime with a classification head. These results concern PE-associated right-heart phenotypes and do not establish a replacement for clinical diagnostic assessment.'],
      ['Authors, in order', 'Luming Yang; Yasemin Ozkut; Zhenyu Bu; Siqing Li; Chang Yu; Elaine Situ-LaCasse; Josie Acuña; Adrienne Yarnish; Martin Demant; Srikar R. Adhikari; Alper Yilmaz.']
    ]
  }
};

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    document.querySelectorAll('.filter').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    document.querySelectorAll('.paper').forEach(paper => {
      paper.hidden = selected !== 'all' && paper.dataset.authorship !== selected;
      if (!paper.hidden) count++;
    });
    document.querySelector('#filter-status').textContent = `Showing ${count} research project${count === 1 ? '' : 's'}.`;
  });
});

const dialog = document.querySelector('#project-dialog');
let previousTrigger;
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    previousTrigger = button;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-status').textContent = project.status;
    document.querySelector('#dialog-authorship').textContent = project.authorship;
    const content = document.querySelector('#dialog-body');
    content.replaceChildren();
    project.sections.forEach(([title, text]) => {
      const heading = document.createElement('h3');
      const paragraph = document.createElement('p');
      heading.textContent = title;
      if (title === 'Authors, in order') {
        const firstAuthor = document.createElement('strong');
        const separator = text.indexOf(';');
        firstAuthor.textContent = text.slice(0, separator);
        paragraph.append(firstAuthor, text.slice(separator));
      } else paragraph.textContent = text;
      content.append(heading, paragraph);
    });
    dialog.showModal();
  });
});
document.querySelectorAll('.dialog-close, .dialog-dismiss').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => previousTrigger?.focus());

document.querySelector('#year').textContent = new Date().getFullYear();

const themeButton = document.querySelector('.theme-toggle');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  themeButton.querySelector('span').textContent = theme === 'dark' ? '☀' : '☾';
}
let savedTheme;
try { savedTheme = localStorage.getItem('chang-yu-theme'); } catch {}
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('chang-yu-theme', next); } catch {}
});
