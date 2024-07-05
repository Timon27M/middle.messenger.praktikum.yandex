export default `
<div class="{{styles.chats}}">
  <div class="{{styles.nav}}">
    <a class="{{styles.link}}">Профиль<p class="{{styles.arrow}}">></p></a>
    <input class="{{styles.input}}" type="text" placeholder="Поиск" />
  </div>
  <div class="{{styles.chats-list}}">{{{chats}}}</div>
</div>
`