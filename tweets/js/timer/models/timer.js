define(["underscore","backbone"],function(a,b){var c=b.Model.extend({defaults:{started:!1,max:15,time:0},t:null,initialize:function(){a.bindAll(this,"countDown"),this.set({time:this.get("max")})},start:function(){this.get("started")||(this.t=setInterval(this.countDown,1e3),this.set({started:!0}))},stop:function(){clearInterval(this.t),this.set({started:!1})},resetTime:function(){this.set({time:this.get("max")})},countDown:function(){this.set({time:this.get("time")-1}),this.get("time")===0&&(this.trigger("alarm"),this.resetTime())}});return c})