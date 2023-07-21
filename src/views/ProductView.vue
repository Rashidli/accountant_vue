<template>
  <div class="about">
    <div class="container">
      <h3>Məhsullar</h3><hr>
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="deleteModalLabel">Məlumatı silin</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="width">
                  <div class="alert alert-primary" v-if="savingSuccessful"> 
                      {{ text }}
                  </div>
                  <span class="text-danger">Silinsin?</span>
              </div>
            </div>
            <div class="modal-footer">
              <button data-bs-dismiss="modal" aria-label="Close" type="submit" class="btn btn-danger" v-on:click="deleteData(product_id)">Sil</button>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          +
      </button>
      
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Yeni məhsul əlavə edin</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="width">
                  <div class="alert alert-primary" v-if="savingSuccessful"> 
                      {{ this.text }}
                  </div>
                  
                <form @submit.prevent="postData" method="post">
                  <div class="form-group">
                    <input
                      name="title"
                      v-model="post.title"
                      type="text"
                      class="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Adı"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      name="account"
                      v-model="post.unit"
                      type="text"
                      class="form-control"
                      aria-describedby="nameHelp"
                      placeholder="Ölçü vahidi"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">Daxil et</button>
                </form>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="newModal" tabindex="-1" aria-labelledby="newModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="newModalLabel">Məlumatı dəyişdirin</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="width">
                  <div class="alert alert-primary" v-if="savingSuccessful"> 
                      {{ text }} 
                  </div>
                  <form @submit.prevent="updateData" method="post">
                    <div class="form-group">
                      <input
                        name="title"
                        v-model="product_show.title"
                        type="text"
                        class="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Adı"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        name="account"
                        v-model="product_show.unit"
                        type="text"
                        class="form-control"
                        aria-describedby="nameHelp"
                        placeholder="Ölçü vahidi"
                      />
                    </div>
                    <button type="submit" class="btn btn-primary">Daxil et</button>
                  </form>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nömrəsi</th>
            <th scope="col">Adı</th>
            <th scope="col">Ölçü vahidi</th>
            <th scope="col">Dəyişdir</th>
            <th scope="col">Sil</th>
          </tr>
        </thead>
          <tbody>
            <tr   v-for="product in products" v-bind:key="product.id">
              <td>{{ product.product_number }}</td>
              <td> {{ product.title }}</td>
              <td> {{ product.unit }} </td>
              <td><button v-on:click="showData(product.id)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newModal">Dəyişdir</button></td>
              <td><button v-on:click="getId(product.id)" class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal">Sil</button></td>
            </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { useVuelidate } from '@vuelidate/core'
  import { required, email } from '@vuelidate/validators'
 export default {
  data(){
    return {
      product_id : undefined,
      v$: useVuelidate(),
      products: undefined,
      product_show: {
          title: undefined,
          unit: undefined,
          product_number: undefined,
      },
      post: {
          title: undefined,
          unit: undefined,
      },
      text: "Success",
      savingSuccessful: false
    }
  },
  validations() {
    return {
      post: {
          title: {required},
          unit: {required},
      },
    } 

  },
  methods: {
      getData(){
          axios.get("https://sheet.washing.az/api/products")
          .then((response)=>{
              this.products = response.data
          })
      },
      deleteData(id){
          axios.get("https://sheet.washing.az/api/product_delete/"+id)
          .then(()=>{
              this.getData();
              this.savingSuccessful = true
              setTimeout(() => this.savingSuccessful = false, 2000);
          })
      },
      postData(e){
          this.v$.$validate()
          if(!this.v$.$error){
          axios.post("https://sheet.washing.az/api/product_store", this.post)
          .then((response)=>{
                this.getData();
                this.post.title = ""
                this.post.unit = ""
                this.savingSuccessful = true
                setTimeout(() => this.savingSuccessful = false, 2000);
          })
        }else{
          alert("Fill all inputs")
        }
          e.preventDefault() 
      },
      showData(id){
        axios.get("https://sheet.washing.az/api/product_show/"+id)
        .then((response)=>{
          this.product_show.id = response.data.id
          this.product_show.title = response.data.title
          this.product_show.unit = response.data.unit
        })
      },
      updateData(){
        axios.post("https://sheet.washing.az/api/product_update/"+this.product_show.id, this.product_show)
        .then((response)=>{
          this.savingSuccessful = true
          setTimeout(() => this.savingSuccessful = false, 2000);
          this.getData();
        })
      },
      getId(id){
        this.product_id = id
      }  
  },
  mounted(){
      this.getData()
  }
 }

</script>