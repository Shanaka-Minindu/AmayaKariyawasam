import About from "@/components/organisms/about"
import ContactForm from "@/components/organisms/ContactForm"
import FilterCategory from "@/components/organisms/filterCategory"
import Header from "@/components/organisms/header"
import { Button } from "@base-ui/react/button"
import Link from "next/link"


const page = () => {
  return (
    <div>
      <Button> 
      <Link href="/addData/addCategory">Add category</Link>
      </Button>
      <Button >
      <Link href="/addData/addProject">Add Project</Link>
    </Button>
    <Header/>
      <FilterCategory/>
      <About/>
      <ContactForm/>
      
    </div>
  )
}

export default page
