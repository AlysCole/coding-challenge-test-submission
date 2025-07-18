export default async function fetchAddress({ postcode, streetnumber }: { postcode: string, streetnumber: string}) {
    const queryParams = new URLSearchParams({ postcode, streetnumber });
    const [response, error] = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getAddresses?${queryParams.toString()}`)
        .then((res) => [res])
        .catch((err) => [null, err]);

    return { response: await response.json(), error };
}