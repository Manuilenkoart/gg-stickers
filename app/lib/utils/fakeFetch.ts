function fakeFetch<T>(data: T, options?: { timeOut: number }): Promise<T> {
  const { timeOut = 100 } = options ?? {};

  return new Promise((resolve) => {
    setTimeout(() => resolve(data), timeOut);
  });
}

export default fakeFetch;
