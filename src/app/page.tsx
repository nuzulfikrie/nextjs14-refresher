'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useAuth } from '@/hooks/use-auth'
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link'


export default function Home() {

  const { user, loading } = useAuth();

  const NasiKandarPageSkeleton = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-10 w-[60%]" />
                  <Skeleton className="h-6 w-[80%]" />
                  <Skeleton className="h-6 w-[90%]" />
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Skeleton className="h-12 w-[150px]" />
                  <Skeleton className="h-12 w-[150px]" />
                </div>
              </div>
              <div className="relative w-full h-64 lg:h-auto">
                <Skeleton className="w-full h-full" />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
  {
    /**
     * if loading is true, show shadCn skeleton 
     */
  }
if (loading === true) {
  return NasiKandarPageSkeleton;
}
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                {user ? 
                (
                  <>
                      <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Link href="/dashboard" passHref>
                          <Button size="lg">
                            {`View Dashboard`}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                  </>
             ) : (
              <>
                      <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                          Rate the nasi kandar!
                        </h1>
                        <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                          A community platform where all nasi kandar lovers can rate the nasi kandar, may the best nasi kandar wins!
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Button size="lg">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline">
                          Learn More
                        </Button>
                      </div>
              </>
    
                )}


              </div>
              <Image
                src="https://images.pexels.com/photos/7234281/pexels-photo-7234281.jpeg"
                alt="Nasi Kandar dish"
                width={2880}
                height={1920}
                layout="responsive"
                priority
              />
            </div>
          </div>
        </section>
      </div>
    </>

  );
}