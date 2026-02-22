const STORAGE_KEY = 'portfolioData_v1';

const defaultData = {
	profile: {
		name: 'THOTI PACIFIQUE NIBISHAKA',
		title: 'Software Engineering Student',
		about: [
			"I am THOTI PACIFIQUE NIBISHAKA, a passionate software engineering student from Rwanda.",
			"Currently pursuing my Bachelor's Degree in Software Engineering and building projects to learn and grow."
		],
		email: 'thotipaccy@gmail.com',
		phone: '+250 786 308 963',
		location: 'Kigali, Rwanda',
		image: 'assets/Profile.jpeg'
	},
	skills: [
		'HTML5','CSS3','JavaScript','Python','Java','Oracle SQL','PHP','Networking'
	],
	projects: [
		{
			id: 'p1',
			title: 'Venus and Napping - VAPT',
			description: 'Black-box penetration test and vulnerability assessment on two VulnHub servers.',
			tags: ['Security','VAPT','Linux'],
			url: 'https://github.com/Thotipaccy/venus-napping-vapt',
			image: ''
		},
		{
			id: 'p2',
			title: 'Student Performance Analytics',
			description: 'ML pipeline and Power BI dashboard for student performance insights.',
			tags: ['Python','ML','Power BI'],
			url: 'https://github.com/Thotipaccy/StudentPerformanceAnalytics',
			image: ''
		}
	],
	sections: {
		about: true,
		skills: true,
		projects: true,
		experience: true,
		contact: true,
		testimonials: true
	},
	experience: [
		{ year: '2023 - Present', role: "Bachelor's Degree in Software Engineering" },
		{ year: '2016 - 2022', role: "A'Level & O'Level - Petit Seminaire Saint Kizito de Zaza" }
	],
	testimonials: []
};

const PortfolioData = (function(){
	function load(){
		try{
			const raw = localStorage.getItem(STORAGE_KEY);
			if(!raw) return JSON.parse(JSON.stringify(defaultData));
			return JSON.parse(raw);
		}catch(e){
			console.error('Failed to load portfolio data', e);
			return JSON.parse(JSON.stringify(defaultData));
		}
	}

	function save(data){
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	}

	function reset(){
		save(defaultData);
		return load();
	}

	function get(){ return load(); }
	function set(newData){ save(newData); }

	function addProject(project){
		const data = load();
		project.id = project.id || ('p' + Date.now());
		data.projects.push(project);
		save(data);
		return project;
	}

	function updateProject(projectId, patch){
		const data = load();
		const i = data.projects.findIndex(p=>p.id===projectId);
		if(i===-1) return null;
		data.projects[i] = {...data.projects[i], ...patch};
		save(data);
		return data.projects[i];
	}

	function removeProject(projectId){
		const data = load();
		data.projects = data.projects.filter(p=>p.id!==projectId);
		save(data);
	}

	return {
		load, save, reset, get, set, addProject, updateProject, removeProject, defaultData
	};
})();

window.PortfolioData = PortfolioData;

