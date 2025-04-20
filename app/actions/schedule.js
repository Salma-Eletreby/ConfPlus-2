'use server'

import * as repo from "../api/repos/schedule-repo"
import { schedRepo } from "../api/repos/schedule-repo"
import { getConfDates } from "../api/confdates/conf-dates-repo"

export const getSchedule = async (date) => {
    const data = await repo.getSchedule(date)
    return data
}

export async function getDates() {
    const data = await getConfDates()
    return data
}

export async function getLocations(){
    const data = await schedRepo.getLocations()
    return data
}

export const submitSchedule = async (schedule, deletedSessions) => {
    for(let j=0;j<deletedSessions.length;++j){
        await schedRepo.deleteSession(deletedSessions[j])
    }

    for(let i=0;i<schedule.length;++i){
        const isNew = await schedRepo.getSession(schedule[i].id)
        if(isNew==null || isNew==undefined){
            await schedRepo.addSession(schedule[i])
        }else{
            await schedRepo.updateSession(schedule[i])
        };
    }

}