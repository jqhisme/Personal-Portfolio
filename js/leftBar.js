function createLeftBar(sections) {
    const aside = document.createElement('aside');
    aside.className = 'left-bar';

    const title = document.createElement('h2');
    title.className = 'left-title';
    title.textContent = 'Scroll to';
    aside.appendChild(title);

    const NAV_HEIGHT = 80;


    // if sections are provided, use them; otherwise, generate from content titles
    const sectionList = sections ?? [
        'Overview',
        ...Array.from(document.querySelectorAll('.content-title')).map(el => el.textContent.trim())
    ];

    const btnRow = document.createElement('div');
    btnRow.className = 'left-btn-row';

    sectionList.forEach(section => {
        const button = document.createElement('button');
        button.className = 'left-btn';
        button.textContent = section;

        button.addEventListener('click', () => {
            if (section === 'Overview') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const headings = document.querySelectorAll('h1');
            for (const h of headings) {
                if (h.textContent.trim() === section) {
                    const top = h.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
                    window.scrollTo({ top, behavior: 'smooth' });
                    return;
                }
            }
        });

        btnRow.appendChild(button);
    });

    aside.appendChild(btnRow);

    return aside;
}