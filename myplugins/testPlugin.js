class testPlugin{
    constructor(options){
        console.log('MyPlugin constructor:', options);
    }
    apply(compiler){
        compiler.plugin('compilation',function(compilation){
            console.log('——————————compilation——————————');
        })
        compiler.plugin('emit',function(compilation,callback){
            console.log('——————————emit——————————');
            //必须要有callback，否则不结束
            callback();
        })
    }
}
module.exports=testPlugin;