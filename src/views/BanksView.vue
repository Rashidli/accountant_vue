<template>
    <div class="about">
      <div class="container">
        <h3>Banklar</h3><hr>
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
                <button data-bs-dismiss="modal" aria-label="Close" type="submit" class="btn btn-danger" v-on:click="deleteData(bank_id)">Delete</button>
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
                <h1 class="modal-title fs-5" id="exampleModalLabel">Yeni bank əlavə edin</h1>
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
                        @input="v$.post.title.$touch()"
                        name="title"
                        v-model="post.title"
                        type="text"
                        class="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Adı"
                      />
                      <div v-if="v$.post.title.$invalid">
                        <span  v-for="error in v$.post.title.$errors" :key="error.$uid" class="text-danger">{{ error.$message }}</span>
                      </div>
                      
                    </div>
                    <div class="form-group">
                      <input
                        name="account"
                        v-model="post.account"
                        type="text"
                        class="form-control"
                        aria-describedby="nameHelp"
                        placeholder="Hesab"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        name="swift"
                        v-model="post.swift"
                        type="text"
                        class="form-control"
                        placeholder="Swift"
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
                        <input
                          name="title"
                          v-model="bank_show.title"
                          type="text"
                          class="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Adı"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          name="account"
                          v-model="bank_show.account"
                          type="text"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="Hesab"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          name="swift"
                          v-model="bank_show.swift"
                          type="text"
                          class="form-control"
                          placeholder="Swift"
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
              <th scope="col">Adı</th>
              <th scope="col">Hesab</th>
              <th scope="col">Swift</th>
              <th scope="col">Dəyişdir</th>
              <th scope="col">Sil</th>
            </tr>
          </thead>
            <tbody>
              <tr   v-for="bank in banks" v-bind:key="bank.id">
                <td>{{ bank.id }}</td>
                <td> {{ bank.title }}</td>
                <td> {{ bank.account }} </td>
                <td>{{ bank.swift }} </td>
                <td><button v-on:click="showData(bank.id)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newModal">Dəyişdir</button></td>
                <td><button v-on:click="getId(bank.id)" class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal">Sil</button></td>
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
        v$: useVuelidate(),
        bank_id : undefined,
        banks: undefined,
        bank_show: {
            title: undefined,
            account: undefined,
            swift: undefined
        },
        post: {
            title: undefined,
            account: undefined,
            swift: undefined
        },
        text: "Success",
        savingSuccessful: false
      }
    },
    validations() {
      return {
        post: {
            title: {
              required
            },
            account: {required},
            swift: {required}
        },
      } 

    },
    methods: {
        getData(){
            axios.get("https://sheet.washing.az/api/banks")
            .then((response)=>{
                this.banks = response.data
            })
        },
        deleteData(id){
            axios.get("https://sheet.washing.az/api/bank_delete/"+id)
            .then(()=>{
                this.getData();
                this.savingSuccessful = true
                setTimeout(() => this.savingSuccessful = false, 2000);
            })
        },
        postData(e){
          this.v$.$touch()
            if(!this.v$.$error){
                axios.post("https://sheet.washing.az/api/bank_store", this.post)
                .then((response)=>{
                    this.getData();
                    this.post.title = ""
                    this.post.account = ""
                    this.post.swift = ""
                    this.savingSuccessful = true
                    setTimeout(() => this.savingSuccessful = false, 2000);
              })
            }
            e.preventDefault() 
        },
        showData(id){
          axios.get("https://sheet.washing.az/api/bank_show/"+id)
          .then((response)=>{
            this.bank_show.id = response.data.id
            this.bank_show.title = response.data.title
            this.bank_show.account = response.data.account
            this.bank_show.swift = response.data.swift
          })
        },
        updateData(){
          axios.post("https://sheet.washing.az/api/bank_update/"+this.bank_show.id, this.bank_show)
          .then((response)=>{
            this.savingSuccessful = true
            setTimeout(() => this.savingSuccessful = false, 2000);
            this.getData();
          })
        },
        getId(id){
          this.bank_id = id
        }
        
    },
    mounted(){
        this.getData()
    }
   }
  
  </script>