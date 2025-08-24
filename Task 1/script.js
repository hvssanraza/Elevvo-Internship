document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-button');
    const body = document.body;
    const currentDateEl = document.getElementById('current-date');

    const setInitialSidebarState = () => {
        if (window.innerWidth <= 768) {
            body.classList.remove('sidebar-open');
        } else {
            body.classList.add('sidebar-open');
        }
    };

    const displayCurrentDate = () => {
        if (currentDateEl) {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            currentDateEl.textContent = now.toLocaleDateString('en-US', options);
        }
    };

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('sidebar-open');
    });

    setInitialSidebarState();
    displayCurrentDate();
});