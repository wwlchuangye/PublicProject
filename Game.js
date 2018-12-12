
var i18n = require('i18n');
var GameDef = require("GameDef");
var GameConfig = require("GameConfig");
var gameEvent = require("GameEvent");
var GameSocket = require("GameSocket");
var GameNetRequest = require("GameNetRequest");
var GameUtil = require("Util");
var GameSdk = require("GameSdkMangr");

//////////数据对象引用////////

const DataPlayer = require("DataPlayer");

////////////END////////////





/*
 * 全局处理
 * */

// var Game = module.exports ={
window.Game =  {
    i18n: i18n,
    Def: GameDef,
    Config: GameConfig,             //初始配置
    OPERATOR: GameConfig.OPERATORS.NULL, //初始运营平台

    GameEvent: gameEvent,       //游戏内事件声明
    Socket: GameSocket,         //WebSocket
    NetRequest: GameNetRequest,     //网络请求



    SDK: new GameSdk(),         //初始SDK对象

    Util: GameUtil,
    CRYPTO: GameConfig.crypto,


    initData: function () {

        this.Data = {
            Player: new DataPlayer(),

        };


        Engine.TB.initTableFile(require("AllTable"));



    },



    cacheLayer: function () {
        var that = this;
        this.loading = null;
        this.rankPanel = null;
        var loadCall = function ( error, data ) {

            if( error ) { console.log( '載入Prefab失敗, 原因:' + error ); return; }
            if( !( data instanceof cc.Prefab ) ) { console.log( '你載入的不是Prefab 文件' ); return; }

            var newMyPrefab = cc.instantiate( data );
            newMyPrefab.active = false;
            that.loading = newMyPrefab;
            cc.director.getScene().addChild( newMyPrefab , 9999);
        };

        cc.loader.loadRes("prefabs/UI/nowLoading", loadCall );


    },


    showNetLoading: function () {
        if(this.loading)
        {
            this.loading.active = true;
        }else
        {
            // Engine.Log.log("this.loading===: null");
        }

    },

    hideNetLoading: function () {
        if(this.loading)
            this.loading.active = false;
    },

    checkJackpotBonus: function () {
        var game = Engine.getGame();
        if(!Engine.WinMagr.getGameWindow("MessageBox") && game && game.gameType == Game.Def.GameType.GAME_MAIN)
        {
            if(Game.Data.Player.bonusMsgs.length > 0){

                var data = Game.Data.Player.bonusMsgs[0];
                var cmd = Game.GameEvent.eventReceiveJackpotBonus();
                cmd.receiveId = data.id;
                var d = {
                    openTime: data.opentime,
                    keyStr: Game.i18n.t("gameBonusMessage", {name: data.ranking, money: data.bonus, tokenname: data.assetname}),
                    event: cmd
                };
                Engine.WinMagr.openWindow("MessageBox", d);
            }
        }

    },


    removeLocalStorage: function () {

        cc.sys.localStorage.removeItem("SlotUserData");
        cc.sys.localStorage.removeItem("ReceiveCNB");
        cc.sys.localStorage.removeItem("GameInput");

        // cc.sys.localStorage.clear();

    }


};


