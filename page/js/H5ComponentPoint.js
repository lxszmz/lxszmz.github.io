/* 基本图文组件对象 */

var H5ComponentPoint = function(name,cfg){
    var baseCompoent = new H5ComponentBase(name,cfg);
    var base = cfg.data[0][1];

    $.each(cfg.data,function(index,item){
        console.log(item[0]);
        var point = $('<div class="point">'+item[0]+'</div>')
        var per = (item[1]/base*100)+"%";
        point.width(per).height(per);
        if(item[2]){
            point.css("background-color",item[2]);
        }
        if(item[3]!==undefined&&item[4]!=undefined){
            point.css("left",item[3]).css("top",item[4]);
        }
        baseCompoent.append(point);
    });
    return baseCompoent;

}
