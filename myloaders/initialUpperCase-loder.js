module.exports=function(src){
    if(src){
        console.log('--- initialUpperCase-loder input:', src);
        src=src.charAt(0).toUpperCase()+src.slice(1);
        console.log('--- initialUpperCase-loder output:', src);
        return `module.exports = '${src}'`;
    }
}