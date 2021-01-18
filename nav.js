const headerBar=document.querySelector('.header-bar'),
    toggleButton=headerBar.querySelector('.toggleButton'),
    menu=headerBar.querySelector('.header-bar_menu');
toggleButton.addEventListener('click',()=>{
        menu.classList.toggle("showing");
});