import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

let cachedUsers = null;

export function useUsersCache() {
    const [users, setUsers] = useState(cachedUsers ?? []);
    const [isLoading, setIsLoading] = useState(!cachedUsers);

    useEffect(() => {
        if (cachedUsers) return;

        let isCancelled = false;

        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const data = await getUsers();
                if (isCancelled) return;
                cachedUsers = data;
                setUsers(data);
            } finally {
                if (!isCancelled) setIsLoading(false);
            }
        };

        fetchUsers();

        return () => {
            isCancelled = true;
        };
    }, []);

    return { users, isLoading };
}