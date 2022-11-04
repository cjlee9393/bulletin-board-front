import { Login } from "../Login";

export default {
    component: Login,
    title: 'Molecules/Login',
}

export const Basic = (args) => <Login {...args} />

Basic.args = {
}