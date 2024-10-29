import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 ">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Next.js HonoJs AuthJs Drizzle Boilerplate
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  This is a boilerplate with a basic auth with AuthJs. Also use
                  HonoJs to have a better way to handle all API routes, and
                  Drizzle to connect a DB. With Hono client we have a end to end
                  type safety.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg">
                  <Link href="/sign-up">Try it out</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Auth Options
            </h2>
            <div className="flex justify-center gap-4">
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Credentials</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Basic email and password authentication.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CheckCircle className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Providers</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Google, Github and Apple providers.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
