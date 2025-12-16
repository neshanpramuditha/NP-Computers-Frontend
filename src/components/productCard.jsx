export default function ProductCard(props){

    console.log(props);
    
    return(
        <div> {/* JS ඇතුලේ HTML ලියන්න පුළුවන් මෙහෙම  */}
            <h2>{props.name}</h2> {/*HTML  ඇතුලේ ආයෙමත් JS ලියන්න නම් {} පාවිච්චි කරන්න ඕන */}
            <img src={props.image} className="border-5 border-e-lime-400"/>
            <p>Price: {props.price}</p>
            <button>Buy now</button>
        </div>
    )

}