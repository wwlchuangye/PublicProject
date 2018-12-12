

cc.Class({
    extends: Engine.BasePanel,

    properties: {
        boxText: cc.Label,
        btnType: 1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {

        this._super();

        this._runTime = 0;

        if(this.winData.keyStr)
        {
            this.boxText.textKey = this.winData.keyStr;
        }else {
            this.boxText.textKey = this.winData.key;
        }

        for(var index in this.languageSp)
        {
            var sp = this.languageSp[index];
            Game.Util.setLanguageImage(sp);
        }


        Game.hideNetLoading();
    },

    setWinData: function (data) {
        this.winData = data;
    },

    btnCallback: function (event, eventData) {

        if(this.winData.event) {
            Engine.EventMagr.pushEvent(this.winData.event);

            if(this.winData.event.event_id == Game.GameEvent.event_network_disconnect)
            {
                Engine.SceneMagr.runSceneForType("start");
            }
        }

        this.node.destroy();

    },


    onUpdate: function (dt) {
        this._runTime += dt;
        if(this._runTime >= 5)
        {
            Game.hideNetLoading();
        }
    }




});
