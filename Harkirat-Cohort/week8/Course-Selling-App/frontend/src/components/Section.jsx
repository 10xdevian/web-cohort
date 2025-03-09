import React from 'react'

function Section({backgroundColor, children}) {
  return (
    <section style={{backgroundColor}} className=" bg-[#eef2f9] px-[20rem] py-10" >
        
        {children}
    </section>
  )
}

export default Section;
