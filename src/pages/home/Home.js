import BlogList from "../../components/BlogList";
import { useCollection } from "../../hooks/useCollection";

export default function Home() {
    const { documents: blogs, error } = useCollection("blogs", undefined, [
        "createdAt",
        "desc",
    ]);

    return (
        <div>
            {blogs && <BlogList blogs={blogs} />}
            {error && <p>{error}</p>}
        </div>
    );
}
