export default function Page({ params }: { params: { id: string } }) {
  return <>product card detail: {params.id} </>;
}
