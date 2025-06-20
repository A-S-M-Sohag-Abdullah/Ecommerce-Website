import EditCategoryClient from "@/app/components/Others/EditCategoryComponent";
import { Suspense } from "react";

export default function EditCategoryPage() {
  return (
    <Suspense fallback={<p>Loading category editor...</p>}>
      <EditCategoryClient />
    </Suspense>
  );
}
