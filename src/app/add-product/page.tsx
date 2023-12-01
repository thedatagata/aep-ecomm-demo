import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";

export const metadata = {
  title: "Add Product - AEP eCommerce Demo",
};

async function addProduct(formData: FormData) {
  "use server";

  const prodName = formData.get("name")?.toString();
  const prodDesc = formData.get("description")?.toString();
  const prodImg = formData.get("imageURL")?.toString();
  const prodPrice = Number(formData.get("price") || 0);

  if (!prodName || !prodDesc || !prodImg || !prodPrice) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { prodName, prodDesc, prodImg, prodPrice },
  });
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageURL"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
