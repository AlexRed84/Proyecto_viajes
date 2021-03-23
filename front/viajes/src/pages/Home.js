import useAuth from "../shared/hooks/useAuth";

export default function Home(params) {
    const {testData} = useAuth();

    return (
    <section>

        <h1>HOME</h1>
        {testData.map(item=> {
            return <p key={item}>{item}</p>;
            })}
    </section>

    );
}