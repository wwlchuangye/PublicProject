


var pathT = 0;

const MoneyChangedRequests = [
  "hall.signHandler.doSign",
  "hall.signHandler.receiveNewerPrize",
  "hall.shopHandler.buyGood"
];


module.exports = {


  /*
   * 服务器下行消息统一的处理入口
   * */
  msgCallback: function (route, data) {
    if (data === undefined) data = {};
    // console.log("msg response===", route, JSON.stringify(data));

    switch (route)
    {
      case "gate.gateHandler.register":
      {
        this.createTouristResponse(data);
      }
        break;
      case "gate.gateHandler.queryEntry":
      {
        this.loginUserResponse(data);
      }
        break;

      case "connector.entryHandler.enter":
      {
        this.loginGameResponse(data);
      }
        break;

      case "hall.hallHandler.rename":
      {
        this.bindingResponse(data);
      }
        break;

      case "hall.hallHandler.getAssetBySymbol":
      {
        this.getAssetBySymbolResponse(data);
      }
        break;
      case "hall.hallHandler.getBalanceBySymbol":
      {
        this.getBalanceBySymbolResponse(data);
      }
        break;
      case "hall.gameHandler.doOperator":
      {
        this.doOperatorResponse(data);
      }
        break;
      case "hall.hallHandler.receiveCNB":
      {
        this.receiveCNBResponse(data);
      }
        break;
      case "hall.hallHandler.withdrawal":
      {
        this.gameWithdrawalsResponse(data);
      }
        break;
      case "hall.gameHandler.getAssetJackpot":
      {
        this.setJackpotDataResponse(data);
      }
        break;
      case "hall.gameHandler.getAssetJackpotUsers":
      {
        this.setJackpotUsersResponse(data);
      }
        break;

      case "hall.hallHandler.getAssetFee":
      {
        this.getAddressResponse(data);
      }
        break;
      case "hall.gameHandler.getBetsByUid":
      case "hall.gameHandler.getAllPlayerBigWinsBets":
      case "hall.gameHandler.getAllPlayerBets":
      {
        this.getVerificationResponse(data);
      }
        break;
      case "hall.hallHandler.getAllBalance":
      {
        this.getAllBalanceResponse(data);
      }
        break;

      case "hall.hallHandler.getRechargeData":
      {
        this.getRechargeRecordResponse(data);
      }
        break;
      case "hall.hallHandler.getWithDrawData":
      {
        this.getWithdrawalsRecordResponse(data);
      }
        break;
      case "hall.gameHandler.receiveJackpotBonus":
      {
        this.receiveJackpotBonusResponse(data);
      }
        break;
      case "hall.gameHandler.getJackpotBonus":
      {
        this.getJackpotBonusResponse(data);
      }
        break;
      case "hall.gameHandler.getJackpotByUserALLBonus":
      {
        this.getJackpotByUserALLBonusResponse(data);
      }
        break;
      case "hall.hallHandler.getMainAccountBalance":
      {
        Engine.Log.warn("MainAccountBalance:  " + JSON.stringify(data));
      }
        break;
    }
  },


  /*
   * 连接大厅成功
   * 功能注册服务push消息
   * */
  gameHallSocketOpen: function () {

    var self = this;
    network.on("onRecharge", function (data) {

      Engine.Log.log("onRecharge！: " + JSON.stringify(data));

      Engine.WinMagr.openWindow("ErrorMessage", {keyStr: Game.i18n.t("msgErrorTransaction", {name: data.symbol})});
      var cmd = Game.GameEvent.eventOnRecharge();
      cmd.symbol = data.symbol;
      Engine.EventMagr.pushEvent(cmd);
    });

    network.on("onBigWin", function (data) {
      Engine.Log.log("onBigWin Data : "+ JSON.stringify(data));
      Game.Data.Player.addBigWinMsg(data);
    });
    network.on("onJacketBonus", function (data) {
      Engine.Log.log("onJacketBonus Data : "+ JSON.stringify(data));
      Game.Data.Player.addBonusMsg(data);
    });

    network.on("onJacketBalance", function (data) {

      Engine.Log.log("onJacketBalance :" + JSON.stringify(data));

      var cmd = Game.GameEvent.eventUpdateJackpotMoney();
      cmd.data = data;
      cmd.isCheck = true;
      Engine.EventMagr.pushEvent(cmd);
    });

  },

  /*
   * 连接游戏房间成功
   * 功能注册服务push消息
   * */
  gameRoomSocketOpen: function () {
    pomelo.on("battle_data", function (data) {

    });

  },


  /*
   * 登录连接
   * */
  connectRequest: function (obj) {
    obj.isWss = false;
    Game.Socket.startConnect(obj);
  },

  createTouristRequest: function (msg) {
    this.sendRequest("gate.gateHandler.register", msg);
  },
  createTouristResponse: function (msg) {
    // msg.id
    // msg.username

    var userData = {
      username: msg.username,
      isTourist: true
    };
    cc.sys.localStorage.setItem("SlotUserData", JSON.stringify(userData));

    this.loginUserRequest({
      username: msg.username,
    });

    Game.Data.Player.username = msg.username;
    Game.Data.Player.isTourist = true;

  },

  loginUserRequest: function (msg) {
    this.sendRequest("gate.gateHandler.queryEntry", msg);
  },

  loginUserResponse: function (msg) {

    var that = this;

    Game.Socket.setGameHostPort(msg);

    Game.showNetLoading();
    window.setTimeout(()=>{

      that.gameHallConnect();

    }, 2000);

  },


  gameHallConnect: function () {
    var that = this;
    // Engine.Log.log("开始连接游戏。。。");
    Game.Socket.gameHallConnect({fun: ()=> {
      // Engine.Log.log("连接  游戏 成功！！");
      that.loginGame();
      that.gameHallSocketOpen();
    }, isWss: false});
  },

  loginGame: function () {
    var d = {};
    if(Game.Data.Player.isTourist)
    {
      d.username = Game.Data.Player.username;
    }else
    {
      d.username = Game.Data.Player.username;
      d.password = parseInt(Game.Data.Player.password);
    }
    d.gameType = "10001";


    this.sendRequest("connector.entryHandler.enter", d);
  },

  loginGameResponse: function (data) {

    // Game.Data.Player.updateData(data.data.attribute);

    this.setGameType();



    var userData = {
      username: Game.Data.Player.username,
      isTourist: Game.Data.Player.isTourist
    };
    cc.sys.localStorage.setItem("SlotUserData", JSON.stringify(userData));

    var game = Engine.getGame();
    if(game && game.gameType == Game.Def.GameType.GAME_MAIN)
    {
      var cmd = Game.GameEvent.eventLoginUserFinish();
      Engine.EventMagr.pushEvent(cmd);

      if(!Game.Data.Player.isTourist)
      {
        var cmd = Game.GameEvent.eventShowPlayerId();
        cmd.playerId = Game.Data.Player.username;
        Engine.EventMagr.pushEvent(cmd);
      }

    }else {
      Engine.SceneMagr.runSceneForType("main", "MainGame");
    }

  },


  setGameType: function () {
    this.sendRequest('hall.gameHandler.setGameType', {gameType:"10001"});
  },




  bindingRequest: function (msg) {
    this.sendRequest("hall.hallHandler.rename", msg);
  },

  bindingResponse: function (data) {

    var userData = {
      username: data.username,
      isTourist: false
    };
    cc.sys.localStorage.setItem("SlotUserData", JSON.stringify(userData));
    Game.Data.Player.username = userData.username;
    Game.Data.Player.isTourist = false;


    var cmd = Game.GameEvent.eventShowPlayerId();
    cmd.playerId = Game.Data.Player.username;
    Engine.EventMagr.pushEvent(cmd);

    var cmd = Game.GameEvent.eventBindingFinish();
    Engine.EventMagr.pushEvent(cmd);

  },




  gameStartRequest: function (msg) {
    this.sendRequest("hall.hallHandler.gameStart", msg);
  },

  gameStartResponse: function (data) {


  },


  receiveCNBRequest: function (msg) {
    this.sendRequest("hall.hallHandler.receiveCNB", {});
  },

  receiveCNBResponse: function (data) {
    var ReceiveCNB = {
      isReceive: true
    };

    cc.sys.localStorage.setItem("ReceiveCNB", JSON.stringify(ReceiveCNB));

    Game.NetRequest.getBalanceBySymbolRequest({symbol: "CNB"});

  },


  getAssetBySymbolRequest: function (msg) {

    this.sendRequest("hall.hallHandler.getAssetBySymbol", msg);
  },

  getAssetBySymbolResponse: function (data) {

    Game.Data.Player.touchAsset = data;

    Engine.WinMagr.openWindow("GameTransfer");
  },


  getBalanceBySymbolRequest: function (msg) {

    this.sendRequest("hall.hallHandler.getBalanceBySymbol", msg);
  },

  getBalanceBySymbolResponse: function (data) {

    var cmd = Game.GameEvent.eventGetBalance();
    cmd.data = data;
    Engine.EventMagr.pushEvent(cmd);
  },

  getAllBalanceResquest: function () {
    this.sendRequest("hall.hallHandler.getAllBalance", {});
  },

  getAllBalanceResponse: function (data) {
    Game.Data.Player.setPocketBalance(data);
    var cmd = Game.GameEvent.eventUpdateAllBalance();
    Engine.EventMagr.pushEvent(cmd);
  },

  //用户下注
  doOperatorRequest: function (msg) {
    this.sendRequest("hall.gameHandler.doOperator", msg);
  },

  doOperatorResponse: function (data) {
    // Engine.Log.log("data====: " + JSON.stringify(data));
    switch (data.type)
    {
      case 1:
      {

        var cmd = Game.GameEvent.eventUpdateJackpotMoney();
        cmd.data = data.bonus;
        cmd.isCheck = false;
        Engine.EventMagr.pushEvent(cmd);


        var cmd = Game.GameEvent.eventAllowGameStart();
        cmd.data = data;
        Engine.EventMagr.pushEvent(cmd);
      }
        break;
    }
  },

  //获取用户交易难证
  getVerificationRequest: function (msg) {
    // this.sendRequest("hall.gameHandler.doOperator", msg);

    var _msg = {
      assetName:  msg.assetName
    };
    if(msg.msgType == Game.Config.VERIFICATION_MSG_TYPE.ALL_MSG)
    {
      this.sendRequest("hall.gameHandler.getAllPlayerBets", _msg);
    }else if(msg.msgType == Game.Config.VERIFICATION_MSG_TYPE.PRIZE_MSG)
    {
      this.sendRequest("hall.gameHandler.getAllPlayerBigWinsBets", _msg);
    }else if(msg.msgType == Game.Config.VERIFICATION_MSG_TYPE.MY_MSG)
    {
      this.sendRequest("hall.gameHandler.getBetsByUid", _msg);
    }

  },
  getVerificationResponse: function (data) {

    var cmd = Game.GameEvent.eventUpdateVerification();
    cmd.data = data;
    Engine.EventMagr.pushEvent(cmd);

  },


  getAddressResquest: function (msg) {
    this.sendRequest("hall.hallHandler.getAssetFee", msg);
  },

  getAddressResponse: function (data) {
    var cmd = Game.GameEvent.getAddressData();
    cmd.data = data;
    Engine.EventMagr.pushEvent(cmd);
  },

  gameWithdrawalsResquest: function (msg) {

    this.sendRequest("hall.hallHandler.withdrawal", msg);
  },

  gameWithdrawalsResponse: function (data) {
    Engine.EventMagr.pushEvent(Game.GameEvent.eventWithdrawalsFinish());
  },


  //获取充值提现记录
  getRechargeRecordRequest: function () {
    this.sendRequest("hall.hallHandler.getRechargeData", {});
  },

  getRechargeRecordResponse: function (data) {
    var cmd = Game.GameEvent.eventUpdateTransferContent();
    cmd.data = data;
    Engine.EventMagr.pushEvent(cmd);
  },

  //获取充值提现记录
  getWithdrawalsRecordRequest: function () {
    this.sendRequest("hall.hallHandler.getWithDrawData", {})
  },

  getWithdrawalsRecordResponse: function (data) {
    var cmd = Game.GameEvent.eventUpdateTransferContent();
    cmd.data = data;
    Engine.EventMagr.pushEvent(cmd);
  },

  receiveJackpotBonusRequest: function (msg) {
    this.sendRequest("hall.gameHandler.receiveJackpotBonus", msg);
  },

  receiveJackpotBonusResponse: function (data) {

    Engine.WinMagr.openWindow("GameGetBonus");
  },

  //获取奖池数据
  getJackpotDataRequest: function (msg) {
    this.sendRequest("hall.gameHandler.getAssetJackpot", msg);

  },

  setJackpotDataResponse: function (data) {

    Game.Data.Player.setJackpotData(data);

    Game.NetRequest.getJackpotByUserALLBonusRequest();

  },

  //获取奖池数据
  getJackpotUsersRequest: function (msg) {
    this.sendRequest("hall.gameHandler.getAssetJackpotUsers", msg, false);
  },

  setJackpotUsersResponse: function (data) {

    Game.Data.Player.addJackpotUser(data);

  },

  getJackpotBonusRequest: function (msg) {
    this.sendRequest("hall.gameHandler.getJackpotBonus", msg, false);
  },

  getJackpotBonusResponse: function (data) {

    var cmd = Game.GameEvent.eventUpdateJackpotMoney();
    cmd.data = data.bonus;
    cmd.isCheck = false;
    Engine.EventMagr.pushEvent(cmd);
  },


  getJackpotByUserALLBonusRequest: function () {
    this.sendRequest("hall.gameHandler.getJackpotByUserALLBonus", {});
  },

  getJackpotByUserALLBonusResponse: function (data) {
    Game.Data.Player.addBonusMsg(data);
  },


  getMainAccountBalanceRequest: function () {
    this.sendRequest("hall.hallHandler.getMainAccountBalance", {});
  },



  msgResponseError: function (route) {
    switch (route)
    {
      case "gate.gateHandler.register":
      {
        // Engine.Log.log("注册失败。。。");
      }
        break;
    }
  },


  requestRoute: [],
  /*
   * 发送请求 必须有返回
   * */
  sendRequest: function (route, msg, isLoad = true) {


    var game = Engine.getGame();
    if(game && !Game.Data.Player.isTourist && !Game.Socket.isOpen())
    {
      // if(!Engine.WinMagr.checkLoadWindow("GameLogin")){
      //     Engine.WinMagr.openWindow("GameLogin", {isStart: false});
      // }

      return;
    }


    if(isLoad)
    {
      this.requestRoute.push(route);

      Game.showNetLoading();
    }

    msg = msg || {};
    Game.Socket.requestMsg(route, msg, (data) => {

      if(this.requestRoute[this.requestRoute.length-1] == route)
      {
        if(route != "connector.entryHandler.enter" &&
            route != "hall.gameHandler.setGameType")
        {
          Game.hideNetLoading();
        }

        this.requestRoute = [];
      }

      Engine.Log.log("Response route: " + route + "  data:  "+ JSON.stringify(data));
      if(!data || !data.code || typeof(data.code) != "number" || data.code != 200) {
        if(data.code != 200)
        {
          if(route == "hall.gameHandler.doOperator")
          {
            Engine.EventMagr.pushEvent(Game.GameEvent.eventBetsErr());
          }

          var tipkey = "msgError_"+data.code;
          var str = Game.i18n.t(tipkey);
          if(str != tipkey)
          {
            Engine.WinMagr.openWindow("ErrorMessage", {key: tipkey});
          }
          this.msgResponseError(route);
        }
        Engine.Log.error(route+"  请求出错！  "+ data.code);
        return;
      }

      this.msgCallback(route, data.data);


      // if (MoneyChangedRequests.indexOf(route) >= 0) {
      //     this.playerGetMoneyRequest();
      // }

    });
  },

  /*
   * 发送通知 无需返回
   * */
  sendNotify: function (route, msg) {
    msg = msg || {};
    Game.Socket.notifyMsg(route, msg);
  },



};

