import { IForm } from '@/components/Form/type'

export const cinemaFormConfig: IForm = {
    formItems: [
        {
            field: 'cinemaName',
            type: 'input',
            label: '影院名称',
            placeholder: '请输入影院名称',
            rules: [{ required: true, message: "请输入影院名称", trigger: "blur" },]
        },
        {
            field: 'cinemaAddress',
            type: 'input',
            label: '影院地址',
            placeholder: '请输入影院地址',
            rules: [{ required: true, message: "请输入影院地址", trigger: "blur" },]
        },
        {
            field: 'cinemaScore',
            type: 'input-number',
            label: '影院评分',
            rules: [{ required: true, message: "请输入影院评分", trigger: "blur" },]
        },
    ]
}