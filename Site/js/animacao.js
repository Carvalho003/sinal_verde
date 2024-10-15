document.addEventListener('DOMContentLoaded', function() {
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1, // O quanto do elemento deve estar visível antes de ativar
        rootMargin: "0px 0px -50px 0px" // Margem para ativar a animação um pouco antes
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        console.log(entries);
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(entry)
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, appearOptions);


   
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});