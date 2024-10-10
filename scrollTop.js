const scrollTopButton = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        scrollTopButton.classList.add('show');
    } else {
        scrollTopButton.classList.remove('show');
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});