<template>
    <form class="form-signin mt-4">
          <h1 class="h3 mb-3 fw-normal">Login</h1>

          <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Email</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Senha</label>
          </div>

          <button class="mt-4 w-100 btn btn-lg btn-dark" @click="login()">Login</button>
    </form>
</template>

<script>

export default {
    methods: {
       login(){
           this.$router.push('/list')
       }
    }

}




</script>

<style scoped>
.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    text-align:center;
}
</style>
