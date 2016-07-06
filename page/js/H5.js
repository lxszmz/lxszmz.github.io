/* 内容管理对象 */
var H5 = function(){
    var id = ("h5_"+Math.random()).replace(".","_");
    this.el = $('<div id="'+id+'" >').hide();
    $("body").append(this.el);
    var pageList=[];


    /**
     * 增加页面
     * return this 是为了使用链式调用
     * pageList 是为了添加组件时知道向哪一个页面添加
     * @param className
     * @returns {H5}
     */
    this.addPage = function (className){
        var id = ("h5_page_"+Math.random()).replace(".","_");
        var page = $('<div id="'+id+'" class= "section page ">');
        if(!className){
            page.addClass(className);
        }
        this.el.append(page);
        pageList.push(page)
        return this;
    };

    /**
     * 页面增加组件
     *
     * @param name
     * @param cfg
     * @returns {H5}
     */
      this.addComponent= function (name,cfg){
          var cfg = cfg||{};

          /**
           * 如果没有定义组件的类型，那么默认是base类型
           * 使用jQuery中的扩展功能
           */
          cfg= $.extend({
              type:"base"
          },cfg);
          
          var component;
          /**
           * 取出最近添加的页面
           */
          var page= pageList.slice(-1)[0];

          /**
           * 根据类型调用不同的组件
           */
          switch (cfg.type) {
              case 'base':
                 component= new H5ComponentBase(name,cfg);
                 page.append(component);
                  break;
              
              default:
                  // code
                  break;
          };
        
        return this;
    }

    /**
     * 这个是为了等待页面加载完全在将这些组件显示出来
     */
    this.loader= function(){
        this.el.fullpage({
            onLeave:function(){
                $(this).find(".h5_component").trigger("leave");
            },
            afterLoad:function(){
                $(this).find(".h5_component").trigger("load");
            }
        });
        this.el.show();
    }
    
}