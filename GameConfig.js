
module.exports = {

    crypto: require("crypto"),

    VERSION: "1.0.0",

    HOST: "13.114.16.229",//testdiaoyudaren.qlgame.net

    PORT: 3024,


    /*
     * 运营平台
     * */
    OPERATORS: {
        NULL        : -1,       //单机
        NORMAL      : 0,        //正常本地服务
        WX          : 1,        //微信
        NORMAL_WX   : 2,        //正常单微信
        QQ          : 3,        //QQ


    },
    IS_DEBUG        : true,
    isLog           : true,


    DEBUG_MODE: 0,
    DEBUG_LOG: 0,

    CURRENCY_TYPE: {                //货币类型
        CURRENCY_0          : 0,        //CNB
        CURRENCY_1          : 1,        //BCH
        CURRENCY_2          : 2,        //BTC
        CURRENCY_3          : 3,        //EOS
        CURRENCY_4          : 4,        //ETC
        CURRENCY_5          : 5,        //ETH
        CURRENCY_6          : 6,        //LTC

        //未启用的
        CURRENCY_7          : 7,        //ZEN
        CURRENCY_8          : 8,        //DASH
        CURRENCY_9          : 9,        //ZEC
        CURRENCY_10         : 10,       //XRP
        CURRENCY_11         : 11,       //XEM
        CURRENCY_12         : 12,       //SC
        CURRENCY_13         : 13,       //DOGE



    },

    VERIFICATION_MSG_TYPE: {
        ALL_MSG             : 1,         //所有投注
        PRIZE_MSG           : 2,         //大奖投注
        MY_MSG              : 3,         //我的下注
    },

    getTokenName: function (_type) {

        Engine.Log.log("token type: " + _type);

        var names = ["CNB", "BCH", "BTC", "EOS", "ETC", "ETH", "LTC", "ZEN", "DASH", "ZEC", "XRP", "XEM", "SC", "DOGE"];
        return names[_type];
    },


    getAssetNameIndex: function (name) {
        for(var index in this.CURRENCY_TYPE)
        {
            var i = this.CURRENCY_TYPE[index];
            if(name == this.getTokenName(i))
            {
                return i;
                break;
            }
        }
    },



    ROLL_ITEM: [0,3,2,3,1,3,2,3,1,0,3,2,3,1,3,2],
    chanceOpens : {
        "chance0": ["305", "32.0", "10.0"],
        "chance1": ["52.0", "18.0", "7.00", "6.00", "4.50"],
        "chance2": ["23.0", "12.0", "6.00", "5.00", "3.00", "2.00"],
        "chance3": ["16.0", "8.00", "4.00", "2.50", "1.90", "1.60", "1.30"],
        "chance4": ["8.00", "4.00", "2.50", "1.80", "1.40", "1.20", "1.10", "1.05"],
        "chance5": ["4.00", "2.00", "1.60", "1.08", "1.06", "1.04", "1.02", "1.01", "1.00"],
    },

    bonusConditions: [
        [0,0,0],
        [1,1,1],
        [2,2,2],
        [0,0],
        [1,1],
        [2,2],
        [0],
        [1],
        [2]
    ],





    chanceInterval: {

        "CNB": {
            "chance0": {
                min: 0.00001,
                max: 6.00
            },
            "chance1": {
                min: 0.00001,
                max: 35.00
            },
            "chance2": {
                min: 0.00001,
                max: 80.00
            },
            "chance3": {
                min: 0.00001,
                max: 120.00
            },
            "chance4": {
                min: 0.00001,
                max: 240.00
            },
            "chance5": {
                min: 0.00001,
                max: 480.00
            },
        },
        "BCH": {
            "chance0": {
                min: 0.00001,
                max: 0.063
            },
            "chance1": {
                min: 0.00001,
                max: 0.369
            },
            "chance2": {
                min: 0.00001,
                max: 0.843
            },
            "chance3": {
                min: 0.00001,
                max: 1.264
            },
            "chance4": {
                min: 0.00001,
                max: 2.528
            },
            "chance5": {
                min: 0.00001,
                max: 5.056
            },
        },
        "BTC": {
            "chance0": {
                min: 0.00001,
                max: 0.005
            },
            "chance1": {
                min: 0.00001,
                max: 0.029
            },
            "chance2": {
                min: 0.00001,
                max: 0.067
            },
            "chance3": {
                min: 0.00001,
                max: 0.101
            },
            "chance4": {
                min: 0.00001,
                max: 0.202
            },
            "chance5": {
                min: 0.00001,
                max: 0.404
            },
        },
        "EOS": {
            "chance0": {
                min: 0.00001,
                max: 6.00
            },
            "chance1": {
                min: 0.00001,
                max: 35.00
            },
            "chance2": {
                min: 0.00001,
                max: 80.00
            },
            "chance3": {
                min: 0.00001,
                max: 120.00
            },
            "chance4": {
                min: 0.00001,
                max: 240.00
            },
            "chance5": {
                min: 0.00001,
                max: 480.00
            },
        },
        "ETC": {
            "chance0": {
                min: 0.00001,
                max: 3.537
            },
            "chance1": {
                min: 0.00001,
                max: 20.635
            },
            "chance2": {
                min: 0.00001,
                max: 47.166
            },
            "chance3": {
                min: 0.00001,
                max: 70.749
            },
            "chance4": {
                min: 0.00001,
                max: 141.498
            },
            "chance5": {
                min: 0.00001,
                max: 282.997
            },
        },
        "ETH": {
            "chance0": {
                min: 0.00001,
                max: 0.154
            },
            "chance1": {
                min: 0.00001,
                max: 0.896
            },
            "chance2": {
                min: 0.00001,
                max: 2.047
            },
            "chance3": {
                min: 0.00001,
                max: 3.071
            },
            "chance4": {
                min: 0.00001,
                max: 6.142
            },
            "chance5": {
                min: 0.00001,
                max: 12.284
            },
        },
        "LTC": {
            "chance0": {
                min: 0.00001,
                max: 0.636
            },
            "chance1": {
                min: 0.00001,
                max: 3.708
            },
            "chance2": {
                min: 0.00001,
                max: 8.476
            },
            "chance3": {
                min: 0.00001,
                max: 12.714
            },
            "chance4": {
                min: 0.00001,
                max: 25.428
            },
            "chance5": {
                min: 0.00001,
                max: 50.857
            },
        },

    }






};




