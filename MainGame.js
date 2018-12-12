
module.exports = cc.Class({
    extends: Engine.BaseGame,
    // mixins: [BaseGame],


    init: function () {

        this._super();

        Engine.Log.log("MainGame  init");

        this.gameType = Game.Def.GameType.GAME_MAIN;
        Engine.Log.log("gameType: " + this.gameType);

        this.gameStart = Game.Def.GameStart.START_NULL;



    },


    clearGame: function () {

        this._super();
    },

    onUpdate: function (dt) {
        // Engine.Log.log("MainGame onUpdate");

        for(var k in this.gameObjs)
        {
            var objs = this.gameObjs[k];
            objs.forEach(( v, k ) => {
                v.onUpdate(dt);
            });
        }

    },

    doEvent: function (cmd)
    {
        for(var k in this.gameObjs)
        {
            var objs = this.gameObjs[k];
            for(var index in objs)
            {
                var v = objs[index];
                if(v.doEvent(cmd))
                {
                    return true;
                }
            }
        }
    }
});