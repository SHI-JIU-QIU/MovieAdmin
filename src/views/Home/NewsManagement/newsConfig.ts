import { IForm } from '@/components/Form/type'

export const newsFormConfig: IForm = {
    formItems: [
        {
            field: 'consultTitle',
            type: 'input',
            label: '资讯标题',
            placeholder: '请输入资讯标题',
            rules: [{ required: true, message: "请输入资讯标题", trigger: "blur" },]
        }, {
            field: 'consultAnnouncer',
            type: 'input',
            label: '发布者',
            placeholder: '请输入发布者昵称',
            rules: [{ required: true, message: "请输入发布者", trigger: "blur" },]
        },
        {
            field: 'consultScore',
            type: 'input',
            label: '热度排行',
            placeholder: '请输入目前热度排行',
            rules: [{ required: true, message: "请输入目前热度排行", trigger: "blur" },]
        },

        {
            field: 'consultContent',
            type: 'textarea',
            label: '资讯内容',
            placeholder: '请输入资讯内容',
            rules: [{ required: true, message: "请输入资讯内容", trigger: "blur" },]
        },
    ]


}