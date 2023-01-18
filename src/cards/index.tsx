import { FoodItem } from "../interface/foodItem";
import messages from "../data_source/messages.json";
import "./Card.css";
import { useEffect, useRef, useState } from "react";
import { Msgs } from "../interface/msgs";

interface CardProps {
  item: FoodItem;
}

// Border and weight bubble colors
enum Colors {
  BLUE = "blue",
  RED = "red",
  GREY = "grey",
}

const switchColor = (cardRef: any, color: string): void => {
  cardRef.current.style.background = `var(--${color}-card-color)`;
  cardRef.current.getElementsByClassName(
    "weight"
  )[0].style.background = `var(--${color}-card-color)`;
};

function Card(props: CardProps) {
  const { item } = props;
  const msgs: Msgs = JSON.parse(JSON.stringify(messages));

  const [isPicked, setIsPicked] = useState<boolean | undefined>(undefined);
  const [topTip, setTopTip] = useState<string>(msgs.default);
  const [bottomTip, setBottomTip] = useState<any>(item.info);

  const cardRef = useRef<any>();

  const handleClick = (): void => {
    if (item.quantity) {
      setIsPicked(!isPicked);
    }
  };

  const handleMouseLeave = (): void => {
    isPicked && setTopTip(msgs.picked);
  };

  const handleBuyClick = (): void => {
    setIsPicked(true);
    switchColor(cardRef, Colors.RED);
    setBottomTip(item.info);
  };

  useEffect(() => {
    if (isPicked === undefined && !item.quantity) {
      switchColor(cardRef, Colors.GREY);
      setBottomTip(item.message_when_out_of);
    }
    if (isPicked) {
      switchColor(cardRef, Colors.RED);
      setBottomTip(item.info);
    } else if (!isPicked && item.quantity) {
      switchColor(cardRef, Colors.BLUE);
      setTopTip(msgs.default);
      setBottomTip(
        <p className="info">
          {msgs.motivation}
          <span className="buy" onClick={handleBuyClick}>
            {msgs.link_to_buy}
          </span>
        </p>
      );
    }
  }, [isPicked]);

  return (
    <div className="wrapper">
      <div
        className={`card${!item.quantity ? " empty" : ""}`}
        ref={cardRef}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
      >
        <div className="content">
          <p>{topTip}</p>
          <div className="main">
            <h2>{item.name}</h2>
            <h4>{item.text}</h4>
            <p>{item.portions}</p>
            <p>{item.mice}</p>
            {item.extra ? <p>{item.extra}</p> : null}
          </div>

          <img alt="cat" src="./src/assets/kitty.png" />

          <div className="weight">
            <p className="weight_num">{item.weight}</p>
            <p className="weight_unit">кг</p>
          </div>
        </div>
      </div>
      <div className={`${"info"}${!item.quantity ? " msg_for_empty" : ""}`}>
        {bottomTip}
      </div>
    </div>
  );
}

export default Card;
