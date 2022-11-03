import { NavBar } from "../NavBar";
import { boards } from "../data";
import { MemoryRouterDecorator } from "./decorators/RouteDecorator";

export default {
    component: NavBar,
    title: 'Atoms/NavBar',
    decorators: [MemoryRouterDecorator],
}

export const Basic = (args) => <NavBar {...args} />

Basic.args = {
    isLoggedIn: false,
    boards: boards,
}