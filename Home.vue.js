var homeTemplate = `
<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2" style="text-align: center;">
  <h1 style="text-align: center;">Welcome to JuskoEucher</h1>
  <button class="btn btn-primary" v-on:click="startGame">Start a New Game</button>  
  <h3>OR</h3>
  <input class="form-control" style="width: 40%; margin-left: 30%; float: center" placeholder="Join Code" v-model="keyInput"/>
  <button class="btn btn-primary" style="margin-top: 15px;" v-on:click="joinGame">Join Game</button>
</div>
`;


var home = {
  template: homeTemplate,
  data: function(){
    return{
      keyInput: null
    }
  },
  methods:{
    incomingMessage: function(msg){
      switch(msg.action){
        case "newGameResult":
          console.log(msg.key);
          this.$parent.gameKey = msg.key;
          this.$parent.$router.push({path: '/start'});
          break;
        case "joinGameResult":
          console.log(msg);
          if (msg.result == false){
            alert("Invalid Join Code");
            return;
          }
          this.$parent.gameKey = this.keyInput;
          this.$parent.$router.push({path: '/start'});
          break;
      }
    },
    startGame: function(msg){
       this.$parent.sendMessage({action: "newGame"});
    },
    joinGame: function(){
      this.$parent.sendMessage({action: "joinGame", key: this.keyInput});
    }
  }
}