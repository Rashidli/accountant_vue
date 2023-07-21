<template>
  
    <div  class="about">
      <div class="container">
        <h3>sentlar</h3><hr>
        <router-link to="/add-sent" class="btn btn-primary">+</router-link>
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
                <button type="submit" class="btn btn-danger" v-on:click="deleteData(sent_id)" data-bs-dismiss="modal" aria-label="Close">Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Yeni sent əlavə edin</h1>
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
                        <label for="quotation_number">Quotation nömrəsi</label>
                        <input
                          name="quotation_number"
                          v-model="post.quotation_number"
                          type="text"
                          class="form-control"
                          placeholder="Quotation nömrəsi"
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
                      <div class="form-group">
                        <label for="time">Məbləğ</label>
                        <input
                          name="time"
                          v-model="post.total_price"
                          type="text"
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
                          v-model="sent_show.company_name"
                          class="form-control"
                          placeholder="Müəssisə">
                          <option placeholder="Müəssisə" v-for="company in companies" v-bind:key="company.id" :value="company.title">{{ company.title }}</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="quotation_number">Quotation nömrəsi</label>
                        <select name="quotation_number"
                          v-model="sent_show.quotation_number"
                          class="form-control"
                          placeholder="Quotation nömrəsi">
                          <option placeholder="Müəssisə" v-for="quotation in quotations_list" v-bind:key="quotation.id" :value="quotation.quotation_number">{{ quotation.quotation_number }}</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="end_date">Tarixi</label>
                        <input
                          name="time"
                          v-model="sent_show.time"
                          type="date"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="Tarixi"
                        />
                      </div>
                      <div class="form-group">
                        <label for="time">Məbləğ</label>
                        <input
                          name="time"
                          v-model="sent_show.total_price"
                          type="text"
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
              <th scope="col">Quotation nömrəsi</th>
              <th scope="col">Tarix</th>
              <th scope="col">Məbləğ</th>
              <th scope="col">Göstər</th>
              <th scope="col">Dəyişdir</th>
              <th scope="col">Sil</th>
            </tr>
          </thead>
            <tbody>
              <tr   v-for="sent in sents" v-bind:key="sent.id">
                <td>{{ sent.id }}</td>
                <td> {{ sent.sent_number }}</td>
                <td> {{ sent.company_name }} </td>
                <td> {{ sent.quotation_number }} </td>
                <td> {{ sent.time }} </td>
                <td> {{ sent.total_price }}₼ </td>
                <td><router-link :to="'/show-sent/'+ sent.id" class="btn btn-primary">Göstər</router-link></td>
                <!-- <td><button v-on:click="passId(sent.id)" class="btn btn-primary" >Göstər</button></td> -->
                <td><button v-on:click="showData(sent.id)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newModal">Dəyişdir</button></td>
                <td><button v-on:click="getId(sent.id)" class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal">Sil</button></td>
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
        sent_id : undefined,
        v$: useVuelidate(),
        companies: undefined,
        quotations_list: undefined,
        sents: undefined,
        sent_show: {
            company_name: undefined,
            quotation_number: undefined,
            time: undefined,
            total_price: undefined
        },
        post: {
            company_name: undefined,
            quotation_number: undefined,
            time: undefined,
            total_price: undefined
        },
        text: "Success",
        savingSuccessful: false
      }
    },
    validations() {
      return {
        post: {
            company_name: {required},
            quotation_number: {required},
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
            axios.get("https://sheet.washing.az/api/sents")
            .then((response)=>{
                
                this.sents = response.data
                
            })
        },

        deleteData(id){
            axios.get("https://sheet.washing.az/api/sent_delete/"+id)
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
            axios.post("https://sheet.washing.az/api/sent_store", this.post)
            .then((response)=>{
                  this.getData();
                  this.post.company_name = '',
                  this.post.quotation_number = '',
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
          axios.get("https://sheet.washing.az/api/sent_show/"+id)
          .then((response)=>{
            console.log(response)
            this.sent_show.id = response.data.id
            this.sent_show.company_name = response.data.company_name
            this.sent_show.quotation_number = response.data.quotation_number
            this.sent_show.time = response.data.time
            this.sent_show.total_price = response.data.total_price
          })
        },

        updateData(){
          axios.post("https://sheet.washing.az/api/sent_update/"+this.sent_show.id, this.sent_show)
          .then((response)=>{
            this.savingSuccessful = true
            setTimeout(() => this.savingSuccessful = false, 2000);
            this.getData();
          })
        },

        getId(id){
          this.sent_id = id
        },
        getQuotations(){
            axios.get("https://sheet.washing.az/api/quotations")
            .then((response)=>{
                this.quotations_list = response.data
            })
        }
        
    },
    mounted(){
        this.getData()
        this.getCompanies()
        this.getQuotations()
    }
   }
  
  </script>