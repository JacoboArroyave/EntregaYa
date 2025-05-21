import { Photo } from "./Photo"

export interface Issue{
    id:number
    descrption:string
    issue_type:string
    date_reported:Date
    status:string
    motorcycle_id:number
    photos:Photo[]
}