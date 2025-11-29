import { ICreateTaskTableHeader } from "../interface/task.interface";

export const createTaskTableHeader: ICreateTaskTableHeader[] = [
    { title: 'S.NO', key: 'no', display: true, status: false, sort: false },
    { title: 'Title', key: 'title', display: true, status: false, sort: false },
    { title: 'Priority', key: 'priority', display: true, status: false, sort: false },
    { title: 'due Date', key: 'dueDate', display: true, status: false, sort: false},
    { title: 'Status', key: 'status', display: true, sort: false,status: true },
    {title:'Actions', key:'actions',display:true,status:false,sort:false,edit:true, delete:true, view:true,}
];