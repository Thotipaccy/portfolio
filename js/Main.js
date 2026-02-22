document.addEventListener('DOMContentLoaded', ()=>{
	if(!window.PortfolioData) return;
	const data = PortfolioData.get();

	// Hero
	const hero = document.getElementById('hero-title');
	if(hero && data.profile && data.profile.name){
		hero.innerHTML = `Hello, I'm <span class="highlight">${data.profile.name}</span>`;
	}

	// About
	const about1 = document.getElementById('about-desc-1');
	const about2 = document.getElementById('about-desc-2');
	if(about1 && data.profile && data.profile.about && data.profile.about[0]) about1.textContent = data.profile.about[0];
	if(about2 && data.profile && data.profile.about && data.profile.about[1]) about2.textContent = data.profile.about[1];

	// Skills
	const skillsGrid = document.getElementById('skills-grid');
	if(skillsGrid && Array.isArray(data.skills)){
		const container = document.createElement('div');
		container.className = 'skill-items d-flex flex-wrap gap-2';
		data.skills.forEach(s=>{
			const el = document.createElement('div');
			el.className = 'skill-item p-2 border rounded';
			el.textContent = s;
			container.appendChild(el);
		});
		// replace content while preserving heading structure
		while(skillsGrid.firstChild) skillsGrid.removeChild(skillsGrid.firstChild);
		const h3 = document.createElement('h3'); h3.textContent = 'Skills & Expertise';
		skillsGrid.appendChild(h3);
		skillsGrid.appendChild(container);
	}

	// Projects
	const projectsGrid = document.getElementById('projects-grid');
	if(projectsGrid && Array.isArray(data.projects)){
		projectsGrid.innerHTML = '';
		data.projects.forEach(p=>{
			const card = document.createElement('div');
			card.className = 'project-card card mb-3';
			card.innerHTML = `
				<div class="card-body">
					<h5 class="card-title">${p.title}</h5>
					<p class="card-text">${p.description}</p>
					<div class="mb-2">
						${ (p.tags||[]).map(t=>`<span class="badge bg-secondary me-1">${t}</span>`).join('') }
					</div>
					${ p.url ? `<a href="${p.url}" target="_blank" class="btn btn-sm btn-outline-primary">View on GitHub</a>`: '' }
				</div>
			`;
			projectsGrid.appendChild(card);
		});
	}

	// Contact
	const emailEl = document.getElementById('contact-email');
	const phoneEl = document.getElementById('contact-phone');
	const locEl = document.getElementById('contact-location');
	if(emailEl && data.profile && data.profile.email) emailEl.textContent = data.profile.email;
	if(phoneEl && data.profile && data.profile.phone) phoneEl.textContent = data.profile.phone;
	if(locEl && data.profile && data.profile.location) locEl.textContent = data.profile.location;

	// Current year
	const yearEl = document.getElementById('current-year');
	if(yearEl) yearEl.textContent = new Date().getFullYear();
});
