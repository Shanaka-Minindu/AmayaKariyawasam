import FilterCategory from "@/components/organisms/filterCategory"
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
      <FilterCategory/>
      
    </div>
  )
}

export default page
