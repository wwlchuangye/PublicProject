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
    extends: Engine.GameObject,

    properties: {
        userName: cc.Label,
        result: {
            default: [],
            type: cc.Sprite
        },
        bonus: cc.Label,
        assetName: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:


    onLoad: function() {

        this._deadTime = 12;

        this._super();

    },

    setObjData: function (data) {


        // Engine.Log.log("data : "+ JSON.stringify(data));

        this.userName.string = data.username;
        this.bonus.string = Game.Util.numReplace(data.bonus+"");
        this.assetName.string = data.assetname;

        for(var i = 0; i < 3; i++)
        {
            var index = data.result[i];
            var path = "Images/icon"+index;
            Game.Util.setSpriteFrame(path, this.result[i]);
        }

    },


    onUpdate: function (dt) {
        this._deadTime -= dt;
        if(this._deadTime <= 0)
        {
            this.node.destroy();
        }
    }

});
