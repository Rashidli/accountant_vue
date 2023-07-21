<template>
  <div class="about">
    <div class="container">
      <h3>incomelar</h3>
      <hr />
      <router-link to="/add-income" class="btn btn-primary">+</router-link>
      <div
        class="modal fade"
        id="deleteModal"
        tabindex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="deleteModalLabel">
                Məlumatı sil
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
              <button
                type="submit"
                class="btn btn-danger"
                v-on:click="deleteData(income_id)"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="newModal"
        tabindex="-1"
        aria-labelledby="newModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="newModalLabel">Dəyişdirin</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="width">
                <div class="alert alert-primary" v-if="savingSuccessful">
                  {{ text }}
                </div>
                <form @submit.prevent="updateData" method="post">
                  <div class="form-group">
                    <label for="company">Anbar seçin</label>
                    <select
                      name="company_name"
                      v-model="income_show.warehouse_name"
                      class="form-control"
                      placeholder="Anbar"
                    >
                      <option
                        placeholder="Anbar"
                        v-for="warehouse in warehouses"
                        v-bind:key="warehouse.id"
                        :value="warehouse.title"
                      >
                        {{ warehouse.title }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="sent_number">PO nömrəsi</label>
                    <select
                      name="sent_number"
                      v-model="income_show.sent_number"
                      class="form-control"
                      placeholder="po nömrəsi"
                    >
                      <option
                        placeholder="Müəssisə"
                        v-for="po in sents_list"
                        v-bind:key="po.id"
                        :value="po.sent_number"
                      >
                        {{ po.sent_number }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="time">Məbləğ</label>
                    <input
                      name="time"
                      v-model="income_show.total_price"
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
            <th scope="col">Anbar adı</th>
            <th scope="col">PO nömrəsi</th>
            <th scope="col">Məbləğ</th>
            <th scope="col">Göstər</th>
            <th scope="col">Dəyişdir</th>
            <th scope="col">Sil</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="income in incomes" v-bind:key="income.id">
            <td>{{ income.id }}</td>
            <td>{{ income.income_number }}</td>
            <td>{{ income.warehouse_name }}</td>
            <td>{{ income.po_number }}</td>
            <td>{{ income.total_price }}₼</td>
            <td>
              <router-link
                :to="'/show-income/' + income.id"
                class="btn btn-primary"
                >Göstər</router-link
              >
            </td>
            <!-- <td><button v-on:click="passId(income.id)" class="btn btn-primary" >Göstər</button></td> -->
            <td>
              <button
                v-on:click="showData(income.id)"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#newModal"
              >
                Dəyişdir
              </button>
            </td>
            <td>
              <button
                v-on:click="getId(income.id)"
                class="btn btn-danger"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
              >
                Sil
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  data() {
    return {
      income_id: undefined,
      v$: useVuelidate(),
      warehouses: undefined,
      sents_list: undefined,
      incomes: undefined,
      income_show: {
        warehouse_name: undefined,
        sent_number: undefined,
        total_price: undefined,
      },
      post: {
        warehouse_name: undefined,
        sent_number: undefined,
        total_price: undefined,
      },
      text: "Success",
      savingSuccessful: false,
    };
  },
  validations() {
    return {
      post: {
        warehouse_name: { required },
        sent_number: { required },
      },
    };
  },
  methods: {
    getSents() {
      axios.get("https://sheet.washing.az/api/sents").then((response) => {
        this.sents_list = response.data;
      });
    },
    getWarehouses() {
      axios.get("https://sheet.washing.az/api/warehouses").then((response) => {
        this.warehouses = response.data;
      });
    },

    getData() {
      axios.get("https://sheet.washing.az/api/incomes").then((response) => {
        this.incomes = response.data;
      });
    },

    deleteData(id) {
      axios.get("https://sheet.washing.az/api/income_delete/" + id).then(() => {
        this.getData();
        this.savingSuccessful = true;
        setTimeout(() => (this.savingSuccessful = false), 2000);
      });
    },

    postData(e) {
      this.v$.$validate();
      console.log(this.post);
      if (!this.v$.$error) {
        axios
          .post("https://sheet.washing.az/api/income_store", this.post)
          .then((response) => {
            this.getData();
            (this.post.warehouse_name = ""),
              (this.post.sent_number = ""),
              (this.savingSuccessful = true);
            setTimeout(() => (this.savingSuccessful = false), 2000);
          });
      } else {
        alert("Fill all inputs");
      }
      e.preventDefault();
    },

    showData(id) {
      axios
        .get("https://sheet.washing.az/api/income_show/" + id)
        .then((response) => {
          console.log(response);
          this.income_show.id = response.data.id;
          this.income_show.warehouse_name = response.data.warehouse_name;
          this.income_show.sent_number = response.data.po_number;
          this.income_show.total_price = response.data.total_price;
        });
    },

    updateData() {
      axios
        .post(
          "https://sheet.washing.az/api/income_update/" + this.income_show.id,
          this.income_show
        )
        .then((response) => {
          this.savingSuccessful = true;
          setTimeout(() => (this.savingSuccessful = false), 2000);
          this.getData();
        });
    },

    getId(id) {
      this.income_id = id;
    },
    
  },
  mounted() {
    this.getData();
    this.getWarehouses();
    this.getSents();
  },
};
</script>