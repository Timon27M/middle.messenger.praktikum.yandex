export default `<main class="{{styles.register}}">
  <form class="{{styles.container}}">
    <h2 class="{{styles.title}}">Регистрация</h2>
    <div class="{{styles.inputs}}">
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Почта</p>
        <input type="email" class="{{styles.input}}" name="email" value="pochta@yandex.ru">
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Логин</p>
        <input type="text" class="{{styles.input}}" name="login" value="ivaninvanov">
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Имя</p>
        <input type="text" class="{{styles.input}}" name="first_name" value="Иван">
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Фамилия</p>
        <input type="text" class="{{styles.input}}" name="second_name" value="Иванов">
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Телефон</p>
        <input type="tel" class="{{styles.input}}" name="phone" value="+7 (909) 967 30 30">
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Пароль</p>
        <input type="password" class="{{styles.input}}" name="password" value="ivaninvanov">
      </div>
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Пароль (ещё раз)</p>
        <input type="password" class="{{styles.input}}" name="password" value="ivaninvanov">
        </div>
        <span class="{{styles.textError}}">Пароли не совпадают</span>  
    </div>
      {{{Button}}}
      <a class="{{styles.link}}" href="/login">Войти</a>
  </form>
</main>
`