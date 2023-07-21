import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Warehouse from "../views/WarehouseView.vue";
import Product from "../views/ProductView.vue";
import Banks from "../views/BanksView.vue";
import Company from "../views/CompanyView.vue";
import Project from "../views/ProjectView.vue";
import Quotation from "../views/QuotationView.vue";
import AddQuotation from "../views/AddQuotationView.vue";
import QuotationShow from "../views/QuotationShowView.vue";
import QuotationEdit from "../views/QuotationEditView.vue";
import Sent from "../views/SentView.vue";
import AddSent from "../views/AddSentView.vue";
import SentShow from "../views/SentShowView.vue";
import SentEdit from "../views/SentEditView.vue";
import Income from "../views/IncomeView.vue";
import AddIncome from "../views/AddIncomeView.vue";
import IncomeShow from "../views/IncomeShowView.vue";
import IncomeEdit from "../views/IncomeEditView.vue";
import Expense from "../views/ExpenseView.vue";
import AddExpense from "../views/AddExpenseView.vue";
import ExpenseShow from "../views/ExpenseShowView.vue";
import ExpenseEdit from "../views/ExpenseEditView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/anbarlar", name: "anbarlar", component: Warehouse },
  { path: "/məhsullar", name: "məhsullar", component: Product },
  { path: "/banklar", name: "banklar", component: Banks },
  { path: "/company", name: "company", component: Company },
  { path: "/layiheler", name: "layiheler", component: Project },
  { path: "/quotation", name: "quotation", component: Quotation },
  { path: "/add-quotation", name: "add-quotation", component: AddQuotation },
  { path: "/show-quotation/:id", name: "show-quotation", component: QuotationShow },
  { path: "/edit-quotation/:id", name: "edit-quotation", component: QuotationEdit },
  { path: "/sent", name: "sent-po", component: Sent },
  { path: "/add-sent", name: "add-sent", component: AddSent },
  { path: "/show-sent/:id", name: "show-sent", component: SentShow },
  { path: "/edit-sent/:id", name: "edit-sent", component: SentEdit },
  { path: "/income", name: "income", component: Income },
  { path: "/add-income", name: "add-income", component: AddIncome },
  { path: "/show-income/:id", name: "show-income", component: IncomeShow },
  { path: "/edit-income/:id", name: "edit-income", component: IncomeEdit },
  { path: "/expense", name: "expense", component: Expense },
  { path: "/add-expense", name: "add-expense", component: AddExpense },
  { path: "/show-expense/:id", name: "show-expense", component: ExpenseShow },
  { path: "/edit-expense/:id", name: "edit-expense", component: ExpenseEdit },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;