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



    ctor: function () {
        // Engine.Log.log("DataPlayer   ctor");

        this.username = "";     //用户名
        this.password = "";     //用户密码
        this.isTourist = false; //是否是游客
        this.currentAsset = {}; //主城当前选的币种余额

        this.touchAsset = {};       //充值界面币种数据

        this.pocketBalance = {};    //所有钱包余额

        this.bonusMsgs = [];    //中奖奖金数据

        this.jackpotData = {};  //奖金池数据
        this.bigWin = [];       //大奖提示数据
        this.cancelReceive = false;     //是否主动关闭领取奖金



        this.initData();



    },

    initData: function () {
        // Engine.Log.log("DataPlayer   initData");

        this.username = "";
        this.password = "";
        this.isTourist = false;


        this.currentAsset = {
            public_key: "",
            account_name: "",
            account_tag: "",
            balance: 0
        };

        this.touchAsset = this.currentAsset;
        this.bonusMsgs = [
            // {
            //     id: 1,
            //     opentime: 8385734,
            //     ranking: 1,
            //     assetname: "EOS",
            //     bonus: 1989
            // },
            // {
            //     id: 2,
            //     opentime: 8385734,
            //     ranking: 2,
            //     assetname: "CNB",
            //     bonus: 1989
            // },
            // {
            //     id: 3,
            //     opentime: 8385734,
            //     ranking: 2,
            //     assetname: "ETH",
            //     bonus: 1989
            // }
        ];

        this.jackpotData = {};

        this.pocketBalance = {"ETC":"0","XRP":"0","XEM":"0","ETH":"0","DASH":"0","DOGE":"0","EOS":"0","LTC":"0","CNB":"0","SC":"0","ZEN":"0","BTC":"0","ZEC":"0","BCH":"0"};

        this.bigWin = [
            // {
            //     username: "testUser",
            //     result: [1,1,1],
            //     assetname: "EOS",
            //     bonus: 990
            // },
            // {
            //     username: "testUser",
            //     result: [2,2,2],
            //     assetname: "EOS",
            //     bonus: 990
            // },
            // {
            //     username: "testUser",
            //     result: [0,0,0],
            //     assetname: "EOS",
            //     bonus: 990
            // }
        ];

        this.cancelReceive = false;



    },

    setAddress: function (msg) {

    },


    setCurrentAsset: function (msg) {
        msg.balance = this.currentAsset.balance;
        this.currentAsset = msg;
    },

    setCurrentAssetBalance: function (balance) {
        this.currentAsset.balance = Game.Util.numReplace(balance);
    },


    setJackpotData: function (msg) {


        // msg.jackpotMoney = 0;
        // msg.attenUserNum = 0;
        // msg.attendUsers = [];

        // msg.nextEndTime = -1;

        for(var index in msg)
        {
            this.jackpotData[index] = msg[index];
        }


        var cmd = Game.GameEvent.eventJackpotUpdate();
        Engine.EventMagr.pushEvent(cmd);

    },



    setPocketBalance: function (data) {

        for(var index in data)
        {
            this.pocketBalance[index] = Game.Util.numReplace(data[index]);
        }


        // Engine.Log.log("pocketBalance  : " + JSON.stringify(this.pocketBalance));
    },

    // updatePocketBalance: function (data) {
    //     this.pocketBalance[data.name] = data.balance;
    // },


    addJackpotUser: function (msg) {

        this.jackpotData.jackpotMoney = msg.jackpotMoney;
        this.jackpotData.attenUserNum = msg.attenUserNum;
        this.jackpotData.attendUsers = this.jackpotData.attendUsers ? this.jackpotData.attendUsers : [];

        // this.jackpotData.attendUsers = [
        //     "test user",
        //     "test user",
        //     "test user",
        //     "test user",
        //     "test user",
        //     "test user",
        //     "test user",
        //     "test user",
        //     "test user",
        //     "test user",
        //     "test user",
        //     "test user",
        //     "test user",
        //     "test user",
        //     "test user",
        //
        //
        //
        // ];
        msg.attendUsers.forEach((v, k)=>{
            this.jackpotData.attendUsers.push(v);
        });


        var cmd = Game.GameEvent.eventJackpotShowUsers();
        Engine.EventMagr.pushEvent(cmd);

    },

    clearJackpotData: function () {

        this.jackpotData.nextEndTime = -1;

        this.jackpotData.jackpotMoney = 0;
        this.jackpotData.attenUserNum = 0;
        this.jackpotData.attendUsers = [];
    },

    addBonusMsg: function (msg) {
        // for(var index in msg)
        // {
        //     this.bonusMsgs.push(msg[index]);
        // }
        this.bonusMsgs = msg;

        var cmd = Game.GameEvent.eventUpdateBonusMsgdata();
        Engine.EventMagr.pushEvent(cmd);

    },

    addBigWinMsg: function (msg) {
        msg.forEach((v, k) => {
            // if(v.username != Game.Data.Player.username)
            // {
            this.bigWin.push(v);
            // }
        });
    },





    updateData: function (msg) {

    }


});
