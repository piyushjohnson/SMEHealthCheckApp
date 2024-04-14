"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateSMEAction = {
  UEN: string;
  CompanyName: string;
  FullName: string;
  Email: string;
  PositionInCompany: string;
  MobNumber: string;
  DocumentsFormData: FormData;
  IsTermsAccepted: boolean;
};

export async function createSME(sme: CreateSMEAction) {
  const body = JSON.stringify({
    UEN: sme.UEN,
    CompanyName: sme.CompanyName,
    FullName: sme.FullName,
    PositionInCompany: sme.PositionInCompany,
    Email: sme.Email,
    MobNumber: sme.MobNumber,
  });

  return fetch("http://localhost:4000/sme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
    .then((response) => {
      if (response.status === 422) {
        return response.json();
      }

      if (!response.ok) {
        throw new Error(`Network Error ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      if (json.error) {
        return json;
      }
      console.log("Created SME", json);

      if (json.id) {
        sme.DocumentsFormData.append("id", json.id);
        return fetch("http://localhost:4000/sme/upload", {
          body: sme.DocumentsFormData,
          method: "POST",
        })
          .then((response) => {
            if (response.status === 422) {
              return response.json();
            }
            if (!response.ok) {
              throw new Error(`Network Error ${response.status}`);
            }
            return response.json();
          })
          .then((json) => {
            if (json.error) {
              return json;
            }

            console.log("Uploaded SME documents", json);
          });
      } else {
        throw new Error("Failed to upload documents");
      }
    })
    .then(() => {
      revalidatePath("/sme");
      redirect("/sme");
    });
}
