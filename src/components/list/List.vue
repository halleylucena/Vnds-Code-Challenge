<template>
    <div class="m-4">
        <h2 class="text-center mb-4">Documents</h2>
        <div class="row justify-content-between mt-3 mb-3">
            <div class="col-6">
                <div class="btn-group text-center container-fluid p-0" role="group" aria-label="Basic radio toggle button group">
                  <input type="radio" v-model="picked" value="ALL" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                  <label class="btn btn-outline-dark"  for="btnradio1">ALL</label>

                  <input type="radio" v-model="picked" value="FT" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                  <label class="btn btn-outline-dark"  for="btnradio2">FT</label>

                  <input type="radio" v-model="picked" value="RG" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
                  <label class="btn btn-outline-dark"  for="btnradio3">RG</label>

                  <input type="radio" v-model="picked" value="DC" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off">
                  <label class="btn btn-outline-dark"  for="btnradio4">DC</label>

                  <input type="radio" v-model="picked" value="OT" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off">
                  <label class="btn btn-outline-dark"  for="btnradio5">OT</label>
                </div>
            </div>

            <div class="col-12 col-lg-auto mb-3 mb-lg-0">
              <input type="search" class="form-control" @input="search = $event.target.value" placeholder="Search..." aria-label="Search">
            </div>
        </div>

        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Doc ID</th>
              <th scope="col">Type</th>
              <th scope="col">Number</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of filterSearchList">
              <th scope="row">{{item.id}}</th>
              <td>{{checkType(item.type)}}</td>
              <td>{{item.number}}</td>
              <td>{{new Date(item.date).toLocaleDateString()}}</td>
              <td>
                      <b-button @click="goToDetails(item.id)" variant="dark" size="sm" class="mb-2">
                        <b-icon icon="arrow-right-circle-fill" aria-hidden="true"></b-icon>
                      </b-button>
              </td>
            </tr>

          </tbody>
        </table>



    </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue'
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue'

  export default {
      components:{
          'meu-painel': Painel,
          'imagem-responsiva': ImagemResponsiva,
          'meu-botao': Botao
      },

      data(){
          return{
              list: [],
              search: '',
              picked: 'ALL',
              types: [
                  {code: 'FT',name: 'Fatura'},
                  {code: 'FS',name: 'Fatura Simplificada'},
                  {code: 'NC',name: 'Nota de Crédito'},
                  {code: 'FR',name: 'Fatura Recibo'},
                  {code: 'FG',name: 'Fatura Global'},
                  {code: 'GA',name: 'Guia de Ativos Próprios'},
                  {code: 'GD',name: 'Guia de Devolução'},
                  {code: 'GR',name: 'Guia de Remessa'},
                  {code: 'GT',name: 'Guia de Transporte'},
                  {code: 'DC',name: 'Consulta de Mesa'},
                  {code: 'PF',name: 'Fatura Pró-Forma'},
                  {code: 'OT',name: 'Orçamento'},
                  {code: 'EC',name: 'Encomenda'}
              ]
          }
      },
      created(){
          let promise = this.$http.get('https://api.allorigins.win/raw?url=https://www.vendus.pt/ws/documents/?api_key=b466e4b7ca33df8e6d372da48f0468ad')
              .then(res => res.json())
              .then(list => this.list = list, err => console.log(err))
      },
      computed:{
          filterSearchList(){
              let filtered = this.list
              if(this.search){
                  let exp = new RegExp(this.search.trim(), 'i')
                  filtered = this.list.filter(el => exp.test(el.number))
              }
              if(this.picked != 'ALL'){
                  filtered = this.list.filter( el => {
                     return el.type === this.picked
                  })
              }
              return filtered
          }


      },
      methods: {
         checkType(type){
             let name = type
             this.types.forEach( entry => {
                 if(entry.code === type){
                     name =  entry.name
                 }
             })
             return name
         },
         goToDetails(id){
             this.$router.push({name: 'detail', params: { id }});
         }
      }

  }

</script>

<style scoped>
</style>
