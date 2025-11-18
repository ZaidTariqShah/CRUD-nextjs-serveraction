"use server";
import { db } from "@/drizzle/src";
import { usersTable } from "@/drizzle/src/db/schema";
import { eq } from "drizzle-orm";
export const getUsers = async (prevState: any, formData: FormData) => {
  const users = await db.select().from(usersTable);
  return { users };
};

export const insertUser = async (prevState: any, formData: FormData) => {
  console.log("Prev State: ", prevState); // <-- yeh chalega

  try {
    const name = formData.get("name") as string;
    const age = Number(formData.get("age"));

    await db.insert(usersTable).values({ name, age });

    return {
      success: `User ${name} added successfully`,
      error: "",
    };
  } catch (error: any) {
    return {
      success: "",
      error: error.message,
    };
  }
};

export const deleteUsers = async (prevState: any, formData: FormData) => {
  try {
    const id = Number(formData.get("id"));
    await db.delete(usersTable).where(eq(usersTable.id, id));
    return { success: `User with id ${id} deleted successfully`, error: "" };
  } catch (error: any) {
    return { success: "", error: error.message };
  }
};

export const updateUsers = async (prevState: any, formdata: FormData) => {
  try {
    const id = Number(formdata.get("id"));
    const name = formdata.get("name") as string;
    const age = Number(formdata.get("age"));
    await db.update(usersTable).set({ name, age }).where(eq(usersTable.id, id));
    return { success: `User with id ${id} updated successfully`, error: "" };
  } catch (error: any) {
    return { success: "", error: error.message };
  }
};

export const deleteAll = async (prevState: any) => {
  try {
    await db.delete(usersTable);
    return { success: "All users deleted successfully", error: "" };
  } catch (error: any) {
    return { success: "", error: error.message };
  }
};
