function createProjectGrid(projects) {
    const grid = document.createElement('div');
    grid.className = 'project-grid';
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.projectType = project.type; // store project type for filtering
        card.time = project.time; // store project time for potential future use
        card.showcases = project.showcases; // store project showcases for potential future use
        const slug = project.title.toLowerCase().replace(/ /g, '-');
        const href = project.link ?? `/works/${slug}.html`;
        const target = project.link ? 'target="_blank" rel="noopener noreferrer"' : '';
        card.innerHTML = `
        <a href="${href}" class="project-card-link" ${target}>
            <div class="project-image-wrapper">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <p class="project-subtitle">${project.subtitle}</p>
                </div>
            </div>
            <h3>${project.title}</h3>
        </a>
        `;
        grid.appendChild(card);
    });
    return grid;
}

function createProjectGridWithFilters(projects, filter_name) {
    const grid = document.createElement('div');
    grid.className = 'project-grid';

    // TODO:
    // right now it is uusing filter_name == type
    // in the future, a project may have multiple tags
    // we then need to check if filter_name is in project.tags
    const filteredProjects = filter_name === 'All' ? projects : projects.filter(p => p.type === filter_name.toLowerCase());
    filteredProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        const slug = project.title.toLowerCase().replace(/ /g, '-');
        card.innerHTML = `
        <a href="/projects/${slug}.html" class="project-card-link">
            <div class="project-image-wrapper">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <p class="project-subtitle">${project.subtitle}</p>
                </div>
            </div>
            <h3>${project.title}</h3>
        </a>
        `;
        grid.appendChild(card);
    });
    return grid;
}

function readProjectsFromJSON(){
    const jsonPath = 'assets/projects.json';
    return fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            return [];
        });
} 

function staggerAnimateCards(cards) {
    cards.forEach(card => card.classList.remove('card-enter'));
    void document.getElementById('project-grid-container').offsetWidth; // force reflow
    let idx = 1;
    cards.forEach(card => {
        if (card.style.display !== 'none') {
            card.style.animationDelay = `${idx * 80}ms`;
            card.classList.add('card-enter');
            idx++;
        }
    });
}

let projects = [];
async function initProjectGrid(){
    projects = await readProjectsFromJSON();
    const projectGrid = createProjectGrid(projects); // render all the projects
    document.getElementById('project-grid-container').appendChild(projectGrid);

    const allCards = Array.from(document.querySelectorAll('.project-card'));
    staggerAnimateCards(allCards);

    document.querySelectorAll('.left-btn').forEach(button => {
        button.addEventListener('click', () => {
            const filterName = button.textContent;
            allCards.forEach(card => {
                const projectType = card.projectType;
                card.style.display = (filterName === 'All' || projectType === filterName.toLowerCase()) ? 'block' : 'none';
            });
            staggerAnimateCards(allCards);
        });
    });

}

initProjectGrid();

// readProjectsFromJSON().then(data => {
//     projects = data;
//     const projectGrid = createProjectGrid(projects);
//     document.getElementById('project-grid-container').appendChild(projectGrid);
    
//     // Initialize filter buttons after projects are loaded
//     initFilterButtons(projects);
// });