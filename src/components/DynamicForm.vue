<template>
  <div id="app">
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
            <select @change="getUnit($event)" name="" id="" v-model="itemName">
              <option v-for="products in product_list" v-bind:key="products.id" >{{ products.title }}</option>
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
    
    <div v-if="productItems && productItems.length">
      <table>
        <tr>
          <th>Məhsul</th>
          <th>Ölçü vahidi</th>
          <th>Miqdarı</th>
          <th>Qiyməti</th>
          <th>Ümumi</th>
          <th>Action</th>
        </tr>
        <tr v-for="(product, i) in productItems" :key="i">
          <td>
            <!-- <input type="text" placeholder="Məhsul" v-model="product.name" /> -->
            <select @change="getUnitFor($event, product)"  name="" id="" :value="product.name">
              <option  v-for="products in product_list" v-bind:key="products.id" >{{ products.title }}</option>
            </select>
          </td>
          <td>
            <input type="text" placeholder="Ölçü vahidi" v-model="product.measure" />
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
  </div>
  <br>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      itemName: null,
      itemMeasure: null,
      itemQuantity: 0,
      itemPrice: 0,
      itemAmount: 0,
      productItems: [],
      totalItemsAmount: 0,
      product_list: undefined
    };
  },
  methods: {
    addNewProduct() {
      this.itemName &&
      this.itemMeasure &&
        this.itemQuantity &&
        this.itemPrice &&
        this.productItems.push({
          name: this.itemName,
          quantity: this.itemQuantity,
          price: this.itemPrice,
          measure: this.itemMeasure,
          amount:
            parseFloat(Number(this.itemQuantity)) *
            parseFloat(Number(this.itemPrice)),
        });
      this.itemName = null;
      this.itemMeasure = null;
      this.itemQuantity = this.itemPrice = 0;
      this.updateTotalAmount();
    },
    updateProductItem(product) {
      product.amount = product.quantity * product.price;
      this.updateTotalAmount();
      
    },
    
    updateTotalAmount() {
      this.totalItemsAmount = 0;
      this.productItems.forEach((item) => {
        this.totalItemsAmount += item.amount;
      });
    },

    removeProductAt(productIndex) {
      this.productItems = this.productItems.filter((p, i) => {
        return i !== productIndex;
      });
      this.updateTotalAmount();
    },

    getProducts() {
      axios.get("https://sheet.washing.az/api/products").then((response) => {
        this.product_list = response.data;
      });
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
    this.getProducts();
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
input {
  border: 1px solid #a389ad;
  font-size: 14px;
  padding: 4px 8px;
  outline: none;
  border-radius: 4px;
  transition: all 0.3s;
}
/* input:hover {
  border: 1px solid #a389ad;
  font-size: 14px;
  padding: 4px 8px;
  outline: none;
  border-radius: 4px;
  transition: all 0.3s;
} */
select {
  border: 1px solid #a389ad;
  font-size: 14px;
  padding: 4px 8px;
  outline: none;
  border-radius: 4px;
  transition: all 0.3s;
}
/* select:hover {
  border: 1px solid #a389ad;
  font-size: 14px;
  padding: 4px 8px;
  outline: none;
  border-radius: 4px;
  transition: all 0.3s;
} */
table {
  margin-top: 25px;
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td,
th {
  border: 1px solid #a389ad;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #e6d7ec;
}
.np-new-item-desc {
  margin-top: 20px;
  padding: 4px;
  border: 1px solid #e6d7ec;
  /* max-width: 720px; */
}
.np-new-item-head {
  padding: 8px 0px 12px 0px;
}
.np-add-item-btn {
  width: 80px;
  background: #7a3097;
  text-align: center;
  color: #ffffff;
  padding: 4px;
  font-size: 14px;
  border-radius: 4px;
  margin: 12px 0px 8px 0px;
  cursor: pointer;
}
.np-items-total {
  margin-top: 12px;
  font-weight: 600;
}
.np-remove-btn {
  cursor: pointer;
  color: #6b0f0f;
}
.np-credits {
  font-size: 12px;
  margin-top: 12px;
}
</style>
