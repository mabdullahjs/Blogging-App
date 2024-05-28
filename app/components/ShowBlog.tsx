"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import BlogBox from "./BlogBox";
import { formatMongoDBTimestamp } from "@/utils/convertDate";

const ShowBlog = (props: { id?: string }) => {
    const [data, setData] = useState<null | []>(null);
    useEffect(() => {
        async function getData() {
            const res = await axios.get(props.id ? `/api/blogs/${props.id}` : `/api/blogs`);
            setData(res.data);
        }
        getData()
    }, [])
    return (
        <div className='mt-[4rem]'>
            {data !== null ? (
                data.length > 0 ? (
                    data.map((item: { createdAt: string, id: string, title: string, description: string, profileUrl: string, _id: string, uid: string, username: string }) => (
                        <BlogBox
                            key={item._id}
                            date={`${item.username} - ${formatMongoDBTimestamp(item.createdAt)}`}
                            title={item.title}
                            descriptipn={item.description}
                            src={item.profileUrl}
                            seeHidden={false}
                            deleteHidden={true}
                            uid={item.uid}
                        />
                    ))
                ) : (
                    <h1 className='text-2xl font-bold text-center'>No Blogs Found...</h1>
                )
            ) : (
                <h1 className='text-2xl font-bold text-center'>Loading...</h1>
            )}
        </div>
    )
}

export default ShowBlog