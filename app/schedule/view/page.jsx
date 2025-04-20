import React from 'react'
import SessionContainer from '../components/SessionContainer'
import { getSchedule, getDates} from '../../actions/schedule'

export default async function page() {
  const initialSchedule = await getSchedule()
  const dates = await getDates()
  return (
    <>
      <SessionContainer initialSchedule={initialSchedule} initalDates={dates}></SessionContainer>
    </>
  )
}
