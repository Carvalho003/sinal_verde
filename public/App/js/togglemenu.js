function toggleMenu(){
    document.querySelector('.menu').classList.toggle('hide');
}

document.querySelector('.menu').querySelectorAll('li')[1].querySelector('span').addEventListener('click', () =>{
    window.location.href = '../login.html';
})

