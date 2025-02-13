import { fetchUser } from "@/app/lib/data";

export default async function Page() {
    const users = await fetchUser();

    return (
        <div>
            <h1>User</h1>
            <div>
            {users.map((user) => (
                 <div key={user.id_user}>
                     {user.id_user}
                     {user.username_user}
                     {user.password_user}
                 </div>
            ))}
            </div>
        </div>
    )
}