// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


cc.Class({
    extends: Engine.BasePanel,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        debugNode: cc.Node,
        chanceIndex: 3,
        editBox: cc.EditBox,
        myPocket: cc.Label,

        langNode: {
            default: [],
            type: cc.Toggle
        },
        token: cc.Sprite,
        loginBtn: cc.Node,
        jackpotTime: cc.Label,
        jackpotMoney: cc.Label,
        bonusMsgNum: cc.Label,
        mailBtn: cc.Node,
        rollSend: {
            default: null,
            type: cc.Component
        },

        spinNode: cc.Node,
        autoToggle: cc.Toggle,

        _runTime: 0,
        _startTouch: false,
        _touchTime: 0,

        _isAutomatic: false,
        _automaticTime: 0,
        _requestTime: 0,
        _resultData: undefined,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {

        this._super();

        var that = this;

        if(Game.Config.IS_DEBUG)
        {
            this.debugNode.active = true;
        }else {
            this.debugNode.active = false;
        }


        Engine.Log.log("typeof====: " + typeof (true));

        var language =  cc.sys.localStorage.getItem("Language");
        language = JSON.parse(language);
        this.setLanguageState(language.lang);

        for(var index in this.languageSp)
        {
            var sp = this.languageSp[index];
            Game.Util.setLanguageImage(sp);
        }


        this.jackpotMoney.string = 0;


        // this.myPocket.string = "1000".replace(/^(.*\..{4}).*$/,"$1");

        this.tokenType = 0;
        this._runTime = 0;
        this._startTouch = false;
        this._touchTime = 0;
        this._isAutomatic = false;
        this._automaticTime = 0;
        this._requestTime = 0;

        this._rollNumIndex = {};
        this._resultData = {};



        var gameInput =  cc.sys.localStorage.getItem("GameInput");
        if(gameInput)
        {
            gameInput = JSON.parse(gameInput);
            this.tokenType = gameInput.tokenType;
            this.editBox.string = gameInput.num;

        }

        this.setTokenType(this.tokenType);

        for(var i = 0; i < 4; i++)
        {
            var name = "chances" + i;

            var numIndex = [];
            for(var j = 0; j < Game.Config.ROLL_ITEM.length; j++)
            {
                if(Game.Config.ROLL_ITEM[j] == i)
                {
                    numIndex.push(j);
                }
            }

            this._rollNumIndex[name] = numIndex;

        }

        // Engine.Log.log("_rollNumIndex===: " + JSON.stringify(this._rollNumIndex));


        this.scheduleOnce(()=> {
            var cmd = Game.GameEvent.eventUpdateGameLoading();
            cmd.progress = 100;
            Engine.EventMagr.pushEvent(cmd);


            this._runTime = 0;


            var name = Game.Config.getTokenName(Game.Config.CURRENCY_TYPE.CURRENCY_3);
            var msg = {assetName: name};
            Game.NetRequest.getJackpotDataRequest(msg);


            // Game.checkJackpotBonus();
            // Game.NetRequest.getJackpotByUserALLBonusRequest();

            var num = Game.Data.Player.bonusMsgs.length;
            if(num <= 0)
            {
                this.mailBtn.active = false;
            }else {
                this.bonusMsgNum.string = num;
            }


        }, 3.5);


        if(!cc.sys.localStorage.getItem("ReceiveCNB"))
        {
            Game.NetRequest.receiveCNBRequest();
        }else
        {
            Game.NetRequest.getBalanceBySymbolRequest({symbol: Game.Config.getTokenName(this.tokenType)});
        }

        Game.NetRequest.getJackpotBonusRequest({assetName: Game.Config.getTokenName(this.tokenType)});





        this.spinNode.on(cc.Node.EventType.TOUCH_START, function (event) {
            this._startTouch = true;
            this._touchTime = 0;
        }.bind(this), this.spinNode);
        this.spinNode.on(cc.Node.EventType.TOUCH_END, function (event) {
            this._startTouch = false;
            this._touchTime = 0;
        }.bind(this), this.spinNode);

    },


    start: function () {
        Game.cacheLayer();

    },


    checkInput: function (){

        var inputNum = this.editBox.string;
        return Game.Util.checkInputMoney(inputNum);

    },

    spinGame: function () {

        Engine.Log.log("SLOT  开始游戏！！");

    },

    resetAutomatic: function () {
        this._isAutomatic = false;
        this.autoToggle.isChecked = false;
    },

    btnCallback: function (event, eventData) {
        var ed = parseInt(eventData);

        if(ed == 12)//自动游戏
        {

            this._isAutomatic = !this._isAutomatic;
            if(this._isAutomatic)
            {
                var game = Engine.getGame();
                if(game && game.gameStart == Game.Def.GameStart.START_NORMAL){
                    this.spinGame();
                }
            }
        }else if(ed == 11){//检测中奖
            Game.checkJackpotBonus();
        }else if (ed == 1)//下注
        {
            this.spinGame();

        }else if(ed == 2) // * 1/2
        {
            var isNumber = this.checkInput();
            if(isNumber)
            {
                var inputNum = parseFloat(this.editBox.string) * 0.5;

                var interval = Game.Config.chanceInterval[Game.Config.getTokenName(this.tokenType)];
                interval = interval["chance"+this.chanceIndex];
                // Engine.Log.log("interval==: " + JSON.stringify(interval));
                inputNum = inputNum < interval.min ? interval.min : inputNum;
                inputNum = inputNum > interval.max ? interval.max : inputNum;


                inputNum = ""+inputNum;//inputNum.toFixed(4);

                this.editBox.string = Game.Util.numReplace(inputNum);//inputNum.replace(/^(.*\..{6}).*$/,"$1");
                // number = parseFloat(number); // number = 12.3321
                // Engine.Log.log("num====="+ inputNum);


            }

        }else if(ed == 3) // * 2
        {
            var isNumber = this.checkInput();
            if(isNumber)
            {
                var inputNum = parseFloat(this.editBox.string) * 2;

                var interval = Game.Config.chanceInterval[Game.Config.getTokenName(this.tokenType)];
                interval = interval["chance"+this.chanceIndex];
                // Engine.Log.log("interval==: " + JSON.stringify(interval));
                inputNum = inputNum < interval.min ? interval.min : inputNum;
                inputNum = inputNum > interval.max ? interval.max : inputNum;

                var myNUm = parseFloat(Game.Data.Player.currentAsset.balance);
                inputNum = inputNum > myNUm ? myNUm : inputNum;

                inputNum = ""+inputNum;//inputNum.toFixed(4);
                this.editBox.string = Game.Util.numReplace(inputNum);//inputNum.replace(/^(.*\..{6}).*$/,"$1");
            }
        }else if(ed == 4) // max
        {
            var interval = Game.Config.chanceInterval[Game.Config.getTokenName(this.tokenType)];
            interval = interval["chance"+this.chanceIndex];

            var myNUm = parseFloat(Game.Data.Player.currentAsset.balance);
            var inputNum = interval.max > myNUm ? myNUm : interval.max;

            var max = inputNum+"";//Game.Data.Player.currentAsset.balance+"";

            this.editBox.string = Game.Util.numReplace(max);//max.replace(/^(.*\..{6}).*$/,"$1");
        }else if(ed == 5)   //login
        {

            if(Game.Data.Player.isTourist)
            {
                if(!Engine.WinMagr.checkLoadWindow("GameRegister")){
                    Engine.WinMagr.openWindow("GameRegister");
                }
            }else {
                if(!Engine.WinMagr.checkLoadWindow("GameLogin")) {
                    Engine.WinMagr.openWindow("GameLogin", {isStart: false});
                }
            }

        }else if(ed == 6)   //show tokens
        {


            if(Game.Data.Player.isTourist)
            {
                if(!Engine.WinMagr.checkLoadWindow("GameRegister")){
                    Engine.WinMagr.openWindow("GameRegister");
                }
            }else {
                var cmd = Game.GameEvent.eventShowTokens();
                Engine.EventMagr.pushEvent(cmd);
            }

        }else if(ed == 7) //show eventShowOptionPanel
        {
            var cmd = Game.GameEvent.eventShowOptionPanel();
            Engine.EventMagr.pushEvent(cmd);
        }else if(ed == 8)//打开充值界面
        {

            if(this.tokenType == Game.Config.CURRENCY_TYPE.CURRENCY_0 && !Game.Config.IS_DEBUG)
            {
                Engine.WinMagr.openWindow("ErrorMessage", {key: "msgErrorTopupCNB"});
                return;
            }

            Game.NetRequest.getAssetBySymbolRequest({symbol: Game.Config.getTokenName(this.tokenType)});

            // Game.Data.Player.touchAsset = Game.Data.Player.currentAsset;
            // Engine.WinMagr.openWindow("GameTransfer");

        }else if(ed == 9)//交易记录
        {
            if(!Engine.WinMagr.checkLoadWindow("GameBetsData")){
                Engine.WinMagr.openWindow("GameBetsData");
            }

        }else if(ed == 10)//奖金池
        {
            if(!Engine.WinMagr.checkLoadWindow("GameJackpot")){
                Engine.WinMagr.openWindow("GameJackpot");
            }
        }else if(ed == 99)//领取CNB
        {
            Game.NetRequest.receiveCNBRequest();
        } else if(ed == 100)//查看主账号
        {
            Game.NetRequest.getMainAccountBalanceRequest();
        }
    },

    verificationGame: function (event, eventData) {
        Egine.Log.log("SLOT快速下注。。。: "+ eventData);

    },

    inputEndEvent: function () {
        this.editBox.string = Game.Util.numReplace(this.editBox.string, true);//this.editBox.string.replace(/^(.*\..{6}).*$/,"$1");
    },

    updateLanguage: function (event, eventData) {
        this.setLanguage(eventData);

    },

    setLanguage: function (lang) {
        var Language =  cc.sys.localStorage.getItem("Language");
        Language = JSON.parse(Language);
        if(Language.lang != lang)
        {
            Game.i18n.init(lang);


            Language.lang = lang;
            cc.sys.localStorage.setItem("Language", JSON.stringify(Language));

            var cmd = Game.GameEvent.eventUpdateLanguage();
            cmd.language = Language.lang;
            Engine.EventMagr.pushEvent(cmd);
            this.setLanguageState(lang);
        }
    },

    setLanguageState: function (lang) {

        for(var index in this.langNode)
        {
            var toggle = this.langNode[index];
            if(lang == toggle.target.name)
            {
                toggle.isChecked = true;
            }else {
                toggle.isChecked = false;
            }
        }
    },



    gameStart: function (numstr) {

        Engine.Log.log("开始游戏。。本地展示");

        return;
        var run = false;
        var game = Engine.getGame();

        if(game && game.gameStart == Game.Def.GameStart.START_NORMAL){

            var isNumber = this.checkInput();
            var inputNum = parseFloat(this.editBox.string);

            var myNUm = parseFloat(this.myPocket.string);
            if( myNUm >= inputNum)
            {
                if(isNumber)
                {
                    // this.rollSend.soundPlay();
                    run = true;

                    Engine.Log.log("轴随机结束=============> 开始游戏");

                }
            }
        }

        if(!run)
        {
            Engine.Log.error("检测数据不正常, 无法开始游戏。 ~ ~");
        }

    },


    doEvent: function (cmd)
    {
        switch (cmd.event_id)
        {

            case Game.GameEvent.event_automatic_game:
            {

                return true;
            }
                break;
            case Game.GameEvent.event_bets_err:
            {
                if(this._isAutomatic && !Game.Config.IS_DEBUG)
                {
                    this.resetAutomatic();
                }
                var name = Game.Config.getTokenName(this.tokenType);
                Game.NetRequest.getBalanceBySymbolRequest({symbol: name});
            }
                break;

            case Game.GameEvent.event_receive_bonus_finish:
            {
                if(this.tokenType == cmd.tokenType)
                {
                    var name = Game.Config.getTokenName(this.tokenType);
                    Game.NetRequest.getBalanceBySymbolRequest({symbol: name});
                }
            }
                break;

            case Game.GameEvent.event_update_bonus_msgdata:
            {
                if(!Game.Data.Player.cancelReceive)
                {
                    var num = Game.Data.Player.bonusMsgs.length;
                    if(num > 0)
                    {
                        this.mailBtn.active = true;
                        this.bonusMsgNum.string = num;

                        Game.checkJackpotBonus();
                    }
                }

                return true;
            }
                break;
            case Game.GameEvent.event_receive_jackpot_bonus:
            {
                Game.NetRequest.receiveJackpotBonusRequest({receiveId: cmd.receiveId});
                var num = Game.Data.Player.bonusMsgs.length-1;
                num = num >= 0 ? num : 0;
                if(num == 0)
                {
                    this.mailBtn.active = false;
                }
                this.bonusMsgNum.string = num;
            }
                break;
            case Game.GameEvent.event_update_jackpot_money:
            {
                var money = "-1";
                if(cmd.isCheck)
                {
                    var tokenName = Game.Config.getTokenName(this.tokenType);
                    var d = cmd.data.find((v, k) => {
                        return v.asset == tokenName;
                    });

                    if(d)
                    {
                        // Engine.Log.log("d.balance===d.balance==: "+ d.balance);
                        if(!d.balance)
                        {
                            return;
                        }
                        money = d.balance;
                    }
                }else
                {

                    // Engine.Log.log("d.cmd.data===d.cmd.data==: "+ cmd.data);
                    if(!cmd.data)
                    {
                        return;
                    }
                    money = cmd.data;
                }
                money =  money+ "";
                this.jackpotMoney.string = Game.Util.numReplace(money);
            }
                break;
            case Game.GameEvent.event_on_recharge:
            {

                // Engine.Log.log("玩家 充值到账 ："+ cmd.symbol);

                if(Game.Config.getTokenName(this.tokenType) == cmd.symbol){
                    Game.NetRequest.getBalanceBySymbolRequest({symbol: cmd.symbol});
                }

            }
                break;
            case Game.GameEvent.event_get_asset_symbol:
            {
                if(cmd.isBalance)
                {
                    // var str = ""+Game.Data.Player.currentAsset.balance;
                    // this.myPocket.string = Game.Util.numReplace(str);//str.replace(/^(.*\..{6}).*$/,"$1");


                    Game.Util.goldRoll(this.myPocket, Game.Data.Player.currentAsset.balance);


                }

            }
                break;
            case Game.GameEvent.event_allow_game_start:
            {
                this._resultData = cmd.data;
                this.gameStart(cmd.data.result);
                return true;
            }
                break;
            case Game.GameEvent.event_roll_move_end:
            {

                this.rollSend.closeMusic();
                if(!Game.Socket.isOpen()) return true;


                if(Game.Config.getAssetNameIndex(this._resultData.assetName) == this.tokenType)
                {
                    Game.NetRequest.getBalanceBySymbolRequest({symbol: this._resultData.assetName});
                }

                if(this._resultData.isWin)
                {
                    var d = {chance: this._resultData.odds};
                    if(this._resultData.bigWin)
                    {
                        Engine.WinMagr.openWindow("GameBigWin", d);
                    }else
                    {
                        Engine.WinMagr.openWindow("GameWin", d);
                    }

                }else
                {
                    Engine.WinMagr.openWindow("GameOver");
                }

                Engine.EventMagr.pushEvent(Game.GameEvent.eventHideGameWait());

                if(this._isAutomatic)
                {
                    this.scheduleOnce(function () {
                        this.spinGame();
                    }.bind(this), 0.8);
                }

            }
                break;
            case Game.GameEvent.event_update_language:
            {
                for(var index in this.languageSp)
                {
                    var sp = this.languageSp[index];
                    Game.Util.setLanguageImage(sp);
                }
            }
                break;
            case Game.GameEvent.event_update_token:
            {
                this.setTokenType(cmd.tokenType);
                Game.Data.Player.currentAsset.balance = 0;
                // this.myPocket.string = 0;
                Game.Util.goldRoll(this.myPocket, 0);
                this.jackpotMoney.string = 0;
                Game.NetRequest.getBalanceBySymbolRequest({symbol: Game.Config.getTokenName(this.tokenType)});

                Game.NetRequest.getJackpotBonusRequest({assetName: Game.Config.getTokenName(this.tokenType)});
            }
                break;

            case Game.GameEvent.event_show_player_id:
            {
                this.loginBtn.active = false;
                Game.NetRequest.getBalanceBySymbolRequest({symbol: Game.Config.getTokenName(this.tokenType)});
            }
                break;
            case Game.GameEvent.event_hide_player_id:
            {
                this.loginBtn.active = true;
            }
                break;
            case Game.GameEvent.event_connected:
            {
                this.loginBtn.active = true;

                // Engine.getGame().gameStart = Game.Def.GameStart.START_NORMAL;
            }
                break;
            case Game.GameEvent.event_get_balance:
            {

                if(Game.Config.getAssetNameIndex(cmd.data.assetName) == this.tokenType)
                {
                    Game.Data.Player.setCurrentAssetBalance(cmd.data.balance);
                    Game.Util.goldRoll(this.myPocket, cmd.data.balance);

                    var d = {};
                    d[cmd.data.assetName] = cmd.data.balance;
                    Game.Data.Player.setPocketBalance(d);
                }



            }
                break;

        }

    },

    setTokenType: function (token) {
        this.tokenType = token;
        var path = "Images/bi"+token;
        Game.Util.setSpriteFrame(path, this.token);

    },

    onUpdate: function (dt) {


        //自动下注
        if(this._isAutomatic && Game.Config.IS_DEBUG)
        {
            var game = Engine.getGame();
            if(game && game.gameStart == Game.Def.GameStart.START_NORMAL){
                this._automaticTime += dt;
                if(this._automaticTime > 20)
                {
                    this.spinGame();
                    this._automaticTime = 0;
                }
            }
        }


        //获取中奖金信息
        this._requestTime += dt;
        if(this._requestTime >= 180)
        {
            Game.NetRequest.getJackpotByUserALLBonusRequest();
            this._requestTime = 0;
        }

        //更新奖金池倒计时
        if(Game.Data.Player.jackpotData.nextEndTime)
        {
            if(Game.Data.Player.jackpotData.nextEndTime > 0)
            {
                this._runTime += dt;
                if(this._runTime >= 1)
                {
                    this._runTime = 0;
                    Game.Data.Player.jackpotData.nextEndTime -= 1;
                    var time = Engine.Util.secondsToTime(Game.Data.Player.jackpotData.nextEndTime);
                    this.jackpotTime.string = time;
                    if(Game.Data.Player.jackpotData.nextEndTime <= 0)
                    {
                        this.jackpotTime.node.active = false;
                    }else {
                        this.jackpotTime.node.active = true;
                    }
                }
            }else {
                this.jackpotTime.node.active = false;
            }
        }else
        {
            this.jackpotTime.node.active = false;
        }




    }


});

