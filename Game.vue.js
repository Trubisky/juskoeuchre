var gameTemplate = `
<div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2" style="height: 800px; width: 1000px; margin-left: 22%; margin-top: 1%; display: inline-block; position: relative;">
      <div style="width: 50%; height: 50%; position: absolute; border-style: solid; margin-left: 25%; margin-top: 20%; background-color: grey;" v-show="showCall">
        <h2 style="text-align: center;">It is your call</h2>
        <div class="gCard" style="width: 30%; margin-left: 35%; height: auto;">
          <h4 style="text-align: center;">
            {{displaySelector.display}}
          </h4>
          <img style="width: 60%; margin-left: 20%;" v-bind:src="displaySelector.url"/>
          <br /><br />
        </div>
        <div class="row" style="width: 70%; height: 20%; margin-left: 15%; margin-top:10%;">
          <div class="col-xs-6">
            <button class="btn" style="width: 100%; height: 100%" v-on:click="call">Call Trump</button>
          </div>
          <div class="col-xs-6">
            <button class="btn" style="width: 100%; height: 100%" v-on:click="pass">Pass</button>
          </div>
        </div>
      </div>
      <div style="width: 50%; height: 50%; position: absolute; border-style: solid; margin-left: 25%; margin-top: 20%; background-color: grey;" v-show="showCall2">
        <h2 style="text-align: center;">Select a trump suit</h2>
        <div class="row" style="width: 70%; height: 20%; margin-left: 15%; margin-top:10%;">
          <div class="col-xs-6">
            <button class="btn" style="width: 100%; height: 100%" v-on:click="pickTrump('S')" v-bind:disabled="lastTrump == 'S'">Spades</button>
            <button class="btn" style="width: 100%; height: 100%" v-on:click="pickTrump('H')" v-bind:disabled="lastTrump == 'H'">Hearts</button>
          </div>
          <div class="col-xs-6">
            <button class="btn" style="width: 100%; height: 100%" v-on:click="pickTrump('D')" v-bind:disabled="lastTrump == 'D'">Diamonds</button>
            <button class="btn" style="width: 100%; height: 100%" v-on:click="pickTrump('C')" v-bind:disabled="lastTrump == 'C'">Clubs</button>
          </div>
          <button class="btn" style="width: 40%; height: 100%; margin-left: 30%;" v-on:click="pickTrump('pass')" v-bind:disabled="forcePick">Pass</button>
        </div>
      </div>
      <div style="width: 50%; height: 50%; position: absolute; border-style: solid; margin-left: 25%; margin-top: 20%; background-color: grey; display: block;" v-show="showReplace">
        <h4 style="text-align: center;">Someone has called trump. You must pick up the card shown below and replace a card in your hard with it.</h4>
        <div class="gCard" style="width: 30%; margin-left: 35%; height: auto; display: block;">
          <h4 style="text-align: center;">
            {{displaySelector.display}}
          </h4>
          <img style="width: 60%; margin-left: 20%; display: block;" v-bind:src="displaySelector.url"/>
          <br /><br />
        </div>
        <br />
        <br />
        <h4 style="text-align: center; display: block;">Click a card below to replace it.</h4>
      </div>
      <div class="gColumn">
        <h5 style="margin: 0 0 0 0; text-align: center;">
          Scores: <br />North South - {{gScores.northsouth}}<br /><br />East West - {{gScores.eastwest}}
        </h5>
        <img class="gIcon" style="margin-top: 180%;" src="https://cdn.glitch.com/09fc8d0f-5bbf-45c7-ac44-e0e2479ee803%2Fbatman-icon.png?v=1584675667177" v-bind:style="{backgroundColor: positions.left == turn ? 'gold' : 'white'}">
        <h6 style="margin: 0 0 0 0; text-align: center;">
          {{leftName}}
          <br />
          <span style="color: green;" v-show="dealer == positions.left">Dealer</span><br />
          <span style="color: red;" v-show="calledTrump == positions.left">Called Trump</span>
        </h6>
      </div>
      <div class="gColumn" style="border-right: none; border-left: none;">
        <h4 style="text-align: center;">
          Trump
        </h4>
        <img style="width: 30%; margin-left: 35%" v-bind:src="computedTrump">
        <div class="gCard" style="margin-top: 400%;" v-on:click="playCard('card1');" v-show="cards.card1" v-bind:style="{backgroundColor: this.cards.canPlay1 ? 'white' : 'grey'}">
          <h4 style="text-align: center;">
            {{display1.display}}
          </h4>
          <img style="width: 60%; margin-left: 20%;" v-bind:src="display1.url"/>
        </div>
      </div>
      <div class="gColumn" style="border-right: none; border-left: none;">
        <div class="gCard" style="margin-top: 230%;">
          <h4 style="text-align: center;">
            {{displayleft.display}}
          </h4>
          <img style="width: 60%; margin-left: 20%;" v-bind:src="displayleft.url"/>
        </div>
        <div class="gCard" style="margin-top: 117%;" v-on:click="playCard('card2');" v-show="cards.card2" v-bind:style="{backgroundColor: this.cards.canPlay2 ? 'white' : 'grey'}">
          <h4 style="text-align: center;">
            {{display2.display}}
          </h4>
          <img style="width: 60%; margin-left: 20%;" v-bind:src="display2.url"/>
        </div>
      </div>
      <div class="gColumn" style="border-right: none; border-left: none;">
        <img class="gIcon" src="https://cdn.glitch.com/09fc8d0f-5bbf-45c7-ac44-e0e2479ee803%2Fperson-male%5B1%5D.png?v=1584568765407" v-bind:style="{backgroundColor: positions.top == turn ? 'gold' : 'white'}">
        <h6 style="margin: 0 0 0 0; text-align: center;">
          {{topName}}
        </h6>
        <h6 style="margin: 0 0 0 0; text-align: center;">
           <span style="color: green;" v-show="dealer == positions.top">Dealer</span>
          <br />
          <span style="color: red;" v-show="calledTrump == positions.top">Called Trump</span>
          <br />
        </h6>
        <div class="gCard" style="margin-top: 39%;">
          <h4 style="text-align: center;">
            {{displaytop.display}}
          </h4>
          <img style="width: 60%; margin-left: 20%;" v-bind:src="displaytop.url"/>
        </div>
        <div class="gCard">
          <h4 style="text-align: center;">
            {{displaybottom.display}}
          </h4>
          <img style="width: 60%; margin-left: 20%;" v-bind:src="displaybottom.url"/>
        </div>
        <div class="gCard" style="margin-top: 61%;" v-on:click="playCard('card3');" v-show="cards.card3" v-bind:style="{backgroundColor: this.cards.canPlay3 ? 'white' : 'grey'}">
          <h4 style="text-align: center;">
            {{display3.display}}
          </h4>
          <img style="width: 60%; margin-left: 20%;" v-bind:src="display3.url"/>
        </div>
      </div>
      <div class="gColumn" style="border-right: none; border-left: none;"> 
        <div class="gCard" style="margin-top: 230%;">
          <h4 style="text-align: center;">
            {{displayright.display}}
          </h4>
          <img style="width: 60%; margin-left: 20%;" v-bind:src="displayright.url"/>
        </div>
        <div class="gCard" style="margin-top: 117%;" v-on:click="playCard('card4');" v-show="cards.card4" v-bind:style="{backgroundColor: this.cards.canPlay4 ? 'white' : 'grey'}">
          <h4 style="text-align: center;">
            {{display4.display}}
          </h4>
          <img style="width: 60%; margin-left: 20%;" v-bind:src="display4.url"/>
        </div>
      </div>
      <div class="gColumn" style="border-right: none; border-left: none;">
        <div class="gCard" style="margin-top: 461%;" v-on:click="playCard('card5');" v-show="cards.card5" v-bind:style="{backgroundColor: this.cards.canPlay5 ? 'white' : 'grey'}">
          <h4 style="text-align: center;">
            {{display5.display}}
          </h4>
          <img style="width: 60%; margin-left: 20%;" v-bind:src="display5.url"/>
        </div>
      </div>
      <div class="gColumn">
        <h5 style="margin: 0 0 0 0; text-align: center;">
          Tricks: <br />1st: {{$parent.playerNames[wonTricks[0]]}}<br />2nd: {{$parent.playerNames[wonTricks[1]]}}<br />3rd: {{$parent.playerNames[wonTricks[2]]}}<br />4th: {{$parent.playerNames[wonTricks[3]]}}<br />5th: {{$parent.playerNames[wonTricks[4]]}}
        </h5>
        <img class="gIcon" style="margin-top: 160%;" src="https://cdn.glitch.com/09fc8d0f-5bbf-45c7-ac44-e0e2479ee803%2F585e4bf3cb11b227491c339a%5B1%5D.png?v=1584733658230" v-bind:style="{backgroundColor: positions.right == turn ? 'gold' : 'white'}">
        <h6 style="margin: 5 0 0 0; text-align: center;">
          {{rightName}}<br />
          <span style="color: green;" v-show="dealer == positions.right">Dealer</span><br />
          <span style="color: red;" v-show="calledTrump == positions.right">Called Trump</span>
        </h6>

      </div>
    </div>
`;


var game = {
  template: gameTemplate,
  data: function(){
    return {
      trump: null,
      topName: "Top Name",
      leftName: "Left Name",
      rightName: "Right Name",
      dealer: null,
      lead: null,
      calledTrump: null,
      turn: null,
      selectorCard: "ND",
      showCall: false,
      showCall2: false,
      showReplace: false,
      lastTrump: null,
      forcePick: false,
      lastMessage: null,
      roundStarted: false,
      rScores: {
        northsouth: 0,
        eastwest: 0
      },
      gScores: {
        northsouth: 0,
        eastwest: 0
      },
      wonTricks: [],
      positions: {
        top: null,
        left: null,
        right: null,
        bottom: null
      },
      match: {
        D: "H",
        H: "D",
        S: "C",
        C: "S"
      },
      cards: {
        card1: "TH",
        card2: "TH",
        card3: "KC",
        card4: "9D",
        card5: "9D",
        cardtop: null,
        cardbottom: null,
        cardleft: null,
        cardright: null,
        canPlay1: false,
        canPlay2: false,
        canPlay3: false,
        canPlay4: false,
        canPlay5: false
      },
      layouts: {
        north: {
          south: "cardtop",
          east: "cardleft",
          west: "cardright",
          north: "cardbottom"
        },
        south: {
          north: "cardtop",
          east: "cardright",
          west: "cardleft",
          south: "cardbottom"
        },
        west: {
          east: "cardtop",
          south: "cardright",
          north: "cardleft",
          west: "cardbottom"
        },
        east: {
          north: "cardright",
          east: "cardbottom",
          west: "cardtop",
          south: "cardleft"
        },
      }
    }
  },
  watch: {
    lastMessage: function(val){
      for (var i=1; i<=5; i++){
        if (this.cards["card"+i]){
            this.cards["canPlay"+i] = this.determineLegalPlay(this.cards["card"+i]);
        }
      }
    }
  },
  computed:{
    display1: function(){
      return this.createCardObject(this.cards.card1);
    },
    display2: function(){
      return this.createCardObject(this.cards.card2);
    },
    display3: function(){
      return this.createCardObject(this.cards.card3);
    },
    display4: function(){
      return this.createCardObject(this.cards.card4);
    },
    display5: function(){
      return this.createCardObject(this.cards.card5);
    },
    displaytop: function(){
      return this.createCardObject(this.cards.cardtop);
    },
    displaybottom: function(){
      return this.createCardObject(this.cards.cardbottom);
    },
    displayleft: function(){
      return this.createCardObject(this.cards.cardleft);
    },
    displayright: function(){
      return this.createCardObject(this.cards.cardright);
    },
    displaySelector: function(){
      return this.createCardObject(this.selectorCard);
    },
    computedTrump: function(){
      switch(this.trump){
        case "D":
          return this.$parent.diamond;
        case "S":
          return this.$parent.spade;
        case "C":
          return this.$parent.club;
        case "H":
          return this.$parent.heart;
        default:
          return "https://cdn.onlinewebfonts.com/svg/img_305436.png";
      }
    }
  },
  methods: {
    incomingMessage: function(msg){
      this.lastMessage = msg;
      switch (msg.action){
        case "getHandResult":
          this.cards.card1 = msg.cards[0];
          this.cards.card2 = msg.cards[1];
          this.cards.card3 = msg.cards[2];
          this.cards.card4 = msg.cards[3];
          this.cards.card5 = msg.cards[4];
          break;
        case "getDealerResult":
          this.dealer = msg.dealer;
          break;
        case "getTurnResult":
          this.turn = msg.turn;
          break;
        case "getTrumpResult":
          this.trump = msg.trump;
          this.calledTrump = msg.called;
          break;
        case "pickTrump":
          this.showCall = true;
          this.selectorCard = msg.card;
          this.lastTrump = msg.card.split("")[1];
          break;
        case "replaceCard":
          this.showReplace = true;
          this.selectorCard = msg.card;
          break;
        case "pickTrump2":
          this.showCall2 = true;
          this.forcePick = msg.forced;
          break;
        case "cardPlayed":
          var cardCopy = msg.card + "";
          if (!this.cards.cardtop && !this.cards.cardbottom && !this.cards.cardleft && !this.cards.cardright){
            if (msg.card.split("")[0] == "J" && msg.card.split("")[1] == this.match[this.trump]){
              msg.card = msg.card.split("")[0] + this.trump;
            }
            this.lead = msg.card;
            console.log('Lead is now ' + msg.card);
          }
          this.cards[this.layouts[this.$parent.team][msg.position]] = cardCopy;
          break;
        case "roundStarted":
          this.roundStarted = true;
          break;
        case "getRoundResult":
          if (msg.win == "north" || msg.win == "south"){
            this.rScores.northsouth++;
          }
          else{
            this.rScores.eastwest++;
          }
          this.wonTricks.push(msg.win);
          this.lead = null;
          this.cards.cardtop = null;
          this.cards.cardbottom = null;
          this.cards.cardleft = null;
          this.cards.cardright = null;
          break;
        case "getMatchResult":
          this.gScores.northsouth = msg.northsouth;
          this.gScores.eastwest = msg.eastwest;
          this.rScores.northsouth = 0;
          this.rScores.eastwest = 0;
          this.trump = null;
          this.calledTrump = null;
          this.forcePick = false;
          this.roundStarted = false;
          this.wonTricks = [];
          break;
      }
    },
    createCardObject: function(input){
      console.log(input);
      if (!input){
        input = "XX";
      }
      var cObject = {};
      switch (input.split("")[1]){
        case "S":
          cObject.url = this.$parent.spade;
          break;
        case "D":
          cObject.url = this.$parent.diamond;
          break;
        case "H":
          cObject.url = this.$parent.heart;
          break;
        case "C":
          cObject.url = this.$parent.club;
          break;
        default: 
          cObject.url = "https://cdn.onlinewebfonts.com/svg/img_305436.png";
          break;
      }
      switch (input.split("")[0]){
        case "N":
          cObject.display = "Nine";
          break;
        case "T":
          cObject.display = "Ten";
          break;
        case "J":
          cObject.display = "Jack";
          break;
        case "Q":
          cObject.display = "Queen";
          break;
        case "K":
          cObject.display = "King";
          break;
        case "A":
          cObject.display = "Ace";
          break;
        default:
          cObject.display = "No Card Played";
          break;
      }
      return cObject;
    },
    pickTrump: function(suit){
      this.$parent.sendMessage({action:"sendPlay", key: this.$parent.gameKey, team: this.$parent.team, play: suit});
      this.showCall2 = false;
    },
    playCard: function(cardVar){
      if (!this.cards["canPlay" + cardVar.split("d")[1]]){
        return;
      }
      var card = this.cards[cardVar];
      if (this.determineLegalPlay(card)){
         this.turn = null;
         this.$parent.sendMessage({action:"sendPlay", key: this.$parent.gameKey, team: this.$parent.team, play: card});
         this.cards[cardVar] = null;
      }
      if (this.showReplace){
        this.showReplace = false;
      }
    },
    determineLegalPlay: function(card){
      var virtualCard = card;
      var determineLegal = true;
      if (virtualCard.split("")[0] == "J" && virtualCard.split("")[1] == this.match[this.trump]){
        virtualCard = virtualCard.split("")[0] + this.trump;
      }
      console.log('actual card: ' + card);
      console.log('virtual card: ' + virtualCard);
      if (this.lead != null && this.lead.split("")[1] != virtualCard.split("")[1]){
        console.log('this is not the lead and the cards suit isnt the leading suit');
        for (var i=1; i<=5; i++){
          var compareCard = this.cards["card"+i];
          if (!compareCard){
            continue;
          }
          if (compareCard.split("")[0] == "J" && compareCard.split("")[1] == this.match[this.trump]){
            compareCard = "X" + this.trump;
          }
          console.log('the card being compared is ' + compareCard + " and the leading card is " + this.lead)
          if (this.lead.split("")[1] == compareCard.split("")[1]){
            console.log("determined that its illegal")
            determineLegal = false;
            break;
          }
        }
      }
    console.log('determined ' + card + "to be a legal move");
      if (this.$parent.team != this.turn){
        return false;
      }
      if (this.showReplace || (determineLegal && this.roundStarted)){
       return true;
      }
      else{
        return false;
      }
    },
    pass: function(){
      this.showCall = false;
      this.$parent.sendMessage({action:"sendPlay", key: this.$parent.gameKey, team: this.$parent.team, play: "pass"})
    },
    call: function(){
      this.showCall = false;
      this.$parent.sendMessage({action:"sendPlay", key: this.$parent.gameKey, team: this.$parent.team, play: "call"})
    }
  },
  mounted: function(){
    var layouts = {
      north: ["east", "south", "west"],
      south: ["west", "north", "east"],
      east: ["south", "west", "north"],
      west: ["north", "east", "south"]
    }
    var names = this.$parent.playerNames;
    for (var key in names){
      if (names[key] == this.$parent.myName){
        this.topName = names[layouts[key][1]];
        this.positions.top = layouts[key][1];
        this.leftName = names[layouts[key][0]];
        this.positions.left = layouts[key][0];
        this.rightName = names[layouts[key][2]];
        this.positions.right = layouts[key][2];
        this.positions.bottom = key;
      }
    };
    this.$parent.sendMessage({action: "confirmJoin", key: this.$parent.gameKey});
  }
}