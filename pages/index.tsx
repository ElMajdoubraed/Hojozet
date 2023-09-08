import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>حجوزات</title>
        <meta name="description" content="حجوزات" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main>
          <h1>hi</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            culpa voluptate deserunt doloremque reiciendis? Veritatis iste
            commodi ex consectetur voluptatum voluptates labore sapiente ipsa,
            suscipit quo maxime consequuntur neque eligendi.
          </p>
          <img src="/images/vercel.svg" alt="" />
          <Image src="/images/vercel.svg" alt="" width={300} height={300} />
        </main>
        <main>
          <h1>hi</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            culpa voluptate deserunt doloremque reiciendis? Veritatis iste
            commodi ex consectetur voluptatum voluptates labore sapiente ipsa,
            suscipit quo maxime consequuntur neque eligendi.
          </p>
          <img src="/images/vercel.svg" alt="" />
          <Image src="/images/vercel.svg" alt="" width={300} height={300} />
        </main>
        <main>
          <h1>hi</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            culpa voluptate deserunt doloremque reiciendis? Veritatis iste
            commodi ex consectetur voluptatum voluptates labore sapiente ipsa,
            suscipit quo maxime consequuntur neque eligendi.
          </p>
          <img src="/images/vercel.svg" alt="" />
          <Image src="/images/vercel.svg" alt="" width={300} height={300} />
        </main>
      </div>
    </>
  );
}
