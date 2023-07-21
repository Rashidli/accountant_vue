<template>
  
    <div  class="about">
      <div class="container">
        <h3>Quotationlar</h3><hr>
        <router-link to="/add-quotation" class="btn btn-primary">+</router-link>
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="deleteModalLabel">Məlumatı sil</h1>
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
                <button type="submit" class="btn btn-danger" v-on:click="deleteData(quotation_id)" data-bs-dismiss="modal" aria-label="Close">Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Yeni quotation əlavə edin</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="width">
                    <div class="alert alert-primary" v-if="savingSuccessful"> 
                        {{ this.text }}
                    </div>
                    
                  <form @submit.prevent="postData" method="post">
                    <div class="form-group">
                        <label for="company">Müəssisə seçin</label>
                        <select name="company"
                          v-model="post.company_name"
                          class="form-control">
                          <option v-for="company in companies" v-bind:key="company.id" :value="company.title">{{ company.title }}</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="contract_name">Müqavilə adı</label>
                        <input
                          name="contract_name"
                          v-model="post.contract_name"
                          type="text"
                          class="form-control"
                          placeholder="Müqavilə adı"
                        />
                      </div>
                      <div class="form-group">
                        <label for="time">Tarixi</label>
                        <input
                          name="time"
                          v-model="post.time"
                          type="date"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="Tarixi"
                        />
                      </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
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
                <h1 class="modal-title fs-5" id="newModalLabel">Dəyişdirin</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="width">
                    <div class="alert alert-primary" v-if="savingSuccessful"> 
                        {{ text }} 
                    </div>
                    <form @submit.prevent="updateData" method="post">
                        <div class="form-group">
                        <label for="company">Müəssisə seçin</label>
                        <select name="company_name"
                          v-model="quotation_show.company_name"
                          class="form-control"
                          placeholder="Müəssisə">
                          <option placeholder="Müəssisə" v-for="company in companies" v-bind:key="company.id" :value="company.title">{{ company.title }}</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="contract_name">Müqavilə adı</label>
                        <input
                          name="contract_name"
                          v-model="quotation_show.contract_name"
                          type="text"
                          class="form-control"
                          placeholder="Müqavilə adı"
                        />
                      </div>
                      <div class="form-group">
                        <label for="end_date">Tarixi</label>
                        <input
                          name="time"
                          v-model="quotation_show.time"
                          type="date"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="Tarixi"
                        />
                      </div>
                      <button type="submit" class="btn btn-primary">Submit</button>
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
              <th scope="col">ID</th>
              <th scope="col">Nömrəsi</th>
              <th scope="col">Müəssisə adı</th>
              <th scope="col">Müqavilə adı</th>
              <th scope="col">Tarix</th>
              <th scope="col">Məbləğ</th>
              <th scope="col">Göstər</th>
              <th scope="col">Dəyişdir</th>
              <th scope="col">Sil</th>
            </tr>
          </thead>
            <tbody>
              <tr   v-for="quotation in quotations" v-bind:key="quotation.id">
                <td>{{ quotation.id }}</td>
                <td> {{ quotation.quotation_number }}</td>
                <td> {{ quotation.company_name }} </td>
                <td> {{ quotation.contract_name }} </td>
                <td> {{ quotation.time }} </td>
                <td> {{ quotation.total_price }}₼ </td>
                <td><router-link :to="'/show-quotation/'+ quotation.id" class="btn btn-primary">Göstər</router-link></td>
                <!-- <td><button v-on:click="passId(quotation.id)" class="btn btn-primary" >Göstər</button></td> -->
                <td><button v-on:click="showData(quotation.id)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newModal">Dəyişdir</button></td>
                <td><button v-on:click="getId(quotation.id)" class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal">Sil</button></td>
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
        quotation_id : undefined,
        v$: useVuelidate(),
        companies: undefined,
        quotations: undefined,
        quotation_show: {
            company_name: undefined,
            contract_name: undefined,
            time: undefined,
        },
        post: {
            company_name: undefined,
            contract_name: undefined,
            time: undefined,
        },
        text: "Success",
        savingSuccessful: false
      }
    },
    validations() {
      return {
        post: {
            company_name: {required},
            contract_name: {required},
            time: {required},
        },
      } 

    },
    methods: {

        getCompanies(){
            axios.get("https://sheet.washing.az/api/institutions")
            .then((response)=>{
              
                this.companies = response.data
                
            })
        },

        getData(){
            axios.get("https://sheet.washing.az/api/quotations")
            .then((response)=>{
                
                this.quotations = response.data
                
            })
        },

        deleteData(id){
            axios.get("https://sheet.washing.az/api/quotation_delete/"+id)
            .then(()=>{
                this.getData();
                this.savingSuccessful = true
                setTimeout(() => this.savingSuccessful = false, 2000);
            })
        },

        postData(e){
            this.v$.$validate()
            console.log(this.post);
            if(!this.v$.$error){
            axios.post("https://sheet.washing.az/api/quotation_store", this.post)
            .then((response)=>{
                  this.getData();
                  this.post.company_name = '',
                  this.post.contract_name = '',
                  this.post.time = '',
                  this.savingSuccessful = true
                  setTimeout(() => this.savingSuccessful = false, 2000);
            })
          }else{
            alert("Fill all inputs")
          }
            e.preventDefault() 
        },

        showData(id){
          axios.get("https://sheet.washing.az/api/quotation_show/"+id)
          .then((response)=>{
            console.log(response)
            this.quotation_show.id = response.data.id
            this.quotation_show.company_name = response.data.company_name
            this.quotation_show.contract_name = response.data.contract_name
            this.quotation_show.time = response.data.time
          })
        },

        updateData(){
          axios.post("https://sheet.washing.az/api/quotation_update/"+this.quotation_show.id, this.quotation_show)
          .then((response)=>{
            this.savingSuccessful = true
            setTimeout(() => this.savingSuccessful = false, 2000);
            this.getData();
          })
        },

        getId(id){
          this.quotation_id = id
        }
        
    },
    mounted(){
        this.getData()
        this.getCompanies()
    }
   }
  
  </script>