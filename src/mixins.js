import Swal from 'sweetalert2';
const defaults = {
    title: "Confirmar",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ed5565",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
};

export default{
    methods:{
        isFunction(functionToCheck) {
            return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
        },
        validEmail (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        alert(options, callback){
            if(typeof options.icon == "undefined")
                options.icon = "info";
            options.showCancelButton=false;   
            options.confirmButtonText='Aceptar';
            options.confirmButtonColor='#3085d6';
            const settings = $.extend({}, defaults, options);
            if(this.isFunction(callback)){
                Swal.fire(settings).then((result) => {
                    callback(true);
                })
                return;
            }
            Swal.fire(settings);
        },
        alertSuccess(message,callback){
            this.alert({icon:'success',title:'Mensaje',text:message},callback);
        },
        alertWarning(message,callback){
            this.alert({icon:'warning',title:'Advertencia',text:message},callback);
        },
        alertError(message,callback){
            this.alert({icon:'error',title:'Error',text:message},callback);
        },
        alertInfo(message,callback){
            this.alert({icon:'info',title:'Info',text:message},callback);
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