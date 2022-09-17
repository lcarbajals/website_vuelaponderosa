<template>
    <div>
        <footer id="footer" class="footer-dark">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4 text-center-xs p-0 py-5 px-3">
                        <span class="h--70 mt-n10 d-inline-flex align-items-center">
							<img :src="empresa.path_file_image" width="110" height="38" alt="...">
						</span>

                        <p class="fw-light fst-italic" style="text-align:justify !important;">
							Bloquetes de concreto fabricados con cemento Pacasmayo, con la proporción y dosificación proporcionada por un laboratorio, así ofreciéndole un producto de garantía y calidad
                        </p>

                        <div class="mt-4">
                            <a v-for="(val, key) in redes_sociales" :key="key" :href="val.url" class="btn btn-sm btn-facebook transition-hover-top mb-2 rounded-circle" rel="noopener" >
								<i class="fi" :class="[val.icono]"></i> 
							</a>
                        </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-5 py-5 text-center-xs">
                        <h4 class="h5">{{empresa.abreviatura}}</h4>

                        <div class="row">
							<div class="col-12 col-lg-6"></div>
							<div class="col-12 col-lg-6"></div>
                        </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-3 py-5 text-center-xs">
                        <h4 class="h5">Contacto</h4>

                        <div class="mt-4">
                            <ul class="list-unstyled m-0">
                                <li class="list-item">
									<a href="tel:+01-555-5555" class="clearfix py-1 h3 mb-0 d-inline-block fw-medium text-info">
										<i class="float-start fi fi-phone h4"></i> (+51) {{empresa.telefonos}}
									</a>
								</li>

								<li class="list-item">
									<a href="mailto:info@mycomany.com" class="clearfix py-1 h5 d-inline-block fw-medium text-warning">
										<i class="float-start fi fi-envelope h4 mt-n1"></i> {{empresa.email}}
									</a>
								</li>
                            </ul>

                            <p>
								Si tiene preguntas o desea obtener más información, nuestro equipo está disponible para usted.
							</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--
            <div class="bg-distinct py-3 clearfix">
				<div class="container clearfix fw-light text-center-xs">
					<div class="fs-6 py-2 float-start float-none-xs m-0-xs">
						© {{empresa.razon_social}}
					</div>

					<ul class="list-inline mb-0 mt-2 float-end float-none-xs m-0-xs"> 
						<li class="list-inline-item m-0 ml-2"> 
							<img width="38" height="24" class="lazy" src="/img/visa.svg" alt="visa credit card icon">
						</li> 

						<li class="list-inline-item m-0  ml-2"> 
							<img width="38" height="24" class="lazy" src="/img/mastercard.svg" alt="mastercard credit card icon">
						</li>
					</ul>
				</div>
			</div>
            -->
        </footer>

        <a href="javascript:void(0)" @click="sendWhathsapp('Necesito una cotización o proforma')" class="float hoverDivMsj" data-mensaje="Me comúnico desde la web " >
			<svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16"> 
			    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
			</svg>		     
		</a>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    
    export default {
        name:'FootBar',
        data(){
           return{
               notificacionNoticia:0,
               notificacionConvocatoria:0,
           }
        },
        components: {
			
		},
        props:{
        },
        created(){
            
        },
        methods:{
           

        },
        computed:{
            ...mapState(['empresa', 'redes_sociales']),
        },
        mounted(){
           
        }
    }
</script>
