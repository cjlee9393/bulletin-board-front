import { Button } from "../Button";

export default {
    component: Button,
    title: 'Atoms/Button'
}

export const Basic = (args) => <Button {...args} />

Basic.args = {
    buttonText: '댓글 쓰기'
}