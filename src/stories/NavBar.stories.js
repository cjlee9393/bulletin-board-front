import { NavBar } from "../NavBar";
import { boards } from "../data";

export default {
    component: NavBar,
    title: 'Atoms/NavBar'
}

export const Basic = (args) => <NavBar {...args} />

Basic.args = {
    isLoggedIn: false,
    boards: boards,
}