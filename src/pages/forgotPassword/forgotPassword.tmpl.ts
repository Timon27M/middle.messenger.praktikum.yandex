export default `
    <main class="{{styles.forgotPassword}}">
{{{ButtonBack}}}
  <div class="{{styles.container}}">
  <a href="#">
    <img class="{{styles.avatar}}" src={{avatar}} alt="avatar" />
    </a>
  </div>
  <form class="{{styles.inputsBlock}}">
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Старый пароль</p>
      <input name="oldPassword" disabled  value="pochta@yandex.ru" class="{{styles.input}}" type="password" />
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Новый пароль</p>
      <input name="newPassword" disabled  value="pochta@yandex.ru" class="{{styles.input}}" type="password" />
    </div>
    <div class="{{styles.inputBlock}}">
      <p class="{{styles.inputName}}">Повторите новый пароль</p>
      <input name="password" disabled  value="pochta@yandex.ru" class="{{styles.input}}" type="password" />
    </div>
  <div class="{{styles.buttonBlock}}">
    {{{Button}}}
  </div>
  </form>
</main>
`
