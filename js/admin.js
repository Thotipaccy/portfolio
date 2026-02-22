document.addEventListener('DOMContentLoaded', ()=>{
	const PASSWORD = 'admin123';
	const loginBox = document.getElementById('login-box');
	const editor = document.getElementById('editor');
	const btnLogin = document.getElementById('btn-login');
	const btnLogout = document.getElementById('btn-logout');
	const pwdInput = document.getElementById('admin-password');
	const jsonEditor = document.getElementById('json-editor');
	const btnLoad = document.getElementById('btn-load');
	const btnSave = document.getElementById('btn-save');
	const btnReset = document.getElementById('btn-reset');
	const btnApply = document.getElementById('btn-apply');

	function showEditor(){
		loginBox.classList.add('d-none');
		editor.classList.remove('d-none');
		sessionStorage.setItem('adminAuth','1');
		loadToEditor();
	}

	function showLogin(){
		loginBox.classList.remove('d-none');
		editor.classList.add('d-none');
		sessionStorage.removeItem('adminAuth');
	}

	function loadToEditor(){
		const data = PortfolioData.get();
		jsonEditor.value = JSON.stringify(data, null, 2);
		// preview image
		const imgPreview = document.getElementById('profile-image-preview');
		if(imgPreview){
			imgPreview.src = data.profile && data.profile.image ? data.profile.image : '';
		}
		// section toggles
		const toggles = document.getElementById('section-toggles');
		if(toggles && data.sections){
			toggles.innerHTML = '';
			Object.keys(data.sections).forEach(k=>{
				const id = 'toggle-' + k;
				const div = document.createElement('div');
				div.className = 'form-check form-switch';
				div.innerHTML = `<input class="form-check-input" type="checkbox" id="${id}" ${data.sections[k]? 'checked': ''}><label class="form-check-label" for="${id}">${k}</label>`;
				toggles.appendChild(div);
				document.getElementById(id).addEventListener('change', (e)=>{
					const d = PortfolioData.get(); d.sections[k] = e.target.checked; PortfolioData.set(d);
				});
			});
		}
	}

	// Projects editor rendering and handlers
	const projectsEditor = document.getElementById('projects-editor');
	const btnAddProject = document.getElementById('btn-add-project');

	function renderProjects(){
		const d = PortfolioData.get();
		projectsEditor.innerHTML = '';
		(d.projects || []).forEach(p=>{
			const card = document.createElement('div');
			card.className = 'card p-3';
			card.innerHTML = `
				<div class="d-flex gap-3">
					<div style="width:120px; flex-shrink:0">
						<img src="${p.image||''}" alt="proj" class="img-fluid" style="max-height:90px; width:100%; object-fit:cover; border-radius:6px; background:#f1f1f1">
						<input type="file" data-id="${p.id}" accept="image/*" class="form-control form-control-sm mt-2 proj-image-input">
					</div>
					<div style="flex:1">
						<div class="mb-2">
							<input class="form-control form-control-sm proj-title" data-id="${p.id}" value="${escapeHtml(p.title||'')}" placeholder="Title">
						</div>
						<div class="mb-2">
							<textarea class="form-control form-control-sm proj-desc" data-id="${p.id}" rows="2" placeholder="Description">${escapeHtml(p.description||'')}</textarea>
						</div>
						<div class="mb-2 d-flex gap-2">
							<input class="form-control form-control-sm proj-tags" data-id="${p.id}" value="${(p.tags||[]).join(', ')}" placeholder="tags (comma separated)">
							<input class="form-control form-control-sm proj-url" data-id="${p.id}" value="${p.url||''}" placeholder="URL">
						</div>
						<div class="d-flex justify-content-end gap-2 mt-2">
							<button class="btn btn-sm btn-danger btn-delete-project" data-id="${p.id}">Delete</button>
							<button class="btn btn-sm btn-success btn-save-project" data-id="${p.id}">Save</button>
						</div>
					</div>
				</div>
			`;
			projectsEditor.appendChild(card);
		});

		// wire inputs
		projectsEditor.querySelectorAll('.btn-save-project').forEach(b=>{
			b.addEventListener('click', ()=>{
				const id = b.dataset.id; saveProjectFromInputs(id);
			});
		});
		projectsEditor.querySelectorAll('.btn-delete-project').forEach(b=>{
			b.addEventListener('click', ()=>{
				const id = b.dataset.id; if(!confirm('Delete this project?')) return; PortfolioData.removeProject(id); renderProjects(); jsonEditor.value = JSON.stringify(PortfolioData.get(), null,2);
			});
		});
		projectsEditor.querySelectorAll('.proj-image-input').forEach(inp=>{
			inp.addEventListener('change', (ev)=>{
				const f = ev.target.files && ev.target.files[0];
				if(!f) return; const reader = new FileReader(); reader.onload = (e)=>{
					const d = PortfolioData.get(); const id = inp.dataset.id; const i = d.projects.findIndex(x=>x.id===id); if(i===-1) return; d.projects[i].image = e.target.result; PortfolioData.set(d); renderProjects(); jsonEditor.value = JSON.stringify(PortfolioData.get(), null,2);
				}; reader.readAsDataURL(f);
			});
		});
	}

	function saveProjectFromInputs(id){
		const title = projectsEditor.querySelector('.proj-title[data-id="'+id+'"]').value;
		const desc = projectsEditor.querySelector('.proj-desc[data-id="'+id+'"]').value;
		const tags = projectsEditor.querySelector('.proj-tags[data-id="'+id+'"]').value.split(',').map(s=>s.trim()).filter(Boolean);
		const url = projectsEditor.querySelector('.proj-url[data-id="'+id+'"]').value;
		const d = PortfolioData.get(); const i = d.projects.findIndex(x=>x.id===id); if(i===-1) return; d.projects[i].title = title; d.projects[i].description = desc; d.projects[i].tags = tags; d.projects[i].url = url; PortfolioData.set(d); jsonEditor.value = JSON.stringify(d, null,2); alert('Project saved'); renderProjects();
	}

	btnAddProject.addEventListener('click', ()=>{
		const newP = { id: 'p'+Date.now(), title: 'New Project', description: '', tags:[], url:'', image:'' };
		PortfolioData.addProject(newP); renderProjects(); jsonEditor.value = JSON.stringify(PortfolioData.get(), null,2);
	});

	// small helper to avoid XSS when inserting into value/content
	function escapeHtml(str){ return String(str||'').replace(/[&<>"']/g, s=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[s])); }

	// render projects on load
	renderProjects();

	function saveFromEditor(){
		try{
			const parsed = JSON.parse(jsonEditor.value);
			PortfolioData.set(parsed);
			alert('Saved to localStorage');
		}catch(e){
			alert('Invalid JSON: ' + e.message);
		}
	}

	btnLogin.addEventListener('click', ()=>{
		const v = pwdInput.value || '';
		if(v === PASSWORD){
			showEditor();
		}else{alert('Incorrect password');}
	});

	btnLogout.addEventListener('click', ()=>{
		showLogin();
	});

	btnLoad.addEventListener('click', loadToEditor);
	btnSave.addEventListener('click', saveFromEditor);
	btnReset.addEventListener('click', ()=>{
		if(!confirm('Reset all data to defaults?')) return;
		const d = PortfolioData.reset();
		jsonEditor.value = JSON.stringify(d, null, 2);
		alert('Reset to defaults');
	});

	// profile image upload handling
	const profileImageInput = document.getElementById('profile-image-input');
	if(profileImageInput){
		profileImageInput.addEventListener('change', (ev)=>{
			const f = ev.target.files && ev.target.files[0];
			if(!f) return;
			const reader = new FileReader();
			reader.onload = function(e){
				const dataUrl = e.target.result;
				const d = PortfolioData.get();
				d.profile = d.profile || {};
				d.profile.image = dataUrl;
				PortfolioData.set(d);
				const imgPreview = document.getElementById('profile-image-preview');
				if(imgPreview) imgPreview.src = dataUrl;
				alert('Profile image saved to localStorage (data URL)');
			};
			reader.readAsDataURL(f);
		});
	}

	btnApply.addEventListener('click', ()=>{
		saveFromEditor();
		window.open('index.html','_blank');
	});

	// initialize view
	if(sessionStorage.getItem('adminAuth')) showEditor(); else showLogin();
});
