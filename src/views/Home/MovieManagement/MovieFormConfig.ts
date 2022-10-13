import { IForm } from '@/components/Form/type'

export const movieFormConfig: IForm = {
    formItems: [
        {
            field: 'movieCName',
            type: 'input',
            label: '中文名字',
            placeholder: '请输入电影名字',
            rules: [{ required: true, message: "请输入电影名字", trigger: "blur" },]
        },
        {
            field: 'movieFName',
            type: 'input',
            label: '英文名字',
            placeholder: '请输入电影名字',
            rules: [{ required: true, message: "请输入电影英文名", trigger: "blur" },]
        },
        {
            field: 'movieActor',
            type: 'input',
            label: '演员',
            placeholder: '请输入演员',
            rules: [{ required: true, message: "请输入演员", trigger: "blur" },]
        },
        {
            field: 'movieDirector',
            type: 'input',
            label: '导演',
            placeholder: '请输入导演',
            rules: [{ required: true, message: "请输入导演", trigger: "blur" },]
        },

        {
            field: 'movieDuration',
            type: 'input-number',
            label: '电影时长/分钟',
            rules: [{ required: true, message: "请输入电影时长", trigger: "blur" },]
        },
        {
            field: 'movieType',
            type: 'input',
            label: '电影类型',
            placeholder: '请输入类型',
            rules: [{ required: true, message: "请输入电影类型", trigger: "blur" },]
        },
        {
            field: 'movieScore',
            type: 'input-number',
            label: '电影评分',
            rules: [{ required: true, message: "请输入评分", trigger: "blur" },]
        },
        {
            field: 'movieReleaseDate',
            type: 'datePicker',
            label: '电影上映时间',
            rules: [{ required: true, message: "请输入电影上映时间", trigger: "blur" },]
        },
        {
            field: 'movieState',
            type: 'radio',
            label: '电影状态',
            options: [{ label: '下架', value: 0 }, { label: '热映中', value: 1 }, { label: '即将上映', value: 2 }],
            rules: [{ required: true, message: "请输入电影状态", trigger: "blur" },]
        },
        {
            field: 'movieCountry',
            type: 'input',
            label: '地区',
            placeholder: '请输入地区',
            rules: [{ required: true, message: "请输入地区", trigger: "blur" },]
        },
        {
            field: 'movieDetail',
            type: 'textarea',
            label: '电影详情',
            placeholder: '请输入电影详情',
            rules: [{ required: true, message: "请输入电影详情", trigger: "blur" },]
        },
    ]
}