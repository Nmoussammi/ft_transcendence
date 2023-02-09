import Link from "next/link" 

async function getPosts(){
  const res = await fetch("/api/getPosts")
}
export default function Home() {
  return (
    <main className="py-8 px-48">
     <Link className="bg-teal-500 text-black font-medium py-2 px-4 rounded-md" href={"/dashboard"}> Go to the dashbord</Link>
    </main>
  )
}
