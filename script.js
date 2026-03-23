let jobsData = [
    { id: 1, company: "Mobile First Corp", role: "React Native Developer", loc: "Remote", type: "Full-time", pay: "$130k - $175k", desc: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "none" },
    { id: 2, company: "WebFlow Agency", role: "Web Designer & Developer", loc: "Los Angeles, CA", type: "Part-time", pay: "$80k - $120k", desc: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status: "none" },
    { id: 3, company: "DataViz Solutions", role: "Data Visualization Specialist", loc: "Boston, MA", type: "Full-time", pay: "$125k - $165k", desc: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.", status: "none" },
    { id: 4, company: "CloudScale", role: "DevOps Engineer", loc: "Remote", type: "Contract", pay: "$150k - $190k", desc: "Automating cloud infrastructure and CI/CD pipelines for high-growth tech startups.", status: "none" },
    { id: 5, company: "FinTech Hub", role: "Senior Backend Developer", loc: "New York, NY", type: "Full-time", pay: "$160k - $210k", desc: "Developing secure and scalable microservices for financial transaction processing.", status: "none" },
    { id: 6, company: "GreenTech", role: "Full Stack Engineer", loc: "Austin, TX", type: "Hybrid", pay: "$110k - $150k", desc: "Join our mission to build software that helps companies reduce their carbon footprint.", status: "none" },
    { id: 7, company: "Creative Minds", role: "UX/UI Designer", loc: "London, UK", type: "Full-time", pay: "$10k - $30k", desc: "Crafting beautiful and functional user interfaces for our global e-commerce platform.", status: "none" },
    { id: 8, company: "HealthBot AI", role: "Machine Learning Engineer", loc: "Remote", type: "Full-time", pay: "$180k - $240k", desc: "Training NLP models to provide better healthcare insights through AI assistants.", status: "none" }
];

let filterStatus = 'all';

function render() {
    const wrapper = document.getElementById('jobs-wrapper');
    const filtered = jobsData.filter(job => filterStatus === 'all' ? true : job.status === filterStatus);
    
    document.getElementById('total-count').innerText = jobsData.length;
    document.getElementById('interview-count').innerText = jobsData.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-count').innerText = jobsData.filter(j => j.status === 'rejected').length;
    document.getElementById('jobs-count').innerText = filtered.length;

    if (filtered.length === 0) {
        wrapper.innerHTML = `
            <div class="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <i class="fa-regular fa-folder-open text-5xl text-slate-300 mb-4"></i>
                <h3 class="text-lg font-bold text-slate-700">No Jobs Available</h3>
                <p class="text-slate-500 text-sm">Try checking another tab or add more applications.</p>
            </div>
        `;
        return;
    }

    wrapper.innerHTML = filtered.map(job => `
        <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col relative">
            <button onclick="deleteJob(${job.id})" class="absolute top-8 right-8 w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                <i class="fa-solid fa-trash-can"></i>
            </button>
            
            <h3 class="text-xl font-bold text-slate-800">${job.company}</h3>
            <p class="text-slate-500 mb-4">${job.role}</p>
            
            <div class="flex gap-4 text-sm text-slate-400 mb-6 font-medium">
                <span>${job.loc}</span> • <span>${job.type}</span> • <span>${job.pay}</span>
            </div>

            <div class="mb-4">
                <span class="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded">
                    ${job.status === 'none' ? 'Not Applied' : job.status.replace('-', ' ')}
                </span>
            </div>

            <p class="text-slate-600 text-sm mb-8 leading-relaxed max-w-3xl">${job.desc}</p>

            <div class="flex gap-3">
                <button onclick="updateStatus(${job.id}, 'interview')" class="btn btn-sm px-6 border-emerald-500 bg-white text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 ${job.status === 'interview' ? 'bg-emerald-500 text-white border-emerald-500' : ''}">INTERVIEW</button>
                <button onclick="updateStatus(${job.id}, 'rejected')" class="btn btn-sm px-6 border-rose-400 bg-white text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 ${job.status === 'rejected' ? 'bg-rose-500 text-white border-rose-500' : ''}">REJECTED</button>
            </div>
        </div>
    `).join('');
}

window.updateStatus = (id, newStatus) => {
    const job = jobsData.find(j => j.id === id);
    // If clicking the same status, toggle it back to 'none'
    job.status = job.status === newStatus ? 'none' : newStatus;
    render();
};

window.deleteJob = (id) => {
    if(confirm("Permanently delete this application?")) {
        jobsData = jobsData.filter(j => j.id !== id);
        render();
    }
};

window.filterBy = (status) => {
    filterStatus = status;
    // Simple UI update for buttons
    ['all', 'interview', 'rejected'].forEach(s => {
        const btn = document.getElementById(`btn-${s}`);
        if(s === status) {
            btn.className = "btn btn-sm bg-blue-600 border-none text-white";
        } else {
            btn.className = "btn btn-sm bg-white border-slate-200 text-slate-600";
        }
    });
    render();
};

render();