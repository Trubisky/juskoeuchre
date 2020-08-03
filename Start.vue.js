var startTemplate = `
<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2" style="text-align: center;">
  <h1>Your game code is: {{$parent.gameKey}}</h1>
  <input class="form-control" style="width: 40%; margin-left: 30%;" v-model="myName" v-show="!pickedName" placeholder="Your Name"/>
  <button class="btn btn-primary" style="margin-top: 15px;" v-show="!pickedName" v-on:click="pickName">Join Game</button>
  <h4 v-show="pickedName">Select a team</h4>
  <div style="border-style: solid; width: 20%; margin-left: 40%;" v-show="pickedName">
    North/South <br />
    <button class="btn" v-on:click="joinTeam('north')" v-bind:disabled="($parent.playerNames.north != 'Open' || pickedTeam) ? true : false">North ({{$parent.playerNames.north}})</button>
    <button class="btn" v-on:click="joinTeam('south')" v-bind:disabled="($parent.playerNames.south != 'Open' || pickedTeam) ? true : false">South ({{$parent.playerNames.south}})</button>
  </div>
  <div style="border-style: solid; width: 20%; margin-left: 40%; margin-top: 5px;" v-show="pickedName">
    East/West <br />
    <button class="btn" v-on:click="joinTeam('east')" v-bind:disabled="($parent.playerNames.east != 'Open' || pickedTeam) ? true : false">East ({{$parent.playerNames.east}})</button>
    <button class="btn" v-on:click="joinTeam('west')" v-bind:disabled="($parent.playerNames.west != 'Open' || pickedTeam) ? true : false">West ({{$parent.playerNames.west}})</button>
  </div>
  <h3 v-show="countdown">All players have now joined a team; starting game in {{countdown}} seconds</h3>
</div>
`;


var start = {
  template: startTemplate,
  data: function(){
    return {
      myName: null,
      pickedName: false,
      pickedTeam: false,
      countdown: 0
    }
  },
  methods: {
    incomingMessage: function(msg){
      switch(msg.action){
        case "getPlayersResult":
          console.log(msg.players);
          this.$parent.playerNames = msg.players;
        case "gameCountdownMessage":
          this.countdown = msg.time;
          if (msg.time == 0){
            this.$parent.$router.push({path: '/game'});
          }
      }
    },
    pickName: function(){
      if (this.myName){
        this.pickedName = true;
      }
    },
    joinTeam: function(teamName){
      this.pickedTeam = true;
      this.$parent.team = teamName;
      this.$parent.myName = this.myName;
      this.$parent.sendMessage({action: "joinTeam", key: this.$parent.gameKey, team: teamName, name: this.myName});
    }
  },
  mounted: function(){
    this.$parent.sendMessage({action: "getPlayers", key: this.$parent.gameKey});
    console.log(this.$parent.gameKey)
  }
}