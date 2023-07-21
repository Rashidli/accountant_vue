<template>
    <div class="about">
      <div class="container">
        <h3>Layihələr</h3><hr>
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
                <button type="submit" class="btn btn-danger" v-on:click="deleteData(project_id)" data-bs-dismiss="modal" aria-label="Close">Delete</button>
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
                <h1 class="modal-title fs-5" id="exampleModalLabel">Yeni project əlavə edin</h1>
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
                        <label for="start_date">Başlama tarixi</label>
                        <input
                          name="start_date"
                          v-model="post.start_date"
                          type="date"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="Başlama tarixi"
                        />
                      </div>
                      <div class="form-group">
                        <label for="end_date">Bitmə tarixi</label>
                        <input
                          name="end_date"
                          v-model="post.end_date"
                          type="date"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="Bitmə tarixi"
                        />
                      </div>
                      
                      <div class="form-group">
                        <input
                          name="amount"
                          v-model="post.amount"
                          type="text"
                          class="form-control"
                          placeholder="Qiyməti"
                        />
                      </div>
                      <div class="form-group">
                        <label for="company">Müəssisə seçin</label>
                        <select name="company"
                          v-model="post.company"
                          class="form-control">
                          <option v-for="company in companies" v-bind:key="company.id" :value="company.title">{{ company.title }}</option>
                        </select>
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
                          v-model="project_show.title"
                          type="text"
                          class="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Adı"
                        />
                      </div>
                      <div class="form-group">
                        <label for="start_date">Başlama tarixi</label>
                        <input
                          name="start_date"
                          v-model="project_show.start_date"
                          type="date"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="Başlama tarixi"
                        />
                      </div>
                      <div class="form-group">
                        <label for="end_date">Bitmə tarixi</label>
                        <input
                          name="end_date"
                          v-model="project_show.end_date"
                          type="date"
                          class="form-control"
                          aria-describedby="nameHelp"
                          placeholder="Bitmə tarixi"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          name="amount"
                          v-model="project_show.amount"
                          type="text"
                          class="form-control"
                          placeholder="Qiyməti"
                        />
                      </div>
                      <div class="form-group">
                        <label for="company">Müəssisə seçin</label>
                        <select name="company"
                          v-model="project_show.company"
                          class="form-control"
                          placeholder="Müəssisə">
                          <!-- <option selected disabled value="Müəssisə seçin">Müəssisə seçin</option> -->
                          <option placeholder="Müəssisə" v-for="company in companies" v-bind:key="company.id" :value="company.title">{{ company.title }}</option>
                        </select>
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
              <th scope="col">Başlama tarixi</th>
              <th scope="col">Bitmə tarixi</th>
              <th scope="col">Qiyməti</th>
              <th scope="col">Müəssisə adı</th>
              <th scope="col">Dəyişdir</th>
              <th scope="col">Sil</th>
            </tr>
          </thead>
            <tbody>
              <tr   v-for="project in projects" v-bind:key="project.id">
                <td>{{ project.id }}</td>
                <td> {{ project.title }}</td>
                <td> {{ project.start_date }} </td>
                <td> {{ project.end_date }} </td>
                <td> {{ project.amount }} </td>
                <td> {{ project.company }} </td>
                <td><button v-on:click="showData(project.id)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newModal">Dəyişdir</button></td>
                <td><button v-on:click="getId(project.id)" class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal">Sil</button></td>
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
        project_id : undefined,
        v$: useVuelidate(),
        companies: undefined,
        projects: undefined,
        project_show: {
            title: undefined,
            start_date: undefined,
            end_date: undefined,
            amount: undefined,
            company: undefined,
        },
        post: {
            title: undefined,
            start_date: undefined,
            end_date: undefined,
            amount: undefined,
            company: undefined,
        },
        text: "Success",
        savingSuccessful: false
      }
    },
    validations() {
      return {
        post: {
            title: {required},
            start_date: {required},
            end_date: {required},
            amount: {required},
            company: {required},
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
            axios.get("https://sheet.washing.az/api/projects")
            .then((response)=>{
                
                this.projects = response.data
                
            })
        },
        deleteData(id){
            axios.get("https://sheet.washing.az/api/project_delete/"+id)
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
            axios.post("https://sheet.washing.az/api/project_store", this.post)
            .then((response)=>{
                  this.getData();
                  this.post.title = '',
                  this.post.start_date = '',
                  this.post.end_date = '',
                  this.post.amount = '',
                  this.post.company = '',
                  this.savingSuccessful = true
                  setTimeout(() => this.savingSuccessful = false, 2000);
            })
          }else{
            alert("Fill all inputs")
          }
            e.preventDefault() 
        },
        showData(id){
          axios.get("https://sheet.washing.az/api/project_show/"+id)
          .then((response)=>{
            this.project_show.id = response.data.id,
            this.project_show.title = response.data.title,
            this.project_show.start_date = response.data.start_date,
            this.project_show.end_date = response.data.end_date,
            this.project_show.amount = response.data.amount,
            this.project_show.company = response.data.company
          })
        },
        updateData(){
          axios.post("https://sheet.washing.az/api/project_update/"+this.project_show.id, this.project_show)
          .then((response)=>{
            this.savingSuccessful = true
            setTimeout(() => this.savingSuccessful = false, 2000);
            this.getData();
          })
        },
        getId(id){
          this.project_id = id
        }
        
    },
    mounted(){
        this.getData()
        this.getCompanies()
    }
   }
  
  </script>