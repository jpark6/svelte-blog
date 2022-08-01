export const GET = async () => {
  const allPostFiles = import.meta.glob('../blog/*.md');
  const iterablePostFiles = Object.entries(allPostFiles);

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { metadata } = await resolver();
      const postPath = path.slice(2, -3);
      return {
        meta: metadata,
        path: postPath,
      };
    })
  );
  const sortedPosts = allPosts.sort((a, b) => {
    return Number(new Date(b.meta.date)) - Number(new Date(a.meta.date));
  });

  return {
    body: sortedPosts
  };
};
