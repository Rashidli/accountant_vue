<template>
  <div class="about">
    <div class="container">
      <h3>Dəyişdir</h3>
      <hr />
      <form @submit.prevent="updateData" method="post">
        <div class="width">
        <div class="alert alert-primary" v-if="savingSuccessful">
          {{ this.text }}
        </div>

        
        <div class="form-group">
            <label for="company">Müəssisə seçin</label>
            <select
              name="company"
              v-model="quotation_show.company_name"
              class="form-control"
            >
              <option
                v-for="company in companies"
                v-bind:key="company.id"
                :value="company.title"
              >
                {{ company.title }}
              </option>
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
            <label for="time">Tarixi</label>
            <input
              name="time"
              v-model="quotation_show.time"
              type="date"
              class="form-control"
              aria-describedby="nameHelp"
              placeholder="Tarixi"
            />
          </div>
          <div class="form-group">
            <label for="time">Ümumi məbləğ</label>
            <input
              name="time"
              v-model="quotation_show.total_price"
              type="text"
              class="form-control"
              aria-describedby="nameHelp"
              placeholder="Tarixi"
            />
          </div>
          
        <hr />
      </div>

      <div class="np-new-item-desc">
        <div class="np-new-item-head"><strong>Məhsul əlavə et</strong></div>
        <table>
          <tr>
            <th>Məhsul</th>
            <th>Ölçü vahidi</th>
            <th>Miqdarı</th>
            <th>Qiyməti</th>
            <th>Ümumi</th>
          </tr>
          <tr>
            <td>
              <select name="" id="" v-model="itemName" @change=getUnit($event)>
                <option
                  v-for="products in product_list"
                  v-bind:key="products.id"
                >
                  {{ products.title }}
                </option>
              </select>
            </td>
            <td>
              <input
                type="text"
                placeholder="Ölçü vahidi"
                v-model.number="itemMeasure"
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Miqadrı"
                v-model.number="itemQuantity"
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Qiymət"
                v-model.number="itemPrice"
              />
            </td>
            <td>₼{{ itemQuantity * itemPrice }}</td>
          </tr>
        </table>
        <div @click="addNewProduct()" class="np-add-item-btn">Əlavə et</div>
      </div>

      <div v-if="quotation_show.productItems && quotation_show.productItems.length">
        <table>
          <tr>
            <th>Məhsul</th>
            <th>Ölçü vahidi</th>
            <th>Miqdarı</th>
            <th>Qiyməti</th>
            <th>Ümumi</th>
            <th>Action</th>
          </tr>
          <tr v-for="(product, i) in quotation_show.productItems" :key="i">
            <td>
              <select :value="product.name" @change="getUnitFor($event, product)">
              <option  v-for="products in product_list" v-bind:key="products.id" >{{ products.title }}</option>
            </select>
            </td>
            <td>
              <input
                type="text"
                placeholder="Ölçü vahidi"
                v-model="product.measure"
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Miqdar"
                v-model.number="product.quantity"
                @change="updateProductItem(product)"
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Qiymət"
                v-model.number="product.price"
                @change="updateProductItem(product)"
              />
            </td>
            <td>₼{{ product.amount }}</td>
            <td @click="removeProductAt(i)" class="np-remove-btn">Sil</td>
          </tr>
        </table>
        <div class="np-items-total">
          Ümumi məbləğ: <strong>₼{{ totalItemsAmount }}</strong>
        </div>
      </div>
      <br>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
      
      <br>
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
      product_list: undefined,
      quotation_id: undefined,
      v$: useVuelidate(),
      companies: undefined,
      quotations: undefined,
      quotation_show: {
        company_name: undefined,
        contract_name: undefined,
        total_price: undefined,
        time: undefined,
        productItems: [],
      },
      

      products: "",
      text: "Success",
      savingSuccessful: false,

      //dynamic form data

      itemName: null,
      itemMeasure: null,
      itemQuantity: 0,
      itemPrice: 0,
      itemAmount: 0,
      totalItemsAmount: 0,
      product_list: undefined

    };
  },
  validations() {
    return {
      post: {
        company_name: { required },
        contract_name: { required },
        time: { required },
      },
    };
  },
  methods: {
    getCompanies() {
      axios
        .get("https://sheet.washing.az/api/institutions")
        .then((response) => {
          this.companies = response.data;
        });
    },
    getProducts() {
      axios.get("https://sheet.washing.az/api/products").then((response) => {
        this.product_list = response.data;
      });
    },
    showData() {
      axios
        .get(
          "https://sheet.washing.az/api/quotation_show/" + this.$route.params.id
        )
        .then((response) => {

          this.quotation_show.quotation_number = response.data.quotation_number;
          this.quotation_show.company_name = response.data.company_name;
          this.quotation_show.contract_name = response.data.contract_name;
          this.quotation_show.time = response.data.time;
          this.quotation_show.productItems = response.data.quotation_products;
          this.totalItemsAmount = response.data.total_price;
          this.quotation_show.total_price = response.data.total_price;

        });
    },
    updateData() {
        this.quotation_show.total_price = this.totalItemsAmount
      axios
        .post(
          "https://sheet.washing.az/api/quotation_update/" + this.$route.params.id, this.quotation_show
        )
        .then((response) => {
          this.savingSuccessful = true;
          setTimeout(() => (this.savingSuccessful = false), 2000);
          
        });
    },
    getId(id) {
      this.quotation_id = id;
    },


    // dynamic form methods

    addNewProduct() {
      this.itemName &&
      this.itemMeasure &&
        this.itemQuantity &&
        this.itemPrice &&
        this.quotation_show.productItems.push({
          name: this.itemName,
          quantity: this.itemQuantity,
          price: this.itemPrice,
          measure: this.itemMeasure,
          amount:
            parseFloat(Number(this.itemQuantity)) *
            parseFloat(Number(this.itemPrice)),
        });
      this.itemName = null;
      this.itemQuantity = this.itemPrice = 0;
      this.updateTotalAmount();
    },

    updateProductItem(product) {
      product.amount = product.quantity * product.price;
      this.updateTotalAmount();
      
    },

    updateTotalAmount() {
      this.totalItemsAmount = 0;
    
      this.quotation_show.productItems.forEach((item) => {
        
        this.totalItemsAmount = this.totalItemsAmount + item.amount;

      });
      
    },

    removeProductAt(productIndex) {
      this.quotation_show.productItems = this.quotation_show.productItems.filter((p, i) => {
        return i !== productIndex;
      });
      this.updateTotalAmount();
    },
    getUnit(event) {
      
      axios.get("https://sheet.washing.az/api/getUnit/"+event.target.value)
      .then((response)=>{

          this.itemMeasure = response.data.unit
      })
    },

    getUnitFor(event, product){
      
      axios.get("https://sheet.washing.az/api/getUnit/"+event.target.value)
       .then((response)=>{
          product.measure = response.data.unit;
          product.name = response.data.title;
      })
    },

  },
  mounted() {
    this.showData();
    this.getCompanies();
    this.getProducts();
    // this.updateProductItem();
  },
};
</script>
  
  <style>
.for_span {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>