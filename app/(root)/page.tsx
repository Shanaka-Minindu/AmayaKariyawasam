import About from "@/components/organisms/about"
import ContactForm from "@/components/organisms/ContactForm"
import FilterCategory from "@/components/organisms/filterCategory"
import Header from "@/components/organisms/header"
import Navbar from "@/components/organisms/Navbar"
import { Button } from "@base-ui/react/button"
import Link from "next/link"


const page = () => {
  return (
    <div>
      {/* <Button> 
      <Link href="/addData/addCategory">Add category</Link>
      </Button>
      <Button >
      <Link href="/addData/addProject">Add Project</Link>
    </Button> */}
    <Navbar/>

    <Header/>
    <section id="about-me" className="min-h-screen ">
      <About/>

      </section>
    <section id="expertise" className="min-h-screen ">
    <FilterCategory/>
    </section>
    
<section id="contact" className="min-h-screen ">
      <ContactForm/>
      </section>
      
    </div>
  )
}

export default page
