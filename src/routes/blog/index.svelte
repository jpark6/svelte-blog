<!-- blog index-->

<!-- blog index-->

<script context="module" lang="ts">
interface Post {
  path: string;
  meta: {
    title: string;
    date: string;
  };
};

interface FetchFunc {
  fetch: (url: string) => {
    json: () => Post[];
  };
};
// load function
export const load = async({ fetch }: FetchFunc ) => {
  const posts = await fetch('/api/posts.json');
  const allPosts = await posts.json();

  return {
    props: {
      posts: allPosts
    }
  };
}
</script>

<script lang="ts">

export let posts: Post[];
</script>

<ul>
  {#each posts as post}
    <li>
      <h2>
        <a href={post.path}>
          {post.meta.title}
        </a>
      </h2>
      <p>Published {post.meta.date}</p>
    </li>
  {/each}
</ul>