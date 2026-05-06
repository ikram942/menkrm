import Hero from "@/components/hero"
import Bodypro from "@/components/bodypro"
import Prod from "@/components/ui/prod"
import NosPacks from "@/components/ui/nos-packs"
import Copyright from "@/components/ui/copyrght"
import { getProducts } from "@/lib/products"

export default async function Page() {
  const products = await getProducts({});

  return (
    <>
      <Hero />
      <Bodypro products={JSON.parse(JSON.stringify(products.slice(0, 4)))} />
      <Prod />
      <NosPacks />
      <Copyright />
    </>
  )
}
