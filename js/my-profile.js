if (user) {
    document.getElementById('userProfile').setAttribute("value", user)
  }


const darkMode = document.getElementById('flexSwitchCheckDefault');
const isNightMode = localStorage.getItem('nightMode');

    if (isNightMode === 'true') {
        document.body.classList.add('night-mode');
        darkMode.checked = true;
    }

    darkMode.addEventListener('click', () => {
        const nightModeActivated = darkMode.checked;
        document.body.classList.toggle('night-mode', nightModeActivated);
        localStorage.setItem('nightMode', nightModeActivated);
});