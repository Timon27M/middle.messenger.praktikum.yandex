export default `
<main class="{{styles.login}}">
  <div class="{{styles.container}}">
    <h2 class="{{styles.title}}">Вход</h2>
    <div class="{{styles.inputs}}">
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Логин</p>
        <input type="text" class="{{styles.input}}" name="login" value="ivaninvanov">
      </div>
      <span class="{{styles.textError}}">Неверный логин</span> 
      <div class="{{styles.inputBlock}}">
        <p class="{{styles.inputName}}">Пароль</p>
        <input type="password" class="{{styles.input}}" name="password" value="ivaninvanov">
      </div>
    </div>
      {{{Button}}}
      <a class="{{styles.link}}" href="/register">Нет аккаунта?</a>
  </div>
</main>
`;
