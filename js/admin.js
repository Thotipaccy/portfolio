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
	}

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

	btnApply.addEventListener('click', ()=>{
		saveFromEditor();
		window.open('index.html','_blank');
	});

	// initialize view
	if(sessionStorage.getItem('adminAuth')) showEditor(); else showLogin();
});
