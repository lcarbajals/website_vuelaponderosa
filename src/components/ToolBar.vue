<template>
    <div>
        <div id="loading" v-if="loading">
            <div class="load-circle text-center" style=" ">
                <div style="text-align: center;">
                    <img :src="'/img/loading_empresa__0001.png'" class="img-fluid" style="text-align: center;">

                </div>
                <div style="text-align: center;" class="pt-2 d-inline ">
                    <div role="status" class="spinner-grow text-success spinner-grow-sm  ">
                        <span class="sr-only"></span>
                    </div>
                    <div role="status" class="spinner-grow text-success spinner-grow-sm ">
                        <span class="sr-only"></span>
                    </div>
                    <div role="status" class="spinner-grow text-success spinner-grow-sm ">
                        <span class="sr-only"></span>
                    </div>
                </div>
            </div>
        </div>

        <header id="header" class="shadow-xs header-fixed header-sticky">
            <div id="top_bar" class="bg-light fs--14">
                <div class="container">
                    <div class="text-nowrap">
                        <div class="d-flex justify-content-between">
                            <div class="d-inline-block float-start">
                                <ul class="list-inline m-0">
                                    <li class="dropdown list-inline-item">
                                        <a v-for="(val, key) in redes_sociales" :key="key" :href="val.url"
                                            class="fs--14 pt-2 pr-1 pe-1 pb-0  d-inline-block font-weight-medium  ">
                                            <i class="float-start  fi " :class="[val.icono]"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="d-inline-block float-end">
                                <ul class="list-inline m-0">
                                    <li class="dropdown list-inline-item">
                                        <a href="javascript:void(0)"
                                            class="fs--14 pt-2 pr-1 pe-1 pb-0 d-inline-block font-weight-medium ">
                                            <i class="float-start fi fi-phone"></i> (+51){{empresa.telefonos}}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container position-relative">

                <nav class="navbar navbar-expand-lg navbar-light justify-content-lg-between justify-content-md-inherit">

                    <div class="align-items-start">

                        <!-- mobile menu button : show -->
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarMainNav" aria-controls="navbarMainNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <svg width="25" viewBox="0 0 20 20">
                                <path
                                    d="M 19.9876 1.998 L -0.0108 1.998 L -0.0108 -0.0019 L 19.9876 -0.0019 L 19.9876 1.998 Z">
                                </path>
                                <path
                                    d="M 19.9876 7.9979 L -0.0108 7.9979 L -0.0108 5.9979 L 19.9876 5.9979 L 19.9876 7.9979 Z">
                                </path>
                                <path
                                    d="M 19.9876 13.9977 L -0.0108 13.9977 L -0.0108 11.9978 L 19.9876 11.9978 L 19.9876 13.9977 Z">
                                </path>
                                <path
                                    d="M 19.9876 19.9976 L -0.0108 19.9976 L -0.0108 17.9976 L 19.9876 17.9976 L 19.9876 19.9976 Z">
                                </path>
                            </svg>
                        </button>


                        <router-link class="navbar-brand" :to="'/'">
                            <img :src="empresa.path_file_image" width="178" height="68" alt="..."
                                style="max-width:180px !important;">
                        </router-link>

                    </div>


                    <div class="collapse navbar-collapse navbar-animate-fadein justify-content-end" id="navbarMainNav">



                        <div class="navbar-xs d-none">


                            <button class="navbar-toggler pt-0" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarMainNav" aria-controls="navbarMainNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <svg width="20" viewBox="0 0 20 20">
                                    <path
                                        d="M 20.7895 0.977 L 19.3752 -0.4364 L 10.081 8.8522 L 0.7869 -0.4364 L -0.6274 0.977 L 8.6668 10.2656 L -0.6274 19.5542 L 0.7869 20.9676 L 10.081 11.679 L 19.3752 20.9676 L 20.7895 19.5542 L 11.4953 10.2656 L 20.7895 0.977 Z">
                                    </path>
                                </svg>
                            </button>


                            <router-link class="navbar-brand" :to="'/'">
                                <img :src="empresa.path_file_image" width="110" height="38" alt="...">
                            </router-link>

                        </div>

                        <ul class="navbar-nav fs-6">

                            <li class="nav-item">
                                <a class="nav-link scroll-to" href="#header">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll-to" href="#section_nosotros">Nosotros</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll-to" href="#section_productos">Nuestro producto</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll-to" href="#section_clientes">Clientes</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link scroll-to" href="#section_contacto">Contáctenos</a>
                            </li>

                            <li class="nav-item d-block d-sm-none text-center mb-4">

                                <h3 class="h6 text-muted">Siguenos en</h3>


                                <a v-for="(val, key) in redes_sociales" :key="key" :href="val.url"
                                    class="fs--16 pt-2 pr-1 pe-1 pb-0  d-inline-block font-weight-medium  ">
                                    <i class="float-start  fi " :class="[val.icono]"></i>
                                </a>


                            </li>
                        </ul>
                    </div>
                    <ul class="list-inline list-unstyled mb-0 d-flex align-items-end">

                    </ul>

                </nav>
            </div>


        </header>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ToolBar',
    computed: {
        ...mapState(['loading', 'globales', 'empresa', 'redes_sociales']),
    },
    methods: {
        goToSection(section) {

            const element = document.getElementById(section);
            element.scrollIntoView();

        }
    }
}
</script>