<template>
    <div>
        <div class="swiper-container swiper-preloader swiper-btn-group swiper-btn-group-end text-white mt-1"
				data-swiper='{
				"slidesPerView": 1,
				"spaceBetween": 0,
				"autoplay": { "delay" : 4500, "disableOnInteraction": false },
				"loop": true,
				"pagination": { "type": "bullets" }
			}'
		>
            <div class="swiper-wrapper" style="height:400px">
                <div v-for="(val, key) in Slider_principal" :key="key" class="swiper-slide h-100 d-middle bg-white overlay-opacity-3 bg-cover" :style="{'background':'url('+val.path_file_image+')'}"></div>
            </div>

            <!-- Add Arrows -->
            <div class="swiper-button-next swiper-button-white"></div>
            <div class="swiper-button-prev swiper-button-white"></div>

            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>

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

        <div class="section bg-light pt-5 pb-5">
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

							<span class="text-muted">Calidad certificada</span>
						</div>

						<div class="mb-4">
							<p class="text-justify">
								Elaborado con una masa de concreto de primera calidad para así prevenir la
								humedad en su totalidad, contamos con personal experimentado en la
								elaboración de nuestros bloquetes con una maquina industrial ponedora que
								así garantiza la elaboración de un mejor producto.
							</p>
							
                            <table class="table table-condensed table-bordered table-responsive table-sm ">
								<tr>
								<td> Largo </td>
								<td> 39cm </td>
								<td> Ancho </td>
								<td> 12cm  </td>
							</tr>
							<tr>
								<td> Alto </td>
								<td> 18 cm </td>
								<td> Peso</td>
								<td> 8Kg </td>
							</tr>
							<tr>
								<td> Resistencia a la Compresión </td>
								<td> 44.90 Kgf/cm² </td>
								<td></td>
								<td></td>
							</tr>
							</table>
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
						<a href="files/bloques.pdf" target="_blank" class="scroll-to btn btn-primary btn-soft js-scrolltoified">
							Ver Certificación
						</a>
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
						<a href="javascript:alert('esto falta chata')" class="btn btn-outline-light shadow-none btn-danger">
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
					<div v-for="(val, key) in ProcesoElaboracion" :key="key" class="col-6 col-lg-3 mb-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="0">
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
        <div class="container align-content-center pt-4">
			<h4 class="fw-bold text-center mb-5">Algunos de nuestros clientes</h4>
			<div class="swiper-container swiper-preloader swiper-white" 
                data-swiper='{
                    "slidesPerView": 4,
                    "spaceBetween": 8,
                    "slidesPerGroup": 1,
                    "loop": true,
                    "autoplay": { "delay" : 1500, "disableOnInteraction": false },
                    "breakpoints": {
                        "1024": { "slidesPerView": "3" },
                        "920":	{ "slidesPerView": "2" },
                        "640":	{ "slidesPerView": "1" }
                    }
                }'
            >
				<div class="hide swiper-wrapper">
					<div v-for="(val, key) in Clientes" :key="key" class="swiper-slide">
						<img :src="val.path_file_image" class="img-fluid w-100 h-75" :alt="val.razon_social">
					</div>
				</div>

				<!-- Add Arrows -->
				<div class="rounded-circle swiper-button-next"></div>
				<div class="rounded-circle swiper-button-prev"></div>
			</div>
		</div>

        <!-- SECCION CONTACTENOS -->
        <div id="section_contact" class="section mt-1 bg-light">
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
					            :data-map-json='[
                                                {
                                                "map_lat": empresa.latitud,
                                                "map_long": empresa.longitud,
                                                "map_popup": "<b>"+empresa.razon_social+"</b> <br> "+empresa.direccion+" / Perú <br> <a href=`javascript:void(0)`>(+051) "+empresa.telefonos+"</a>"
                                                }
	                        				  ]'
                            >
                                <!-- map container-->
                            </div>
				        </div>
				    </div>

				    <div class="col-12 col-lg-6">
				        <div class="rounded bg-white shadow-xs d-flex">
					        <div class="m-5 m-4-xs w-100">
					            <h2 class="mb-4">Puede dejarnos un mensaje</h2>
					  
					            <form novalidate
						            method="POST"

                                    data-ajax-container="#ajax_dd_contact_response_container"
                                    data-ajax-update-url="false"
                                    data-ajax-show-loading-icon="true"
                                    data-ajax-callback-function=""
                                    data-error-scroll-up="false"

                                    data-ajax-control-alerts="true"
                                    data-ajax-control-alert-succes="#contactSuccess"
                                    data-ajax-control-alert-unexpected="#contactErrorUnexpected"
                                    data-ajax-control-alert-mandaroty="#contactErrorMandatory"

                                    data-error-toast-text="<i class='fi fi-circle-spin fi-spin float-start'></i> Please, complete all required fields!"
                                    data-error-toast-delay="2000"
                                    data-error-toast-position="bottom-center"

                                    class="bs-validate js-ajax"
                                >
                                    <div class="form-floating mb-3">
                                        <input required placeholder="Name" id="contact_name" name="contact_name" type="text" class="form-control">
                                        <label for="contact_name">Nombres</label>
                                    </div>

                                    <div class="form-floating mb-3">
                                        <input required placeholder="email" id="contact_email" name="contact_email" type="email" class="form-control">
                                        <label for="contact_email">Email</label>
                                    </div>

                                    <div class="form-floating mb-3">
                                        <input required placeholder="Telefono/Celular" id="contact_phone" name="contact_phone" type="text" class="form-control">
                                        <label for="contact_phone">Telefono/Celular</label>
                                    </div>

                                    <div class="form-floating mb-3">
                                        <textarea required placeholder="Mensaje" id="contact_message" name="contact_message" class="form-control" rows="3" style="min-height:120px"></textarea>
                                        <label for="contact_message">Mensaje</label>
                                    </div>

                                    <div id="ajax_dd_contact_response_container"></div>

                                    <div id="contactErrorUnexpected" class="hide alert alert-danger p-3">
                                        Unexpected Error!
                                    </div>

                                    <div id="contactErrorMandatory" class="hide alert alert-danger p-3">
                                    Please, review your data and try again!
                                    </div>

                                    <div id="contactSuccess" class="hide alert alert-success p-3">
                                        Thank you for your message!
                                    </div>

                                    <button type="button" class="btn btn-lg btn-primary w-100">Enviar mensaje</button>
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
        <section class="pt--10 pb-0">
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
    export default {
        name: 'Web',
        computed:{
            ...mapState(['loading','globales','empresa']),
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
            }
        },
        methods:{
            ...mapMutations(['setLoading']),
            ...mapActions(['loadObjEmpresa']),
            getPrincipal(){
                let _this = this;
                this.setLoading(true);
                
                this.$http.get('webserviceserver/principal').then((res)=>{
                    this.Slider_principal       = res.data.SliderMain;
                    this.Slogans                = res.data.Slogans;
                    //this.Producto               = res.data.Product;
                    this.Certificacion          = res.data.Certifications;
                    this.ProcesoElaboracion     = res.data.ProcessElaboration;
                    this.Clientes               = res.data.Clients;
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
                }).finally(()=>{
                    this.setLoading(false);
                });
            },
        }
    }
</script>
