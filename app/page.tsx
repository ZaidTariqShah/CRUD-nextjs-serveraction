"use client";
import { useActionState } from "react";
import { useEffect } from "react";
import {
  deleteAll,
  deleteUsers,
  getUsers,
  insertUser,
  updateUsers,
} from "./actions/_actions";

export default function Page() {
  const [allDeleteState, allDeleteAction, allDeletePending] = useActionState(
    deleteAll,
    { error: "", success: "" }
  );
  const [updateState, updateAction, isUpdatePending] = useActionState(
    updateUsers,
    { error: "", success: "" }
  );
  const [deleteState, deleteAction, isDeletePending] = useActionState(
    deleteUsers,
    { error: "", success: "" }
  );
  const [state, action, isPending] = useActionState(getUsers, { users: [] });
  const [insertState, insertAction, isInsertPending] = useActionState(
    insertUser,
    { success: "", error: "" }
  );
  // ⭐ Auto-hide success/error after 3 seconds
  useEffect(() => {
    if (allDeleteState.success || allDeleteState.error) {
      const timer = setTimeout(() => {
        allDeleteState.success = "";
        allDeleteState.error = "";
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [allDeleteState.success, allDeleteState.error]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">User Manager</h1>
      {/* All delete */}
      <form action={allDeleteAction}>
        {allDeleteState.success && (
          <p className="text-green-600 mb-2">{allDeleteState.success}</p>
        )}
        {allDeleteState.error && (
          <p className="text-red-600 mb-2">{allDeleteState.error}</p>
        )}
        <button
          disabled={allDeletePending}
          className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition disabled:bg-red-300"
        >
          {allDeletePending ? "Deleting All..." : "Delete All"}
        </button>
      </form>

      {/* Insert Form */}
      <form
        action={insertAction}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-3"
      >
        <h2 className="text-xl font-semibold text-gray-700">Add User</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 rounded-xl border border-gray-300 
          bg-gray-100 placeholder:text-gray-500 
          text-gray-900
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          className="w-full p-3 rounded-xl border border-gray-300 
          bg-gray-100 placeholder:text-gray-500 
          text-gray-900
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={isInsertPending}
          className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {isInsertPending ? "Inserting..." : "Insert"}
        </button>
      </form>

      {/* Get Button */}
      <form action={action} className="w-full max-w-md">
        <button
          disabled={isPending}
          className="w-full bg-green-600 text-white p-3 rounded-xl shadow hover:bg-green-700 transition disabled:bg-green-300"
        >
          {isPending ? "Getting..." : "Get Users"}
        </button>
      </form>

      {/* User List */}
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg space-y-4">
        {state.users.length === 0 && (
          <p className="text-center text-gray-500">No users found</p>
        )}

        {state.users.map((u) => (
          <div
            key={u.id}
            className="border-b pb-4 flex flex-col gap-4 bg-gray-50 p-4 rounded-xl"
          >
            {/* Top Row */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800 text-lg">{u.name}</p>
                <p className="text-gray-500 text-sm">Age: {u.age}</p>
              </div>

              {/* Delete */}
              <form action={deleteAction}>
                <input type="number" name="id" defaultValue={u.id} hidden />
                <button
                  disabled={isDeletePending}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition disabled:bg-red-300"
                >
                  {isDeletePending ? "Deleting..." : "Delete"}
                </button>
              </form>
            </div>

            {/* Update Form */}
            <form action={updateAction} className="flex items-center gap-3">
              <input type="number" hidden defaultValue={u.id} name="id" />

              <input
                type="text"
                name="name"
                placeholder="New Name"
                className="p-2 border rounded-lg bg-gray-100 
                placeholder:text-gray-600
                text-gray-900
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                name="age"
                placeholder="New Age"
                className="p-2 w-24 border rounded-lg bg-gray-100 
                placeholder:text-gray-600
                text-gray-900
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                disabled={isUpdatePending}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition disabled:bg-purple-300"
              >
                {isUpdatePending ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
