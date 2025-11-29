export interface createTask {
    title: string;
    priority:string;
    dueDate:string;
    actions?: string;
    status?:string;
    id?: string;
    no?:number
}

/**
 * Icreate network table header
 */
export interface ICreateTaskTableHeader {
    title: string;
    key: keyof createTask;
    display: boolean;
    status?: boolean;
    sort?: boolean;
    edit?: boolean;
    delete?: boolean;
    view?: boolean;
    create?: boolean;
    truncate?:boolean
}