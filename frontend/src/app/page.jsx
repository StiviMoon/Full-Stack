import React from 'react'
import { FormTask } from './Components/FormTask'
import ListTasks  from './Components/ListTasks'

export const dynamic = "force-dynamic"


function HomePage() {
  return (
    <div className='pt-10 w-[70%] mx-auto'>
     <div  className='container mx-auto m-10'>
        <h1 className=' text-center text-5xl font-bold mb-10'>Task App</h1>

        <div className='flex gap-x-10'>

          <FormTask/>
          <ListTasks/>

        </div>
     </div>
    </div>
  )
}

export default HomePage