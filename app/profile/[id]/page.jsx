"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const username = searchParams.get("name");

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params._id}/posts`);
            const data = await response.json();

            setPosts(data);
        };

        if (params?._id) fetchPosts();
    }, [params.id]);

    return (
        <Profile
            name={username}
            desc={`Welcome to ${username}'s personalized profile page.`}
            data={posts}
        />
    );
};

export default UserProfile;