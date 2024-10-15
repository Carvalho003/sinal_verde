let statusCard = false;
function hoverCard(element){
    
  let paragrafo = element.querySelector('p');
  let titulo = element.querySelector('.textoACaio');


  
  if(!statusCard){
  element.style.animation = 'expandir 1s  linear'
  titulo.style.marginTop = '82px'
  
  titulo.style.color = '#fff'
  paragrafo.style.color = '#fff'
  
  paragrafo.style.display = 'flex'
  paragrafo.style.animation = 'paragrafo 4s linear ease-in'
  setTimeout(() => {
      element.style.minHeight = '420px'
      element.style.height = 'fit-content'
      console.log('trocou')
      element.style.backgroundColor = 'var(--primary-color)'
      paragrafo.style.animation = '';
      statusCard = true;
    },900)
}
}



function notHoverCard(element) {
    console.log('saiu')
    let paragrafo = element.querySelector('p');
    let titulo = element.querySelector('.textoACaio');
    if(statusCard){
    
        
        
        element.style.animation = 'encolher 1s linear';
        element.style.backgroundColor = '#fff'
        element.style.minHeight = '200px'
        element.style.height = '200px'
        paragrafo.style.display = 'none'
        titulo.style.color = 'var(--secondary-color)'
        titulo.style.marginTop = '134px'

        setTimeout(() => {
            statusCard = false;
        },1000)
    
    }
}
