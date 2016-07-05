/* 内容管理对象 */
var H5 = function(name ,cfg){
    var id = ("h5_"+Math.random()).replace(".","_");
    this.el = $('<div id="'+id+'" >').hide();
    $("body").append(this.el);
    var pageList=[];
    
    this.addPage = function (className){
        var id = ("h5_page_"+Math.random()).replace(".","_");
        var page = $('<div id="'+id+'" class= "section page">');
        if(!className){
            page.addClass(className);
        }
        
        this.el.append(page);
        pageList.push(page)
        
        
        return this;
    }
    
      this.addComponent= function (name,cfg){
          var cfg = cfg||{};
          $.extend({
              type:"base"
          },cfg)
          
          var component;
          var page= pageList.slice(-1)[0];
          switch (cfg.type) {
              case 'base':
                 component= new h5Component(name,cfg);
                 page.append(component);
                  break;
              
              default:
                  // code
          }
        
        return this;
    }
    
    this.loader= function(){
        this.el.fullpage();
        this.el.show();
    }
    
}