define(["jquery","underscore","backbone","synapse","synapse/hooks/object","synapse/hooks/jquery","synapse/hooks/backbone-model","mixins","twitter/collections/tweets","twitter/models/searcher","twitter/views/tweetsview","twitter/views/searcherview","timer/models/timer","timer/views/timerview"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){d.addHooks(f,g,e);var o={};o.Tweets=new i,o.Searcher=new j,o.Timer=new m;var p=c.View.extend({el:a("#twitter-app"),initialize:function(){b.bindAll(this,"displayResults","showLoader","updateTimer","toggleTimer","clearResults"),o.Searcher.bind("ajax:before",this.showLoader),o.Searcher.bind("change:results",this.displayResults),o.Searcher.bind("change:query",this.updateTimer),o.Searcher.bind("change:query",this.clearResults),o.Timer.bind("change:started",this.toggleTimer),o.Timer.bind("alarm",o.Searcher.refresh),this.timerView=new n({el:this.$(".timer"),model:o.Timer}),this.tweetsView=new k({el:this.$(".tweets"),collection:o.Tweets}),this.searcherView=new l({el:this.$("#search-form"),model:o.Searcher}),d(this.timerView.$("span[name=query]")).observe(o.Searcher)},showLoader:function(){a(this.tweetsView.el).addClass("loading")},updateTimer:function(){o.Timer.resetTime(),o.Searcher.get("query")?o.Timer.start():o.Timer.stop()},clearResults:function(){this.clearBuffer(),o.Tweets.reset([])},displayResults:function(){var b=this,c=o.Searcher.get("results");this.buffer(function(d){d();var e=c?c.results:[];o.Tweets.reset(e),a(b.tweetsView.el).removeClass("loading")})},toggleTimer:function(){o.Timer.get("started")?a(this.timerView.el).show():a(this.timerView.el).hide()}});return b.extend(p.prototype,h.Buffer),o.View=new p,o})