export default{
    methods:{
        isFunction(functionToCheck) {
            return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
        },
        forEach(collection, callback, scope){
            if (Object.prototype.toString.call(collection) === '[object Object]') {
                for (var prop in collection) {
                    if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                        callback.call(scope, collection[prop], prop, collection);
                    }
                }
            } else {
                for (var i = 0, len = collection.length; i < len; i++) {
                    callback.call(scope, collection[i], i, collection);
                }
            }
        },
        isNumber(e) {
            let key = e.keyCode || e.which;
            let keyString = String.fromCharCode(key).toLowerCase();
            let letters = "0123456789";
            let specials = [8, 9, 37, 39, 46, 44];
            let keySpecial = false;
            for (let i in specials) {
                if (key == specials[i]) {
                    keySpecial = true;
                    break;
                }
            }
            if (letters.indexOf(keyString) == -1 && !keySpecial) {
                e.preventDefault();
                return false;
            }
        },
        isLetter(e) {
            let key = e.keyCode || e.which;
            let keyString = String.fromCharCode(key).toLowerCase();
            let letters = "ABCDEFGHIJKLMÑNOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";
            let specials = [32];
            let keySpecial = false;
            for (let i in specials) {
                if (key == specials[i]) {
                    keySpecial = true;
                    break;
                }
            }
            if (letters.indexOf(keyString) == -1 && !keySpecial) {
                e.preventDefault();
                return false;
            }
        },
        isEmpty(value){
            if(value==undefined || value==null || value==''){
                return true;
            }
            if (this.isObject(value)) {
                return !Object.keys(value).length
            }
            return false;
        },
        isObject(o) {
            return o instanceof Object && o.constructor === Object;
        },
        sendWhathsapp(msj){                
            let tel='51'+this.empresa.telefonos
            let urlW="https://api.whatsapp.com/send?phone="+tel+"&text="+msj;
            window.open(urlW, '_blank');
        }
    }
}