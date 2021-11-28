<template>
    <main>
        <meu-menu :rotas="routes"/>
        <b-container>
            <transition name="pagina">
                <router-view></router-view>
            </transition>
        </b-container>
    </main>
</template>

<script>
import { routes } from './routes'
import Menu from './components/shared/menu/Menu.vue'


  export default {
      components:{
        'meu-menu': Menu
      },
      data(){
          return {
              routes
          }
      }
  }

</script>

<style >

.pagina-enter, .pagina-leave-active {
    opacity: 0
  }

  .pagina-enter-active, .pagina-leave-active {
    transition: opacity .4s
  }

  body {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    height:100%;
}
main{
    width:100%;
}

</style>
