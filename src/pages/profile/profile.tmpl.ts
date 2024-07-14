export default `
<main class="{{styles.profile}}">
{{{ButtonBack}}}
  <form class="{{styles.container}}">
  <a href="">
    <img class="{{styles.avatar}}" src={{avatar}} alt="avatar" />
    </a>
    <h2 class="{{styles.name}}">Ваня</h2>
  </div>
  <div class="{{styles.inputsBlock}}">
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Почта</p>
      <input name="email" disabled  value="pochta@yandex.ru" class="{{styles.input}}" type="text" />
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Логин</p>
      <input name="login" disabled value="ivanivanov" class="{{styles.input}}" type="text" />
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Имя</p>
      <input name="first_name" disabled value="Иван" class="{{styles.input}}" type="text" />
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Фамилия</p>
      <input name="second_name" disabled value="Иванов" class="{{styles.input}}" type="text" />
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Имя в чате</p>
      <input name="display_name" disabled value="Иван" class="{{styles.input}}" type="text" />
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Телефон</p>
      <input name="phone" disabled value="+7 (909) 967 30 30" class="{{styles.input}}" type="text" />
    </div>
  </div>
  <div class="{{styles.buttons}}">
    <button class="{{styles.button}} {{styles.buttonBlue}}">Изменить данные</button>
    <a type="button" href="/forgot-password" class="{{styles.button}} {{styles.buttonBlue}}">Изменить пароль</a>
    <a type="button" href="/login" class="{{styles.button}} {{styles.buttonRed}}">Выйти</a>
  </div>
  <div class="{{styles.popupBlock}}">
  <div class="{{styles.overlay}}"></div>
  <div class="{{styles.popup}}">
    <h2 class="{{styles.popupTitle}}">Загрузите файл</h2>
    <a class="{{styles.popupLink}}" href="#">Выбрать файл на компьютере</a>
   {{{ButtonPopup}}}
  </div>
</form>
</main>
`
