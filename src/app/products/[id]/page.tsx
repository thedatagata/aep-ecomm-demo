import NotFoundPage from "@/app/not-found";
import PriceTag from "@/components/PriceTag";
import { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import { cache } from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) NotFoundPage();
  return product;
});

export async function generateMetadata(
    {params: {id}}: ProductPageProps
): Promise<Metadata> {
    const product = await getProduct(id);
    return {
        title: product.prodName + " - AEP eCommerce Demo",
        description: product.prodDesc,
        openGraph: {
          images: [{url: product.prodImg}]
        }
    };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={product.prodImg}
        alt={product.prodName}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.prodName}</h1>
        <PriceTag price={product.prodPrice} className="mt-4" />
        <p className="py-6">{product.prodDesc}</p>
      </div>
    </div>
  );
}