<template>
    <div class="container mt-4 mb-4">
        <h2 class="text-center mb-4">Document Number {{docDetail.id}}</h2>
        <header class="d-flex align-items-center pb-3 mb-5 border-bottom justify-content-between">
              <b-button @click="goToList()" variant="dark" size="sm" class="vs-right">
                <b-icon icon="arrow-left-short" aria-hidden="true"></b-icon> Back
              </b-button>
              <a target="_blank" :href="downloadLink(docDetail.id)">
                  <b-button variant="dark" size="sm" class="vs-right m-0">
                      Download PDF <b-icon icon="download" aria-hidden="true"></b-icon>
                  </b-button>
              </a>
        </header>


        <div class="row">

            <div class="col-md-8">
                <!-- Client Info -->
                <div class="card mb-4">
                  <div class="card-body">
                    <h5 class="card-title mb-4">Client Information</h5>
                    <p class="card-text mb-1">Name: {{ docDetail.client.name }}</p>
                    <p class="card-text">Fiscal ID: {{docDetail.client.fiscal_id}}</p>
                  </div>
                </div>
                <!-- Items -->
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title mb-4">Items</h5>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item of docDetail.items">
                          <th scope="row">{{item.title}}</th>
                          <td>{{item.qty}}</td>
                          <td>{{item.amounts.gross_total}}</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
            </div>

            <div class="col-md-4">
                <!-- Payments -->
                <div v-if="docDetail.payments" class="card mb-4">
                  <div class="card-body">
                    <h5 class="card-title mb-4">Payments</h5>
                    <table class="table table-striped text-right">
                      <tbody>
                        <tr>
                          <td class=""></td>
                          <td>Payment Reference</td>
                          <th>{{docDetail.payments[0].id}}</th>
                        </tr>
                        <tr>
                          <td></td>
                          <td>Type</td>
                          <th>{{docDetail.payments[0].title}}</th>
                        </tr>
                        <tr>
                          <td></td>
                          <td>Paid</td>
                          <th>{{docDetail.payments[0].amount}}</th>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-else class="card mb-4">
                  <div class="card-body">
                    <h5 class="card-title mb-4">Payments</h5>
                    <p>There is no Payments yet.</p>
                  </div>
                </div>

                <!-- Total Amount -->
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title mb-4">Total Amount</h5>
                    <table class="table table-striped text-right">
                      <tbody>
                        <tr>
                          <td class="td-align"></td>
                          <td>Before Tax</td>
                          <th>{{docDetail.taxes[0].base}}</th>
                        </tr>
                        <tr>
                          <td></td>
                          <td>Tax Amount</td>
                          <th>{{docDetail.taxes[0].amount}}</th>
                        </tr>
                        <tr>
                          <td></td>
                          <td>Total</td>
                          <th>{{docDetail.taxes[0].total}}</th>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
            </div>











        </div>
    </div>
</template>

<script>


  export default {
      components:{

      },

      data(){
          return{
              id: this.$route.params.id,
              docDetail: {}
          }
      },
      created(){
          let promise = this.$http.get(`https://api.allorigins.win/raw?url=https://www.vendus.pt/ws/documents/${this.id}/?api_key=b466e4b7ca33df8e6d372da48f0468ad`)
              .then(res => res.json())
              .then(docDetail => this.docDetail = docDetail, err => console.log(err))
      },
      computed:{

      },
      methods: {
          goToList(){
              this.$router.push('/list')
          },
          downloadLink(id){
              return `https://api.allorigins.win/raw?url=https://www.vendus.pt/ws/documents/${id}.pdf?api_key=b466e4b7ca33df8e6d372da48f0468ad`
          }

      }

  }

</script>

<style scoped>
.vs-right{
    margin-right: 20px;
}
.td-align{
    width:30%;
}

.td-align-payment{
    width:20%;
}
</style>
