<template>
    <div >

		<carousel v-if="Slider_principal.length>0" :loop="true" :items="1" :nav="false"  :autoplay="true"   >
 			<img  v-for="(val, key) in Slider_principal" :key="key"  :src="val.path_file_image"  style="max-height: 400px;">
		</carousel>

	
		

        <div class="section bg-light pt-5 pb-5">
            <div class="container"> 
				<div class="py-2 text-center" data-aos="fade-in" data-aos-delay="0" data-aos-offset="0">
					<h1 class="display-5 fw-bold mb-0">
						<b class="text-primary">Bloquetes {{empresa.razon_social}} </b> 
                        <span class="typed" 
                            :data-typed-string="typedString"
                            data-typed-speed-forward="80" 
                            data-typed-speed-back="40" 
                            data-typed-back-delay="700" 
                            data-typed-loop-times="infinite" 
                            data-typed-smart-backspace="true" 
                            data-typed-shuffle="false" 
                            data-typed-cursor="|">
                        </span>
					</h1>
						
					<!-- slogan -->
					<p class="h5 fw-normal mb-0">
						Construye con nosotros.
					</p>
				</div>
			</div>
        </div>

        <div class="section pt-5 pb-5">
            <div class="container">
                <h2 class="h4 text-primary mb-5 text-center">¿Por que utilizar nuestros bloquetes?</h2>
                <div class="row">
                    <div v-for="(val, key) in Slogans" :key="key" class="col-12 col-md-4 mb-5">
                        <a href="#" class="d-block shadow-md text-dark py-4 px-3 text-center rounded text-decoration-none transition-hover-top transition-all-ease-250">
                            <span class="badge bg-light text-dark fs-1 w-100 h--100 rounded-pill rounded-circle">
                                <i class="fi mt-1" :class="val.icono"></i>
                            </span>
                            <h3 class="fs-2 mt-5">{{val.titulo}}</h3>
                            <p v-html="val.descripcion"></p>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div id="section_productos" class="section bg-light pt-5 pb-5">
			<div class="container">
				<h2 class="h2 mb-4 mt-6">Nuestro producto</h2>

				<div class="row" v-if="Producto.nombre_producto">
					<a href="javascript:void(0)" class="col-12 col-md-4 mb-4">
						<img class="img-fluid w-100 rounded" :src="Producto.path_imagen" alt="...">
					</a>
					
                    <div class="col pb-4">
						<div class="mb-4">
							<h2 class="h4 mb-0">
								<a href="javascript:void(0)" class="text-dark fw-medium">{{Producto.nombre_producto}}</a>
							</h2>

							<!--<span class="text-muted">Calidad certificada</span> -->
						</div>

						<div class="mb-4">
							<p class="text-justify" v-html="Producto.descripcion"></p>
						</div>
					</div>
				</div>
                <div class="row g-xl-5 align-items-center" v-else>
                    <div class="col-12 col-md-8 col-lg-6 mb-5">
						<img class="img-fluid" src="/img/teamwork.svg" alt="...">
					</div>

					<div class="col-12 col-md-8 col-lg-5 py-5">
						<h1 class="fw-bold mb-5">Aviso!</h1>

						<p class="lead">Estamos configurando datos del producto para su mayor informacion. Gracias por su comprension!
						</p>
					</div>
                </div>
			</div>
		</div>

        <div id="section_about" class="section   py-1 pt-1 pb-2">
			<div class="container">	
				<div class="row">
					<div class="col-12 col-lg-3 mb-5 jarallax" data-jarallax-element="-30">
						<div class="overflow-hidden position-relative rounded">
							<img class="img-fluid rounded"  height="50px" :src="Certificacion.path_file_image" :alt="Certificacion.razon_social_certificadora">

							<!-- svg wave -->
							<svg height="180%" style="margin-top:-20px;margin-left:-15px;margin-right:-15px;" class="rtl-scalex-n1 position-absolute top-0 bottom-0 end-0 z-index-1" viewBox="0 0 93 471">
								<path fill="#FFFFFF" d="M92.8333333,0 C76.9444444,16.3333333 67.1666667,37 63.5,62 C58,99.5 73,144.5 63.5,202 C54,259.5 24,293 5,345.5 C-4.22382609,370.986888 6.1692873e-12,426.5 31.5,471 C31.5,471 52,471 93,471 L92.8333333,0 Z"></path>
							</svg>
						</div>
					</div>

					<div class="col-12 col-lg-9 align-items-center">
						<h2 class="h1 fw-bold mb-4">Contamos con certificación</h2>

						<p class="lead mb-2" v-html="Certificacion.descripcion"></p>
						<!--
						<a href="files/bloques.pdf" target="_blank" class="scroll-to btn btn-primary btn-soft js-scrolltoified">
							Ver Certificación
						</a>
						-->
					</div>
				</div>
			</div>
		</div>

        <div class="container">
			<div class="position-relative lazy overlay-dark overlay-opacity-7 bg-dark bg-cover p-4 rounded d-flex align-items-center" data-loaded="true" style="background-image: url(assets/images/ban1.png);">
				<div class="row g-4 w-100 align-items-center position-relative text-white z-index-2">
					<div class="col-lg-2">
						<h2 class="display-2 fw-bold mb-0 d-flex align-items-center text-warning">
							<span class="lh-1 px-2">
							    <span class="d-block fs-3"></span>
							    <span class="d-block fs-3"></span>
							</span>
						</h2>
					</div>

					<div class="col">
						<h3 class="mb-0 fw-bold">Cotiza con nosotros sin ningun compromiso</h3>
						<p class="mb-0 fw-bold lead"></p>
					</div>
					
                    <div class="col-lg-3 text-lg-end">
						<a href="javascript:void(0)" @click="sendWhathsapp('Necesito una cotización');" class="btn btn-outline-light shadow-none btn-danger">
							<b>Cotizar Ahora</b>
							<svg width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"></path>
							</svg>
						</a>
					</div>
				</div>

				<div class="absolute-full w-100 overflow-hidden opacity-5">
					<img class="img-fluid" width="2000" height="2000" src="/img/shape-line-lense.svg" alt="...">
				</div>
			</div>
		</div>

        <div class="section bg-theme-color-light">
			<div class="container">
				<h4 class="display-6 fw-bold text-center mb-5">Como producimos nuestros bloquetes</h4>
				<div class="row">
					<div v-for="(val, key) in ProcesoElaboracion" :key="key" class="col-md-6 colg-sm-12 col-lg-3 mb-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="0">
						<a href="javascript:void(0)" class="d-block bg-white rounded p-2 shadow-primary-xs text-dark text-decoration-none transition-hover-top transition-all-ease-250">
							<img class="w-100 img-fluid rounded" style="height: 15rem;" :src="val.path_file_image" :alt="val.titulo">
							<div class="px-2 py-3">
								<h5 class="mb-0">{{val.titulo}}</h5>
								<p class="mb-0" v-html="val.contenido"></p>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>

          <!-- SECCION CLIENTES -->
		  <div id="section_clientes" class="container align-content-center pt-4">
			<h4 class="fw-bold text-center mb-5">Algunos de nuestros clientes</h4>
			<carousel v-if="Clientes.length>0" :loop="true" :items="4" :nav="false"  :autoplay="true"  :responsive="{0:{items:1,nav:false},600:{items:3,nav:true},1024:{items:4,nav:true}} "  >
				<div v-for="(val, key) in Clientes" :key="key" class="text-center" >
					<img   :src="val.path_file_image"  style="height:12rem ;"  class="img-fluid w-100  " :alt="val.razon_social" >
					<b class="text-center">{{val.razon_social | truncate(34,'...')}}</b>
				</div>
				
		   </carousel>
		</div>

        <!-- SECCION CONTACTENOS -->
        <div id="section_contacto" class="section mt-1 bg-light">
			<div class="container">
			    <div class="row">
				    <div class="col-12 col-lg-6 mb-5">
				        <h2 class="fw-bold mb-0">Contáctenos </h2>
				        <p class="fw-medium mb-5">Háganos saber cómo podemos ayudarle!</p>
				        <div class="row">
					        <!-- call us -->
					        <div class="col-12 col-sm-6 mb-4">
					            <h3 class="fw-medium text-primary h5 mb-4">Telefonos</h3>

					            <p class="m-0">
						            <a href="javascript:void(0)" class="link-muted">(+051) {{empresa.telefonos}}</a>
					            </p>
					            <p class="m-0">
						            <a href="javascript:void(0)" class="link-muted">{{empresa.email}}</a>
					            </p>
					        </div>

					        <!-- address -->
					        <div class="col-12 col-sm-6 mb-4">
					            <h3 class="fw-medium text-primary h5 mb-4">Nuestra dirección</h3>

					            <p class="m-0">
						            {{empresa.direccion}} <br>
						            Perú
					            </p>
					        </div>
				        </div>

				        <div class="bg-white shadow-primary-xs rounded p-2 mt-5">
					        <!--Map-->
					        <div class="map-leaflet w-100 rounded" 
                                style="height:400px"
					            :data-map-tile="empresa.razon_social"
					            data-map-zoom="8"
					            :data-map-json="map_json"
                            >
                                <!-- map container-->
                            </div>
				        </div>
				    </div>

				    <div class="col-12 col-lg-6">
				        <div class="rounded bg-white shadow-xs d-flex">
					        <div class="m-5 m-4-xs w-100">
					            <h2 class="mb-4">Puede dejarnos un mensaje</h2>
					  
					            <form novalidate method="POST" lass="bs-validate">
                                    <div class="form-floating mb-3">
                                        <input required v-model="form.nombres_completo" ref="nombres_completo" type="text" class="form-control">
                                        <label for="contact_name">Nombres y Apellidos</label>
                                    </div>

                                    <div class="form-floating mb-3">
                                        <input required v-model="form.correo_electronico" ref="correo_electronico" type="email" class="form-control">
                                        <label for="contact_email">Email</label>
                                    </div>

                                    <div class="form-floating mb-3">
                                        <input required v-model="form.telefono" ref="telefono" type="text" class="form-control">
                                        <label for="contact_phone">Telefono/Celular</label>
                                    </div>

                                    <div class="form-floating mb-3">
                                        <textarea required v-model="form.mensaje" ref="mensaje" class="form-control" rows="3" style="min-height:120px"></textarea>
                                        <label for="contact_message">Mensaje</label>
                                    </div>

                                    <div v-if="errors.length" :class="['form-group']">
                                        <p style="color:red" >
                        	                <b>Por favor corrija los siguientes Errores:</b>
                                            <ul>
                                                <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
                                            </ul>
                                        </p>
                                    </div>

                                    <button type="button" @click="enviarMail" class="btn btn-lg btn-primary w-100">Enviar mensaje</button>
			    		        </form>
				    	    </div>
				        </div>
				    </div>
			    </div>
		    </div>
	    </div>

        <!-- SECCION GALERIA -->
        <div id="section_gallery" class="section pt-5 ">
			<div class="container">
				<h2 class="display-6 mb-6 fw-bold" data-aos="fade-in" data-aos-delay="0" data-aos-offset="0">Nuestra galeria de fotos</h2>

				<div class="card-columns" data-aos="fade-up" data-aos-delay="450">
					<a v-for="(val, key) in GaleriaGeneral" :key="key" :href="val.path_file_image" data-photoswipe="gallery" class="card border-0 photoswipe transition-hover-top transition-all-ease-250 overflow-hidden overlay-dark-hover overlay-opacity-2">
						<img class="w-100 img-fluid lazy rounded" :data-src="val.path_file_image" :src="val.path_file_image" alt="...">
					</a>
				</div>
			</div>
		</div>

        <!-- SECCION NOSOTROS -->
        <section id="section_nosotros" class="pt--10 pb-0">
			<div class="container min-h-50vh pt-3">
				<div class="row text-center-xs d-middle">
					<div class="col-12 col-md-6 order-2 order-md-1 pb-5 aos-init aos-animate" data-aos="fade-up" data-aos-delay="0">
						<div class="mb-5">
							<h1 class="h4 font-weight-light mb-0">
								Acerca de nosotros<span class="text-primary font-weight-medium"> </span>
							</h1>

							<p class="h1 h4-xs font-weight-medium mb-4 text-primary">{{empresa.razon_social}}</p>

							<p class="lead text-justify fs--16" v-html="Nosotros.contenido"></p>
					    </div>
					</div>

					<div class="col-12 col-md-6 order-1 order-md-2 pb-5 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
						<!-- svg image -->
						<img width="600" height="400" class="img-fluid" :src="Nosotros.path_file_image" alt="...">
					</div>
				</div>
			</div>
		</section>

        <section class="pt-0">
			<div class="container">
				<div class="row aos-init aos-animate" data-aos="fade-in" data-aos-delay="0">
					<div class="col-12 col-lg-6 mb-4">
						<div class="card b-0 shadow-primary-xs shadow-primary-md-hover transition-all-ease-250 transition-hover-top h-100 rounded overflow-hidden">
							<div class="card-body font-weight-light mt--5 pb--0">
								<h2 class="h5 card-title mb-2 text-center">Misión</h2>
								<p class="lead" v-html="Mision.contenido"></p>
							</div>
						</div>
					</div>

					<div class="col-12 col-lg-6 mb-4">
						<div class="card b-0 shadow-primary-xs shadow-primary-md-hover transition-all-ease-250 transition-hover-top h-100 rounded overflow-hidden">
							<div class="card-body font-weight-light mt--5 pb--0">
								<h2 class="h5 card-title mb-2 text-center ">Visión</h2>
                                <p class="lead fs--18 text-justify" v-html="Vision.contenido"></p>
						    </div>
					    </div>
				    </div>
			    </div>
		    </div>
	    </section>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex';
	import carousel from 'vue-owl-carousel';

    export default {
		components: { carousel },
        name: 'Web',
        computed:{
            ...mapState(['loading','globales','empresa']),
			map_json(){
				return JSON.stringify([
					{
						"map_lat": this.empresa.latitud,
						"map_long": this.empresa.longitud,
						"map_popup": "<b>"+this.empresa.razon_social+"</b> <br> "+this.empresa.direccion+" / Perú <br> <a href='javascript:void(0)'>(+051) "+this.empresa.telefonos+"</a>"
					}
				]);
			}
        },
        mounted(){
            this.loadObjEmpresa();
            this.getPrincipal();
        },
        data(){
            return{
                Slider_principal:[],
                Slogans:[],
                Producto:{
                    nombre_producto:"",
                    descripcion:"",
                    imagen_principal:"",
                    ficha_tecnica_digital:"",
                    path_file_ficha:"",
                    path_img_producto:"",
                },
                Certificacion:{
                    razon_social_certificadora:"",
                    descripcion:"",
                    path_file_image:"",
                },
                ProcesoElaboracion:[],
                Clientes:[],
                GaleriaGeneral:[],
                Nosotros:{
                    titulo:"",
                    contenido:"",
                    imagen:"",
                    path_file_image:""
                },
                Mision:{
                    titulo:"",
                    contenido:"<div>No se registró la misión de LA PONDEROSA</div>"
                },
                Vision:{
                    titulo:"",
                    contenido:"<div>No se registró la visión de LA PONDEROSA</div>"
                },
                typedString:"",

				errors: [],
                form:{
                    nombres_completo:"",
                    correo_electronico:"",
					telefono:"",
                    mensaje:"",
                }
            }
        },
        methods:{
            ...mapMutations(['setLoading']),
            ...mapActions(['loadObjEmpresa']),
            getPrincipal(){
                let _this = this;
                this.setLoading(true);
                
                this.$http.get('webserviceserver/principal').then((res)=>{
                    if(res.data.SliderMain)
						this.Slider_principal       = res.data.SliderMain;

					if(res.data.Slogans)
                    	this.Slogans                = res.data.Slogans;
					
					if(res.data.Product)
                    	this.Producto               = res.data.Product;

					if(res.data.Certifications)
                    	this.Certificacion          = res.data.Certifications;

					if(res.data.ProcessElaboration)
                    	this.ProcesoElaboracion     = res.data.ProcessElaboration;

					if(res.data.Clients)
                    	this.Clientes               = res.data.Clients;

					if(res.data.GaleryMain)
                    	this.GaleriaGeneral         = res.data.GaleryMain;

                    if(res.data.About)
                        this.Nosotros           = res.data.About;

                    if(res.data.Mision)
                        this.Mision             = res.data.Mision;

                    if(res.data.Vision)
                        this.Vision             = res.data.Vision;
                    
                    this.Slogans.forEach((items, key)=>{
                        _this.typedString+=items.titulo;
                        if((key+1) !=_this.Slogans.length)
                            _this.typedString+="|";
                    });

					this.$nextTick(()=>{
						$.SOW.vendor.typed.process($('.typed'));
					});
                }).finally(()=>{
                    this.setLoading(false);
                });
            },
			enviarMail(){
                var self = this;
                this.errors = [];
                if(this.form.nombres_completo==""){
					this.$refs.nombres_completo.focus();
                    this.errors.push("El nombre es obligatorio.");
					return;
				}
                
                if(this.form.correo_electronico==""){
					this.$refs.correo_electronico.focus();
                    this.errors.push("El correo electronico es obligatorio.");
					return;
				}else if(!this.validEmail(this.form.correo_electronico)){
                    this.$refs.correo_electronico.focus();
                    this.errors.push('El correo electrónico debe ser válido.');
                    return;
                }

				if(this.form.telefono==""){
					this.$refs.telefono.focus();
                    this.errors.push("El telefono es obligatorio.");
					return;
				}else if(!this.validEmail(this.form.correo_electronico)){
                    this.$refs.correo_electronico.focus();
                    this.errors.push('El correo electrónico debe ser válido.');
                    return;
                }

                if(this.form.mensaje==""){
					this.$refs.mensaje.focus();
                    this.errors.push("El mensaje es obligatorio.");
					return;
				}

                self.setLoading(true);
				let formData = new FormData();
				formData.append("nombres_completo", this.form.nombres_completo);
                formData.append("correo_electronico", this.form.correo_electronico);
				formData.append("telefono", this.form.telefono);
                formData.append("mensaje", this.form.mensaje);

                this.$http.post('webserviceserver/contactenos_mail', formData).then((res)=>{
					console.log(res);
				   if(res.status==200){
						this.alertSuccess(res.data.msg, function(){
						   location.reload();
					   });
				   }else{
						console.log(res.data.errors);
					   this.alertWarning("Hubo problemas al enviar su correo, intente en 5 minutos", function(){
						   location.reload();
					   });
				   }
                }).finally(()=>{
                    this.setLoading(false);
                }).catch((e)=>{
					console.log(e.response);
					if(e.response && e.response.status && e.response.status==422){
						$.each(e.response.data.errors, function(k, v){
							$.each(v, function(kk, vv){
								self.errors.push(vv);
							});
                        });
					}
				});
            },
        }
		,filters: {
			truncate: function (text, length, suffix) {
				if (text.length > length) {
					return text.substring(0, length) + suffix;
				} else {
					return text;
				}
			},
		}
    }
</script>
