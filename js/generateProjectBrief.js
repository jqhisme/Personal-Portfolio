async function generateProjectBrief(projectName, shortBrief, awards,tools, labels, roles, credits){
    const response = await fetch('/assets/projects.json');
    const projects = await response.json();

    let thisProject = null;

    for (let project of projects){
        if (project.title === projectName){
            thisProject = {
                title: project.title,
                subtitle: project.subtitle,
                image: project.image,
                showcases: project.showcases,
                type: project.type,
                time: project.time,
            };
            break;
        }
    }

    if (!thisProject){
        console.error(`Project "${projectName}" not found in projects.json`);
        return null;
    }

    thisProject.tools = tools;
    thisProject.labels = labels;
    thisProject.roles = roles;
    thisProject.credits = credits;
    thisProject.shortBrief = shortBrief;
    thisProject.awards = awards;



    const titleContainer = document.createElement('div');
    titleContainer.className = 'project-title-container';
    titleContainer.innerHTML = `
        <h1 class="brief-title">${thisProject.title}</h1>
        <p class ="brief-labels">${thisProject.labels.join(' · ')}</p>
        <p class="brief-date">${thisProject.time.replace(/\D/g, '')}</p> 
        <p class="brief-description">
            <span class="meta-overview">${thisProject.shortBrief}</span>
            <br>
            <span class="meta-overview">${thisProject.awards}</span></p>
    `; // For date, only retain the year
    const contentContainer = document.querySelector('.content-container');
    contentContainer.parentElement.insertBefore(titleContainer, contentContainer);


    const metaContainer = document.createElement('div');
    metaContainer.className = 'project-meta-container';
    const toItems = arr => arr.map(s => `<span class="meta-item">${s}</span>`).join('');
    metaContainer.innerHTML = `
    <div class="meta-tools">
        <div class="meta-item-title">Tools</div>
        ${toItems(thisProject.tools)}
    </div>

    <div class="meta-roles">
        <div class="meta-item-title">Roles</div>
        ${toItems(thisProject.roles)}
    </div>

    <div class="meta-credits">
        <div class="meta-item-title">Credits and Acknowledgements</div>
        ${toItems(thisProject.credits)}
    </div>
    `
    contentContainer.parentElement.insertBefore(metaContainer, contentContainer);

    return thisProject;
}
