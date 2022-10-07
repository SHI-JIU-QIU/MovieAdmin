import { IForm } from '@/components/Form/type'

export const newsFormConfig: IForm = {
    formItems: [
        {
            field: 'consultTitle',
            type: 'input',
            label: '资讯标题',
            placeholder: '请输入资讯标题'
        }, {
            field: 'consultAnnouncer',
            type: 'input',
            label: '发布者',
            placeholder: '请输入发布者昵称'
        },
        {
            field: 'consultScore',
            type: 'input',
            label: '热度排行',
            placeholder: '请输入发布者排行'
        },
        
        {
            field: 'consultContent',
            type: 'textarea',
            label: '资讯内容',
            placeholder: '请输入资讯内容'
        },
    ]


}