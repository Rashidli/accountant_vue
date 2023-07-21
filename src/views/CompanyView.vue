<template>
    <div class="about">
      <div class="container">
        <h3>Müəssisələr</h3><hr>
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
                <button data-bs-dismiss="modal" aria-label="Close" type="submit" class="btn btn-danger" v-on:click="deleteData(institution_id)">Delete</button>
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
                <h1 class="modal-title fs-5" id="exampleModalLabel">Yeni institution əlavə edin</h1>
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
                          name="voen"
                          v-model="post.voen"
                          type="text"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="VÖEN"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          name="bank_account_number"
                          v-model="post.bank_account_number"
                          type="text"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="Bank hesab nömrəsi"
                        />
                      </div>
                      
                      <div class="form-group">
                        <input
                          name="bank_code"
                          v-model="post.bank_code"
                          type="text"
                          class="form-control"
                          placeholder="Bank kodu"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          name="bank_voen"
                          v-model="post.bank_voen"
                          type="text"
                          class="form-control"
                          placeholder="Bank VÖEN"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          name="swift"
                          v-model="post.swift"
                          type="text"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="SWIFT"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          name="correspondent_account"
                          v-model="post.correspondent_account"
                          type="text"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="Müxbir hesab"
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
                          v-model="institution_show.title"
                          type="text"
                          class="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Adı"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          name="voen"
                          v-model="institution_show.voen"
                          type="text"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="VÖEN"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          name="bank_account_number"
                          v-model="institution_show.bank_account_number"
                          type="text"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="Bank hesab nömrəsi"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          name="bank_code"
                          v-model="institution_show.bank_code"
                          type="text"
                          class="form-control"
                          placeholder="Bank kodu"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          name="bank_voen"
                          v-model="institution_show.bank_voen"
                          type="text"
                          class="form-control"
                          placeholder="Bank VÖEN"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          name="swift"
                          v-model="institution_show.swift"
                          type="text"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="SWIFT"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          name="correspondent_account"
                          v-model="institution_show.correspondent_account"
                          type="text"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="Müxbir hesab"
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
              <th scope="col">VÖEN</th>
              <th scope="col">Bank hesab nömrəsi</th>
              <th scope="col">Bank kodu</th>
              <th scope="col">Bank VÖEN</th>
              <th scope="col">Swift</th>
              <th scope="col">Mwxbir hesab</th>
              <th scope="col">Dəyişdir</th>
              <th scope="col">Sil</th>
            </tr>
          </thead>
            <tbody>
              <tr   v-for="institution in institutions" v-bind:key="institution.id">
                <td>{{ institution.id }}</td>
                <td> {{ institution.title }}</td>
                <td> {{ institution.voen }} </td>
                <td> {{ institution.bank_account_number }} </td>
                <td> {{ institution.bank_code }} </td>
                <td> {{ institution.bank_voen }} </td>
                <td>{{ institution.swift }} </td>
                <td> {{ institution.correspondent_account }} </td>
                <td><button v-on:click="showData(institution.id)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newModal">Dəyişdir</button></td>
                <td><button v-on:click="getId(institution.id)" class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal">Sil</button></td>
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
        institution_id : undefined,
        v$: useVuelidate(),
        institutions: undefined,
        institution_show: {
            title: undefined,
            voen: undefined,
            bank_account_number: undefined,
            bank_code: undefined,
            bank_voen: undefined,
            swift: undefined,
            correspondent_account: undefined
        },
        post: {
            title: undefined,
            voen: undefined,
            bank_account_number: undefined,
            bank_code: undefined,
            bank_voen: undefined,
            swift: undefined,
            correspondent_account: undefined
        },
        text: "Success",
        savingSuccessful: false
      }
    },
    validations() {
      return {
        post: {
            title: {required},
            voen: {required},
            bank_account_number: {required},
            bank_code: {required},
            bank_voen: {required},
            swift: {required},
            correspondent_account: {required}
        },
      } 

    },
    methods: {
        getData(){
            axios.get("https://sheet.washing.az/api/institutions")
            .then((response)=>{
                this.institutions = response.data
            })
        },
        deleteData(id){
            axios.get("https://sheet.washing.az/api/institution_delete/"+id)
            .then(()=>{
                this.getData();
                this.savingSuccessful = true
                setTimeout(() => this.savingSuccessful = false, 2000);
            })
        },
        postData(e){
            this.v$.$validate()
            if(!this.v$.$error){
            axios.post("https://sheet.washing.az/api/institution_store", this.post)
            .then((response)=>{
                  this.getData();
                  this.post.title = '',
                  this.post.voen = '',
                  this.post.bank_account_number = '',
                  this.post.bank_code = '',
                  this.post.bank_voen = '',
                  this.post.swift = '',
                  this.post.correspondent_account = '',
                  this.savingSuccessful = true
                  setTimeout(() => this.savingSuccessful = false, 2000);
            })
          }else{
            alert("Fill all inputs")
          }
            e.preventDefault() 
        },
        showData(id){
          axios.get("https://sheet.washing.az/api/institution_show/"+id)
          .then((response)=>{
            this.institution_show.id = response.data.id,
            this.institution_show.title = response.data.title,
            this.institution_show.voen = response.data.voen,
            this.institution_show.bank_account_number = response.data.bank_account_number,
            this.institution_show.bank_code = response.data.bank_code,
            this.institution_show.bank_voen = response.data.bank_voen,
            this.institution_show.swift = response.data.swift,
            this.institution_show.correspondent_account = response.data.correspondent_account    
          })
        },
        updateData(){
          axios.post("https://sheet.washing.az/api/institution_update/"+this.institution_show.id, this.institution_show)
          .then((response)=>{
            this.savingSuccessful = true
            setTimeout(() => this.savingSuccessful = false, 2000);
            this.getData();
          })
        },
        getId(id){
          this.institution_id = id
        }
        
    },
    mounted(){
        this.getData()
    }
   }
  
  </script>