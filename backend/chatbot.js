
function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    if (userInput !== '') {
      var chatDisplay = document.getElementById('chat-display');
      
    
      chatDisplay.innerHTML += '<div class="user-message"><span class="icon">👤</span> ' + userInput + '</div>';
      document.getElementById('user-input').value = '';
  
      
      setTimeout(function() {
        chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon">🤖</span>Hola, ¿en qué puedo ayudarte?</div>';
        chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon">🤖</span><button onclick="showInfo(\'Opción 1\')">¿Qué debo hacer si encuentro una mascota perdida?</button></div>';
        chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon">🤖</span><button onclick="showInfo(\'Opción 2\')">¿Cuál es la información esencial que debo proporcionar al reportar una mascota perdida?</button></div>';
        chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon">🤖</span><button onclick="showInfo(\'Opción 3\')">¿Dónde puedo hacer una donación?</button></div>';
        chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon">🤖</span><button onclick="showInfo(\'Opción 4\')">¿Cómo puedo buscar refugios cercanos en la plataforma?</button></div>';
        chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon">🤖</span><button onclick="showInfo(\'Opción 5\')">¿Cómo puedo realizar un donativo para apoyar la causa?</button></div>';
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
      }, 500);
    }
}
  
  function showInfo(option) {
    var chatDisplay = document.getElementById('chat-display');
    

    chatDisplay.innerHTML += '<div class="user-message"><span class="icon">👤</span> ' + option + '</div>';
  
    setTimeout(function() {
      switch (option) {
        case 'Opción 1':
            chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon">🤖</span>Deberás reportarla en la sección del foro de su respectiva mascota.</div>';
        break;
        case 'Opción 2':
          chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon">🤖</span>Deberás de mostrar los mayores detalles de tu mascota, cómo:</div>';
          chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon"></span><ul><li>Nombre</li><li>Raza</li><li>Fotografía</li><li>Especie</li><li>Fecha de extravío</li><li>Tamaño</li><li>Información adicional</li></ul></div>';

          break;
        case 'Opción 3':
          chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon">🤖</span>En la sección de Refugios<i class="fa-solid fa-arrow-right"></i>Donativos </div>';
          break;
        case 'Opción 4':
            chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon">🤖</span>En la sección de Refugios encontrarás una lista que contiene diversos refugios con su información correspondiente.</div>';
          break; 
        case 'Opción 5':
            chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon">🤖</span>Por el momento se cuentan con tres métodos para apoyar:</div>';
            chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon"></span><ul><li>Paypal</li><li>Tarjeta bancaria</li><li>Comida</li></ul></div>';
          break;     
        default:
          chatDisplay.innerHTML += '<div class="chatbot-message"><span class="icon">🤖</span> No se reconoce la opción seleccionada.</div>';
          break;
      }
      chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }, 500);
  }
  

  document.getElementById('chatbot').addEventListener('click', function () {
    var chatContainer = document.querySelector('.chat-container');
    chatContainer.style.display = (chatContainer.style.display === 'none' || chatContainer.style.display === '') ? 'block' : 'none';
  });
  