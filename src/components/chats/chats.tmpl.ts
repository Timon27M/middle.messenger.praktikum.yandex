export default `
<div class="{{styles.chats}}">
  <div class="{{styles.nav}}">
    <a class="{{styles.link}}" href='/profile'>Профиль<p class="{{styles.arrow}}">></p></a>
    <input name="message" class="{{styles.input}}" type="text" placeholder="Поиск" />
  </div>
  <div class="{{styles.chats-list}}">{{{chats}}}</div>
</div>
`