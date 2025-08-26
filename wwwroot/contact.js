document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const confirmation = document.getElementById('confirmationMessage');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
  
      // Сохраняем данные в localStorage
      localStorage.setItem('contactFormData', JSON.stringify({ name, email, message }));
  
      // Показываем подтверждение
      confirmation.style.display = 'block';
  
      // Скрываем через 3 секунды (по желанию)
      setTimeout(() => {
        confirmation.style.display = 'none';
      }, 3000);
  
      // Очищаем форму
      form.reset();
    });
  });
  
  
  const navBtn = document.getElementById('nav-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const sideNav = document.getElementById('sidenav');
  const modal = document.getElementById('modal');
  
  navBtn.addEventListener("click", function(){
      sideNav.classList.add('show');
      modal.classList.add('showModal');
  });
  
  cancelBtn.addEventListener('click', function(){
      sideNav.classList.remove('show');
      modal.classList.remove('showModal');
  });
  
  window.addEventListener('click', function(event){
      if(event.target === modal){
          sideNav.classList.remove('show');
          modal.classList.remove('showModal');
      }
  });