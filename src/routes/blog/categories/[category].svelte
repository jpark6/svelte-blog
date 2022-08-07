<script context="module" lang="ts">
interface Post {
  path: string;
  meta: {
    title: string;
    date: Date;
    categories: string[];
  };
};

interface Parameters {
  params: {
    category: string;
  };
  fetch: (url: string) => {
    json: () => Post[]; 
  }
};

export const load = async ({ params, fetch }: Parameters) => {
  const currentCategory = params.category;
  const response = await fetch('/api/posts.json');
  const posts = await response.json();
  debugger;

  const matchingPosts = posts
    .filter(post => post.meta.categories.includes(currentCategory));

  return {
    props: {
      posts: matchingPosts
    }
  };
}
</script>