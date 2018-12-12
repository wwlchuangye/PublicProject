
/*
 * 事件消息
 *
 * 对应方法 必添字段 event_id
 *
 * 事件接收 默认 ALL
 * 界面事件 target: this.EventTarget.GamePanel
 * 对象事件 target: this.EventTarget.GameObject
 * */

module.exports = {

    EventTarget:{                   //设置接收目标 默认ALL
        GamePanel                   : 100,           //目标界面
        GameObject                  : 200,          //目标游戏对象
    },

    event_wwl_test                  : 999,          //测试事件

    event_wwl_gameobject_scale      : 1000,         //

    event_test_a                    : 1001,
    event_test_b                    : 1002,
    event_test_c                    : 1003,

    event_add_fish_to_layer         : 1004,         //添加fish到layer
    event_player_jump_1             : 1005,         //小跳
    event_player_jump_2             : 1006,         //大跳

    event_create_testobj            : 1007,         //创建testobj
    event_update_game_loading       : 1008,         //更新loading
    event_hide_game_wait            : 1009,         //删除等待界面
    event_update_language           : 1010,         //udpata language
    event_show_tokens               : 1011,         //show tokens
    event_show_optionpanel          : 1012,         //show optionpanel
    event_update_token              : 1013,         // update_token
    event_show_player_id            : 1014,
    event_hide_player_id            : 1015,
    event_connect_open              : 1016,         //连接成功
    event_connected                 : 1017,         //连接断开
    event_binding_finish            : 1018,         //绑定成功
    event_login_user_finish         : 1019,         //账号登录成功 用于隐藏登录框
    event_allow_game_start          : 1020,         //允许开始的数据
    event_show_qr_code              : 1021,         //显示地址
    event_get_asset_symbol          : 1022,         //获取资产数据
    event_on_recharge               : 1023,         //充值到账。。
    event_create_big_tip_obj        : 1024,         //大奖提示
    event_withdrawals_finish        : 1025,         //提现
    event_update_verification       : 1026,         //刷新难证
    event_update_transfer_content   : 1027,         //更新充值提现界面
    event_create_bonus_msg          : 1028,         //添加提示
    event_userobj_go_home           : 1029,         //回收
    event_userobj_ismove            : 1030,         //是否滚动
    event_jackpot_update_token      : 1031,         //token
    event_jackpot_update            : 1032,         //更新奖金池
    event_jackpot_show_users        : 1033,         //更新奖金池用户
    event_clean_userobj             : 1034,         //清除列表
    event_address_data              : 1035,         //获取address
    event_withdrawal_update_pocket  : 1036,         //提现更新钱包
    event_update_all_balance        : 1037,         //获取所有钱包金额
    event_get_balance               : 1038,         //获取币种余额
    event_update_jackpot_money      : 1039,         //更新奖池金额·
    event_receive_jackpot_bonus     : 1040,         //领取中奖奖金
    event_update_bonus_msgdata      : 1041,         //更新 奖金检测弹窗
    event_receive_bonus_finish      : 1042,         //领取奖金
    event_bets_err                  : 1043,         //下注服务器返回错误
    event_automatic_game            : 1044,         //自动游戏
    event_network_disconnect        : 1045,         //掉线  回到登录


    event_create_prop               : 1100,         //创建障碍物或道具
    event_up_battle_bata            : 1101,         //更新战斗数据
    event_group_rankings            : 1102,         //查看群排行

    event_game_start                : 1200,         //开始

    event_roll_move_end             : 1201,         //进入减速




    eventWwlTest: function (){
        return {
            event_id: this.event_wwl_test,
            testNum : 9,
            name: "wwl"

        };
    },


    eventGameObjectScale: function () {

        return {
            event_id: this.event_wwl_gameobject_scale,
            scale: 0.3
        };

    },
    eventTestA: function () {

        return {
            event_id: this.event_test_a,
            // target: this.EventTarget.GameObject,
            text: "eventA",
        };

    },
    eventTestB: function () {

        return {
            event_id: this.event_test_b,
            text: "eventB"
        };

    },
    eventTestC: function () {

        return {
            event_id: this.event_test_c,
            text: "eventC"
        };

    },
    eventAddFishToLayer: function () {
        return {
            event_id: this.event_add_fish_to_layer,
            target: this.EventTarget.GamePanel
        };
    },


    eventPlayerJump1: function () {
        return {
            event_id: this.event_player_jump_1,
            target: this.EventTarget.GameObject
        };
    },

    eventPlayerJump2: function () {
        return {
            event_id: this.event_player_jump_2,
            target: this.EventTarget.GameObject
        };
    },

    eventCreateTestobj: function () {
        return {
            event_id : this.event_create_testobj,
        };
    },



    eventCreateProp: function () {
        return {
            event_id: this.event_create_prop,
            target: this.EventTarget.GamePanel
        };
    },

    eventUpBattleData: function () {
        return {
            event_id: this.event_up_battle_bata,
            target: this.EventTarget.GamePanel
        };
    },

    eventGroupRankings: function () {
        return {
            event_id: this.event_group_rankings,
            target: this.EventTarget.GamePanel,
            shareTicket: "shareTicket",
        };
    },


    eventGameStart: function () {
        return {
            event_id: this.event_game_start,
            rollIndex: 1,
            endIndex: 1,
        };
    },

    eventRollMoveEnd: function () {
        return {
            event_id: this.event_roll_move_end,
        };
    },

    eventUpdateGameLoading: function () {
        return {
            event_id: this.event_update_game_loading,
            target: this.EventTarget.GamePanel,
            progress: 0
        };
    },

    eventHideGameWait: function () {
        return {
            event_id: this.event_hide_game_wait,
            target: this.EventTarget.GamePanel,
        };
    },

    eventUpdateLanguage: function () {
        return {
            event_id: this.event_update_language,
            target: this.EventTarget.GamePanel,
            language: "en"
        };
    },

    eventShowTokens: function () {
        return {
            event_id: this.event_show_tokens,
            target: this.EventTarget.GamePanel,

        };
    },

    eventShowOptionPanel: function () {
        return {
            event_id: this.event_show_optionpanel,
            target: this.EventTarget.GamePanel,

        };
    },

    eventUpdateToken: function () {
        return {
            event_id: this.event_update_token,
            target: this.EventTarget.GamePanel,
            tokenType: 4
        };
    },


    eventShowPlayerId: function () {
        return {
            event_id: this.event_show_player_id,
            target: this.EventTarget.GamePanel,
            playerId: 0

        };
    },
    eventHidePlayerId: function () {
        return {
            event_id: this.event_hide_player_id,
            target: this.EventTarget.GamePanel,
            playerId: 0

        };
    },


    eventConnectOpen: function () {
        return {
            event_id: this.event_connect_open,
            target: this.EventTarget.GamePanel,

        };
    },

    eventConnected: function () {
        return {
            event_id: this.event_connected,
            target: this.EventTarget.GamePanel,
        };
    },

    eventBindingFinish: function () {
        return {
            event_id: this.event_binding_finish,
            target: this.EventTarget.GamePanel,
        };
    },

    eventLoginUserFinish: function () {
        return {
            event_id: this.event_login_user_finish,
            target: this.EventTarget.GamePanel,
        };
    },


    eventAllowGameStart: function () {
        return {
            event_id: this.event_allow_game_start,
            target: this.EventTarget.GamePanel,
            data: {}
        };
    },

    eventShowQRcode: function () {
        return {
            event_id: this.event_show_qr_code,
            target: this.EventTarget.GamePanel,
            data: {}
        };
    },

    eventGetAssetSymbol: function () {
        return {
            event_id: this.event_get_asset_symbol,
            target: this.EventTarget.GamePanel,
            isBalance: false,
        };
    },


    eventOnRecharge: function () {
        return {
            event_id: this.event_on_recharge,
            target: this.EventTarget.GamePanel,
            symbol: "CNB",
        };
    },

    eventCreateBigTipObj: function () {
        return {
            event_id: this.event_create_big_tip_obj,
            target: this.EventTarget.GamePanel,
        };
    },

    eventWithdrawalsFinish: function () {
        return {
            event_id: this.event_withdrawals_finish,
            target: this.EventTarget.GamePanel,
        };
    },

    eventUpdateVerification: function () {
        return {
            event_id: this.event_update_verification,
            target: this.EventTarget.GamePanel,
            data: {}
        };
    },


    eventUpdateTransferContent: function () {
        return {
            event_id: this.event_update_transfer_content,
            target: this.EventTarget.GamePanel,
            data: []
        };
    },

    eventCreateBonusMsg: function () {
        return {
            event_id: this.event_create_bonus_msg,
            target: this.EventTarget.GameObject,
        };
    },

    eventUserobjGoHome: function () {
        return {
            event_id: this.event_userobj_go_home,
            target: this.EventTarget.GamePanel,
            obj: undefined,
            isClean: false
        };
    },

    eventUserobjIsMove: function () {
        return {
            event_id: this.event_userobj_ismove,
            target: this.EventTarget.GameObject,
            isMove: false
        };
    },

    eventJackpotUpdateToken: function () {
        return {
            event_id: this.event_jackpot_update_token,
            target: this.EventTarget.GamePanel,
            tokenType: 3
        };
    },

    eventJackpotUpdate: function () {
        return {
            event_id: this.event_jackpot_update,
            target: this.EventTarget.GamePanel,
        };
    },


    eventJackpotShowUsers: function () {
        return {
            event_id: this.event_jackpot_show_users,
            target: this.EventTarget.GamePanel,
        };
    },

    eventCleanUserObj: function () {
        return {
            event_id: this.event_clean_userobj,
            target: this.EventTarget.GameObject,
            obj: undefined
        };
    },

    getAddressData: function () {
        return {
            event_id: this.event_address_data,
            target: this.EventTarget.GamePanel,
            data: {}
        };
    },

    eventWithdrawalUpdatePocket: function () {
        return {
            event_id: this.event_withdrawal_update_pocket,
            target: this.EventTarget.GamePanel,
            data: {}
        };
    },

    eventUpdateAllBalance: function () {
        return {
            event_id: this.event_update_all_balance,
            target: this.EventTarget.GamePanel,
        };
    },

    eventGetBalance: function () {
        return {
            event_id: this.event_get_balance,
            target: this.EventTarget.GamePanel,
            balance: 0
        };
    },
    eventUpdateJackpotMoney: function () {
        return {
            event_id: this.event_update_jackpot_money,
            target: this.EventTarget.GamePanel,
            data: undefined,
            isCheck: false
        };
    },
    eventReceiveJackpotBonus: function () {
        return {
            event_id: this.event_receive_jackpot_bonus,
            target: this.EventTarget.GamePanel,
            receiveId: 0
        };
    },

    eventUpdateBonusMsgdata: function () {
        return {
            event_id: this.event_update_bonus_msgdata,
            target: this.EventTarget.GamePanel,
        };
    },

    eventReceiveBonusFinish: function () {
        return {
            event_id: this.event_receive_bonus_finish,
            target: this.EventTarget.GamePanel,
            tokenType: -1
        };
    },

    eventBetsErr: function () {
        return {
            event_id: this.event_bets_err,
            target: this.EventTarget.GamePanel,
        };
    },

    eventAutomaticGame: function () {
        return {
            event_id: this.event_automatic_game,
            target: this.EventTarget.GamePanel,
            isAutomaticGame: false
        };
    },

    eventNetworkDisconnect: function () {
        return {
            event_id: this.event_network_disconnect,
            target: this.EventTarget.GamePanel,
        };
    }



};