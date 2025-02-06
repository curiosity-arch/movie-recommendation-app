import { fetchUser } from "@/app/lib/data";

const users = await fetchUser();

export default function Page() {
    return (
        <div>
            <h1>User</h1>
        </div>
        // <div>
        //     {users.map((user) => (
        //         <div>
        //             {user.id_user}
        //             {user.username_user}
        //             {user.password_user}
        //         </div>
        //     ))}
        // </div>
    )
}