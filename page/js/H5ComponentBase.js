/* 基本图文组件对象 */

var H5ComponentBase = function(name,cfg){
    var cfg = cfg || {};
    var id = ("h5_c_"+Math.random()).replace(".","_");
    var cls = "h5_component_"+cfg.type;
    
    var component = $('<div class ="h5_component_name_'+name+' h5_component '+cls+'" id = "'+id+'">');
    
    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
   
    cfg.css&& component.css(cfg.css);
    cfg.bg && component.css("backgroundImage","url("+cfg.bg+")");
    if(cfg.center==true){
       component.css({
           marginLeft:(cfg.width/4 * -1)+"px",
           left:"50%"
           
       }) ;
    }
    component.on("load",function(){
        component.addClass("h5_component_base_load").removeClass("h5_component_base_leave");
        cfg.animateIn&&component.animate(cfg.animateIn);
    });
    
      component.on("leave",function(){
        component.addClass("h5_component_base_leave").removeClass("h5_component_base_load");
         cfg.animateOut&&component.animate(cfg.animateOut);
    })
    
    
    return component;
}