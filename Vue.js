
var router = new VueRouter({
  routes: [
    {path: "/", component: home},
    {path: "/game", component: game},
    {path: "/start", component: start}
  ],
  base: "/"
});
Vue.use(VueRouter);
var app = new Vue({
  el: "#appy",
  router: router,
  data: function(){
    return {
      connection: null,
      gameKey: null,
      playerNames: {north: "", south: "", east: "", west: ""},
      team: null,
      myName: null,
      spade: "https://image.flaticon.com/icons/png/512/24/24155.png",
      club: "https://cdn3.iconfinder.com/data/icons/basic-mobile-part-2/512/clubs-512.png",
      diamond: "https://cdn.iconscout.com/icon/free/png-512/diamond-suit-card-37936.png",
      heart: "https://getdrawings.com/free-icon/red-heart-icon-52.png"
    }
  },
  methods: {
    incomingMessage: function(msg){
      console.log(msg);
      for(var child of this.$children){
        child.incomingMessage(JSON.parse(msg.data));
      }
    },
    sendMessage: function(json){
      this.connection.send(JSON.stringify(json));
    }
  },
  created: function(){
    this.connection = new WebSocket("wss://cardsapi.glitch.me");
    this.connection.onmessage = this.incomingMessage;
    console.log(this.$children);
  }
});
//window.$cookies.set('test', '123');
