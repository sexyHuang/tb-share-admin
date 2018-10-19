import Vue from 'vue';
import {
  Button,
  Checkbox,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Dialog,
  Form,
  FormItem,
  MessageBox,
  
} from 'element-ui';

Vue.use(Button);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Container);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);


Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
